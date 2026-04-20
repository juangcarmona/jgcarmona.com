## 1. Dependencies & Data Endpoint

- [x] 1.1 Run `npm install d3` to add D3.js v7 as a runtime dependency.
- [x] 1.2 Create `src/pages/tags-data.json.ts` — build-time static endpoint. Use `getCollection('blog')` to compute tag counts and co-occurrence links (threshold ≥ 2). Output `{ nodes: [{id, count}], links: [{source, target, weight}] }`.
- [x] 1.3 Add `/tags-data.json` to the sitemap exclusion filter in `astro.config.mjs` (alongside the existing `/search` exclusion).
- [x] 1.4 Run `npm run build` and verify `dist/tags-data.json` exists and is valid JSON with non-empty `nodes` and `links` arrays.

## 2. TagGraph Component

- [x] 2.1 Create `src/components/TagGraph.astro` with `interface Props` (no required props — data fetched internally via JS).
- [x] 2.2 Add the SVG container element with `id="tag-graph"` and a CSS class that hides it below 768px viewport width.
- [x] 2.3 Add `#graph-results` div below the SVG — hidden by default, shown when a node is clicked.
- [x] 2.4 Add a `<script>` block that:
  - On load, fetches `/tags-data.json`
  - Imports D3.js (force simulation: `forceSimulation`, `forceLink`, `forceManyBody`, `forceCenter`, `forceCollide`)
  - Renders nodes (circles) with radius `= 8 + (count / maxCount) * 28`
  - Renders edges (lines) with stroke-width `= 1 + weight`
  - Adds node labels (text) for nodes with radius ≥ 18px
  - Adds SVG title tooltip for nodes with radius < 18px (format: `{tag} ({count} posts)`)
- [x] 2.5 Apply CSS variable theming: node fill `var(--accent)`, edge stroke `var(--gray-light)`, SVG background `var(--bg-color)`.
- [x] 2.6 Implement node click handler:
  - Highlight clicked node (reduce opacity of all other nodes to 0.3)
  - Click same node again → deselect (restore full opacity, clear `#graph-results`)
  - On selection: dynamic-import `/_pagefind/pagefind.js`, call `pagefind.search("", { filters: { tag: [tagName] } })`, render results in `#graph-results` (title + excerpt per result)
- [x] 2.7 Add responsive CSS: `@media (max-width: 767px) { #tag-graph { display: none; } }` and a narrow-viewport hint text "Tag graph available on larger screens" (shown only on narrow viewports).
- [x] 2.8 Add `mobile-hint` CSS class that is hidden on viewports ≥ 768px, visible below.

## 3. Search Page Integration

- [x] 3.1 Import `TagGraph` in `src/pages/search.astro` and render it above the `#search` div.
- [x] 3.2 Verify the page layout is: `BaseHead → Header → <main> → TagGraph → <div id="search"> → Footer`.
- [x] 3.3 Ensure no layout overflow issues — the graph SVG should be `width: 100%` and `height: clamp(300px, 40vh, 500px)`.

## 4. Verification

- [x] 4.1 Run `npm run build && npm run preview`.
- [ ] 4.2 Open `/search` in a desktop browser — confirm graph renders with tag nodes of varying sizes.
- [ ] 4.3 Confirm clicking a tag node populates `#graph-results` with tagged posts.
- [ ] 4.4 Confirm clicking the same node again clears the results.
- [ ] 4.5 Confirm free-text search via Pagefind UI remains functional alongside the graph.
- [ ] 4.6 Confirm graph is hidden on a narrow viewport (≤ 767px) and mobile hint text appears.
- [x] 4.7 Confirm `/tags-data.json` is absent from the sitemap.
- [ ] 4.8 Confirm dark mode toggles graph node and edge colors correctly.
