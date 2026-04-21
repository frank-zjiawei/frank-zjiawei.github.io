import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-hairline py-10">
      <div className="container-prose flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <p className="font-serif text-lg text-fg">Frank Zhang</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            Cambridge, MA · {new Date().getFullYear()}
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-fg-muted">
          <li>
            <a
              href="mailto:jiaweizhang@gse.harvard.edu"
              className="transition-colors hover:text-fg"
            >
              Email
            </a>
          </li>
          <li>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <Link href="/about" className="transition-colors hover:text-fg">
              CV
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
