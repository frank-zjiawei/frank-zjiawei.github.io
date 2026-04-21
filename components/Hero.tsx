'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ROLES = [
  'Learning Designer',
  'AI Engineer',
  'Researcher',
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing');

  useEffect(() => {
    const target = ROLES[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (display.length < target.length) {
        timeout = setTimeout(() => setDisplay(target.slice(0, display.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setPhase('holding'), 1600);
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(target.slice(0, display.length - 1)), 32);
      } else {
        setIndex((i) => (i + 1) % ROLES.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, index]);

  return (
    <section className="container-prose pt-24 pb-12 md:pt-32 md:pb-16">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-eyebrow"
      >
        Portfolio · 2026
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08 }}
        className="mt-6 font-serif text-[clamp(2.75rem,8vw,6rem)] font-light leading-[0.95] tracking-tightest text-fg"
      >
        Frank Zhang
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 font-mono text-sm text-fg-muted md:text-base"
      >
        <span className="text-fg-dim">I am a </span>
        <span className="text-fg">{display}</span>
        <span className="ml-0.5 inline-block h-[1em] w-[1px] animate-pulse-slow bg-fg-muted align-middle" />
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted md:text-lg"
      >
        Currently at Harvard Graduate School of Education and cross-registered at
        MIT Media Lab. Working at the intersection of AI, learning design, and
        business analytics — with a decade of curiosity about how people build
        meaningful things.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim"
      >
        <span>Harvard GSE</span>
        <span className="text-hairline">/</span>
        <span>MIT Media Lab</span>
        <span className="text-hairline">/</span>
        <span>UBC MBAN</span>
        <span className="text-hairline">/</span>
        <span>U of Toronto</span>
      </motion.div>
    </section>
  );
}
