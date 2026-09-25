'use client';

/* oxlint-disable next/no-img-element -- YouTube supplies this preview image for its original video. */
import { useEffect, useRef, useState } from 'react';
import { featuredCoverage } from '../lib/site-media.mjs';

export function FeaturedVideo() {
  const [playing, setPlaying] = useState(false);
  const playButton = useRef<HTMLButtonElement>(null);
  const player = useRef<HTMLIFrameElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (playing) player.current?.focus();
    else if (hasPlayed.current) playButton.current?.focus();
  }, [playing]);

  return (
    <div className="featured-video">
      <div className="featured-video-frame">
        {playing ? (
          <iframe
            ref={player}
            src={featuredCoverage.embedUrl}
            title={`KHOU 11: ${featuredCoverage.videoTitle}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            ref={playButton}
            className="featured-video-play"
            type="button"
            aria-label="Play the KHOU 11 featured story"
            onClick={() => {
              hasPlayed.current = true;
              setPlaying(true);
            }}
          >
            <img
              src={featuredCoverage.poster}
              alt=""
              width={480}
              height={360}
              fetchPriority="high"
            />
            <span className="featured-play-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                fill="currentColor"
              >
                <path d="m9 5 11 7-11 7V5Z" />
              </svg>
            </span>
            <span className="featured-play-label">Watch the KHOU 11 story</span>
          </button>
        )}
      </div>
      <div className="featured-video-actions">
        <a
          href={featuredCoverage.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on YouTube <span aria-hidden="true">&#8599;</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        {playing && (
          <button type="button" onClick={() => setPlaying(false)}>
            Close video
          </button>
        )}
      </div>
    </div>
  );
}
