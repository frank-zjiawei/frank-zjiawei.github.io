'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 10, label: 'Publications' },
  { value: 3, label: 'Research Labs' },
  { value: 2, label: 'Awards · Competitions' },
  { value: 4, label: 'Universities' },
];

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, mv, value]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {rounded}
    </motion.span>
  );
}

export function StatsStrip() {
  return (
    <section className="border-y border-hairline">
      <div className="container-prose py-12 md:py-16">
        <p className="section-eyebrow mb-10">Frank as dashboard</p>
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="stat-value">
                <Counter value={s.value} />
                {s.suffix}
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
