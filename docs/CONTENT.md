# Content guide

Everything a visitor reads comes from data files. You can add a Project, publish a Repository,
replace the CV, add a certification, edit Education, Experience, Leadership, skills, and languages, or
change the focus areas and contact subjects without opening a layout or component.

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

## House style

Use commas, colons, parentheses, or full stops instead of em and en dashes. Write numeric ranges
with `to` (`15 to 30 FPS`, `2024 to 2026`). Ordinary hyphenated compounds keep a normal hyphen
(`end-to-end`, `five-fold`).

## Add a Project

1. Create `src/content/projects/<slug>.md`. The filename becomes the URL:
   `/projects/<slug>`. Use lowercase words separated by hyphens.
2. Create `public/projects/<slug>/` and put the cover and gallery images there.
3. Fill the frontmatter. Keep the body empty; all copy lives in frontmatter.

```yaml
---
title: 'Pocket OMR: End-to-End Optical Mark Recognition with Handwritten Character Identification'
shortTitle: Pocket OMR
summary: One sentence, 20 to 200 characters, used on cards and in search results.
ownership: 'Team of six. I led the box-detection approaches and trained the MobileNetV3-Small bubble classifier.'
timeframe: '2025'
stack: [Python, PyTorch, OpenCV]

problem: >-
  A paragraph explaining the problem, at least 40 characters.

research:
  - citation: 'Howard et al. (2019), “Searching for MobileNetV3,” ICCV.'
    takeaway: >-
      What the paper contributed to the project, at least 20 characters.

comparison:
  - option: 'MobileNetV3-Small'
    strengths: >-
      What this option is good at.
    limits: >-
      What it costs, or where it fails.
    verdict: >-
      What the project chose, and why.
  - option: 'YOLOv8s end-to-end detector'
    strengths: >-
      What the rejected option was good at.
    limits: >-
      Why it lost, with the number if the ledger records one.
    verdict: >-
      Rejected, and the reason.

approach:
  - >-
    One step per list item; at least two, each at least 20 characters.
  - >-
    A second step.

contribution:
  - >-
    One thing you personally built, at least 20 characters.
  - >-
    A second thing, separated from teammates' work.

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

### Project page structure

Every Project page renders, in order:

1. Problem
2. Research & prior art
3. Approaches compared
4. Approach
5. What I personally built
6. Results
7. What I would do differently

`research` and `comparison` explain where the method came from and what else was considered. `contribution` separates the owner's work from teammates' work. The schema treats `research`, `comparison`, and `contribution` as optional so a future Project can ship before the copy is ready, but the contract test requires all three on the current six.

### Full title and short title

- `title` is the full Project name and becomes the page `<h1>` and the metadata title.
- `shortTitle` is the name used on cards, the breadcrumb, and the previous/next navigation.
- If `shortTitle` is omitted, `title` is used everywhere; use it only when the full name is short enough for a card.
- Keep the short title stable even when the full title changes, so links and navigation do not jump around.

### Required fields

`title`, `summary`, `ownership`, `timeframe`, `stack` (2+), `problem`, `approach` (2+), `results`
(2+), `reflection`, `cover` (`src` + `alt`), `order`.

### Optional fields

`shortTitle`, `research` (1+ citation/takeaway items), `comparison` (2+ option/strengths/limits/verdict
items), `contribution` (1+ strings), `gallery` (defaults to empty), `repos` (defaults to empty),
`featured` (defaults to `false`, controls the Home grid), `draft` (defaults to `false`; set `true` to
hide a Project from every page).

### Research, comparison, and contribution

- `research` is for papers and methods the Project actually builds on, not a reading list. Each item
  has a `citation` and a `takeaway` that says what it changed in the Project.
- `comparison` is for alternatives that were seriously considered. Each item has `option`,
  `strengths`, `limits`, and `verdict`. Include the rejected option, not just the winner.
- `contribution` is a list of concrete things the owner built. Name a teammate's work when it is
  relevant, and do not claim team work as solo work.
- Keep citations real and specific: authors, year, title, venue. Do not invent a DOI or a link.

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
- The six current covers are thematic external photographs or gameplay frames, not generated
  diagrams. A stock cover should show the Project's subject, not a generic office scene. Record the
  photographer, source URL, and licence in `docs/project-facts.md`.
- When a cover replaces a useful report figure, keep the figure in the `gallery` instead of deleting
  it. The AdaIN output grid, the Eigenfaces subject plate, the Spell Caster fireball frame, and the
  Pocket OMR segmentation plate are all preserved this way.
- Export covers at 1600×900 (16:9) or larger, keep the file under ~300 KB, and crop rather than
  letterbox. The CSS `object-cover` crop is a fallback, not a substitute for a deliberate crop.
- `public/portrait.webp` is the owner's portrait, cropped to 4:5 and shown in the Home hero. Replace
  it only with another portrait of the owner; keep the alt text descriptive.

### Order and sequence

`order` controls the sequence on the Projects index. Home shows only the Projects with
`featured: true`, in `order` sequence, followed by a "Show all projects" link.

The current sequence is Pocket OMR (1), Spell Caster (2), H-GATE (3), Shuttle anomaly detection (4),
AdaIN Style Transfer (5), and Eigenfaces & Fisherfaces (6). Only 1 to 4 are featured. The full titles are
longer than these card names; keep the short titles in `shortTitle` so the sequence stays readable.

## Publish a Repository

A Repository entry has a `label`, a `status`, and an optional `url`:

```yaml
repos:
  - label: GitHub repository
    status: pending
```

| Status | What renders |
| --- | --- |
| `pending` | Nothing on the page; no anchor. |
| `private` | Nothing on the page; no anchor. |
| `published` | A real link. A `published` entry **without** a `url` fails validation. |

To publish, add the URL and change the status:

```yaml
repos:
  - label: GitHub repository
    url: https://github.com/S4afou/example
    status: published
```

Never add a placeholder `#` link. An unpublished Repository stays in the frontmatter but is omitted from
the page, so the site never advertises a missing link.

## Replace the CV

Replace the file at `public/cv/medjahri-mohammed-safouane-cv.pdf`, keeping the same name. Every CV
button updates automatically.

If you change the filename, update `cv` in `src/lib/site.ts`. The same file holds the name, role,
email, LinkedIn, GitHub, location, availability, and the language list used in the header, footer,
contact block, and hero chips.

## Edit the focus areas

The three interest cards on Home and the hero focus label live in `src/lib/focus.ts`:

- `FOCUS_AREAS`: one entry per card, with `index`, `title`, and `body`.
- `FOCUS_LABEL`: the label shown in the hero plate and the About card (`Vision · NLP · Deep learning`).

Keep the list at three areas: computer vision, NLP, and deep learning. MLOps is described as the
delivery layer in the Home section note rather than as a fourth headline interest. About's narrative
also names the same three areas; edit that paragraph in `src/pages/about.astro`.

## Edit contact actions

Every `mailto:` link is built by `src/lib/contact.ts`:

- `CONTACT_SUBJECTS.general`: `Portfolio enquiry`, used by the hero, footer, and About card.
- `CONTACT_SUBJECTS.internship`: `PFE / internship enquiry`, used by the Contact block.
- `CONTACT_SUBJECTS.project(title)`: `Question about <Project>`, used by each Project page.

The address itself is `SITE.email` in `src/lib/site.ts`. The Contact block shows `Connect` for
LinkedIn and `View code` for GitHub; the handles stay in the `aria-label` and `title` attributes so the
raw slug never dominates the layout. Contact is the fourth header item and a footer item, both
pointing at `/#contact`.

The Contact block also shows the address as plain text and a **Copy email** button. This is the
fallback for a browser or local preview with no registered mail handler: the `mailto:` link still
exists, but the copy action works without it. The button uses the Clipboard API and falls back to a
hidden-textarea `document.execCommand('copy')` when the API is unavailable. Keep both paths and the
`aria-live` status line.

## Edit Education, Experience, and Leadership

These lists live in `src/lib/background.ts`:

- `EDUCATION`: degrees and the baccalaureate, newest first.
- `EXPERIENCE`: professional roles and internships.
- `LEADERSHIP`: student-club offices and extracurricular responsibilities. Keep these separate from
  professional Experience.
- `CERTIFICATIONS`: certifications and awards.

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
- Use the full Project name as the page `<h1>`; use `shortTitle` on cards, breadcrumbs, and previous/next
  navigation.
- Name what you personally built, especially on team Projects. If a teammate built a component, say so
  in `contribution` or `ownership`; do not let the page imply it is yours.
- Do not claim a decisive win over a strong baseline when the margin is small. The H-GATE page keeps
  the 0.17-point F1 gain next to the lower macro-AUC for this reason.
- In `research`, cite the paper or method and say what it changed. In `comparison`, include the option
  that lost and the reason. A comparison with only the winner is a sales pitch, not an account.
- Label planned work as planned. AdaIN's 15 to 30 FPS video throughput is expected, not measured; the
  150 ms at 512×512 is measured.
- Use 54× fewer dimensions only for the 75-component Eigenfaces model. Fisherfaces is reported at 39
  final dimensions; do not attach the 54× or 105× ratio to that configuration.
