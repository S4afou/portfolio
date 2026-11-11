# Portfolio site

## Problem Statement

Medjahri Mohammed Safouane is an AI & Data Science engineering student at ESI-SBA applying for internships and a PFE (final-year project internship). His work currently has no single public home: some Projects exist only as folders on his laptop, others live in a GitHub account he cannot reach while a 2FA recovery request is pending, and the rest are scattered notebooks and reports. A recruiter who wants to evaluate him has nothing to open.

Three constraints shape the problem further. He has no frontend experience, so the site must be maintainable by editing content files alone. He has 2–4 days before he wants the site live. And his existing CV contains claims that do not survive scrutiny ("99% accuracy" on an imbalanced anomaly-detection task, a Whisper latency figure that was never measured), so the site must publish only numbers that are traceable to a notebook or report.

He also wants the site to look like something: a clinical dossier — black, near-white, one red accent, an original heraldic umbrella mark, and an editorial type system — chosen as a personal signature, not as a game fan page. The v1 site proved the content and the honesty rules; v2 replaces the reference-like layout with a visual system of its own.

## Solution

A statically built, English-only, dark-only portfolio site. It presents six Projects: four featured on Home (Pocket OMR, Spell Caster, H-GATE, NASA Shuttle anomaly detection + MLOps) and two full archive pages (AdaIN style transfer, Eigenfaces/Fisherfaces). About carries Education, Experience, Leadership & extracurricular, a Certifications & awards section that stays hidden until at least one entry exists, and Skills & languages. Contact is a section on Home and a footer block.

Project content lives in Markdown files with validated frontmatter, so adding or editing a Project never requires touching layout code. Each Project carries a Publication Status; while a Repository is unpublished, the page shows a non-interactive publishing-soon badge instead of a link, and flips to a real link when the URL is added. Every number shown is drawn from a single claims ledger, and each Project states exactly what the owner did and did not build.

## User Stories

1. As a recruiter, I want to see who this person is and what they build within the first screen, so that I can decide in seconds whether to keep reading.
2. As a recruiter, I want one obvious action (download the CV or email), so that I do not have to hunt for a way to contact them.
3. As a recruiter on a phone, I want the layout to work at small widths, so that a link opened from LinkedIn is not a broken experience.
4. As a recruiter, I want the site to load fast on a poor connection, so that I do not abandon it.
5. As a technical interviewer, I want each Project to state the problem, the approach, and the result, so that I can form questions before the interview.
6. As a technical interviewer, I want to see the real metric with its name and context, so that I can trust the claims.
7. As a technical interviewer, I want an explicit statement of what the candidate personally built, so that I am not misled about team contributions.
8. As a technical interviewer, I want a link to the Repository where one exists, so that I can inspect the code.
9. As a technical interviewer, I want to know when code is not yet published, so that I do not mistake a missing link for a broken one.
10. As a technical interviewer, I want a "what I would do differently" note, so that I can gauge maturity and self-awareness.
11. As a research-lab reviewer, I want the mathematics and model choices to be stated concretely, so that I can judge depth beyond tool names.
12. As the owner, I want to add a new Project by creating one Markdown file, so that I never need to edit layout code.
13. As the owner, I want the build to fail loudly when a required field is missing, so that I cannot publish an incomplete page.
14. As the owner, I want to mark a Project's Repository as pending, so that the site stays honest while GitHub access is unavailable.
15. As the owner, I want the CV download to point at a file I can replace later, so that I do not have to touch code to update it.
16. As the owner, I want the site to match my CV's identity details, so that the two artifacts agree.
17. As the owner, I want certifications added later without a redesign, so that today's deadline is not blocked on missing documents.
18. As the owner, I want the visual style to be distinctive without looking unserious, so that it survives a professional skim and does not look like a template.
19. As the owner with no frontend experience, I want a short content guide, so that I can edit prose and images unaided.
20. As the owner, I want a clear place to put a Project's screenshots, so that images cannot end up broken or oversized.
21. As a visitor, I want a Projects index that shows every Project at a glance, so that I can choose what to read.
22. As a visitor, I want each Project to have its own URL, so that I can share or bookmark a single Project.
23. As a visitor, I want the two research Projects to be full pages rather than footnotes, so that breadth and depth are visible.
24. As a visitor, I want Education, professional Experience, and student-club Leadership kept distinct, so that I understand what is a job and what is an extracurricular office.
25. As a visitor, I want contact links that open the right app, so that emailing or connecting takes one tap.
26. As a visitor using a keyboard, I want visible focus states and a logical tab order, so that I can navigate without a mouse.
27. As a visitor using a screen reader, I want meaningful alt text and landmarks, so that images and sections are understandable.
28. As a visitor who prefers reduced motion, I want animations suppressed, so that the site does not make me uncomfortable.
29. As a visitor on a touch device, I want the custom cursor disabled, so that it never interferes with tapping.
30. As a visitor, I want a useful 404 page, so that a stale link still gives me a way back.
31. As a visitor sharing a link, I want a preview card when the URL is pasted into a chat or social platform, so that the link looks credible.
32. As the owner, I want no analytics or tracking, so that the site has no cookie banner and no privacy liability.
33. As the owner, I want the site to build as static files, so that it can be hosted anywhere later without rework.
34. As the owner, I want the four strongest Projects on Home and all six in the archive, so that the first screen stays focused without hiding the research work.
35. As the owner, I want Zmala, Dirassati, the MPI cluster, and the Olympics dashboard excluded, so that the site stays strictly AI/DS-focused.
36. As the owner, I want every published metric to match the evidence file, so that no interviewer can catch the site overstating.
37. As the owner, I want photographic or report-derived covers, so that the site never looks like a generated diagram set.

## Implementation Decisions

### Stack and rendering

- Astro 7 with Tailwind 4, fully static output. No server rendering, no client-side framework runtime. Interactive behaviour is limited to CSS and small vanilla scripts.
- Node 24 / npm 11 are the available toolchain; no pnpm requirement.
- The site is a single Astro project at the repository root.

### Content model

- One Markdown file per Project, stored under `src/content/projects/`, with a per-Project asset folder under `public/projects/<slug>/`.
- Frontmatter is validated at build time with a Zod schema. Required fields: title, summary, ownership, timeframe, stack (2+), problem, approach (2+), results (2+ name/value/context metrics), reflection, cover (`src` + `alt`), and order.
- Optional fields: gallery images with alt text, Repository entries, `featured` (default `false`), and `draft` (default `false`).
- Repository entries use the Publication Status vocabulary: `published`, `pending`, `private`.
- A Project with no `published` Repository renders a non-interactive badge instead of an anchor. No placeholder `#` links are permitted.
- Prose fields support Markdown but not raw HTML.
- Project covers and cards use a 16:9 frame, so report plates and photographic covers share one proportion.

### Pages and navigation

- Routes: Home, Projects index, one page per Project, About, 404. Contact is a section on Home and a footer block, not a separate page.
- Header navigation: Home, Projects, About, and a CV action. The site name is “Medjahri Mohammed Safouane”; the logo links home.
- Home: identity block (name, role, positioning, availability), primary actions (email, download CV), Dossier facts, four featured Projects, a “Show all 6 projects” link, Experience, Skills & languages, and contact.
- Projects index: all six Projects as 16:9 cards ordered by a manual `order` field, each showing title, summary, stack, and Publication Status summary.
- About: short narrative; Education; professional Experience; Leadership & extracurricular; Certifications & awards (only when the data list is non-empty); Skills & languages; CV download.
- The six Projects are Pocket OMR (1), Spell Caster (2), H-GATE (3), NASA Shuttle anomaly detection + MLOps (4), AdaIN style transfer (5), and Eigenfaces/Fisherfaces (6). Only 1–4 are `featured: true`.

### Visual system

- Palette: black base (`#09090a`), near-white text, one red accent, neutral grays for rules and secondary text. No green, no CRT effects, no scanlines, no ambient audio.
- Typography: Archivo for display and UI, Newsreader italic for short editorial accents, Geist Mono only for numeric data and metrics. All three are self-hosted through Fontsource. No mono micro-labels or numbered section labels.
- Layout is typographic rather than boxed: horizontal rules, generous negative space, and open grids replace bordered cards and a background grid.
- Original umbrella mark drawn as an inline SVG. Capcom's Umbrella logo is not used.
- Custom 32 px umbrella cursor as an SVG, applied only under `(pointer: fine)` and only when reduced motion is not requested; disabled for touch. The hotspot is at the canopy tip.
- Dark-only. No theme toggle.
- Motion limited to short opacity/transform transitions on hover and focus; all respect `prefers-reduced-motion`.
- Covers are photographic, external, or real report figures. No self-generated system diagrams as covers; evidence charts may remain as charts.

### Content rules

- The claims ledger in `docs/project-facts.md` is the only permitted source of numbers. Where the ledger records no number, the Project states none.
- Imbalanced classification reports report F1, precision, recall, or FPR; accuracy appears only where the ledger records accuracy for a balanced or well-specified setting.
- Every Project includes an ownership statement naming what the owner built and, where relevant, what a teammate built.
- Spell Caster copy must say that the emotion head was LoRA-tuned while transcription uses the base Whisper-Small, and must not attribute the Unity game to the owner beyond “helped integrate the pipeline”.
- Pocket OMR copy states the team of six and the owner's scope: data collection and cleaning, detection training pipeline, segmentation and bubble detection.
- H-GATE copy states solo authorship and frames the result against a strong XGBoost baseline rather than claiming a decisive win.
- NASA copy leads with the F1 0.979 result, then the production F1 collapse under injected drift and the automatic retrain trigger; it never claims 99% accuracy.
- AdaIN copy uses 150 ms at 512×512 on one T4 as a measured result; the 15–30 FPS at 256 px figure is labelled expected/planned.
- Face-recognition copy uses 54× fewer dimensions for the 75-component Eigenfaces model, and 99.0% at 39 dimensions for the Fisherfaces project result; never attach 54× to the 39-dimensional configuration.
- Certifications and awards are a separate section, not entries in Experience or Leadership.

### SEO, accessibility, privacy

- Per-page title, description, canonical URL, and Open Graph/Twitter metadata. One generated social preview image.
- `Person` structured data with name, job title, sameAs links (LinkedIn, GitHub).
- Sitemap and favicon generated at build.
- WCAG AA contrast for text and UI states; visible focus rings; semantic landmarks; alt text required for every image in the schema.
- No analytics, no cookies, no contact form backend, no third-party embeds.
- The phone number is never published; the contract test enforces its absence.

### Build guardrails

- Content schema validation fails the build on missing or malformed fields.
- A generated route exists for every Project; duplicate slugs fail the build.
- Images referenced in frontmatter must exist and be resolvable; missing files fail the build.
- Repository URL policy is enforced: `pending` and `private` entries cannot render as external anchors.

## Testing Decisions

Good tests here assert observable output, not implementation details: they build the site (or load content through the same schema the build uses) and check what a visitor would receive — routes, text, links, alt attributes — rather than inspecting component internals.

The highest seam is the **content-to-page contract**: one test suite loads every Project through the content schema, renders the routes, and asserts:

- every Project produces exactly one page at its slug;
- required fields are present and non-empty;
- `pending` and `private` Repositories produce no anchor elements, and `published` ones do;
- every image has non-empty alt text and a resolvable file;
- the site name appears on every page and the phone number appears nowhere;
- six Projects exist, exactly four are featured, Home links those four plus “Show all 6 projects”, and the archive links all six;
- AdaIN and Eigenfaces/Fisherfaces are full pages with their headline claims;
- About separates Leadership from Experience and keeps Skills & languages visible;
- the legacy “Achievements”, “More work”, “Selected Projects”, and “Track record” surfaces are absent.

A second, thinner seam covers the content schema itself: malformed frontmatter is rejected with a useful message. These are the only two seams; no component-level or styling tests are planned.

Prior art: none — the repository started empty, so these tests establish the pattern. Vitest for the schema tests, with assertions made against built HTML output for the contract suite. Accessibility is checked manually with Lighthouse and a keyboard pass rather than automated.

## Out of Scope

- Hosting, deployment, and domain setup; the output must remain host-agnostic static files.
- GitHub API integration, automatic Repository metadata, stars, or commit activity.
- Live demos, embedded notebooks, or deployed Streamlit/FastAPI apps.
- Blog or writing section.
- Internationalisation; English only.
- Light mode or theme switching.
- CMS, admin UI, or any runtime editing.
- Analytics, cookie consent, or contact form backend.
- Regenerating the CV PDF; the site links the existing file until a corrected one replaces it.
- Certifications and awards that have not yet been supplied; the About section stays hidden until the data list is non-empty.
- Zmala, Dirassati, the MPI cluster, and the Olympics dashboard.

## Further Notes

- The source GitHub account is temporarily unreachable (2FA recovery pending). The Publication Status mechanism exists specifically so the site ships before access returns; adding URLs later must be a one-line change per Project.
- The CV currently in `E:\All\Studies\Stage\cv_medjahri_mohammed_safouane.pdf` is the file to link at launch; the owner will replace it with a corrected version later.
- The visual direction is recorded in `docs/adr/0003-clinical-dossier-visual-system.md`; the original palette and mark decision remains in `docs/adr/0002-restrained-umbrella-theme.md`; the stack and content-source decision is in `docs/adr/0001-static-astro-site-with-local-content.md`.
- Information architecture follows the round-one agreement (Home / Projects index / individual Project pages / About with Education, Experience, Leadership, and Certifications / Contact). A single-page fallback is possible if the schedule collapses, but per-Project URLs are preferred because recruiters share links to individual Projects.
- The peer portfolios at `inas-soummar.vercel.app` and `sarra-zerguerras-portfolio.vercel.app` were reviewed for coverage, not for visual direction. v2 deliberately diverges from their typography, card treatment, and section labelling.
- No issue tracker is configured in this workspace, so this spec lives at `docs/spec.md` and could not be labelled `ready-for-agent`.
