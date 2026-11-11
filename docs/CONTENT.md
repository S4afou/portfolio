# Content guide

Everything a visitor reads comes from data files. You can add a Project, publish a Repository,
replace the CV, or add an Achievement without opening a layout or component.

After any change, run:

```bash
npm test
```

A production build runs first, then the tests. The build fails if frontmatter is invalid or an image
is missing; the tests fail if a pending Repository becomes a link, an excluded Project appears, or the
phone number leaks into the output.

## The claims ledger

`docs/project-facts.md` is the **only** permitted source of numbers. If a number is not in that file,
it does not go on the site. Where the ledger records no measurement, the copy states none. Do not
reuse figures from an older CV.

## Add a Project

1. Create `src/content/projects/<slug>.md`. The filename becomes the URL:
   `/projects/<slug>`. Use lowercase words separated by hyphens.
2. Create `public/projects/<slug>/` and put the cover and gallery images there.
3. Fill the frontmatter. Keep the body empty; all copy lives in frontmatter.

```yaml
---
title: Pocket OMR
summary: One sentence, 20–200 characters, used on cards and in search results.
ownership: 'Team of six. I owned data collection and the detection pipeline.'
timeframe: '2025'
stack: [Python, PyTorch, OpenCV]

problem: >-
  A paragraph explaining the problem, at least 40 characters.

approach:
  - >-
    One step per list item; at least two, each at least 20 characters.
  - >-
    A second step.

results:
  - name: mAP@50
    value: '99.5'
    context: Region segmentation, YOLOv8m-seg

reflection: >-
  What you would do differently, at least 40 characters.

cover:
  src: /projects/pocket-omr/cover.webp
  alt: Describe the image for someone who cannot see it.
  caption: Optional caption shown under the image.

gallery:
  - src: /projects/pocket-omr/architecture.webp
    alt: Describe this image.
    caption: Optional.

repos:
  - label: GitHub repository
    status: pending

featured: true
order: 1
---
```

### Required fields

`title`, `summary`, `ownership`, `timeframe`, `stack` (2+), `problem`, `approach` (2+), `results`
(2+), `reflection`, `cover` (`src` + `alt`), `order`.

### Optional fields

`gallery` (defaults to empty), `repos` (defaults to empty), `featured` (defaults to `false`, controls
the Home grid), `draft` (defaults to `false`; set `true` to hide a Project from every page).

### Images

- Put files under `public/projects/<slug>/`.
- Reference them with an absolute path beginning `/projects/<slug>/...`.
- Every image needs non-empty `alt`. Captions are optional.
- The build fails, naming the Project and the path, when a referenced file does not exist.
- `cover` is displayed at 16:9; supply a landscape image. Keep files under ~300 KB.

### Order and sequence

`order` controls the sequence on the Home page and the Projects index. The four launch Projects are
ordered 1–4 and the copy assumes you read them in that order.

## Publish a Repository

A Repository entry has a `label`, a `status`, and an optional `url`:

```yaml
repos:
  - label: GitHub repository
    status: pending
```

| Status | What renders |
| --- | --- |
| `pending` | A non-interactive `PUBLISHING SOON` badge; no anchor. |
| `private` | A non-interactive `PRIVATE REPOSITORY` badge; no anchor. |
| `published` | A real link. A `published` entry **without** a `url` fails validation. |

To publish, add the URL and change the status:

```yaml
repos:
  - label: GitHub repository
    url: https://github.com/S4afou/example
    status: published
```

Never add a placeholder `#` link. The badge exists so a missing Repository is never mistaken for a
broken one.

## Replace the CV

Replace the file at `public/cv/medjahri-mohammed-safouane-cv.pdf`, keeping the same name. Every CV
button updates automatically.

If you change the filename, update `cv` in `src/lib/site.ts`. The same file holds the name, role,
email, LinkedIn, GitHub, location, and availability used in the header, footer, and contact block.

## Add an Achievement or certification

Edit `src/lib/achievements.ts` and append an object:

```ts
{
  period: 'Jun 2026',
  sort: 202606,
  title: 'Certification name',
  org: 'Issuing organisation',
  detail: 'One or two sentences on what it involved.',
  kind: 'certification',
}
```

- `sort` is `YYYYMM` and controls the order (newest first). `period` is the text shown.
- `kind` is `'achievement'` or `'certification'`; both render in the same timeline.
- New entries automatically appear on About. The Home "Track record" teaser shows the four most
  recent by `sort`, so a new certification will appear there too.

## Edit "More work"

`src/lib/more-work.ts` holds the two short entries (AdaIN, Eigenfaces/Fisherfaces). Keep it to those
two; anything that deserves a page should be a Project instead.

## What stays out

The site is strictly AI/DS work. Zmala, Dirassati, the MPI cluster, and the Olympics dashboard are
excluded by agreement. The contract tests assert that none of them appear in the built output.

## Style rules for copy

- English only. Second person is fine; avoid marketing adjectives.
- Report a metric with its name and the setting it was measured in.
- Name what you personally built, especially on team Projects.
- Do not claim a decisive win over a strong baseline when the margin is small.
