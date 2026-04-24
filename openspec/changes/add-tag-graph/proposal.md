## Why

The `/search` page (added in `add-site-search`) exposes Pagefind full-text search and tag filtering, but the tag dimension is currently just a filter dropdown — there is no visual representation of the tag landscape that lets users discover content by browsing relationships between topics. A force-directed graph where tag nodes are sized by post count and connected by co-occurrence gives users a spatial map of the site's knowledge structure. This is both a navigation aid and a differentiator that makes the site feel richer than a standard blog.

## What Changes

- **New `TagGraph` component** (`src/components/TagGraph.astro`) — renders a D3.js force-directed graph embedded above the Pagefind search bar on the `/search` page. Nodes = tags, radius ∝ post count. Edges = shared posts between tag pairs (co-occurrence). Clicking a node filters Pagefind to that tag using the JS API.
- **New JSON data endpoint** (`src/pages/tags-data.json.ts`) — build-time static endpoint that emits `{ nodes: [{id, count}], links: [{source, target, weight}] }`. Consumed by the graph at page load via `fetch("/tags-data.json")`.
- **D3.js v7** added as a runtime dependency (loaded from CDN or bundled). Used only on the search page.
- **`/search` page updated** to include `TagGraph` above the `#search` div.

## Capabilities

### New Capabilities

- `tag-graph`: Interactive force-directed D3.js graph on the search page. Nodes sized by post count, edges by tag co-occurrence weight, click-to-filter Pagefind integration, responsive for desktop (hidden or collapsed on mobile).

### Modified Capabilities

- `site-search`: The `/search` page gains a new graph UI section above the Pagefind input. Existing Pagefind behavior is unchanged. Search-page noindex and sitemap exclusion remain.

## Non-goals

- Adding the graph to pages other than `/search` (the sidebar/floating panel idea is deferred to a future iteration).
- Server-side rendering or dynamic updates — all data is computed at build time.
- Bilingual graph labels (tag names are language-neutral slugs already).
- Changing routing, frontmatter schema, or SEO metadata.

## Impact

- **New file**: `src/pages/tags-data.json.ts` — build-time endpoint, emits static JSON.
- **New file**: `src/components/TagGraph.astro` — D3 graph component.
- **Modified**: `src/pages/search.astro` — imports and renders `TagGraph`.
- **Dependency**: D3.js v7 — either `npm install d3` (bundled) or loaded via ESM CDN. Decision deferred to design phase.
- **SEO**: `/tags-data.json` is a data file, not a content page — excluded from sitemap filter. `/search` already noindexed.
- **Bilingual**: No routing or lang change. Graph is content-language-neutral.
- **Schema**: No `content.config.ts` changes.
