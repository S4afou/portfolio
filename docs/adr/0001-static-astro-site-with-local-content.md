# Static Astro site with local content files

The site is a statically built Astro + Tailwind project whose content lives in Markdown files inside the repository. GitHub was unreachable during planning (2FA lockout) and the owner has no frontend experience, so nothing may depend on the GitHub API or a CMS login, and adding a project must never require editing layout code. Content files also keep a project's prose, metrics and images reviewable in a single diff.

Considered options: Next.js (more runtime surface than a content site needs), build-time GitHub API fetching (dead until account recovery, and it would put commit metadata ahead of the project's story), and a headless CMS (an extra account and dependency for a single author).
