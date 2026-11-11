# 10: Content-to-page contract tests and build guardrails

**What to build:** The two agreed seams, enforced by tests. One seam validates content before it can render; the other validates what a visitor actually receives from the built site. The suite must fail if the site starts lying — a dead Repository link, a missing image, an excluded Project leaking back in, or the phone number appearing.

**Blocked by:** 09 — Sharing, SEO and accessibility pass

**Status:** ready-for-agent

- [ ] Malformed frontmatter is rejected with a message naming the offending field
- [ ] Every Project produces exactly one page at its slug
- [ ] Pending and private Repositories produce no anchors; published ones do
- [ ] Every referenced image resolves and has non-empty alt text
- [ ] The phone number appears nowhere in the built output
- [ ] Zmala, Dirassati, the MPI cluster and the Olympics dashboard appear nowhere
- [ ] The full name appears on every page
- [ ] A duplicate slug or a missing image fails the build
- [ ] The full suite passes from a clean install
