import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader, SiteFooter } from '../../../components/site-shell';
import { ProjectContent } from '../../../components/project-content';
import { getProjects } from '../../../lib/projects.mjs';
import { canonicalUrl } from '../../../lib/seo.mjs';
import { sitePath } from '../../../lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjects().find((item) => item.slug === slug);
  if (!project) notFound();
  const title = `${project.company}: ${project.subtitle} | Chorong Park`;
  const description = `${project.subtitle}. Chorong Park's original portfolio ${project.kind === 'biography-archive' ? 'biography' : 'case study'}, with original images and project materials.`;
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(`/projects/${slug}/`) },
    openGraph: {
      title,
      description,
      url: canonicalUrl(`/projects/${slug}/`),
      images: [{ url: canonicalUrl(project.images[0].src) }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjects().find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <div id="top">
      <SiteHeader page="projects" />
      <main id="content" tabIndex={-1} className="project-page container">
        <a className="profile-link" href={sitePath('/projects/')}>
          &#8592; All projects
        </a>
        <article>
          <header className="project-heading">
            <p className="eyebrow">
              {project.kind === 'biography-archive'
                ? 'Portfolio archive'
                : 'Industry & design practice'}{' '}
              / Chorong Park
            </p>
            <h1>{project.company}</h1>
            <p className="project-subtitle">{project.subtitle}</p>
          </header>
          <aside
            className="project-archive-note"
            aria-label="About this archive"
          >
            {project.kind === 'biography-archive' ? (
              <p>
                This is my earlier portfolio biography, including my PathAI
                internship. Its original wording and photographs are preserved
                below. Student-era roles refer to that time; see{' '}
                <a href={sitePath('/#about')}>my current biography</a> for my
                present appointment.
              </p>
            ) : (
              <p>
                The original case study is preserved below, with its wording,
                images, and project materials. It describes work from my
                portfolio, not a claim of current company endorsement or a
                shipped product.
              </p>
            )}
          </aside>
          <ProjectContent content={project.content} />
        </article>
        <div className="project-end">
          <a className="button button-secondary" href={sitePath('/projects/')}>
            &#8592; Explore other projects
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
