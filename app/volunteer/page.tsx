/* oxlint-disable next/no-img-element -- Reuse the owner's original community photograph on static hosting. */
import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '../../components/site-shell';
import { canonicalUrl } from '../../lib/seo.mjs';
import { sitePath } from '../../lib/site';
import { workshopPhotos } from '../../lib/slideshow.mjs';

const description =
  'Volunteer with ELARA through monthly technology support and robot engagement at Mamie George Community Center, and joint senior tech-support activities with Purdue University.';

export const metadata: Metadata = {
  title: 'Volunteer | Chorong Park & ELARA Lab',
  description,
  alternates: { canonical: canonicalUrl('/volunteer/') },
  openGraph: {
    title: 'Volunteer | Chorong Park & ELARA Lab',
    description,
    url: canonicalUrl('/volunteer/'),
    type: 'website',
  },
};

export default function VolunteerPage() {
  return (
    <div id="top">
      <SiteHeader page="volunteer" />
      <main id="content" tabIndex={-1}>
        <section className="volunteer-hero" aria-labelledby="volunteer-title">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">ELARA in the community</p>
              <h1 id="volunteer-title">
                Volunteer<span className="gradient-text">.</span>
              </h1>
              <p className="personal-statement">
                Support starts with
                <br />
                showing up.
              </p>
              <p className="introduction">
                We bring students, researchers, and older adults together for
                practical technology support, robot engagement, and shared
                learning. Listening to people is central to the work.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#volunteer-contact">
                  Get involved <span aria-hidden="true">&#8594;</span>
                </a>
                <a className="profile-link" href="#volunteer-programs">
                  Our activities
                </a>
              </div>
            </div>
            <figure className="volunteer-photo">
              <img
                src={sitePath(workshopPhotos[0].src)}
                alt={workshopPhotos[0].alt}
                width={720}
                height={480}
                fetchPriority="high"
              />
              <figcaption>
                Exploring technology together through ELARA community
                engagement.
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          className="container volunteer-programs"
          id="volunteer-programs"
          aria-labelledby="volunteer-programs-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Community connections</p>
            <h2 id="volunteer-programs-title">
              Local support. Shared learning.
            </h2>
          </div>
          <div className="current-project-grid">
            <article
              className="current-project-card volunteer-program"
              id="mamie-george"
              aria-labelledby="mamie-george-title"
            >
              <p className="current-project-stage">Monthly volunteering</p>
              <h3 id="mamie-george-title">Mamie George Community Center</h3>
              <p className="current-project-summary">
                Our monthly visits bring volunteers and older adults together
                for hands-on technology support and robot-engagement activities.
                Sessions make space for everyday questions, exploration, and
                conversation at each person&apos;s pace.
              </p>
              <ul
                className="volunteer-activities"
                aria-label="Monthly activities"
              >
                <li>Practical support with everyday technology</li>
                <li>Robot engagement and shared exploration</li>
                <li>Learning through questions and conversation</li>
              </ul>
            </article>
            <article
              className="current-project-card volunteer-program"
              id="purdue-volunteering"
              aria-labelledby="purdue-volunteering-title"
            >
              <p className="current-project-stage">West Lafayette, Indiana</p>
              <h3 id="purdue-volunteering-title">
                Joint volunteering with Purdue University
              </h3>
              <p className="current-project-summary">
                Working with Dr. Rua Williams at Purdue University, we connect
                ELARA with senior technology-support activities in West
                Lafayette, Indiana. The collaboration also includes an ongoing
                joint study.
              </p>
              <p className="volunteer-advisor">
                Chorong Park serves as an{' '}
                <strong>honorary external advisor</strong> to the Purdue senior
                tech-support group, supporting this community-centered
                collaboration.
              </p>
            </article>
          </div>
        </section>

        <section
          className="volunteer-contact"
          id="volunteer-contact"
          aria-labelledby="volunteer-contact-title"
        >
          <div className="container mission">
            <div className="section-heading">
              <p className="eyebrow">Join the conversation</p>
              <h2 id="volunteer-contact-title">Interested in volunteering?</h2>
            </div>
            <div className="mission-copy">
              <p>
                Contact Chorong Park to ask about upcoming activities and ways
                to contribute. Include a brief introduction and your interests
                in technology support, community engagement, or working with
                older adults.
              </p>
              <a
                className="button button-primary"
                href="mailto:cpark14@uh.edu?subject=ELARA%20volunteer%20interest"
              >
                Email about volunteering <span aria-hidden="true">&#8594;</span>
              </a>
              <p className="volunteer-email">cpark14@uh.edu</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
