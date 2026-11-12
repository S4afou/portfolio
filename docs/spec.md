# Portfolio site

## Problem Statement

Medjahri Mohammed Safouane is an AI & Data Science engineering student at ESI-SBA applying for internships and a PFE (final-year project internship). His work currently has no single public home: some Projects exist only as folders on his laptop, others live on GitHub, and the rest are scattered notebooks and reports. A recruiter who wants to evaluate him has nothing to open.

Three constraints shape the problem further. He has no frontend experience, so the site must be maintainable by editing content files alone. He has 2 to 4 days before he wants the site live. And his existing CV contains claims that do not survive scrutiny ("99% accuracy" on an imbalanced anomaly-detection task, a Whisper latency figure that was never measured), so the site must publish only numbers that are traceable to a notebook or report.

He also wants the site to look like something: a clinical dossier (black, near-white, one red accent, an original heraldic umbrella mark, and an editorial type system), chosen as a personal signature, not as a game fan page. The v1 site proved the content and the honesty rules; v2 replaces the reference-like layout with a visual system of its own.

## Solution

A statically built, English-only, dark-only portfolio site. It presents six Projects: four featured on Home (Pocket OMR, Spell Caster, H-GATE, NASA Shuttle anomaly detection + MLOps) and two full archive pages (AdaIN style transfer, Eigenfaces/Fisherfaces). About carries Education, Experience, Leadership & extracurricular, a Certifications & awards section that stays hidden until at least one entry exists, and Skills & languages. Contact is a section on Home, a header/footer navigation item, and a footer block. The site positions his focus as computer vision, NLP, and deep learning, with MLOps as the delivery layer, and every contact action shares one vocabulary with a prefilled subject.

Project content lives in Markdown files with validated frontmatter, so adding or editing a Project never requires touching layout code. Each Project carries a Publication Status; while a Repository is unpublished, the page omits the Repository entry, and flips to a real link when the URL is added. Every number shown is drawn from a single claims ledger, and each Project states exactly what the owner did and did not build. Every Project page also carries **Research & prior art**, **Approaches compared**, and **What I personally built**, so the page shows the reading and the rejected options, not only the final method. The full Project name is the page `<h1>`; a shorter `shortTitle` is used on cards, breadcrumbs, and previous/next navigation.

## User Stories

1. As a recruiter, I want to see who this person is and what they build within the first screen, so that I can decide in seconds whether to keep reading.
2. As a recruiter, I want one obvious action (download the CV or email), so that I do not have to hunt for a way to contact them.
3. As a recruiter on a phone, I want the layout to work at small widths, so that a link opened from LinkedIn is not a broken experience.
4. As a recruiter, I want the site to load fast on a poor connection, so that I do not abandon it.
5. As a technical interviewer, I want each Project to state the problem, the approach, and the result, so that I can form questions before the interview.
6. As a technical interviewer, I want to see the real metric with its name and context, so that I can trust the claims.
7. As a technical interviewer, I want an explicit statement of what the candidate personally built, so that I am not misled about team contributions.
8. As a technical interviewer, I want a link to the Repository where one exists, so that I can inspect the code.
9. As a technical interviewer, I want no dead links where code is not yet published, so that a missing link is never mistaken for a broken one.
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
38. As a technical interviewer, I want to see the papers and prior art behind a Project, so that I can judge whether the method is understood rather than copied.
39. As a technical interviewer, I want the alternatives that were considered and rejected, so that I can see the trade-offs rather than only the winner.
40. As a visitor whose browser has no mail handler, I want a visible address and a copy action, so that contact never dead-ends.

## Implementation Decisions

### Stack and rendering

- Astro 7 with Tailwind 4, fully static output. No server rendering, no client-side framework runtime. Interactive behaviour is limited to CSS and small vanilla scripts.
- Node 24 / npm 11 are the available toolchain; no pnpm requirement.
- The site is a single Astro project at the repository root.

### Content model

- One Markdown file per Project, stored under `src/content/projects/`, with a per-Project asset folder under `public/projects/<slug>/`.
- Frontmatter is validated at build time with a Zod schema. Required fields: title, summary, ownership, timeframe, stack (2+), problem, approach (2+), results (2+ name/value/context metrics), reflection, cover (`src` + `alt`), and order.
- Optional fields: `shortTitle`, `research` (1+ citation/takeaway items), `comparison` (2+ option/strengths/limits/verdict items), `contribution` (1+ strings), gallery images with alt text, Repository entries, `featured` (default `false`), and `draft` (default `false`). The current six Projects all provide `shortTitle`, `research`, `comparison`, and `contribution`; the contract test enforces that.
- `title` is the full Project name and becomes the page `<h1>` and metadata title. `shortTitle` is used on cards, the breadcrumb, and previous/next navigation. When `shortTitle` is absent, `title` is used everywhere.
- The Project page section order is Problem → Research & prior art → Approaches compared → Approach → What I personally built → Results → What I would do differently.
- Repository entries use the Publication Status vocabulary: `published`, `pending`, `private`.
- A Project with no `published` Repository renders no Repository entry at all. No placeholder `#` links are permitted.
- Prose fields support Markdown but not raw HTML.
- Project covers and cards use a 16:9 frame, so report plates and photographic covers share one proportion.

### Pages and navigation

- Routes: Home, Projects index, one page per Project, About, 404. Contact is a section on Home and a footer block, not a separate page.
- Header navigation: Home, Projects, About, Contact, and a CV action. The site name is “Medjahri Mohammed Safouane”; the logo links home.
- Home: identity block (name, role, positioning, availability), primary actions (email, projects, CV), a portrait index plate, three interest cards, four featured Projects, a "Show all projects" link, Experience, Skills & languages, a community block, and contact.
- Projects index: all six Projects as 16:9 cards ordered by a manual `order` field, each showing the short title, summary, and stack. The project page uses the full title as its `<h1>`, the short title in the breadcrumb, and the short titles in previous/next navigation. Each project page also renders Research & prior art, Approaches compared, and What I personally built.
- About: short narrative; Education; professional Experience; Leadership & extracurricular; Certifications & awards (only when the data list is non-empty); Skills & languages; What I bring to a team; CV download.
- The six Projects are Pocket OMR (1), Spell Caster (2), H-GATE (3), NASA Shuttle anomaly detection + MLOps (4), AdaIN style transfer (5), and Eigenfaces/Fisherfaces (6). Only 1 to 4 are `featured: true`.

### Visual system

- Palette: black base (`#09090b`), near-white text (`#f4f2ec`), one red accent (`#c8102e`), a lighter ember (`#ef5468`) reserved for small text that needs AA contrast, and neutral grays for rules and secondary text. No green, no CRT effects, no scanlines, no ambient audio.
- Typography: Archivo for display and UI, Newsreader italic for short editorial accents, Geist Mono for numeric data, metrics, and the small ordinal index labels on cards and lists. All three are self-hosted through Fontsource. No mono micro-labels or numbered section headings.
- Layout is compact and sectioned: soft-bordered panels on a dark field, generous but controlled spacing, and a 76rem measure. It follows the peer portfolio's section order without copying its light palette or card styling.
- Original umbrella mark drawn as an inline SVG. Capcom's Umbrella logo is not used.
- Custom 32 px canopy cursor as an SVG: an original 8-panel red/white umbrella canopy, not a trace of Capcom's Umbrella Corporation logo. It has a paper/red idle state and an ember/red state on links and buttons, is applied only under `(pointer: fine)` and only when reduced motion is not requested, and is disabled for touch. The hotspot is at the canopy centre.
- Dark-only. No theme toggle.
- Motion is limited to short hover/focus transitions, a slow ambient glow, a paused-on-hover stack ticker, a thin reading-progress bar, a cursor-following highlight on cards, a slow gradient on the given names, and reveal-on-scroll; all respect `prefers-reduced-motion` and remain legible without JavaScript.
- Covers are photographic, external, or real report figures. No self-generated system diagrams as covers; evidence charts may remain as charts. The current covers are thematic external photographs or gameplay frames; the photographer, source URL, and licence for each are recorded in `docs/project-facts.md`. When a report figure is displaced from the cover, it is kept in the gallery where it remains useful.

### Content rules

- The claims ledger in `docs/project-facts.md` is the only permitted source of numbers. Where the ledger records no number, the Project states none.
- Imbalanced classification reports report F1, precision, recall, or FPR; accuracy appears only where the ledger records accuracy for a balanced or well-specified setting.
- Every Project includes an ownership statement naming what the owner built and, where relevant, what a teammate built. The `contribution` section makes the split explicit.
- Spell Caster copy must say that the emotion head was LoRA-tuned while transcription uses the base Whisper-Small, and must not attribute the Unity game to the owner beyond “helped integrate the pipeline”. The site describes the project as two-person even though the course deck lists four authors.
- Pocket OMR copy states the team of six and the owner's scope: all six shared collection, cleaning, and annotation; the owner led the box-detection approaches, built the OpenCV rectification and segmentation stages, and trained the MobileNetV3-Small bubble classifier. CNN_OMR was the team's chosen classifier; the YOLOv8s end-to-end detector was a team comparison, not the owner's classifier.
- H-GATE copy states solo authorship and frames the result against a strong XGBoost baseline rather than claiming a decisive win. The course deck lists four authors, but the implementation was solo.
- NASA copy leads with the F1 0.979 result, then the production F1 collapse under injected drift and the automatic retrain trigger; it never claims 99% accuracy.
- AdaIN copy uses 150 ms at 512×512 on one T4 as a measured result; the 15 to 30 FPS at 256 px figure is labelled expected/planned.
- Face-recognition copy uses 54× fewer dimensions for the 75-component Eigenfaces model, and 99.0% at 39 dimensions for the Fisherfaces project result; never attach 54× to the 39-dimensional configuration.
- `research` is for papers and methods the Project actually builds on, each with a takeaway. `comparison` includes the rejected option, with strengths, limits, and a verdict. `contribution` names what the owner built and what a teammate built.
- Certifications and awards are a separate section, not entries in Experience or Leadership.
- The Contact block keeps the real `mailto:` link, shows the address as plain text, and offers a **Copy email** action. The copy path uses the Clipboard API with a hidden-textarea fallback, so a browser or local preview with no mail handler does not dead-end.

### Positioning

- The owner's focus is computer vision, NLP, and deep learning. Home's three interest cards, the hero focus label, About, and the Projects index use that vocabulary; MLOps is described as the delivery layer rather than a headline interest.
- Contact actions use `src/lib/contact.ts`, which prefills a subject: `Portfolio enquiry`, `PFE / internship enquiry`, or `Question about <Project>`. The contact block shows `Connect` and `View code` instead of raw handles; the handle stays in `aria-label` and `title`.
- Contact is the fourth header navigation item and a footer item, both pointing at `/#contact`.

### SEO, accessibility, privacy

- Per-page title, description, canonical URL, and Open Graph/Twitter metadata. One generated social preview image.
- `Person` structured data with name, job title, sameAs links (LinkedIn, GitHub).
- Sitemap and favicon generated at build.
- WCAG AA contrast for text and UI states; visible focus rings; semantic landmarks; alt text required for every image in the schema.
- No analytics, no cookies, no contact form backend, no third-party embeds.
- The website never prints the phone number; the contract test enforces its absence from every page. The linked CV PDF is a static asset outside that check. The current CV includes a phone number, and the owner will replace it with a version that omits it.

### Build guardrails

- Content schema validation fails the build on missing or malformed fields.
- A generated route exists for every Project; duplicate slugs fail the build.
- Images referenced in frontmatter must exist and be resolvable; missing files fail the build.
- Repository URL policy is enforced: `pending` and `private` entries cannot render as external anchors.

## Testing Decisions

Good tests here assert observable output, not implementation details: they build the site (or load content through the same schema the build uses) and check what a visitor would receive (routes, text, links, alt attributes) rather than inspecting component internals.

The highest seam is the **content-to-page contract**: one test suite loads every Project through the content schema, renders the routes, and asserts:

- every Project produces exactly one page at its slug;
- required fields are present and non-empty;
- every Project has at least one `research` item, at least two `comparison` items, and at least one `contribution` item;
- every Project page renders “Research & prior art”, “Approaches compared”, and “What I personally built”;
- the full `title` is the page `<h1>`, while `shortTitle` appears in the breadcrumb and on cards and previous/next navigation;
- `pending` and `private` Repositories produce no anchor elements and no Repository entry; `published` ones do;
- every image has non-empty alt text and a resolvable file;
- the site name appears on every page and the phone number appears nowhere;
- the LinkedIn handle never appears as visible text; LinkedIn and GitHub render as `Connect` and `View code` with `target="_blank"` and `rel="noopener noreferrer"`;
- the focus labels (computer vision, NLP, deep learning) appear on Home, About, and the Projects index;
- every page exposes `/#contact`, and contact links prefill a subject;
- the Contact block keeps a visible email address, a `mailto:` link, and a `Copy email` action with a copy-status line;
- six Projects exist, exactly four are featured, Home links those four plus "Show all projects", and the archive links all six;
- AdaIN and Eigenfaces/Fisherfaces are full pages with their headline claims;
- About separates Leadership from Experience and keeps Skills & languages visible;
- the legacy “Achievements”, “More work”, “Selected Projects”, and “Track record” surfaces are absent.

A second, thinner seam covers the content schema itself: malformed frontmatter is rejected with a useful message. These are the only two seams; no component-level or styling tests are planned.

Prior art: none. The repository started empty, so these tests establish the pattern. Vitest for the schema tests, with assertions made against built HTML output for the contract suite. Accessibility is checked manually with Lighthouse and a keyboard pass rather than automated.

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

- The source GitHub account was temporarily unreachable during planning (2FA recovery). Access has since been restored; the Publication Status mechanism remains so a Project can ship before its code is public, and adding a URL later is a one-line change per Project.
- The CV currently in `E:\All\Studies\Stage\cv_medjahri_mohammed_safouane.pdf` is the file to link at launch; the owner will replace it with a corrected version later.
- The visual direction is recorded in `docs/adr/0004-compact-portfolio-layout.md`, which supersedes the v2 layout in `docs/adr/0003-clinical-dossier-visual-system.md`; the original palette and mark decision remains in `docs/adr/0002-restrained-umbrella-theme.md`; the stack and content-source decision is in `docs/adr/0001-static-astro-site-with-local-content.md`; the canopy cursor, focus vocabulary, and contact actions are recorded in `docs/adr/0005-canopy-cursor-and-contact-actions.md`; the project-depth, full-name, cover-sourcing, and contact-fallback decisions are recorded in `docs/adr/0006-project-depth-and-cover-sourcing.md`.
- Information architecture follows the round-one agreement (Home / Projects index / individual Project pages / About with Education, Experience, Leadership, and Certifications / Contact). A single-page fallback is possible if the schedule collapses, but per-Project URLs are preferred because recruiters share links to individual Projects.
- The compact section order follows the peer portfolio at `sarra-zerguerras-portfolio.vercel.app` (identity, interests, featured work, experience, toolkit, community, contact), but the dark red visual system, typography, project pages, and content rules remain this site's own. `inas-soummar.vercel.app` was reviewed for coverage only. The layout decision is recorded in `docs/adr/0004-compact-portfolio-layout.md`.
- No issue tracker is configured in this workspace, so this spec lives at `docs/spec.md` and could not be labelled `ready-for-agent`.
