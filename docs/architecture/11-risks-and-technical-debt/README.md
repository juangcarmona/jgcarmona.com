---
title: Risks and technical debt
arc42-section: "11"
description: Known risks and accepted debt.
---

# 11. Risks and technical debt

## Risks

- Redirect pages are meta refreshes, not HTTP 301; search engines treat them as permanent, but some tools report them as 200.
- No Content Security Policy is set yet.
- The branch pattern of the Lighthouse guard requires an issue number; branches without one fail the pre-push hook.

## Technical debt

- Images lost in the WordPress migration: references to `/wp-content/` that could not be recovered are removed from articles.
- Older articles (2012–2015) have thin content and an inconsistent tag taxonomy; curation is out of scope of the current change.
- Many hero images are 2–4 MB PNG sources; Astro optimises the output, but the repository stays large.
