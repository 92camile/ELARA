/* oxlint-disable next/no-img-element -- Original portfolio images are served by static hosting. */
import { collaborations, profileSources, scholarUrl } from '../lib/profile';
import { sitePath } from '../lib/site';
import { WorkshopSlideshow } from './workshop-slideshow';

export function PersonalIntroduction() {
  return (
    <>
      <section
        className="hero personal-hero"
        id="intro"
        aria-labelledby="headline"
      >
        <div className="container personal-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Researcher. Designer. Community collaborator.
            </p>
            <h1 id="headline">
              Chorong Park<span className="name-degree">Ph.D.</span>
            </h1>
            <p className="personal-statement">
              Technology that supports
              <br />
              <span className="gradient-text">people on their terms.</span>
            </p>
            <p className="introduction">
              I turn intimidating technology into everyday support for aging,
              caregiving, and healthy living. My research brings human-centered
              design to AI, robotics, and digital health, with autonomy,
              relationships, and joy at the heart of the work.
            </p>
            <p className="appointment">
              Assistant Professor &amp; Presidential Frontier Faculty
              <br />
              University of Houston
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#research">
                Explore my research <span aria-hidden="true">&#8594;</span>
              </a>
              <a
                className="button button-secondary"
                href={sitePath('/publications/')}
              >
                Publications
              </a>
            </div>
          </div>
          <figure className="personal-portrait">
            <img
              src={sitePath('/images/profile/chorong-park.jpeg')}
              alt="Chorong Park"
              width={1024}
              height={1024}
              fetchPriority="high"
            />
            <figcaption>
              <span>Human-centered AI &amp; design</span>
              <span>Houston, Texas</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="mission container"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="section-heading">
          <p className="eyebrow">About me</p>
          <h2 id="about-title">
            From lived experience
            <br />
            to thoughtful design.
          </h2>
        </div>
        <div className="mission-copy">
          <p>
            I am an applied, community-engaged researcher at the Gerald D. Hines
            College of Architecture and Design. I work alongside older adults,
            people with disabilities, caregivers, and community partners to
            understand not just whether technology works, but whether it belongs
            in the lives of the people it is meant to support.
          </p>
          <p>
            My background connects visual arts, UX design, and gerontology. I
            earned my Ph.D. in Technology, with a minor in Gerontology, and my
            M.S. in UX Design at Purdue University, following a B.A. in Visual
            Arts at the University of Illinois.
          </p>
          <p>
            More than 500 hours of community technology support with older
            adults helped shape the questions I ask today: Who gets to decide
            what support looks like? How can design build confidence instead of
            dependence? And how can emerging technologies make room for delight?
          </p>
          <a className="profile-link" href={profileSources.university}>
            University profile <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </section>

      <section
        className="research-section"
        id="research"
        aria-labelledby="research-title"
      >
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">My current research</p>
            <h2 id="research-title">Human agency is the through line.</h2>
            <p>
              I connect participatory design, behavioral science, and
              responsible AI to study how technology can fit everyday life.
            </p>
          </div>
          <div className="research-grid">
            <div className="research-area">
              <span className="area-number" aria-hidden="true">
                01
              </span>
              <h3>Trustworthy AI &amp; companion robots</h3>
              <p>
                How can embodied AI respect changing privacy boundaries, support
                informed choices, and strengthen rather than replace human
                relationships?
              </p>
              <a
                className="article-link"
                href={sitePath('/publications/#privacy-one-click')}
              >
                Research on robot privacy{' '}
                <span aria-hidden="true">&#8594;</span>
              </a>
            </div>
            <div className="research-area">
              <span className="area-number" aria-hidden="true">
                02
              </span>
              <h3>Joy, accessibility &amp; aging</h3>
              <p>
                How can AI, AR/VR, and everyday interfaces build on older
                adults&apos; strengths, challenge technological ageism, and
                invite learning and play?
              </p>
              <a
                className="article-link"
                href={sitePath('/publications/#kansei-older-adults')}
              >
                Research on emotional experience{' '}
                <span aria-hidden="true">&#8594;</span>
              </a>
            </div>
            <div className="research-area">
              <span className="area-number" aria-hidden="true">
                03
              </span>
              <h3>Connected care &amp; everyday adoption</h3>
              <p>
                How can digital health and care services help people navigate
                complex decisions while remaining accessible, useful, and
                sustainable in homes and communities?
              </p>
              <a className="article-link" href="#industry">
                See the design foundations{' '}
                <span aria-hidden="true">&#8594;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container industry-section"
        id="industry"
        aria-labelledby="industry-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Industry experience &amp; collaborations</p>
          <h2 id="industry-title">
            Design practice informs
            <br />
            the questions I ask.
          </h2>
          <p>
            My earlier UX projects connect to today&apos;s research through a
            shared concern: helping people feel capable, connected, and in
            control.
          </p>
        </div>
        <div className="project-grid">
          <div className="portfolio-project">
            <img
              src={sitePath('/images/profile/microsoft-wish-board.jpg')}
              alt="Microsoft Care Team Wish Board concept showing family wishes and shared experiences on mobile screens"
              width={1429}
              height={1161}
              loading="lazy"
            />
            <div className="project-copy">
              <p className="eyebrow">Microsoft Care Team / Team lead</p>
              <h3>Creating togetherness in family care</h3>
              <p>
                I co-led a sponsored team and designed the Wish Board concept,
                bringing interviews with caregivers and care recipients into a
                Microsoft Teams experience for sharing wishes and planning
                family moments.
              </p>
              <p className="research-connection">
                <strong>Connection to my research:</strong> Care should make
                space for a person&apos;s own goals and relationships, not only
                tasks and monitoring.
              </p>
              <a
                className="article-link"
                href={sitePath('/projects/microsoft-care-team/')}
              >
                Read the full case study <span aria-hidden="true">&#8594;</span>
              </a>
            </div>
          </div>
          <div className="portfolio-project">
            <img
              src={sitePath('/images/profile/microsoft-career-progression.png')}
              alt="Microsoft Teams career-development concept with skills, saved jobs, and career exploration resources"
              width={1563}
              height={816}
              loading="lazy"
            />
            <div className="project-copy">
              <p className="eyebrow">Microsoft / Lead Project Owner</p>
              <h3>Making the next step easier to see</h3>
              <p>
                I led research, design sprints, prototyping, and testing for a
                Microsoft Teams integration concept to help liberal arts
                students connect their skills and interests with career
                opportunities.
              </p>
              <p className="research-connection">
                <strong>Connection to my research:</strong> Supporting agency
                means making options understandable, while leaving meaningful
                decisions with the person.
              </p>
              <a
                className="article-link"
                href={sitePath('/projects/microsoft-career/')}
              >
                Read the full case study <span aria-hidden="true">&#8594;</span>
              </a>
            </div>
          </div>
        </div>
        <p className="portfolio-note">
          These are portfolio design concepts and industry-academic projects,
          not claims of shipped products or current company endorsements.
          Project roles and employment experience are distinguished below.
        </p>
        <a
          className="button button-secondary project-directory-link"
          href={sitePath('/projects/')}
        >
          View all projects <span aria-hidden="true">&#8594;</span>
        </a>
        <dl className="collaboration-list">
          {collaborations.map((company) => (
            <div className="collaboration-row" key={company.name}>
              <dt>
                <a href={sitePath(company.url)}>
                  {company.name}
                  <span aria-hidden="true"> &#8594;</span>
                </a>
                <span>{company.context}</span>
              </dt>
              <dd>{company.work}</dd>
            </div>
          ))}
        </dl>
        <div className="practice-bridge">
          <h3>From healthcare UX to autonomy-preserving AI</h3>
          <p>
            Projects with AdventHealth, UEGroup, and Cerner explored care
            navigation and patient-provider connection. Those design challenges
            connect to my current focus on accessible support, trust, and
            adoption beyond the hospital. Work with P&amp;G, Dolby, and PepsiCo
            adds experience in understanding everyday choices, social
            connection, and engagement.
          </p>
        </div>
      </section>

      <section
        className="lab-feature"
        id="mission"
        aria-labelledby="lab-feature-title"
      >
        <div className="container hero-grid">
          <div className="section-heading">
            <p className="eyebrow">The lab I lead</p>
            <h2 id="lab-feature-title">ELARA Lab</h2>
            <p>
              My research comes to life through ELARA: a collaborative home for
              autonomy-preserving embodied AI, participatory research, and
              design for aging and care.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={sitePath('/lab/')}>
                Meet ELARA <span aria-hidden="true">&#8594;</span>
              </a>
              <a
                className="button button-secondary"
                href={sitePath('/students/')}
              >
                Students
              </a>
            </div>
            <a className="article-link" href={scholarUrl}>
              Find my work on Google Scholar{' '}
              <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
          <WorkshopSlideshow />
        </div>
      </section>
    </>
  );
}
