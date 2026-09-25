/* oxlint-disable next/no-img-element -- Static hosting serves the existing logo without an image service. */
import { sitePath } from '../lib/site';
import { socialProfiles } from '../lib/site-media.mjs';

export function SiteHeader({
  page,
}: {
  page:
    | 'home'
    | 'students'
    | 'news'
    | 'lab'
    | 'publications'
    | 'projects'
    | 'current-projects'
    | 'volunteer';
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
          <nav className="social-links" aria-label="Social media">
            {socialProfiles.map((profile) => (
              <a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chorong Park on ${profile.label} (opens in a new tab)`}
                title={`${profile.label} @drchorongpark`}
              >
                {profile.id === 'instagram' ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-7.4L5.6 22H2.4l8.2-9.4L.8 2h6.4l4.4 6.7L18.9 2ZM17.9 20h1.7L6.2 3.9H4.4L17.9 20Z" />
                  </svg>
                )}
              </a>
            ))}
          </nav>
          <nav className="primary-nav" aria-label="Main navigation">
            <a
              href={`${home}#intro`}
              aria-current={page === 'home' ? 'page' : undefined}
            >
              About
            </a>
            <a href={`${home}#research`}>Research</a>
            <a
              href={sitePath('/current-projects/')}
              aria-current={page === 'current-projects' ? 'page' : undefined}
            >
              Current projects
            </a>
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
              Students
            </a>
            <a
              href={sitePath('/volunteer/')}
              aria-current={page === 'volunteer' ? 'page' : undefined}
            >
              Volunteer
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
