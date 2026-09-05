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
          <span aria-hidden="true" />A new beginning
        </span>
      </header>
      <section className="hero" id="intro" aria-labelledby="headline">
        <div className="hero-copy">
          <p className="eyebrow">Introducing ELARA</p>
          <h1 id="headline">
            A little curiosity.
            <br />
            An entirely
            <br />
            <em>new horizon.</em>
          </h1>
          <p className="introduction">
            Something new is taking shape.
            <br />
            This is where it begins.
          </p>
          <a className="explore" href="#next">
            Discover what&apos;s next <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
        <div className="orbital-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="sphere" />
          <div className="satellite" />
          <span className="art-coordinate">E / 001</span>
          <span className="art-caption">A world of possibility</span>
          <span className="art-cross">+</span>
        </div>
      </section>
      <section className="next-chapter" id="next" aria-labelledby="next-title">
        <p className="eyebrow">The next chapter</p>
        <div>
          <h2 id="next-title">We&apos;re just getting started.</h2>
          <p>
            ELARA&apos;s story is on its way. Return here for what comes next.
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
        <p>A new horizon awaits.</p>
        <a className="back-top" href="#top">
          Back to top <span aria-hidden="true">&#8593;</span>
        </a>
      </footer>
    </main>
  );
}
