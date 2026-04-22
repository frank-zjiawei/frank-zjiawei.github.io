const EMAIL = 'frankwei312@gmail.com';
const INSTAGRAM = 'https://www.instagram.com/frankjiaweizhang/';
const LINKEDIN = 'https://www.linkedin.com/in/frank-zhang-7a8944198/';
const GITHUB = 'https://github.com/frank-zjiawei';

export function Footer() {
  return (
    <footer className="border-t border-hairline py-10">
      <div className="container-prose flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <p className="font-serif text-lg text-fg">Jiawei Zhang</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            Cambridge, MA · {new Date().getFullYear()}
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-fg-muted">
          <li>
            <a
              href={`mailto:${EMAIL}`}
              className="transition-colors hover:text-fg"
            >
              Email
            </a>
          </li>
          <li>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-fg"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="/cv/Jiawei_Zhang_CV_EN.pdf"
              download
              className="transition-colors hover:text-fg"
            >
              CV · EN
            </a>
          </li>
          <li>
            <a
              href="/cv/Jiawei_Zhang_CV_CN.pdf"
              download
              className="transition-colors hover:text-fg"
            >
              CV · 中文
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
