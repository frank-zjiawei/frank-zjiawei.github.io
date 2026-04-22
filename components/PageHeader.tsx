interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="container-prose pt-20 pb-10 md:pt-28 md:pb-14">
      <p className="section-eyebrow">{eyebrow}</p>
      <h1 className="mt-5 font-serif text-[clamp(2rem,5.5vw,3.75rem)] font-normal leading-[1.12] tracking-tight text-fg">
        {title}
      </h1>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
