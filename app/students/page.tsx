/* oxlint-disable next/no-img-element -- Student-provided photos are served directly on static hosting. */
import type { Metadata } from 'next';
import { canonicalUrl } from '../../lib/seo.mjs';
import { SiteFooter, SiteHeader } from '../../components/site-shell';
import { sitePath } from '../../lib/site';
import { students } from '../../lib/students';

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl('/students/') },
  title: 'Current Students | ELARA Lab',
  description:
    "Meet ELARA Lab's current students and explore their research interests in health, aging, and human-centered technology.",
};

export default function StudentsPage() {
  return (
    <div id="top">
      <SiteHeader page="students" />
      <main id="content" tabIndex={-1}>
        <section className="students-intro" aria-labelledby="students-title">
          <div className="container">
            <p className="eyebrow">People at ELARA</p>
            <h1 id="students-title">
              Current <span className="gradient-text">students</span>
            </h1>
            <p className="introduction">
              Meet the students contributing to ELARA&apos;s research on health,
              aging, and human-centered technology.
            </p>
          </div>
        </section>
        <section
          className="container student-grid"
          aria-label="Student profiles"
        >
          {students.map((student) => (
            <article
              className="student-card"
              key={student.id}
              aria-labelledby={student.id}
            >
              <div
                className={`student-photo${student.photo ? '' : ' student-logo'}`}
              >
                <img
                  src={sitePath(student.photo || '/elara-logo.png')}
                  alt={
                    student.photo
                      ? `Photo provided by ${student.name}`
                      : 'ELARA Lab logo'
                  }
                  width={student.photoWidth || 600}
                  height={student.photoHeight || 600}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="student-details">
                <h2 id={student.id}>{student.name}</h2>
                <p className="student-role">{student.role}</p>
                <p className="student-bio">{student.bio}</p>
                <h3>Research interests</h3>
                <ul className="student-interests">
                  {student.interests.map((interest) => (
                    <li key={interest}>{interest}</li>
                  ))}
                </ul>
                {(student.email || student.linkedin) && (
                  <div className="student-links">
                    {student.email && (
                      <a
                        href={`mailto:${student.email}`}
                        aria-label={`Email ${student.name}: ${student.email}`}
                      >
                        {student.email}
                      </a>
                    )}
                    {student.linkedin && (
                      <a
                        href={student.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${student.name} on LinkedIn (opens in a new tab)`}
                      >
                        LinkedIn <span aria-hidden="true">&#8599;</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
