export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#intro">
        Skip to content
      </a>
      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="ELARA home">
          ELARA
          <span className="brand-star" aria-hidden="true">
            +
          </span>
        </a>
        <span className="status">
          <span aria-hidden="true" />Embodied AI. Human agency.
        </span>
      </header>
      <section className="hero" id="intro" aria-labelledby="headline">
        <div className="hero-copy">
          <p className="eyebrow">ELARA Lab</p>
          <h1 id="headline">
            Expanding
            <br />
            human agency.
            <br />
            <em>Across the lifespan.</em>
          </h1>
          <p className="introduction">
            AI should expand human agency across the lifespan, not replace
            human judgment, relationships, or care.
          </p>
          <a className="explore" href="#next">
            Explore our mission <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
        <div className="orbital-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="sphere" />
          <div className="satellite" />
          <span className="art-coordinate">E / 001</span>
          <span className="art-caption">Independence. Well-being. Control.</span>
          <span className="art-cross">+</span>
        </div>
      </section>
      <section className="next-chapter" id="next" aria-labelledby="next-title">
        <p className="eyebrow">Our mission</p>
        <div>
          <h2 id="next-title">Autonomy at the center.</h2>
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
        <span className="chapter-mark" aria-hidden="true">
          01 /
        </span>
      </section>
      <footer>
        <a className="wordmark" href="#top">
          ELARA
        </a>
        <p>Human agency across the lifespan.</p>
        <a className="back-top" href="#top">
          Back to top <span aria-hidden="true">&#8593;</span>
        </a>
      </footer>
    </main>
  );
}
