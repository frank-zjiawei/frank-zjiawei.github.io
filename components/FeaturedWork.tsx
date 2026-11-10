import Link from 'next/link';

const FEATURED = [
  {
    kind: 'Paper',
    title: 'ActiveVideoAgent',
    note: 'IEEE IVMSP 2026 · Best Paper Runner-Up',
    href: '/research#paper-2',
  },
  {
    kind: 'Paper',
    title: 'Multi-Agent AVI Assessment',
    note: 'ACM Multimedia 2026 · First Prize',
    href: '/research#paper-1',
  },
  {
    kind: 'Now',
    title: 'Harvard Business School Foundry',
    note: 'Business Analytics & BD',
    href: '/experience#hbs-foundry',
  },
];

export function FeaturedWork() {
  return (
    <section className="border-y border-hairline">
      <div className="container-prose py-14 md:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Featured</p>
            <h2 className="mt-3 font-serif text-2xl text-fg md:text-3xl">
              Selected work
            </h2>
          </div>
          <Link
            href="/research/"
            className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted transition-colors hover:text-fg md:inline"
          >
            All papers ↗
          </Link>
        </div>

        <ul className="divide-y divide-hairline border-t border-hairline">
          {FEATURED.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex flex-col gap-1 py-5 transition-colors md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
                    {item.kind}
                  </p>
                  <p className="mt-1 font-serif text-lg text-fg transition-colors group-hover:text-fg md:text-xl">
                    {item.title}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-[11px] tracking-[0.04em] text-fg-muted md:text-right">
                  {item.note}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
