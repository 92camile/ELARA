/* oxlint-disable next/no-img-element -- Concept artwork is included in the static export. */
import {
  elphiArtwork,
  elphiProject,
  elphiResearchNote,
  elphiScenarios,
} from '../lib/elphi.mjs';
import { sitePath } from '../lib/site';

export function ElphiFeature({ context }: { context: 'home' | 'projects' }) {
  const isHome = context === 'home';
  const Element = isHome ? 'section' : 'article';
  const Heading = isHome ? 'h3' : 'h2';
  const ScenarioHeading = isHome ? 'h4' : 'h3';
  const id = isHome ? 'elphi-research' : elphiProject.id;

  return (
    <Element
      className={
        isHome ? 'elphi-feature' : 'current-project-card elphi-feature'
      }
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="elphi-feature-intro">
        <div>
          <p className="eyebrow">Featured research / Meet Elphi</p>
          <Heading id={`${id}-title`}>{elphiProject.title}</Heading>
          <p className="elphi-stage">{elphiProject.stage}</p>
        </div>
        <div className="elphi-feature-copy">
          <p>{elphiProject.summary}</p>
          <p className="elphi-design-question">
            <strong>The design question</strong>
            How can a little encouragement support a healthy routine without
            taking over the decision?
          </p>
        </div>
      </div>

      <figure className="elphi-artwork">
        <img
          src={sitePath(elphiArtwork.src)}
          alt={elphiArtwork.alt}
          width={elphiArtwork.width}
          height={elphiArtwork.height}
          loading="lazy"
          decoding="async"
        />
        <figcaption>{elphiArtwork.caption}</figcaption>
      </figure>

      <div className="elphi-scenarios-heading">
        <p className="eyebrow">Three everyday possibilities</p>
        <p>What an interaction could look like</p>
      </div>
      <ol className="elphi-scenarios" aria-label="Proposed Elphi scenarios">
        {elphiScenarios.map((scenario, index) => (
          <li key={scenario.id} data-scenario={scenario.id}>
            <span className="elphi-scenario-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <ScenarioHeading>{scenario.title}</ScenarioHeading>
            <p className="elphi-scenario-prompt">{scenario.prompt}</p>
            <p>{scenario.description}</p>
          </li>
        ))}
      </ol>

      <div className="elphi-feature-footer">
        <p className="elphi-research-note">{elphiResearchNote}</p>
        {isHome ? (
          <a
            className="button button-secondary"
            href={sitePath('/current-projects/#elphi')}
          >
            Elphi &amp; current projects <span aria-hidden="true">&#8594;</span>
          </a>
        ) : (
          <dl className="elphi-project-details">
            <div>
              <dt>Project lead</dt>
              <dd>Chorong Park</dd>
            </div>
            <div>
              <dt>With</dt>
              <dd>{elphiProject.collaborators}</dd>
            </div>
          </dl>
        )}
      </div>
    </Element>
  );
}
