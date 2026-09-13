"""Import the user's local Squarespace archive, without its executable site code.

Requires beautifulsoup4==4.13.4. Run with the archive directory as the argument.
Normal builds use the checked-in JSON and original image files, not this script.
"""

import argparse
import hashlib
import json
import re
import shutil
from pathlib import Path
from urllib.parse import urlparse

from bs4 import BeautifulSoup, Comment, NavigableString


PROJECTS = [
    ('microsoft-care-team', 'about/microsoft-care-team', 'Microsoft Care Team', 'Family caregiving and togetherness'),
    ('microsoft-career', 'industry/ms', 'Microsoft', 'Career progression in Microsoft Teams'),
    ('pg-amazon-shopping', 'industry/project-one-ephnc-2e6bd', 'P&G', 'The mobile shopping experience'),
    ('dolby-community', 'industry/project-two-llrgk-5xkxg', 'Dolby', 'Community in a digital workplace'),
    ('bnu-purdue-vehicle-design', 'industry/project-three-8zgh7-bj6cf', 'Beijing Normal University & Purdue', 'Future UX for semi-autonomous vehicles'),
    ('pepsico-engagement', 'industry/project-one-ephnc-2e6bd-xzlxa', 'PepsiCo', 'Connecting physical and digital experiences'),
    ('adventhealth-medicare', 'industry/advant-health-medicre-informational-app', 'AdventHealth & UEGroup', 'Navigating out-of-hospital care'),
    ('cerner-telehealth', 'industry/cerner-rehumanizing-sociotechnical-telehealth-systems', 'Cerner', 'Human connection in telehealth'),
    ('pathai-portfolio-background', 'about-me', 'PathAI & portfolio background', 'An archive of my earlier portfolio biography'),
]
TAGS = {'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'em', 'i', 'u', 's', 'br', 'hr', 'ul', 'ol', 'li', 'figure', 'figcaption', 'blockquote', 'span', 'a', 'img', 'iframe', 'sup', 'sub'}


def normalized(text):
    return ' '.join(text.split())


def digest(data):
    return hashlib.sha256(data).hexdigest()


def tree_text(nodes):
    return ''.join(node if isinstance(node, str) else tree_text(node.get('children', [])) for node in nodes)


def image_type(data):
    if data.startswith(b'\x89PNG\r\n\x1a\n'):
        return '.png'
    if data.startswith(b'\xff\xd8\xff'):
        return '.jpg'
    if data.startswith((b'GIF87a', b'GIF89a')):
        return '.gif'
    raise ValueError('Unrecognized image format')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('archive', type=Path)
    args = parser.parse_args()
    archive = args.archive.resolve()
    root = Path(__file__).resolve().parents[1]
    output = root / 'content/projects'
    images_dir = root / 'public/images/projects'
    output.mkdir(parents=True, exist_ok=True)
    images_dir.mkdir(parents=True, exist_ok=True)

    index_bytes = (archive / 'industry/index.html').read_bytes()
    index = BeautifulSoup(index_bytes.decode('utf-8'), 'html.parser')
    industry_entries = []
    imported_routes = {route for _, route, _, _ in PROJECTS}
    for link in index.select('main a[href]'):
        href = link['href']
        assert '://' not in href and href.endswith('/index.html'), href
        destination = (archive / 'industry' / href).resolve()
        assert destination.is_relative_to(archive / 'industry'), href
        route = destination.parent.relative_to(archive).as_posix()
        assert route in imported_routes, f'Industry project missing from import: {route}'
        industry_entries.append({'title': link.get_text(' ', strip=True), 'sourceUrl': 'https://cpark.squarespace.com/' + route})
    assert industry_entries, 'Industry index must contain projects'
    coverage = {'sourceUrl': 'https://cpark.squarespace.com/industry', 'sourceHtmlSha256': digest(index_bytes), 'projects': industry_entries}
    (root / 'content/portfolio-industry-index.json').write_text(json.dumps(coverage, ensure_ascii=True, indent=2) + '\n', encoding='utf-8')
    print(f'Industry index: all {len(industry_entries)} source projects covered')

    for slug, route, company, subtitle in PROJECTS:
        source = archive / route / 'index.html'
        source_bytes = source.read_bytes()
        soup = BeautifulSoup(source_bytes.decode('utf-8'), 'html.parser')
        content = soup.select_one('main')
        assert content is not None, route
        # Remove site navigation and executable/editor scaffolding, never body prose.
        for tag in content.select('script, style, template, .item-pagination, .sqs-block-spacer'):
            tag.decompose()
        source_text = normalized(content.get_text())
        source_images = [img['src'] for img in content.select('img')]
        source_links = [a['href'] for a in content.select('a[href]')]
        source_videos = [frame['src'] for frame in content.select('iframe')]
        assets = []
        links = []
        videos = []

        def convert(element):
            if isinstance(element, Comment):
                return []
            if isinstance(element, NavigableString):
                return [str(element)]
            name = element.name
            if name not in TAGS and name not in {'div', 'article', 'section', 'main'}:
                raise ValueError(f'Unreviewed content element: {name} in {route}')
            children = [child for item in element.children for child in convert(item)]
            if name in {'div', 'article', 'section', 'main'}:
                if 'sqs-block' in element.get('class', []):
                    if not normalized(tree_text(children)) and not element.select_one('img, iframe'):
                        return []
                    return [{'tag': 'div', 'children': children}]
                return children
            node = {'tag': 'h2' if name == 'h1' else name}
            if name == 'img':
                local = (source.parent / element['src']).resolve()
                assert local.is_relative_to(archive / 'assets'), 'Image escapes archive assets'
                data = local.read_bytes()
                extension = image_type(data)
                filename = local.name if local.suffix.lower() in {'.png', '.jpg', '.jpeg', '.gif'} else local.name + extension
                assert re.fullmatch(r'[A-Za-z0-9_.-]+', filename)
                assert len(data) < 100_000_000, 'Asset exceeds GitHub file limit'
                destination = images_dir / filename
                shutil.copyfile(local, destination)
                src = '/images/projects/' + filename
                node.update(src=src, alt=element.get('alt') or f'{company}: original project image {len(assets) + 1}')
                dimensions = element.get('data-image-dimensions', '').split('x')
                for i, key in enumerate(['width', 'height']):
                    value = element.get(key) or (dimensions[i] if len(dimensions) == 2 else '')
                    if value.isdigit() and int(value) > 0:
                        node[key] = int(value)
                assets.append({'src': src, 'originalPath': local.relative_to(archive).as_posix(), 'sha256': digest(data), 'bytes': len(data)})
            elif name == 'iframe':
                src = element['src']
                assert re.fullmatch(r'https://www\.youtube\.com/embed/[A-Za-z0-9_-]+(?:\?feature=oembed)?', src), src
                node.update(src=src, title='Microsoft Care Team: Wish Board walkthrough')
                videos.append(src)
            elif name == 'a':
                href = element['href']
                parsed = urlparse(href)
                assert parsed.scheme == 'https' and parsed.hostname == 'drive.google.com', href
                node['href'] = href
                links.append(href)
            if children:
                node['children'] = children
            return [node]

        nodes = convert(content)
        assert normalized(tree_text(nodes)) == source_text, f'Text changed: {route}'
        assert len(assets) == len(source_images), f'Images lost: {route}'
        assert [asset['originalPath'] for asset in assets] == [(source.parent / src).resolve().relative_to(archive).as_posix() for src in source_images]
        assert links == source_links, f'Document links changed: {route}'
        assert videos == source_videos, f'Video changed: {route}'
        record = {
            'slug': slug,
            'company': company,
            'subtitle': subtitle,
            'kind': 'biography-archive' if route == 'about-me' else 'case-study',
            'sourceUrl': 'https://cpark.squarespace.com/' + route,
            'sourceTitle': soup.title.get_text(),
            'sourceHtmlSha256': digest(source_bytes),
            'originalText': source_text,
            'originalTextSha256': digest(source_text.encode('utf-8')),
            'images': assets,
            'documentLinks': links,
            'videos': videos,
            'content': nodes,
        }
        (output / (slug + '.json')).write_text(json.dumps(record, ensure_ascii=True, indent=2) + '\n', encoding='utf-8')
        print(f'{slug}: {len(source_text)} characters, {len(assets)} images, {len(links)} documents, {len(videos)} videos')


if __name__ == '__main__':
    main()
