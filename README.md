# Portfolio — Medjahri Mohammed Safouane

A static portfolio for an AI & Data Science engineering student: four in-depth Projects, two short
"more work" entries, an About page, and a CV download. Built with Astro and Tailwind, content lives in
Markdown, and every published number is traceable to `docs/project-facts.md`.

## Requirements

- Node 24 (Node 22+ works)
- npm 11

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the development server at `http://localhost:4321` |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run check` | Type-check Astro components with `astro check` |
| `npm test` | Build the site, then run the full test suite (schema + built-output contract) |

Run `npm test` before committing. It fails if a Project is malformed, an image is missing, an
unpublished Repository renders as a link, or an excluded Project leaks into the output.

## Site URL

Canonical URLs, Open Graph tags, the sitemap, and `robots.txt` derive from one value:

```bash
SITE_URL=https://your-domain.example npm run build
```

If `SITE_URL` is unset, the build falls back to `https://safouane-medjahri.vercel.app`. Hosting and
domain setup are intentionally out of scope; `dist/` is plain static output and can be served anywhere.

## Structure

```
src/
  content.config.ts        content collection + schema wiring
  content/projects/        one Markdown file per Project
  lib/                     schema, repository rules, site data, achievements
  components/              cards, timeline, metric grid, contact block
  layouts/BaseLayout.astro metadata, navigation, footer
  pages/                   Home, /projects, /projects/[slug], /about, 404
public/
  projects/<slug>/         Project images, one folder per Project
  cv/                      the downloadable CV
  og.png                   social preview image
docs/
  spec.md                  scope and decisions
  project-facts.md         claims ledger — the only permitted source of numbers
  CONTENT.md               how to edit content without touching layout
tests/                     schema seam and built-output contract
scripts/prepare-assets.mjs one-off image pipeline (sharp)
```

## Editing content

See **[docs/CONTENT.md](docs/CONTENT.md)** for adding a Project, publishing a Repository, replacing
the CV, and adding an Achievement or certification. No layout file needs to change for any of those.

## Design notes

- Dark only. Black base, near-white text, one red accent. No analytics, cookies, or third-party embeds.
- The umbrella mark is an original inline SVG, not Capcom's logo.
- The custom cursor is applied only for fine pointers and is disabled under reduced motion.
- Two test seams only: content schema validation, and the content-to-page contract on built HTML.
