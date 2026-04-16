## Context

The `/search` page currently exposes Pagefind full-text search and tag filters, but users must know what tag to filter by. There is no visual overview of the site's tag landscape. The goal is to add a force-directed D3.js graph above the Pagefind search bar — nodes are tags (radius ∝ post count), edges connect tags that co-occur in at least 2 posts (width ∝ co-occurrence count). Clicking a node loads tag-filtered results in-page using the raw Pagefind JS API.

This is a static-site addition: all graph data is computed at build time via a JSON endpoint and fetched at page load via `fetch()`.

## Goals / Non-Goals

**Goals:**
- Force-directed D3.js v7 graph on `/search` with nodes sized by post count
- Edges for tag pairs co-occurring in ≥2 posts, weighted by count
- Click-to-filter: selecting a node fetches and renders tag-filtered results below the graph using the raw Pagefind API
- Responsive: graph hidden on viewports narrower than 768px; Pagefind UI unaffected
- Theming via existing CSS variables (no hardcoded colors)

**Non-Goals:**
- Server-side rendering or WebSocket-based live updates
- Graph on any page other than `/search`
- Floating sidebar panel (deferred)
- Bilingual graph labels (tag slugs are language-neutral)
- Changing `/tags/*` pages, routing, or sitemap config

## Decisions

### D1: D3.js loading strategy — npm install vs. CDN

Options:
- **A) `npm install d3`** — bundled by Astro/Vite. Keeps CSP clean, no external requests at runtime, tree-shakeable.
- **B) ESM CDN** (esm.sh or jsdelivr) — zero install, but adds an external request and CSP complexity.

**Decision: `npm install d3`**. The site already uses Astro's build pipeline; adding D3 as a bundled dependency is consistent. The graph is on a single page — bundle split happens automatically. D3 v7 is ~57KB gzipped when tree-shaken.

### D2: Tag data delivery — JSON endpoint vs. inline script variable

Options:
- **A) `src/pages/tags-data.json.ts`** — static build-time endpoint, fetched at page load via `fetch('/tags-data.json')`.
- **B) Inline in `search.astro`** — data embedded as a JS variable in a `<script>` tag, no network request.

**Decision: JSON endpoint (A)**. Cleaner separation. The graph script can be a proper ES module rather than inline HTML. The extra HTTP request for a ~2KB JSON payload is negligible. Also makes the data independently inspectable for debugging.

### D3: Pagefind integration — UI control vs. raw API vs. navigate

Three approaches to "click node → show filtered results":
- **A) Pagefind raw API** — `import('/pagefind/pagefind.js')` → `pagefind.search("", { filters: { tag: [name] } })` → render results in a dedicated `#graph-results` div. Pagefind UI remains for free-text search. The two coexist as parallel search surfaces.
- **B) PagefindUI programmatic control** — manipulate the UI's filter state externally. Not documented, brittle.
- **C) Navigate to `/tags/{name}`** — full-page navigation, no Pagefind needed. Simple but disrupts the single-page UX.

**Decision: Raw Pagefind API (A)**. Graph-triggered results render in `#graph-results` below the graph. Free-text search continues via PagefindUI above. Clear separation. No coupling between the two surfaces.

### D4: Edge threshold — which co-occurrences to draw

Drawing every tag pair that shares even 1 post creates a hairball. Threshold options: 1, 2, 3.

**Decision: ≥ 2 co-occurrences**. After the taxonomy standardization (a prerequisite), most singletons will be absorbed. At ≥2, the graph shows genuine thematic clusters (e.g., `maf`↔`ai`, `devex`↔`docker`, `sw-craftsmanship`↔`sw-architecture`) without visual noise.

### D5: Node radius function

`radius = BASE + (count / maxCount) * SCALE` where `BASE = 8`, `SCALE = 28`.
- Minimum radius: 8px (a tag with 1 post)
- Maximum radius: 36px (the most-tagged post, expected to be `sw-craftsmanship` ~80+ after standardization)
- Labels inside nodes for radius ≥ 18; tooltip for smaller nodes

## Risks / Trade-offs

- [Risk: D3 increases bundle size] ~57KB gzipped for tree-shaken D3 simulation + selection → Mitigation: Astro splits the search page bundle separately. Impact is isolated to `/search`.
- [Risk: Raw Pagefind API path] The raw API is at `/_pagefind/pagefind.js`; this path was confirmed working in the `add-site-search` build. Must be dynamic import (not static) to avoid build-time resolution.
- [Risk: Graph is meaningless before taxonomy standardization] If applied before `standardize-taxonomy`, nodes include junk singletons → Mitigation: note in tasks.md that `standardize-taxonomy` should be applied first, or at minimum the build run after it.
- [Risk: Mobile users see incomplete page] Graph hidden on mobile could confuse users who know it exists → Mitigation: add a small text note "Tag graph available on larger screens" below the search box on mobile (CSS `display: block` only on narrow viewports).

## Migration Plan

1. `npm install d3`
2. Create `src/pages/tags-data.json.ts`
3. Create `src/components/TagGraph.astro`
4. Update `src/pages/search.astro` to import and render `TagGraph`
5. Add sitemap filter exclusion for `/tags-data.json`
6. `npm run build` → verify graph renders, verify `/tags-data.json` is in `dist/`
7. `npm run preview` → visual smoke test
