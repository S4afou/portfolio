# Project depth, full names, and cover sourcing

The six Project pages told the problem, the method, and the result, but they did not show the reading
behind the method, the alternatives that were rejected, or the exact split between the owner's work and
a teammate's. The page titles were also short labels, while the Projects have full names that say what
they are. The covers were a mix of report plates and one server-rack photograph, and the contact block
could dead-end on a machine with no mail handler.

## Decisions

- **Three structured sections.** Every Project page renders **Research & prior art**, **Approaches
  compared**, and **What I personally built**. `research` is a list of citation/takeaway items,
  `comparison` is a list of option/strengths/limits/verdict items, and `contribution` is a list of the
  owner's concrete work. The fields are optional in the Zod schema so a future Project can ship
  before the copy is ready, but the contract test requires them on the current six.
- **Full title, short title.** `title` is the full Project name and becomes the page `<h1>` and the
  metadata title. `shortTitle` is used on cards, the breadcrumb, and previous/next navigation. When
  `shortTitle` is absent, `title` is used everywhere. This keeps long names readable on a project page
  without forcing them into every card.
- **Thematic covers from the internet.** The six covers are now external photographs or real gameplay
  frames chosen to match each Project: a malicious-file warning for H-GATE, a bubble sheet for Pocket
  OMR, an ice-cast frame for Spell Caster, the STS-132 flight deck for Shuttle, Van Gogh's *Wheatfield
  with Crows* for AdaIN, and a black-and-white portrait for Eigenfaces. Each source, photographer, and
  licence is recorded in `docs/project-facts.md`. Covers are exported at 1600×900 WebP under ~300 KB.
- **Keep useful report figures.** When a report figure was displaced from the cover, it moved into the
  gallery rather than disappearing: the AdaIN 6×6 output grid, the Eigenfaces subject plate, the Spell
  Caster fireball frame, and the Pocket OMR segmentation plate. The cover is allowed to be thematic;
  the evidence stays on the page.
- **Contact fallback.** The Contact block keeps the real `mailto:` link, shows the address as plain
  text, and adds a **Copy email** button. The button uses the Clipboard API and falls back to a
  hidden-textarea `document.execCommand('copy')` when the API is unavailable. A local preview with no
  registered mail handler therefore still gives the visitor a way to reach the owner.
- **Ownership corrections.** H-GATE is solo and Spell Caster is two-person, even though their course
  decks list four authors. Pocket OMR is a team of six; the owner led the box-detection approaches,
  built the OpenCV rectification and segmentation stages, and trained the MobileNetV3-Small bubble
  classifier. CNN_OMR was the team's chosen classifier and the YOLOv8s end-to-end detector was a team
  comparison. The site copy and `docs/project-facts.md` record those splits.

## Consequences

- Project pages are longer. The reading, comparison, and contribution sections add depth, but they also
  add maintenance: a new citation or a changed ownership line has to be updated in the Markdown file
  and, when it introduces a number, in `docs/project-facts.md`.
- The comparison section is only useful if it includes the option that lost. A page with only the
  winner is a sales pitch; the tests cannot enforce judgement, so the content guide states the rule.
- External covers need a licence record. Unsplash and Pexels images are free to use under their
  respective licences; Wikimedia Commons images are public domain or carry a licence that must be
  checked. The source list in `docs/project-facts.md` is the audit trail.
- The copy button adds a small client-side script. It is progressive enhancement: the `mailto:` link
  and the visible address work without JavaScript, and the status line is an `aria-live` region.
- The full title is also the metadata title, so a long name produces a long `<title>` and Open Graph
  title. That is intentional: the page should be identifiable when shared.
