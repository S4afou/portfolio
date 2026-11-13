# Portfolio: Medjahri Mohammed Safouane

This is my portfolio, a static site for my work as an AI & Data Science engineering student. It has
six Projects, four of them featured on Home, with AdaIN style transfer and Eigenfaces/Fisherfaces as
full pages. Every Project page carries the full Project name, the research and prior art behind the
method, the approaches I compared, my own contribution, and a reflection. The About page carries my
education, experience, leadership, and verified Kaggle certificates. The positioning focuses on
computer vision, NLP, and deep learning. I built it with Astro and Tailwind, with content in Markdown.

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

I run `npm test` before committing. It fails if a Project is malformed, an image is missing, an
unpublished Repository renders as a link or appears on the page, or an excluded Project leaks into
the output.

## Deployment

Every push to `main` deploys to production on Vercel through the repository integration; every branch
and pull request gets a preview URL. I named the project `safouane-medjahri`, so the production site
is `https://safouane-medjahri.vercel.app` and the CV is served from
`/cv/medjahri-mohammed-safouane-cv.pdf`.

`vercel.json` sets the build command to `npm run check && npm test`, so a malformed Project, a
Repository that would render as a dead link, a broken content guard or a failing type check fails the
deploy instead of publishing.

Canonical URLs, Open Graph tags, the sitemap, and `robots.txt` derive from one value:

```bash
SITE_URL=https://your-domain.example npm run build
```

If `SITE_URL` is unset, the build falls back to the Vercel URL above. `dist/` stays plain static
output and can be served anywhere.

## Structure

```text
src/
  content.config.ts        content collection + schema wiring
  content/projects/        one Markdown file per Project (six)
  lib/                     schema, repository rules, site and background data, skills, focus, contact
  components/              cards, metric grid, contact block, footer/header
  layouts/BaseLayout.astro metadata, navigation, footer
  pages/                   Home, /projects, /projects/[slug], /about with the certificates section, 404
  styles/global.css        type system, palette, cursor, component primitives
public/
  projects/<slug>/         Project images, one folder per Project
  cv/                      the downloadable CV, generated from cv/ at the repository root
  portrait.webp            Home hero portrait, cropped to 4:5
  cursor.svg               canopy cursor (original 8-panel umbrella)
  cursor-active.svg        canopy cursor on links and buttons
  og.png                   social preview image
cv/                        the CV source (LaTeX) behind public/cv/*.pdf
vercel.json                the production build command, which runs the checks first
tests/                     schema seam and built-output contract
scripts/prepare-og.mjs      social preview generator
```

## Editing content

#### Add a Project

1. Create `src/content/projects/<slug>.md`. The filename becomes `/projects/<slug>`.
2. Put the cover and gallery images in `public/projects/<slug>/`.
3. Fill the frontmatter. I keep the body empty; all copy lives in frontmatter.

The schema in `src/content.config.ts` validates the file at build time. Required fields are `title`,
`summary`, `ownership`, `timeframe`, `stack` (2+), `problem`, `approach` (2+), `results` (2+
name/value/context metrics), `reflection`, `cover` (`src` + `alt`), and `order`. Optional fields are
`shortTitle`, `research` (1+), `comparison` (2+), `contribution` (1+), `gallery`, `repos`, `featured`
(default `false`), and `draft` (default `false`). Prose supports Markdown but not raw HTML.

`title` is the full name used as the page `<h1>` and metadata title. `shortTitle` is used on cards,
the breadcrumb, and previous/next navigation. When `shortTitle` is absent, `title` is used everywhere.

#### Publish a Repository

A Repository entry has a `label`, a `status`, and an optional `url`. I use `pending` or `private`
while the code is not public; both render nothing, so the page never shows a dead link. `published`
requires a real URL. I never add a placeholder `#` link.

#### Add a certificate

Certificates appear only on the About page. They never go in my GitHub profile README.

1. Open the public verification URL first,
   `https://www.kaggle.com/learn/certification/<username>/<course-slug>`, and confirm it resolves
   and names me. A 500 means the certificate was not issued.
2. Add one object to `CERTIFICATIONS` in `src/lib/background.ts`: `title`, `issuer`, a one-line
   `detail`, and `url`. Leave `period` unset so the entry renders without a date column.
3. Run `npm test` and `npm run check`, then commit.

The section hides itself while `CERTIFICATIONS` is empty. A title with a `url` becomes an external
link, so I never add one that does not resolve.

#### Edit the rest

- `src/lib/site.ts`: my name, role, email, LinkedIn, GitHub, location, availability, CV path, languages.
- `src/lib/background.ts`: Education, Experience, Leadership, Certifications.
- `src/lib/skills.ts`: the skill groups shown as Skills & languages.
- `src/lib/focus.ts`: the three focus areas and the hero focus label.
- `src/lib/contact.ts`: the prefilled email subjects.
- `public/cv/`: replace the PDF and keep the filename to update every CV button at once.
- `cv/medjahri-mohammed-safouane.tex`: the CV source. From `cv/`, run
  `pdflatex -interaction=nonstopmode medjahri-mohammed-safouane.tex`, then copy the generated PDF
  over `public/cv/medjahri-mohammed-safouane-cv.pdf`.

## Design notes

- Dark only. Black base, near-white text, one red accent. No analytics, cookies, or third-party
  embeds.
- Typography: Archivo for display and UI, Newsreader italic for short accents, Geist Mono for
  numeric data and small index labels. I self-host all of it through Fontsource.
- The layout is compact and sectioned: soft-bordered panels, a 76rem measure, generous but controlled
  spacing. Cards stay 16:9.
- Ambient motion: radial glows, a masked grid, a stack ticker, a portrait index plate, a
  reading-progress bar, and reveal-on-scroll. I suppress all of it under reduced motion, and the
  content stays visible without JavaScript.
- The umbrella mark is my own inline SVG, not Capcom's logo.
- The custom cursor is my own 8-panel red/white canopy, not a trace of the Umbrella Corporation logo.
  I apply it only for fine pointers with motion allowed, and disable it for touch and under reduced
  motion.
- Contact actions share one vocabulary and prefill a subject; Contact is in the header and footer. The
  Contact block also shows the address and a **Copy email** button, so a browser with no mail handler
  still has a way to reach me.
- Covers are thematic external photographs or real gameplay and report frames; evidence charts remain
  charts.
- Two test seams only: content schema validation, and the content-to-page contract on built HTML.
