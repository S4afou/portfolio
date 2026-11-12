# Portfolio: Medjahri Mohammed Safouane

A static portfolio for an AI & Data Science engineering student: six Projects, four featured on Home,
with AdaIN style transfer and Eigenfaces/Fisherfaces as full pages. Every Project page carries the full
Project name, the research and prior art behind the method, the approaches that were compared, the
owner's personal contribution, and a reflection. The positioning focuses on computer vision, NLP, and
deep learning. Built with Astro and Tailwind, with content in Markdown.

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
| `npm run assets:og` | Regenerate the social preview image (`public/og.png`) |

Run `npm test` before committing. It fails if a Project is malformed, an image is missing, an
unpublished Repository renders as a link or appears on the page, or an excluded Project leaks into the
output.

## Site URL

Canonical URLs, Open Graph tags, the sitemap, and `robots.txt` derive from one value:

```bash
SITE_URL=https://your-domain.example npm run build
```

If `SITE_URL` is unset, the build falls back to `https://safouane-medjahri.vercel.app`. Hosting and
domain setup are intentionally out of scope; `dist/` is plain static output and can be served anywhere.

## Structure

```text
src/
  content.config.ts        content collection + schema wiring
  content/projects/        one Markdown file per Project (six)
  lib/                     schema, repository rules, site and background data, skills, focus, contact
  components/              cards, metric grid, contact block, footer/header
  layouts/BaseLayout.astro metadata, navigation, footer
  pages/                   Home, /projects, /projects/[slug], /about, 404
  styles/global.css        type system, palette, cursor, component primitives
public/
  projects/<slug>/         Project images, one folder per Project
  cv/                      the downloadable CV
  portrait.webp            Home hero portrait, cropped to 4:5
  cursor.svg               canopy cursor (original 8-panel umbrella)
  cursor-active.svg        canopy cursor on links and buttons
  og.png                   social preview image
tests/                     schema seam and built-output contract
scripts/prepare-og.mjs      social preview generator
```

## Editing content

#### Add a Project

1. Create `src/content/projects/<slug>.md`. The filename becomes `/projects/<slug>`.
2. Put the cover and gallery images in `public/projects/<slug>/`.
3. Fill the frontmatter. Keep the body empty; all copy lives in frontmatter.

The schema in `src/content.config.ts` validates the file at build time. Required fields are `title`,
`summary`, `ownership`, `timeframe`, `stack` (2+), `problem`, `approach` (2+), `results` (2+
name/value/context metrics), `reflection`, `cover` (`src` + `alt`), and `order`. Optional fields are
`shortTitle`, `research` (1+), `comparison` (2+), `contribution` (1+), `gallery`, `repos`, `featured`
(default `false`), and `draft` (default `false`). Prose supports Markdown but not raw HTML.

`title` is the full name used as the page `<h1>` and metadata title. `shortTitle` is used on cards,
the breadcrumb, and previous/next navigation. When `shortTitle` is absent, `title` is used everywhere.

#### Publish a Repository

A Repository entry has a `label`, a `status`, and an optional `url`. Use `pending` or `private` while
the code is not public; both render nothing, so the page never shows a dead link. `published` requires
a real URL. Never add a placeholder `#` link.

#### Edit the rest

- `src/lib/site.ts`: name, role, email, LinkedIn, GitHub, location, availability, CV path, languages.
- `src/lib/background.ts`: Education, Experience, Leadership, Certifications.
- `src/lib/skills.ts`: the skill groups shown as Skills & languages.
- `src/lib/focus.ts`: the three focus areas and the hero focus label.
- `src/lib/contact.ts`: the prefilled email subjects.
- `public/cv/`: replace the PDF and keep the filename to update every CV button at once.

## Design notes

- Dark only. Black base, near-white text, one red accent. No analytics, cookies, or third-party embeds.
- Typography: Archivo for display and UI, Newsreader italic for short accents, Geist Mono for
  numeric data and small index labels. All self-hosted through Fontsource.
- Layout is compact and sectioned: soft-bordered panels, a 76rem measure, generous but controlled
  spacing. Cards stay 16:9.
- Ambient motion: radial glows, a masked grid, a stack ticker, a portrait index plate, a
  reading-progress bar, and reveal-on-scroll. All motion is suppressed under reduced motion and
  content remains visible without JavaScript.
- The umbrella mark is an original inline SVG, not Capcom's logo.
- The custom cursor is an original 8-panel red/white canopy, not a trace of the Umbrella Corporation
  logo. It is applied only for fine pointers with motion allowed; it is disabled for touch and under
  reduced motion.
- Contact actions share one vocabulary and prefill a subject; Contact is in the header and footer. The
  Contact block also shows the address and a **Copy email** button, so a browser with no mail handler
  still has a way to reach the owner.
- Covers are thematic external photographs or real gameplay/report frames; evidence charts remain
  charts.
- Two test seams only: content schema validation, and the content-to-page contract on built HTML.
