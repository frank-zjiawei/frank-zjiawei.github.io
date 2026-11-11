'use client';

import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { ProjectEntry } from '@/components/ProjectEntry';
import {
  CATEGORY_LABEL,
  projects,
  type ExperienceCategory,
} from '@/content/projects';

const TABS: ExperienceCategory[] = ['research', 'professional', 'leadership'];

/** Which tab holds the entry a URL hash points at (e.g. #hbs-foundry)? */
function categoryForHash(hash: string): ExperienceCategory | null {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  return projects.find((p) => p.id === id)?.category ?? null;
}

export function ExperienceTabs() {
  const [tab, setTab] = useState<ExperienceCategory>('research');

  // Deep links from the site map land on entries in any tab, so the tab has
  // to follow the hash before the browser can scroll to the entry.
  useEffect(() => {
    const follow = () => {
      const category = categoryForHash(window.location.hash);
      if (!category) return;
      setTab(category);
      const id = decodeURIComponent(window.location.hash.slice(1));
      // wait for the tab's entries to render
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' });
      });
    };
    follow();
    window.addEventListener('hashchange', follow);
    return () => window.removeEventListener('hashchange', follow);
  }, []);

  const items = useMemo(() => projects.filter((p) => p.category === tab), [tab]);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Experience categories"
        className="flex flex-wrap gap-2 border-b border-hairline pb-4"
      >
        {TABS.map((id) => {
          const active = tab === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={active}
              aria-controls="experience-panel"
              onClick={() => setTab(id)}
              className={clsx(
                'rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors',
                active
                  ? 'border-fg bg-fg text-surface'
                  : 'border-hairline text-fg-muted hover:border-fg-muted hover:text-fg',
              )}
            >
              {CATEGORY_LABEL[id]}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="experience-panel"
        aria-labelledby={`tab-${tab}`}
        className="pt-2"
      >
        {items.map((p) => (
          <ProjectEntry key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
