import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '../../components/site-shell';
import { WorkshopSlideshow } from '../../components/workshop-slideshow';
import { canonicalUrl } from '../../lib/seo.mjs';
import { sitePath } from '../../lib/site';

export const metadata: Metadata = {
  title: 'ELARA Lab | Chorong Park',
  description:
    'Led by Chorong Park, ELARA Lab develops autonomy-preserving embodied AI for older adults and people living with chronic conditions.',
  alternates: { canonical: canonicalUrl('/lab/') },
};

export default function LabPage() {
  return (
    <div id="top">
      <SiteHeader page="lab" />
      <main id="content" tabIndex={-1}>
        <section className="hero" aria-labelledby="lab-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                Led by Chorong Park / University of Houston
              </p>
              <h1 id="lab-title">ELARA Lab</h1>
              <p className="personal-statement">
                Human agency.
                <br />
                <span className="gradient-text">Across the lifespan.</span>
              </p>
              <p className="introduction">
                AI should expand human agency across the lifespan, not replace
                human judgment, relationships, or care.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href={sitePath('/students/')}
                >
                  Meet our students <span aria-hidden="true">&#8594;</span>
                </a>
                <a
                  className="button button-secondary"
                  href={sitePath('/#news')}
                >
                  Latest news
                </a>
              </div>
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
            <p>
              These are the goals that guide our research and evaluation, not
              claims of established clinical effectiveness.
            </p>
          </div>
        </section>
        <section className="research-section">
          <div className="container mission">
            <div className="section-heading">
              <p className="eyebrow">A collaborative research home</p>
              <h2>
                Built with people,
                <br />
                not just for them.
              </h2>
            </div>
            <div className="mission-copy">
              <p>
                Through community engagement, co-design, and interdisciplinary
                collaboration, we investigate how emerging technologies can
                support everyday life while keeping people in control.
              </p>
              <div className="hero-actions">
                <a className="profile-link" href={sitePath('/volunteer/')}>
                  Volunteer with ELARA <span aria-hidden="true">&#8594;</span>
                </a>
                <a
                  className="profile-link"
                  href={sitePath('/current-projects/')}
                >
                  Explore current projects{' '}
                  <span aria-hidden="true">&#8594;</span>
                </a>
                <a className="profile-link" href={sitePath('/#research')}>
                  Chorong&apos;s research focus{' '}
                  <span aria-hidden="true">&#8594;</span>
                </a>
                <a className="profile-link" href={sitePath('/publications/')}>
                  Publications <span aria-hidden="true">&#8594;</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
