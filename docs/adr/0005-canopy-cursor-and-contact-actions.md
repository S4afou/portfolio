# Canopy cursor, focus positioning, and contact actions

The v3 layout kept the v1/v2 umbrella cursor, described the owner's interests as computer vision,
speech & NLP, and evaluation & MLOps, and used three different labels for the same mailto action. The
owner asked for an Umbrella-Corp-style canopy cursor, a focus statement centred on computer vision,
NLP, and deep learning, and contact actions that read as one system.

## Decisions

- **Canopy cursor.** The cursor is an original 8-panel red/white umbrella canopy drawn for this site,
  not a trace of Capcom's Umbrella Corporation logo. It has two states: paper/red on the page and
  ember/red on links and buttons. The hotspot is the canopy centre. It is applied only under
  `(pointer: fine)` and only when reduced motion is not requested.
- **Focus positioning.** Home, About, the Projects index, and the site description name computer
  vision, NLP, and deep learning as the focus areas. MLOps remains a supporting practice, not a
  headline interest. The focus copy lives in `src/lib/focus.ts`; the Home section note calls MLOps the
  delivery layer.
- **Contact actions.** Every mailto action uses `src/lib/contact.ts`, which prefills a subject:
  `Portfolio enquiry`, `PFE / internship enquiry`, or `Question about <Project>`. The Contact block
  shows `Connect` and `View code` instead of raw handles; the handle stays in `aria-label` and
  `title`. Contact is a header and footer navigation item pointing at `/#contact`.
- **Navigation.** Contact joins Home, Projects, and About. The header still fits at 320 px without
  horizontal overflow.

## Consequences

- The cursor is rounder and larger than the old outline, and its hotspot is the canopy centre rather
  than the tip.
- The cursor clauses in ADR-0002 and ADR-0003 are superseded. The original umbrella mark itself is
  unchanged, and Capcom's logo is still not used.
- `docs/spec.md`, `README.md`, `docs/CONTENT.md`, and `GLOSSARY.md` describe the focus vocabulary and
  the contact helper.
- The contract test asserts that the raw LinkedIn slug never appears as visible text, external links
  keep `target` and `rel`, the focus labels appear on Home, About, and Projects, and every page
  exposes `/#contact`.
