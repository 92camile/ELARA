import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

/**
 * @typedef {string | {tag: string, children?: ProjectNode[], src?: string,
 * alt?: string, width?: number, height?: number, href?: string, title?: string}} ProjectNode
 * @typedef {{src: string, originalPath: string, sha256: string, bytes: number}} ProjectImage
 * @typedef {{slug: string, company: string, subtitle: string,
 * kind: 'case-study' | 'biography-archive', sourceUrl: string, sourceTitle: string,
 * sourceHtmlSha256: string, originalText: string, originalTextSha256: string,
 * images: ProjectImage[], documentLinks: string[], videos: string[], content: ProjectNode[]}} Project
 */

const allowedTags = new Set([
  'div',
  'p',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
  'b',
  'em',
  'i',
  'u',
  's',
  'br',
  'hr',
  'ul',
  'ol',
  'li',
  'figure',
  'figcaption',
  'blockquote',
  'span',
  'a',
  'img',
  'iframe',
  'sup',
  'sub',
]);

/** @param {ProjectNode[]} nodes */
export function projectText(nodes) {
  return nodes
    .map((node) =>
      typeof node === 'string' ? node : projectText(node.children || []),
    )
    .join('');
}

/** @param {ProjectNode[]} nodes */
export function validateProjectContent(nodes) {
  if (!Array.isArray(nodes)) throw new Error('Expected project content array');
  for (const node of nodes) {
    if (typeof node === 'string') continue;
    if (!node || !allowedTags.has(node.tag))
      throw new Error('Unsupported project element');
    if (
      Object.keys(node).some(
        (key) =>
          ![
            'tag',
            'children',
            'src',
            'alt',
            'width',
            'height',
            'href',
            'title',
          ].includes(key),
      )
    )
      throw new Error('Unsupported project attribute');
    if (
      node.tag === 'img' &&
      (!/^\/images\/projects\/[A-Za-z0-9_-][A-Za-z0-9_.-]*\.(?:png|jpe?g|gif)$/.test(
        node.src || '',
      ) ||
        !node.alt)
    )
      throw new Error('Invalid project image');
    if (
      node.tag === 'a' &&
      !/^https:\/\/drive\.google\.com\/file\/d\/[A-Za-z0-9_-]+\/view\?usp=sharing$/.test(
        node.href || '',
      )
    )
      throw new Error('Invalid project document link');
    if (
      node.tag === 'iframe' &&
      (!/^https:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9_-]+(?:\?feature=oembed)?$/.test(
        node.src || '',
      ) ||
        !node.title)
    )
      throw new Error('Invalid project video');
    if (node.src && !['img', 'iframe'].includes(node.tag))
      throw new Error('Unexpected media source');
    if (node.href && node.tag !== 'a') throw new Error('Unexpected link');
    validateProjectContent(node.children || []);
  }
}

/** @returns {Project[]} */
export function getProjects() {
  const directory = path.resolve('content/projects');
  return readdirSync(directory)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => {
      const project = JSON.parse(
        readFileSync(path.join(directory, file), 'utf8'),
      );
      if (
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) ||
        file !== `${project.slug}.json`
      )
        throw new Error('Invalid project slug');
      validateProjectContent(project.content);
      return project;
    });
}
