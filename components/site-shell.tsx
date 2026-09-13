/* oxlint-disable next/no-img-element -- Static hosting serves the existing logo without an image service. */
import { sitePath } from '../lib/site';

export function SiteHeader({
  page,
}: {
  page: 'home' | 'students' | 'news' | 'lab' | 'publications' | 'projects';
}) {
  const home = page === 'home' ? '' : sitePath('/');

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="masthead">
        <div className="header-inner">
          <a
            className="brand personal-brand"
            href={sitePath('/')}
            aria-label="Chorong Park home"
          >
            <span>
              <strong>
                Chorong Park<span className="brand-dot">.</span>
              </strong>
              <span className="brand-description">
                Human-centered AI, aging &amp; care
              </span>
            </span>
          </a>
          <nav className="primary-nav" aria-label="Main navigation">
            <a
              href={`${home}#intro`}
              aria-current={page === 'home' ? 'page' : undefined}
            >
              About
            </a>
            <a href={`${home}#research`}>Research</a>
            <a
              href={`${home}#industry`}
              aria-current={page === 'projects' ? 'location' : undefined}
            >
              Industry
            </a>
            <a
              href={sitePath('/publications/')}
              aria-current={page === 'publications' ? 'page' : undefined}
            >
              Publications
            </a>
            <a
              href={sitePath('/lab/')}
              aria-current={page === 'lab' ? 'page' : undefined}
            >
              ELARA Lab
            </a>
            <a
              href={`${home}#news`}
              aria-current={page === 'news' ? 'page' : undefined}
            >
              News
            </a>
            <a
              href={sitePath('/students/')}
              aria-current={page === 'students' ? 'page' : undefined}
            >
              Current students
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="container">
      <a
        className="brand footer-brand"
        href={sitePath('/lab/')}
        aria-label="Visit ELARA Lab"
      >
        <img src={sitePath('/elara-logo.png')} width={48} height={48} alt="" />
        <span>
          <strong>ELARA Lab</strong>
          <span className="brand-description">
            Led by Chorong Park. Human agency across the lifespan.
          </span>
        </span>
      </a>
      <a className="back-top" href="#top">
        Back to top <span aria-hidden="true">&#8593;</span>
      </a>
    </footer>
  );
}
