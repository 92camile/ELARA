/* oxlint-disable next/no-img-element -- The directory uses original archived project artwork. */
import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '../../components/site-shell';
import { getProjects } from '../../lib/projects.mjs';
import { canonicalUrl } from '../../lib/seo.mjs';
import { sitePath } from '../../lib/site';

export const metadata: Metadata = {
  title: 'All Industry Projects | Chorong Park',
  description:
    "Explore Chorong Park's full case studies for Microsoft, Dolby, P&G, PepsiCo, AdventHealth, Cerner, and Beijing Normal University/Purdue, plus the PathAI portfolio archive.",
  alternates: { canonical: canonicalUrl('/projects/') },
};

export default function ProjectsPage() {
  const projects = getProjects().sort((a, b) => {
    const rank = (project: typeof a) =>
      project.kind === 'biography-archive'
        ? 2
        : project.company.startsWith('Microsoft')
          ? 0
          : 1;
    return rank(a) - rank(b) || a.company.localeCompare(b.company);
  });
  return (
    <div id="top">
      <SiteHeader page="projects" />
      <main id="content" tabIndex={-1} className="container project-directory">
        <a className="profile-link" href={sitePath('/#industry')}>
          &#8592; Back to my research & practice
        </a>
        <header className="project-heading">
          <p className="eyebrow">
            Industry & design practice / {projects.length} portfolio pages
          </p>
          <h1>All projects.</h1>
          <p className="project-subtitle">
            Explore the work behind the summaries.
          </p>
        </header>
        <p className="project-directory-intro">
          Every project from my original Industry collection is here, alongside
          Microsoft Care Team and my PathAI portfolio background. Open any card
          to read the original text, view all its images, and access its project
          materials without visiting Squarespace.
        </p>
        <ul
          className="project-directory-grid"
          aria-label="All industry projects and portfolio background"
        >
          {projects.map((project) => (
            <li key={project.slug}>
              <a
                className="project-directory-card"
                href={sitePath(`/projects/${project.slug}/`)}
                aria-labelledby={`${project.slug}-company ${project.slug}-title`}
              >
                <div className="project-directory-visual">
                  <img
                    src={sitePath(project.images[0].src)}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="project-directory-copy">
                  <p className="eyebrow">
                    {project.kind === 'biography-archive'
                      ? 'Archived biography & internship'
                      : 'Full case study'}
                  </p>
                  <h2 id={`${project.slug}-company`}>{project.company}</h2>
                  <p id={`${project.slug}-title`}>{project.subtitle}</p>
                  <span className="article-link">
                    {project.kind === 'biography-archive'
                      ? 'Read portfolio background'
                      : 'Read full case study'}{' '}
                    <span aria-hidden="true">&#8594;</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
