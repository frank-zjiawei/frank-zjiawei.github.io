'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { ProjectEntry } from '@/components/ProjectEntry';
import { projects, type Project } from '@/content/projects';

type Tab = 'professional' | 'project';

const TABS: { id: Tab; label: string }[] = [
  { id: 'professional', label: 'Professional Experience' },
  { id: 'project', label: 'My Projects' },
];

export function ExperienceTabs() {
  const [tab, setTab] = useState<Tab>('professional');

  const items = useMemo(
    () => projects.filter((p: Project) => p.category === tab),
    [tab],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Experience categories"
        className="flex flex-wrap gap-2 border-b border-hairline pb-4"
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={clsx(
                'rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors',
                active
                  ? 'border-fg bg-fg text-surface'
                  : 'border-hairline text-fg-muted hover:border-fg-muted hover:text-fg',
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="pt-2">
        {items.map((p) => (
          <ProjectEntry key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
