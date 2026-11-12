# Clinical-dossier visual system for v2

The v2 redesign replaces the v1 layout, which followed the peer portfolios too closely (numbered section labels, monospace micro-labels, boxed cards, a background grid, and “Selected Projects”). The new direction is a **clinical dossier**: black and near-white with one red accent, an editorial type hierarchy, horizontal rules instead of boxes, and a small original umbrella mark as the only heraldic element. The content and honesty rules from v1 stay unchanged.

## Decisions

### Typography

- **Archivo** for display and UI. It has a wide, slightly technical grotesque texture that supports oversized headlines without looking like a default system font.
- **Newsreader italic** for short editorial accents (a clause in the hero, the About pull-quote, the contact heading). It introduces warmth and a print-dossier feel that the peer portfolios do not use.
- **Geist Mono** only for numeric data and metrics. Monospace is no longer used for labels, metadata, or navigation.
- All three are self-hosted with Fontsource, so there is no external font request and no layout shift from a third-party stylesheet.

Rejected: Inter plus JetBrains Mono (the v1 pairing, and the default look of many generated portfolios); a single display face with no italic counterpoint; system fonts (too little character for the oversized display treatment).

### Layout

- Section headings are plain language at display scale, separated by 1px rules. No `01`, `STACK`, `MORE`, or other numbered/mono section labels.
- Project cards are open compositions: a 16:9 image, title, summary, and a single metadata line. No bordered card, no tag pills, no background panel.
- The project page is a two-column dossier on desktop: narrative and evidence on the left, ownership/timeframe/stack/repository on the right. On mobile the sidebar follows the narrative.
- Home leads with a three-line name, a serif-accented positioning sentence, two actions, and a Dossier facts panel. The four featured Projects come next, then “Show all 6 projects”, Experience, Skills & languages, and contact.
- The page background is flat. The v1 grid texture and boxed sections are gone.

### Colour and mark

The palette keeps ADR-0002’s black, near-white, and single-red premise. The void was tuned from `#080809` to `#09090a`; paper is `#f3f1ea`, blood `#c8102e`, and `#e8455a` ember is reserved for small text that needs AA contrast. The umbrella mark remains an original inline SVG; Capcom’s logo is still out of bounds. The cursor is a 32px umbrella drawn in the same language, with its hotspot at the canopy tip, and is applied only for fine pointers when reduced motion is not requested.

### Content shape

- Six Projects, four featured. AdaIN style transfer and Eigenfaces/Fisherfaces are promoted from “more work” to full pages; “More work” and the Achievement timeline are retired.
- About now separates Education, Experience, Leadership & extracurricular, and Certifications & awards. The Certifications section is hidden while its data list is empty. Skills & languages stay visible on both Home and About.
- Covers are photographic or real report figures. H-GATE uses a NERSC data-centre photograph (CC0); NASA uses the STS-132 launch photograph (public domain); AdaIN and the face-recognition project use figures from their reports. Self-generated system diagrams are no longer used as covers.
- Project cards and covers share a 16:9 frame so report plates and photographs display without destructive cropping.

## Consequences

- The v2 layout below is superseded for layout and card treatment by ADR-0004 (compact portfolio layout). The palette premise, type families, mark, and content rules below still stand; ADR-0004 tunes the palette values and permits small numeric index labels. The cursor is superseded by ADR-0005, which replaces the outline umbrella with an original 8-panel canopy and records the focus and contact vocabulary.
- The site no longer shares the section order or visual grammar of `inas-soummar.vercel.app`; only the audience-facing coverage (identity, Projects, skills, experience, contact) overlaps. ADR-0004 deliberately adopts the compact section order of `sarra-zerguerras-portfolio.vercel.app` while keeping this site's dark visual system.
- The type system needs three font families and a deliberate hierarchy; adding a new section means choosing a heading scale and rule treatment rather than dropping in a card component.
- Report-derived covers are denser than photographs, especially at 360px. They are kept because they are real evidence and because a synthetic cover would violate the “no generated diagrams” rule.
- The claims ledger remains authoritative. In particular, AdaIN’s 150 ms at 512×512 is measured while 15 to 30 FPS at 256px is expected; the 54× reduction belongs to the 75-component Eigenfaces model, not the 39-dimensional Fisherfaces configuration.
