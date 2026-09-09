/* oxlint-disable next/no-img-element -- Story photographs are archived with the static site. */
import type { Metadata } from 'next';
import { canonicalUrl } from '../lib/seo.mjs';
import { newsArticles } from '../lib/news';
import { getPublishedStories, storyDate } from '../lib/stories.mjs';
import { sitePath } from '../lib/site';
import { SiteHeader, SiteFooter } from '../components/site-shell';
import { LinkedInFeed } from '../components/linkedin-feed';
import { WorkshopSlideshow } from '../components/workshop-slideshow';
import { getLinkedInWidgetId, linkedinProfileUrl } from '../lib/linkedin.mjs';

const linkedInWidgetId = getLinkedInWidgetId(
  process.env.NEXT_PUBLIC_ELFSIGHT_LINKEDIN_WIDGET_ID,
);

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl('/') },
};

export default function Home() {
  return (
    <div id="top">
      <SiteHeader page="home" />

      <main id="content" tabIndex={-1}>
        <section className="hero" id="intro" aria-labelledby="headline">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow pill">
                Human-centered AI, robotics, and aging
              </p>
              <h1 id="headline">
                Expanding human agency.
                <br />
                <span className="gradient-text">Across the lifespan.</span>
              </h1>
              <p className="introduction">
                AI should expand human agency across the lifespan, not replace
                human judgment, relationships, or care.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#mission">
                  Explore our mission <span aria-hidden="true">&#8594;</span>
                </a>
                <a className="button button-secondary" href="#news">
                  Latest news
                </a>
              </div>
              <ul className="research-tags" aria-label="Research approach">
                <li>Participatory design</li>
                <li>Behavioral science</li>
                <li>Safe generative AI</li>
              </ul>
            </div>
            <WorkshopSlideshow />
          </div>
        </section>

        <section
          className="mission container"
          id="mission"
          aria-labelledby="mission-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Our mission</p>
            <h2 id="mission-title">
              From human agency
              <br />
              to everyday impact.
            </h2>
          </div>
          <div className="mission-copy">
            <p>
              ELARA Lab develops and evaluates autonomy-preserving embodied AI
              systems that help older adults and people living with chronic
              conditions maintain independence, well-being, and control.
            </p>
            <p>
              We integrate participatory design, behavioral science, and safe
              generative AI to create clinically credible, implementation-ready
              interventions with viable pathways to adoption, reimbursement, and
              sustainable scale across diverse health and care systems.
            </p>
          </div>
        </section>

        <section
          className="news-section"
          id="news"
          aria-labelledby="news-title"
        >
          <div className="container">
            <div className="news-heading">
              <div className="section-heading">
                <p className="eyebrow">From the lab &amp; beyond</p>
                <h2 id="news-title">News &amp; stories</h2>
                <p>
                  Research and perspectives on technology, aging, and human
                  agency.
                </p>
              </div>
              <a
                className="profile-link"
                href={linkedinProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chorong Park on LinkedIn <span aria-hidden="true">&#8599;</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <h3 className="news-group-heading" id="lab-stories-title">
              Lab stories
            </h3>
            <div
              className="news-grid lab-stories"
              aria-labelledby="lab-stories-title"
            >
              {getPublishedStories().map((story) => (
                <article
                  className="news-card story-card"
                  key={story.slug}
                  aria-labelledby={story.slug}
                >
                  {story.photos[0] && (
                    <img
                      className="story-card-image"
                      src={sitePath(story.photos[0].src)}
                      alt={story.photos[0].alt}
                      width={story.photos[0].width}
                      height={story.photos[0].height}
                      loading="lazy"
                    />
                  )}
                  <div className="card-meta">
                    <span className="category">{story.category}</span>
                    <time dateTime={story.originalDate}>
                      {storyDate(story.originalDate)}
                    </time>
                  </div>
                  <p className="publisher">ELARA Lab</p>
                  <h3 id={story.slug}>
                    <a href={sitePath(`/news/${story.slug}/`)}>{story.title}</a>
                  </h3>
                  <p className="article-summary">{story.summary}</p>
                  <a
                    className="article-link"
                    href={sitePath(`/news/${story.slug}/`)}
                    aria-label={`Read ${story.title}`}
                  >
                    Read story <span aria-hidden="true">&#8594;</span>
                  </a>
                </article>
              ))}
            </div>
            {linkedInWidgetId && <LinkedInFeed widgetId={linkedInWidgetId} />}
            <h3 className="news-group-heading">In the news</h3>
            <div className="news-grid">
              {newsArticles.map((article) => (
                <article
                  className="news-card"
                  key={article.id}
                  aria-labelledby={article.id}
                >
                  <div className="card-meta">
                    <span className="category">{article.category}</span>
                    <time dateTime={article.date}>{article.dateLabel}</time>
                  </div>
                  <p className="publisher">{article.publisher}</p>
                  <h3 id={article.id}>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </h3>
                  <p className="article-summary">{article.summary}</p>
                  <a
                    className="article-link"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read ${article.title} at ${article.publisher} (opens in a new tab)`}
                  >
                    Read article <span aria-hidden="true">&#8599;</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
