'use client';

/* oxlint-disable next/no-img-element -- Preserve the supplied photographs on static hosting. */
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions -- The carousel region handles focus and arrow keys bubbling from its native buttons. */
/* oxlint-disable jsx-a11y/prefer-tag-over-role -- ARIA carousel slides use labeled groups, not form fieldsets. */
import { useEffect, useState, useSyncExternalStore } from 'react';
import { workshopPhotos, slideIndex } from '../lib/slideshow.mjs';
import { sitePath } from '../lib/site';

function subscribeToMotion(change: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', change);
  return () => query.removeEventListener('change', change);
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function WorkshopSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    prefersReducedMotion,
    () => true,
  );
  const playing = !paused && !hovered && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      if (!document.hidden)
        setActive((index) => slideIndex(index + 1, workshopPhotos.length));
    }, 6000);
    return () => window.clearInterval(timer);
  }, [playing, active]);

  function show(index: number) {
    setPaused(true);
    setActive(slideIndex(index, workshopPhotos.length));
  }

  return (
    <section
      className="workshop-slideshow"
      aria-label="Community workshop photographs"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          event.target.matches(':focus-visible')
        ) setPaused(true);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          show(active + (event.key === 'ArrowLeft' ? -1 : 1));
        }
      }}
    >
      <div
        className="workshop-slides"
        id="workshop-slides"
        aria-live={playing ? 'off' : 'polite'}
      >
        {workshopPhotos.map((photo, index) => (
          <div
            key={photo.src}
            className={`workshop-slide${index === active ? ' is-active' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${workshopPhotos.length}`}
            aria-hidden={index !== active}
          >
            <img
              src={sitePath(photo.src)}
              alt={photo.alt}
              width={720}
              height={480}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          </div>
        ))}
      </div>
      <div className="slideshow-controls">
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          disabled={reducedMotion}
          aria-controls="workshop-slides"
        >
          {reducedMotion
            ? 'Auto-play off'
            : paused
              ? 'Play slideshow'
              : 'Pause slideshow'}
        </button>
        <div className="slideshow-navigation">
          <button
            type="button"
            onClick={() => show(active - 1)}
            aria-label="Previous photo"
            aria-controls="workshop-slides"
          >
            &#8592;
          </button>
          <span aria-hidden="true">
            {active + 1} / {workshopPhotos.length}
          </span>
          <button
            type="button"
            onClick={() => show(active + 1)}
            aria-label="Next photo"
            aria-controls="workshop-slides"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}
