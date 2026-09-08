'use client';

import { useEffect, useState } from 'react';
import { elfsightPlatformUrl, linkedinProfileUrl } from '../lib/linkedin.mjs';

export function LinkedInFeed({ widgetId }: { widgetId: string }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const scriptId = 'elara-elfsight-platform';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    const onError = () => setFailed(true);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = elfsightPlatformUrl;
      script.async = true;
      script.addEventListener('error', onError);
      document.head.appendChild(script);
    } else {
      script.addEventListener('error', onError);
    }

    // Keep the shared loader across React remounts to avoid duplicate widgets.
    return () => script.removeEventListener('error', onError);
  }, []);

  return (
    <section className="linkedin-feed" aria-labelledby="linkedin-feed-title">
      <div className="linkedin-feed-heading">
        <h3 id="linkedin-feed-title">LinkedIn updates</h3>
        <p>Posts and perspectives from Chorong Park.</p>
      </div>
      <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy="" />
      {failed && (
        <output className="linkedin-feed-notice">
          The feed could not load. You can still read the posts on LinkedIn.
        </output>
      )}
      <a
        className="profile-link linkedin-feed-link"
        href={linkedinProfileUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        View posts on LinkedIn <span aria-hidden="true">&#8599;</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <noscript>
        <p className="linkedin-feed-notice">
          Enable JavaScript to display the feed, or use the LinkedIn link above.
        </p>
      </noscript>
    </section>
  );
}
