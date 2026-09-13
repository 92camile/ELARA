import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '../../components/site-shell';
import { canonicalUrl } from '../../lib/seo.mjs';
import {
  publicationGroups,
  publicationsForGroup,
} from '../../lib/publications.mjs';
import { scholarUrl } from '../../lib/profile';

export const metadata: Metadata = {
  title: 'Publications | Chorong Park',
  description:
    'Selected publications by Chorong Park on human-centered AI, companion robots, aging, accessibility, and design. Research papers, workshops, abstracts, and public writing.',
  alternates: { canonical: canonicalUrl('/publications/') },
};

export default function PublicationsPage() {
  return (
    <div id="top">
      <SiteHeader page="publications" />
      <main id="content" tabIndex={-1}>
        <section
          className="students-intro"
          aria-labelledby="publications-title"
        >
          <div className="container">
            <p className="eyebrow">Chorong Park / Scholarship</p>
            <h1 id="publications-title">Publications</h1>
            <p className="introduction">
              Selected work on human agency, aging, accessibility, and the
              design of emerging technologies. Entries are listed newest first
              within each category, with links to the published record.
            </p>
            <a className="profile-link" href={scholarUrl}>
              Google Scholar profile <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </section>
        <div className="container publication-layout">
          <nav className="publication-nav" aria-label="Publication categories">
            {publicationGroups.map((group) => (
              <a key={group.id} href={`#${group.id}`}>
                {group.title}
              </a>
            ))}
          </nav>
          <div>
            {publicationGroups.map((group) => (
              <section
                className="publication-group"
                key={group.id}
                id={group.id}
                aria-labelledby={`${group.id}-title`}
              >
                <h2 id={`${group.id}-title`}>{group.title}</h2>
                {group.id === 'preprints' && (
                  <p className="portfolio-note">
                    Preprints share work before peer review and should be read
                    in that context.
                  </p>
                )}
                <ol className="publication-list">
                  {publicationsForGroup(group.id).map((paper) => (
                    <li
                      className="publication-item"
                      key={paper.id}
                      id={paper.id}
                    >
                      <div className="publication-meta">
                        <span>{paper.year}</span>
                        <span>{paper.kind}</span>
                        {paper.recognition && (
                          <a
                            className="recognition"
                            href={paper.recognitionUrl}
                          >
                            {paper.recognition}
                          </a>
                        )}
                      </div>
                      <h3>
                        <a href={paper.url}>{paper.title}</a>
                      </h3>
                      <p className="publication-authors">
                        {paper.authors.map((author, index) => (
                          <span key={author}>
                            {index > 0 && ', '}
                            {author === 'Chorong Park' ? (
                              <strong>{author}</strong>
                            ) : (
                              author
                            )}
                          </span>
                        ))}
                      </p>
                      <p className="publication-venue">{paper.venue}</p>
                      <div className="publication-links">
                        <a href={paper.url}>
                          {group.id === 'preprints'
                            ? 'Read preprint'
                            : group.id === 'public-writing'
                              ? 'Read commentary'
                              : 'Publication record'}{' '}
                          <span aria-hidden="true">&#8599;</span>
                        </a>
                        {paper.openUrl && (
                          <a href={paper.openUrl}>
                            Open author manuscript{' '}
                            <span aria-hidden="true">&#8599;</span>
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
            <p className="portfolio-note">
              This is a selected bibliography, not a complete CV. Years refer to
              the publication record; conference dates may differ. Abstracts,
              workshop proposals, preprints, and commentary are identified
              separately.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
