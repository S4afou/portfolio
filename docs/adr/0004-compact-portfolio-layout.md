# Compact portfolio layout

The v2 clinical-dossier layout was distinctive but too tall and too quiet: a three-line name at up to 7.5rem, 5rem project titles, and long ruled sections that read like a document rather than a portfolio. The owner asked for the section order and density of `sarra-zerguerras-portfolio.vercel.app`, smaller home and project headings, and a more alive surface.

This ADR keeps the v2 identity (dark-only palette, Archivo/Newsreader/Geist Mono, original umbrella mark, red accent) and changes the layout grammar.

## Decisions

- **Compact section order.** Home is identity → stack ticker → what I'm exploring → featured work → experience → skills → community → contact. The Projects index and About keep their own routes.
- **Smaller type.** Hero name is `clamp(2.6rem, 5.6vw, 4.6rem)`, page titles `clamp(2.3rem, 4.6vw, 3.8rem)`, project titles `clamp(2rem, 4vw, 3.2rem)`, section titles `clamp(1.5rem, 2.6vw, 2.1rem)`. The name is two lines, with the given names in Newsreader italic.
- **Soft panels.** Project cards, metrics, toolkit groups, and the project sidebar use one shared `.card` surface with a hairline border and a red-tinted hover. Images stay 16:9.
- **Ambient life.** A fixed pair of radial glows, a masked grid, a subtle noise layer, a stack ticker, a portrait index plate, reveal-on-scroll, a thin reading-progress bar, a slow-shifting gradient on the given names, and a cursor-following highlight on cards. All motion is disabled under `prefers-reduced-motion`; without JavaScript the reveal layer stays visible.
- **Tuned palette.** The void moves to `#09090b`, paper to `#f4f2ec`, and ember to `#ef5468`; `#c8102e` stays the blood accent. The one-accent premise from ADR-0002 is unchanged.
- **Numeric index labels.** Geist Mono stays reserved for data, and small ordinal labels (`01`, `02`) are permitted on Project cards, interest cards, research items, approach steps, and working-style cards. Section headings remain plain language with no numbered or mono labels.
- **Project navigation.** Each Project page ends with previous/next Project cards, alongside the archive link and contact action.
- **One live accent.** Red remains the only chromatic accent. Hover, active nav, the availability pulse, and numeric rules use it; nothing else introduces a second hue.
- **Unpublished code is omitted.** A Project with no `published` Repository shows no Repository entry. The page never displays "publishing soon" or a disabled link. The frontmatter status stays because it still controls the build guardrail.

## Consequences

- The home page is longer than v2 but denser: more sections, smaller headings, and a card grid instead of oversized open rules.
- The layout now shares a section order with the Sarra Zerguerras portfolio; it does not share its light palette, typography, or card treatment. `inas-soummar.vercel.app` remains a coverage reference only.
- `docs/spec.md` was updated where it described the Dossier panel, "typographic rather than boxed" layout, and publishing-soon badge.
- The contract test now asserts that an unpublished Repository appears nowhere on its Project page, rather than asserting a badge.
