# Frank Zhang · Portfolio

Personal site of Jiawei (Frank) Zhang. Built with Next.js 14, Tailwind, Framer Motion, and a custom force-directed knowledge graph. Deployed as a fully static site to GitHub Pages for reliable China + US access.

## Stack

- Next.js 14 (App Router, `output: 'export'`)
- TypeScript
- Tailwind CSS + `@tailwindcss/typography`
- Framer Motion
- `react-force-graph-2d` — knowledge graph on the home page
- `cmdk` — ⌘K command menu
- `lucide-react` — line icons
- Self-hosted Google Fonts (Fraunces / Inter / JetBrains Mono) via `next/font`

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Production build (local check)

```bash
npm run build
# static files are emitted to ./out
```

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which:

1. Builds the site with Next.js static export.
2. Auto-detects whether the repo is `<username>.github.io` (root deploy) or a sub-repo (`basePath` deploy).
3. Uploads `./out` to GitHub Pages.

To enable for the first time:

1. In the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main` — the workflow runs automatically.

## Content is data-driven

All content lives in `./content`:

- `graph.ts` — knowledge graph nodes and links
- `projects.ts` — AI + Analytics projects
- `publications.ts` — academic publications
- `research.ts` — research positions
- `education.ts` — schools and degrees
- `journal/index.ts` — blog posts (replace with MDX later if desired)

Update these files and the site updates — no page code changes required.

## Folder structure

```
app/            Next.js App Router pages
components/     Reusable UI
content/        Data-driven content
lib/            Utilities
public/         Static assets (favicon, CV, og images)
.github/        CI / CD
```

## China + US accessibility

The site ships as plain HTML + JS. Hosted on GitHub Pages, which is reachable
(though slower) from mainland China. Fonts are self-hosted via `next/font`, not
requested from Google Fonts at runtime, to avoid DNS issues.
