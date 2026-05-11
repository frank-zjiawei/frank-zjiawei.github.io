export function ConstructionBanner() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-50 w-full border-b border-gold/40 bg-gold/10 text-fg"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-6 py-2 md:px-10">
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 animate-pulse-slow rounded-full bg-gold"
        />
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted md:text-[12px]">
          Portfolio is currently under construction
          <span className="ml-1 text-fg-dim">— check back soon</span>
        </p>
      </div>
    </div>
  );
}
