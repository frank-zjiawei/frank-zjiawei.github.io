import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-prose flex flex-col items-start py-32 md:py-48">
      <p className="section-eyebrow">404</p>
      <h1 className="mt-4 font-serif text-5xl tracking-tightest text-fg md:text-7xl">
        Not here.
      </h1>
      <p className="mt-6 max-w-md text-base text-fg-muted">
        The page you are looking for does not exist — perhaps it has moved, or
        perhaps it was never a page to begin with.
      </p>
      <Link
        href="/"
        className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-fg underline underline-offset-8 transition-opacity hover:opacity-70"
      >
        Return home
      </Link>
    </section>
  );
}
