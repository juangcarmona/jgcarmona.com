## Why

The blog has two parallel taxonomy systems: `tags[]` (schema-enforced, powering `/tags/*` pages, Pagefind filters, RSS) and `categories[]` (a ghost field silently ignored by Astro, leftover from WordPress migration, powering nothing). Tags also suffer from a vocabulary problem: 74 posts share the generic `software` tag (meaningless signal), dozens of topically related DevEx posts have no shared tag to surface them as a cluster, singleton tags add noise, and `security` duplicates `cybersecurity` inconsistently. Fixing this now — while the site has <200 posts — avoids compounding debt as content grows.

## What Changes

- **Remove `categories[]`** from all post frontmatter (~100 files). Field was never functional post-migration. No schema change needed (Astro already ignores it).
- **Rename `software` → `sw-craftsmanship`** across all 74 tagged posts. Better signal for the SOLID/GRASP/patterns/testing content it actually describes.
- **Merge `security` → `cybersecurity`** (2 posts). Eliminate the duplicate.
- **Define controlled tag vocabulary** (14 canonical tags). All future tagging follows this list.
- **Introduce `devex` tag** and backfill ~35–40 posts. DevEx = "everything that makes the developer's experience better" — tooling, environment, coding practices, clean code, workflow, AI-assisted dev, testing.
- **Collapse singletons** (`network-architecture`, `local-llm`, `self-hosting`, `home-assistant`, `home-automation`, `dns`, `dotnet`, `azure-entra-id`, `authentication`, `aspire`, `identity`, `wireguard`, `resilience`) into existing canonical tags or drop where no parent tag fits.
- **Tag untagged posts** (~130 posts currently have neither `tags` nor `categories`; all get at least one canonical tag).

## Capabilities

### New Capabilities

- `tag-vocabulary`: Canonical controlled vocabulary of 14 tags with definitions. Used as the authoring contract for all future content. Defines which posts belong to `devex` and `sw-craftsmanship`.

### Modified Capabilities

- `site-search`: Pagefind tag filters become more useful — `devex` and `sw-craftsmanship` are now filterable dimensions. No code change; purely a data-quality improvement that benefits the existing implementation.

## Non-goals

- Adding `categories[]` to the Astro schema — this change removes categories entirely.
- Building `/categories/*` pages.
- Changing routing, lang detection, or bilingual behavior.
- Modifying `content.config.ts` schema (tags[] is already optional).

## Impact

- **~130 frontmatter files** touched (tags added/renamed/removed).
- **~100 frontmatter files** lose `categories[]` block.
- **No TypeScript changes** — schema is already correct.
- **SEO**: New `/tags/devex` and `/tags/sw-craftsmanship` pages appear after build. Existing tag pages gain more posts. No canonical URL changes.
- **Sitemap**: New tag pages are auto-included. No sitemap config change needed.
- **Bilingual**: No routing change. Both ES and EN posts will receive tags from the canonical vocabulary.
