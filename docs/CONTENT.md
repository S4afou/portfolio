# Content guide

Everything a visitor reads comes from data files. You can add a Project, publish a Repository,
replace the CV, add a certification, or edit Education, Experience, Leadership, skills, and languages
without opening a layout or component.

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
- `cover` is displayed at 16:9; supply a landscape image. Project cards use the same 16:9 frame.
  Keep files under ~300 KB.
- Use photographic, external, or real report figures for covers. Do not invent a system diagram as a
  cover. A report plate may be cropped or placed on a dark canvas, but the underlying figure should
  remain recognisable.
- Record the source and licence for every external image in `docs/project-facts.md`.

### Order and sequence

`order` controls the sequence on the Projects index. Home shows only the Projects with
`featured: true`, in `order` sequence, followed by a “Show all 6 projects” link.

The current sequence is Pocket OMR (1), Spell Caster (2), H-GATE (3), NASA Shuttle (4), AdaIN style
transfer (5), and Eigenfaces/Fisherfaces (6). Only 1–4 are featured.

## Publish a Repository

A Repository entry has a `label`, a `status`, and an optional `url`:

```yaml
repos:
  - label: GitHub repository
    status: pending
```

| Status | What renders |
| --- | --- |
| `pending` | A non-interactive publishing-soon badge; no anchor. |
| `private` | A non-interactive private-repository badge; no anchor. |
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
email, LinkedIn, GitHub, location, availability, and the language list used in the header, footer,
contact block, and Dossier.

## Edit Education, Experience, and Leadership

These lists live in `src/lib/background.ts`:

- `EDUCATION` — degrees and the baccalaureate, newest first.
- `EXPERIENCE` — professional roles and internships.
- `LEADERSHIP` — student-club offices and extracurricular responsibilities. Keep these separate from
  professional Experience.
- `CERTIFICATIONS` — certifications and awards.

Education, Experience, and Leadership entries use the same shape:

```ts
{
  period: 'Sep 2025',
  title: 'Network & Security Engineering Intern',
  org: 'Space Techniques Center (CTS), Arzew',
  detail: 'One or two sentences on what it involved.',
}
```

`period` is display text; the arrays are shown in the order you write them.

## Add a certification or award

Append an object to `CERTIFICATIONS` in `src/lib/background.ts`:

```ts
{
  period: 'Jun 2026',
  title: 'Certification name',
  issuer: 'Issuing organisation',
  detail: 'Optional one-line context.',
}
```

The About page hides the entire “Certifications & awards” section while `CERTIFICATIONS` is empty.
Add the first entry and the section appears; no layout change is needed.

## Edit skills and languages

- `src/lib/skills.ts` holds the four `SKILL_GROUPS` shown under “Skills & languages”.
- The language list is `LANGUAGES` in `src/lib/site.ts`.

Both the Home page and About show these sections. Keep the groups aligned with the CV.

## What stays out

The site is strictly AI/DS work. Zmala, Dirassati, the MPI cluster, and the Olympics dashboard are
excluded by agreement. The contract tests assert that none of them appear in the built output.

## Style rules for copy

- English only. Second person is fine; avoid marketing adjectives.
- Report a metric with its name and the setting it was measured in.
- Name what you personally built, especially on team Projects.
- Do not claim a decisive win over a strong baseline when the margin is small.
- Label planned work as planned. AdaIN's 15–30 FPS video throughput is expected, not measured; the
  150 ms at 512×512 is measured.
- Use 54× fewer dimensions only for the 75-component Eigenfaces model. Fisherfaces is reported at 39
  final dimensions; do not attach the 54× or 105× ratio to that configuration.
