/* oxlint-disable next/no-img-element -- Article photographs are archived with the static site. */
import { Fragment } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader, SiteFooter } from '../../../components/site-shell';
import { getPublishedStories, storyDate } from '../../../lib/stories.mjs';
import { sitePath } from '../../../lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedStories().map((story) => ({ slug: story.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getPublishedStories().find((item) => item.slug === slug);
  if (!story) notFound();
  return { title: `${story.title} | ELARA Lab`, description: story.summary };
}

export default async function NewsArticle({ params }: Props) {
  const { slug } = await params;
  const story = getPublishedStories().find((item) => item.slug === slug);
  if (!story) notFound();

  return (
    <div id="top">
      <SiteHeader page="news" />
      <main id="content" tabIndex={-1} className="story-page container">
        <a className="profile-link" href={sitePath('/#news')}>
          &#8592; Back to news
        </a>
        <article>
          <header className="story-heading">
            <p className="eyebrow">{story.category}</p>
            <h1>{story.title}</h1>
            <p className="story-summary">{story.summary}</p>
            <p className="story-dates">
              Original LinkedIn post:{' '}
              <time dateTime={story.originalDate}>
                {storyDate(story.originalDate)}
              </time>
              <br />
              Published on ELARA:{' '}
              <time dateTime={story.publishedDate}>
                {storyDate(story.publishedDate)}
              </time>
            </p>
          </header>
          <div className="story-body">
            {story.paragraphs.map((paragraph, index) => (
              <Fragment key={index}>
                <p>
                  {paragraph.text}{' '}
                  <span className="story-citations">
                    {paragraph.sourceIds.map((id) => {
                      const source = story.sources.find(
                        (item) => item.id === id,
                      )!;
                      return (
                        <a
                          key={id}
                          href={`#source-${id}`}
                          aria-label={`Source: ${source.label}`}
                        >
                          [{story.sources.indexOf(source) + 1}]
                        </a>
                      );
                    })}
                  </span>
                </p>
                {story.photos
                  .filter((photo) => photo.afterParagraph === index)
                  .map((photo) => (
                    <figure key={photo.src}>
                      <img
                        src={sitePath(photo.src)}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        loading="lazy"
                      />
                      <figcaption>{photo.caption}</figcaption>
                    </figure>
                  ))}
              </Fragment>
            ))}
            <section className="story-sources" aria-labelledby="sources-title">
              <h2 id="sources-title">Sources</h2>
              <p>
                Adapted from Chorong Park&apos;s LinkedIn post.{' '}
                {story.photos.length > 0
                  ? 'Images are presented in their original order.'
                  : 'The original post is a link-only share with no attached photos.'}
              </p>
              <ol>
                {story.sources.map((source) => (
                  <li key={source.id} id={`source-${source.id}`}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
