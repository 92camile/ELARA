/* oxlint-disable next/no-img-element -- Original case-study images retain their full resolution and animation. */
import { createElement, Fragment, type ReactNode } from 'react';
import type { ProjectNode } from '../lib/projects.mjs';
import { sitePath } from '../lib/site';

function renderNode(node: ProjectNode, index: number): ReactNode {
  if (typeof node === 'string') return node;
  if (node.tag === 'img') {
    return (
      <a
        className="project-image-link"
        href={sitePath(node.src!)}
        key={index}
        title="View original image at full size"
      >
        <img
          src={sitePath(node.src!)}
          alt={node.alt}
          width={node.width}
          height={node.height}
          loading="lazy"
          decoding="async"
        />
      </a>
    );
  }
  if (node.tag === 'iframe') {
    return (
      <div className="project-video" key={index}>
        <iframe
          src={node.src}
          title={node.title}
          loading="lazy"
          allow="fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <a href={node.src}>Watch the original walkthrough on YouTube</a>
      </div>
    );
  }
  return createElement(
    node.tag,
    {
      key: index,
      ...(node.tag === 'a' ? { href: node.href } : {}),
      ...(node.tag === 'div' ? { className: 'project-block' } : {}),
    },
    ...(node.children || []).map(renderNode),
  );
}

export function ProjectContent({ content }: { content: ProjectNode[] }) {
  return (
    <div className="project-content" id="original-project-content">
      {content.map((node, index) => (
        <Fragment key={index}>{renderNode(node, index)}</Fragment>
      ))}
    </div>
  );
}
