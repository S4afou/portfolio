# 10: Content-to-page contract tests and build guardrails

**What to build:** The two agreed seams, enforced by tests. One seam validates content before it can render; the other validates what a visitor actually receives from the built site. The suite must fail if the site starts lying, a dead Repository link, a missing image, an excluded Project leaking back in, or the phone number appearing.

**Blocked by:** 09, Sharing, SEO and accessibility pass

**Status:** done

- [x] Malformed frontmatter is rejected with a message naming the offending field
- [x] Every Project produces exactly one page at its slug
- [x] Pending and private Repositories produce no anchors; published ones do
- [x] Every referenced image resolves and has non-empty alt text
- [x] The phone number appears nowhere in the built output
- [x] Zmala, Dirassati, the MPI cluster and the Olympics dashboard appear nowhere
- [x] The full name appears on every page
- [x] A duplicate slug or a missing image fails the build
- [x] The full suite passes from a clean install
