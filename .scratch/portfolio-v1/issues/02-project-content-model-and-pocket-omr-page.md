# 02: Project content model and the Pocket OMR page

**What to build:** The first complete Project page, plus the validated content model every later Project reuses. A single Markdown file produces a shareable page for Pocket OMR containing the summary, ownership, timeframe, stack, problem, approach, metrics, reflection, cover image, gallery and Repository entries. A Project whose code is not public shows a publishing badge instead of a dead link. Malformed content fails the build with a message that names the missing field.

**Blocked by:** 01 — Foundation and visual system

**Status:** done

- [x] The Pocket OMR page is reachable at its own URL and renders every required section
- [x] Required frontmatter is enforced; a missing or malformed field fails the build with a useful message
- [x] Published numbers match the claims ledger: mAP@50 99.5, bubble F1 98.31, and the rejected detector's 30.2% answer accuracy
- [x] Ownership states the team of six and the owner's exact scope
- [x] A pending Repository renders a non-interactive publishing badge and produces no anchor
- [x] Every image resolves, carries alt text and shows its caption
- [x] The page is readable at 360 px
- [x] The page has its own title and description metadata
