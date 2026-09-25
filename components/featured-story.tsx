import { featuredCoverage } from '../lib/site-media.mjs';
import { FeaturedVideo } from './featured-video';

export function FeaturedStory() {
  return (
    <section className="featured-story" aria-labelledby="featured-story-title">
      <div className="featured-story-heading">
        <span className="eyebrow">Featured story</span>
        <span className="featured-publisher">KHOU 11</span>
      </div>
      <FeaturedVideo />
      <div className="featured-story-copy">
        <h2 id="featured-story-title">{featuredCoverage.title}</h2>
        <p>{featuredCoverage.summary}</p>
        <div className="featured-coverage">
          <p>The story also reached audiences beyond Houston.</p>
          <ul aria-label="Additional coverage and short clip">
            {featuredCoverage.related.map((coverage) => (
              <li key={coverage.url}>
                <a
                  href={coverage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${coverage.label}: ${coverage.title} (opens in a new tab)`}
                >
                  {coverage.label} <span aria-hidden="true">&#8599;</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
