import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../../components/site-shell';
import {
  currentResearchProjects,
  proposedResearchProjects,
  projectsReviewedOn,
  researchProjectGroups,
} from '../../lib/current-projects.mjs';
import { canonicalUrl } from '../../lib/seo.mjs';
import { sitePath } from '../../lib/site';

const description =
  "Explore Chorong Park's current research in companion robotics, trustworthy AI, connected care, and community-led design, with proposed work clearly distinguished.";

export const metadata: Metadata = {
  title: 'Current Projects | Chorong Park & ELARA Lab',
  description,
  alternates: { canonical: canonicalUrl('/current-projects/') },
  openGraph: {
    title: 'Current Projects | Chorong Park & ELARA Lab',
    description,
    url: canonicalUrl('/current-projects/'),
    type: 'website',
  },
};

export default function CurrentProjectsPage() {
  return (
    <div id="top">
      <SiteHeader page="current-projects" />
      <main id="content" tabIndex={-1}>
        <section
          className="current-projects-intro"
          aria-labelledby="projects-title"
        >
          <div className="container">
            <p className="eyebrow">Chorong Park / ELARA Lab & collaborators</p>
            <h1 id="projects-title">
              Current <span className="gradient-text">projects.</span>
            </h1>
            <p className="personal-statement">
              Many forms of technology.
              <br />
              One commitment to human agency.
            </p>
            <p className="introduction">
              I work with older adults, care communities, and interdisciplinary
              collaborators to explore what useful, understandable, and
              people-centered assistance can look like in everyday life.
            </p>
            <p className="current-projects-context">
              Research collaborations, community initiatives, and emerging
              directions from my CV. Each entry identifies my role and the
              project&apos;s stage; proposed work is listed separately below.
            </p>
            <nav className="research-jump-links" aria-label="Project topics">
              {researchProjectGroups.map((group) => (
                <a key={group.id} href={`#${group.id}`}>
                  {group.title}
                </a>
              ))}
              <a href="#proposed-projects">Proposed work</a>
            </nav>
          </div>
        </section>

        <div className="container current-projects-body">
          {researchProjectGroups.map((group, groupIndex) => (
            <section
              className="current-project-group"
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-title`}
            >
              <header className="current-project-group-heading">
                <span className="area-number" aria-hidden="true">
                  {String(groupIndex + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 id={`${group.id}-title`}>{group.title}</h2>
                  <p>{group.description}</p>
                </div>
              </header>
              <div className="current-project-grid">
                {currentResearchProjects
                  .filter((project) => project.group === group.id)
                  .map((project) => (
                    <article
                      className="current-project-card"
                      key={project.id}
                      id={project.id}
                      aria-labelledby={`${project.id}-title`}
                    >
                      <p className="current-project-stage">{project.stage}</p>
                      <h3 id={`${project.id}-title`}>{project.title}</h3>
                      <p className="current-project-summary">
                        {project.summary}
                      </p>
                      <dl className="current-project-details">
                        <div>
                          <dt>My role</dt>
                          <dd>{project.role}</dd>
                        </div>
                        <div>
                          <dt>With</dt>
                          <dd>{project.collaborators}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
              </div>
            </section>
          ))}

          <section
            className="proposed-project-section"
            id="proposed-projects"
            aria-labelledby="proposed-title"
          >
            <p className="eyebrow">Looking ahead</p>
            <h2 id="proposed-title">Proposed work & emerging directions</h2>
            <p className="current-projects-context">
              These concepts and applications are not funded awards or completed
              studies. Their stages reflect the supplied CV, not a new funding
              decision or confirmation that a pilot has begun.
            </p>
            <details className="proposed-projects">
              <summary>
                Explore {proposedResearchProjects.length} proposed projects
              </summary>
              <div className="proposed-project-list">
                {proposedResearchProjects.map((project) => (
                  <article
                    className="proposed-project"
                    key={project.id}
                    id={project.id}
                    aria-labelledby={`${project.id}-title`}
                  >
                    <p className="current-project-stage">
                      {project.stage} / {project.role}
                    </p>
                    <h3 id={`${project.id}-title`}>{project.title}</h3>
                    <p>{project.summary}</p>
                  </article>
                ))}
              </div>
            </details>
          </section>

          <aside
            className="current-projects-note"
            aria-label="About this project list"
          >
            <p>
              Summarized from Chorong Park&apos;s CV, reviewed{' '}
              <time dateTime={projectsReviewedOn}>September 20, 2026</time>.
              Research aims and prototype concepts are not claims of established
              clinical effectiveness.
            </p>
            <div className="hero-actions">
              <a className="profile-link" href={sitePath('/publications/')}>
                Read publications <span aria-hidden="true">&#8594;</span>
              </a>
              <a className="profile-link" href={sitePath('/projects/')}>
                Earlier industry case studies{' '}
                <span aria-hidden="true">&#8594;</span>
              </a>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
