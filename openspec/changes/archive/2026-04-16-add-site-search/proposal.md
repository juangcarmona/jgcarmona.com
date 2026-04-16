## Why

jgcarmona.com has 130+ posts in two languages and no way to search them. Users landing from a search engine on one post have no path to discover related content. A `/search` page with full-text search and tag/language filtering closes this gap without requiring a backend or external service.

## What Changes

- Add `pagefind` as a build-time dependency for indexing and client-side WASM search
- Add a `/search` page with a search input, tag filter chips, language filter, and result list
- Add a "Search" link to `Header.astro`
- Annotate `BlogPost.astro` and `Page.astro` layouts with Pagefind data attributes (`data-pagefind-body`, `data-pagefind-ignore`, `data-pagefind-filter`) so the index is correctly scoped
- Run Pagefind indexer as a post-build step in `package.json`

## Capabilities

### New Capabilities

- `site-search`: Full-text search across all blog posts and static pages (`/about`, `/books`), with filtering by language (`en`/`es`) and tag. Served from a dedicated `/search` page. Index built at `astro build` time; no server or external API required.

### Modified Capabilities

*(none — no existing spec-level behavior changes)*

## Impact

- **SEO**: The `/search` page is client-rendered; search results are not indexable by crawlers. No impact on existing canonical URLs, OG tags, or sitemap. The page should be excluded from the sitemap or marked `noindex`.
- **Bilingual routing**: No impact. Pagefind filters on `lang` values derived from existing HTML `lang` attributes already set by `BlogPost.astro`.
- **Frontmatter schema**: No changes to `content.config.ts`.
- **Dependencies**: One new dev dependency (`pagefind`). No runtime external service.
- **Build pipeline**: `package.json` build script gains a `pagefind` post-indexing step.

## Non-goals

- Real-time / server-side search
- Search analytics or tracking
- Indexing of PDF or binary assets (e.g., book downloads)
- i18n UI strings for the search page (English-only UI is acceptable)
- Replacing or modifying the existing `/tags/` page
