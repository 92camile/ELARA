/* oxlint-disable next/no-img-element -- Preserve the universities' original local logo artwork. */
import { academicNetwork } from '../lib/academic-network.mjs';
import { sitePath } from '../lib/site';

export function AcademicNetwork() {
  return (
    <section
      className="academic-network"
      id="academic-network"
      aria-labelledby="academic-network-title"
    >
      <div className="container">
        <div className="academic-network-heading">
          <h2 id="academic-network-title">
            University collaborations &amp; exchange
          </h2>
          <p>
            With university colleagues across active research, developing
            projects, and academic exchange.
          </p>
        </div>
        <ul className="academic-network-grid">
          {academicNetwork.map((school) => (
            <li key={school.id}>
              <a
                href={school.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${school.name}: ${school.relationship}`}
                aria-label={`${school.name}: ${school.relationship} (opens in a new tab)`}
              >
                <img
                  className={school.id === 'nycu' ? 'academic-logo-reversed' : undefined}
                  src={sitePath(school.logo)}
                  alt=""
                  width={school.width}
                  height={school.height}
                  loading="lazy"
                  decoding="async"
                />
                <span>{school.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
