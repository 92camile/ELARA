/* oxlint-disable next/no-img-element -- Static hosting serves the existing logo without an image service. */
import { sitePath } from '../lib/site';

export function SiteHeader({ page }: { page: 'home' | 'students' }) {
  const home = page === 'home' ? '' : sitePath('/');

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <header className="masthead">
        <div className="header-inner">
          <a className="brand" href={sitePath('/')} aria-label="ELARA Lab home">
            <img
              src={sitePath('/elara-logo.png')}
              width={64}
              height={64}
              alt=""
            />
            <span>
              <strong>ELARA Lab</strong>
              <span className="brand-description">
                Empathetic Lifespan AI &amp; Robotics for Aging
              </span>
            </span>
          </a>
          <nav className="primary-nav" aria-label="Main navigation">
            <a
              href={`${home}#intro`}
              aria-current={page === 'home' ? 'page' : undefined}
            >
              Home
            </a>
            <a href={`${home}#mission`}>Our mission</a>
            <a href={`${home}#news`}>News</a>
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
        href={sitePath('/')}
        aria-label="ELARA Lab home"
      >
        <img src={sitePath('/elara-logo.png')} width={48} height={48} alt="" />
        <span>
          <strong>ELARA Lab</strong>
          <span className="brand-description">
            Human agency across the lifespan.
          </span>
        </span>
      </a>
      <a className="back-top" href="#top">
        Back to top <span aria-hidden="true">&#8593;</span>
      </a>
    </footer>
  );
}
