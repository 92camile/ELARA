/* oxlint-disable next/no-img-element -- Static hosting serves the existing logo without an image service. */
import { newsArticles } from '../lib/news';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const logo = `${basePath}/elara-logo.png`;

export default function Home() {
  return (
    <div id="top">
      <a className="skip-link" href="#intro">
        Skip to content
      </a>
      <header className="masthead">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="ELARA Lab home">
            <img src={logo} width={64} height={64} alt="" />
            <span>
              <strong>ELARA Lab</strong>
              <span className="brand-description">
                Empathetic Lifespan AI &amp; Robotics for Aging
              </span>
            </span>
          </a>
          <nav className="primary-nav" aria-label="Main navigation">
            <a href="#intro">Home</a>
            <a href="#mission">Our mission</a>
            <a className="news-nav" href="#news">
              News
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="intro" aria-labelledby="headline">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow pill">
                Human-centered AI, robotics, and aging
              </p>
              <h1 id="headline">
                Expanding human agency.
                <br />
                <span className="gradient-text">Across the lifespan.</span>
              </h1>
              <p className="introduction">
                AI should expand human agency across the lifespan, not replace
                human judgment, relationships, or care.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#mission">
                  Explore our mission <span aria-hidden="true">&#8594;</span>
                </a>
                <a className="button button-secondary" href="#news">
                  Latest news
                </a>
              </div>
              <ul className="research-tags" aria-label="Research approach">
                <li>Participatory design</li>
                <li>Behavioral science</li>
                <li>Safe generative AI</li>
              </ul>
            </div>
            <div className="brand-panel">
              <div className="logo-display">
                <img
                  src={logo}
                  alt="ELARA Lab: Empathetic Lifespan AI and Robotics for Aging"
                  width={600}
                  height={600}
                  fetchPriority="high"
                />
              </div>
              <h2>Autonomy at the center.</h2>
              <p>
                Supporting independence, well-being, and control for older
                adults and people living with chronic conditions.
              </p>
            </div>
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
          </div>
        </section>

        <section
          className="news-section"
          id="news"
          aria-labelledby="news-title"
        >
          <div className="container">
            <div className="news-heading">
              <div className="section-heading">
                <p className="eyebrow">From the lab &amp; beyond</p>
                <h2 id="news-title">News &amp; stories</h2>
                <p>
                  Research and perspectives on technology, aging, and human
                  agency.
                </p>
              </div>
              <a
                className="profile-link"
                href="https://www.linkedin.com/in/cparkphd"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chorong Park on LinkedIn <span aria-hidden="true">&#8599;</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <div className="news-grid">
              {newsArticles.map((article) => (
                <article
                  className="news-card"
                  key={article.id}
                  aria-labelledby={article.id}
                >
                  <div className="card-meta">
                    <span className="category">{article.category}</span>
                    <time dateTime={article.date}>{article.dateLabel}</time>
                  </div>
                  <p className="publisher">{article.publisher}</p>
                  <h3 id={article.id}>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </h3>
                  <p className="article-summary">{article.summary}</p>
                  <a
                    className="article-link"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read ${article.title} at ${article.publisher} (opens in a new tab)`}
                  >
                    Read article <span aria-hidden="true">&#8599;</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="container">
        <a className="brand footer-brand" href="#top" aria-label="ELARA Lab home">
          <img src={logo} width={48} height={48} alt="" />
          <span>
            <strong>ELARA Lab</strong>
            <span className="brand-description">
              Human agency across the lifespan.
            </span>
          </span>
        </a>
        <a className="back-top" href="#top">
          Back to top <span aria-hidden="true">&#8593;</span>
        </a>
      </footer>
    </div>
  );
}
