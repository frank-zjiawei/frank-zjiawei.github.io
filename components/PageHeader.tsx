interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="container-prose pt-20 pb-10 md:pt-28 md:pb-14">
      <p className="section-eyebrow">{eyebrow}</p>
      <h1 className="mt-5 font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1.02] tracking-tightest text-ink-50">
        {title}
      </h1>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-300 md:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
