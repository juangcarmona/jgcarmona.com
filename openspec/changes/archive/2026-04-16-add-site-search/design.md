## Context

jgcarmona.com is a fully static Astro 5.x site with no backend, no database, and no external APIs. It has 130+ bilingual blog posts (`lang: en` or `lang: es`) and two static content pages (`/about`, `/books`). There is no existing search capability. A `posts.json.ts` endpoint exists but is unused and incomplete (missing `tags` and `lang` fields).

The site is deployed as an Azure Static Web App. All routes are pre-rendered at build time.

## Goals / Non-Goals

**Goals:**
- Deliver full-text search across all post body content — not just titles and descriptions
- Support filtering by language (`en`/`es`) and by tag
- Keep the solution fully static: no server, no external search service, no API keys
- Introduce exactly one new dependency (`pagefind`)

**Non-Goals:**
- Real-time or server-side search
- Search analytics
- Indexing binary assets (PDFs)
- Internationalized search UI strings
- Replacing the `/tags/` browse page

## Decisions

### Decision 1: Pagefind as the search engine

**Chosen**: `pagefind` (CloudCannon)

**Rationale**: Pagefind is the only tool that satisfies all three constraints simultaneously — full-text indexing, static deployment, and bilingual support — without an external service. It crawls the built HTML, produces a chunked binary index with WASM-based client-side querying, and has a first-class filter API for structured fields like `lang` and `tag`. It is the tool recommended in official Astro documentation.

**Alternatives considered**:
- *Fuse.js + posts.json*: client-side fuzzy search only over titles/descriptions, not body text. Would require extending `posts.json.ts` and still would not achieve full-text.
- *Algolia / Typesense*: requires an external service, API key management, and a data sync pipeline. Violates the static-only constraint.
- *Lunr.js*: no longer actively maintained; no built-in filter API; index must be manually constructed.

---

### Decision 2: Build pipeline — pagefind runs after `astro build`

**Chosen**: Modify `package.json` build script to `astro build && pagefind --site dist`

**Rationale**: Pagefind must crawl the fully rendered `dist/` output. Chaining it in `package.json` is the standard pattern, keeps it visible, and works with Azure Static Web App deployment pipelines without additional CI changes.

---

### Decision 3: HTML annotation strategy — data attributes on layout components

**Chosen**: Add `data-pagefind-body` to the `<article>` (or equivalent prose wrapper) in `BlogPost.astro` and `Page.astro`. Add `data-pagefind-ignore` to `<header>` and `<footer>` elements in those layouts. Add `data-pagefind-filter` attributes for `lang` and per-tag values on the indexed element.

**Rationale**: Annotating at the layout level means every existing and future post is correctly indexed without touching individual content files. `data-pagefind-filter` on multiple tags requires one attribute per tag value; Pagefind supports repeated filter attributes on sibling elements or via a JSON string — the simplest approach is inline `data-pagefind-filter="tag:<value>"` elements hidden visually but present in the DOM.

---

### Decision 4: Dedicated `/search` page, not a modal

**Chosen**: A standalone `src/pages/search.astro` page.

**Rationale**: A Google-style search experience was explicitly chosen. A dedicated page is simpler to implement in Astro SSG (no client-side overlay state management needed), is linkable, and can be reached from the header nav. It uses the standard `BaseHead → Header → <main> → Footer` layout chain.

The Pagefind UI widget is loaded client-side via `<script>` and `<link>` tags pointing to `/_pagefind/pagefind-ui.js` and `/_pagefind/pagefind-ui.css`. The page renders a container `<div id="search">` and initializes `PagefindUI` in a `<script>` block.

---

### Decision 5: `posts.json.ts` — leave in place

**Chosen**: Do not modify or delete `posts.json.ts`.

**Rationale**: Its purpose is unclear (possibly for future external integrations). It does not conflict with Pagefind. Removing it is a separate, unrelated change.

---

### Decision 6: Search page excluded from sitemap and marked noindex

**Chosen**: Pass `noindex: true` or equivalent to `BaseHead.astro`, and ensure the sitemap integration excludes `/search`.

**Rationale**: Client-rendered search result pages provide no SEO value and should not be crawled. Astro's `@astrojs/sitemap` can exclude paths via its `filter` config option in `astro.config.mjs`.

## Risks / Trade-offs

- **Index size at scale**: With 130+ long-form posts, the Pagefind index may be several MB. Pagefind chunks the index and loads fragments lazily, so only the chunks matching the query are fetched. This is acceptable for a personal blog.  
  → Mitigation: no action needed; Pagefind's chunking handles this by design.

- **Build time increase**: `pagefind --site dist` adds a crawl step after build. For 130+ HTML files this is typically under 10 seconds.  
  → Mitigation: acceptable; flag in tasks for measurement.

- **Tag filter rendering**: Posts can have many tags. Rendering all tags as interactive chips may be unwieldy if the tag set is large (the repo has 50+ distinct tags). Pagefind's `PagefindUI` component handles filter display but may need CSS constraints.  
  → Mitigation: limit displayed tag chips in the UI to the top N by frequency, matching the existing homepage behavior (top 12 tags).

- **`data-pagefind-filter` per-tag approach**: Pagefind requires one filter attribute per tag value on an indexed element. This means either hidden `<span>` elements or a JSON-encoded filter string. The hidden `<span>` approach is simpler but adds DOM nodes.  
  → Mitigation: use `data-pagefind-filter` on hidden `<span>` elements inside `data-pagefind-body`; visually hidden with CSS.

## Migration Plan

1. Install `pagefind` as a dev dependency
2. Annotate `BlogPost.astro` and `Page.astro` with Pagefind data attributes
3. Update `package.json` build script
4. Create `src/pages/search.astro`
5. Update `astro.config.mjs` sitemap filter to exclude `/search`
6. Update `Header.astro` to add the Search nav link
7. Run `npm run build` and verify `dist/_pagefind/` is generated and search works

**Rollback**: Remove the `pagefind` step from the build script and the `/search` page. No other files are structurally changed.

## Open Questions

- Should the `search` link in `Header.astro` use a search icon (🔍) or plain text "Search"? Consistent with existing header links (plain text), but a search icon is conventional.
- Should URL query params (`?q=term&lang=en`) be supported so search results are shareable/linkable? Pagefind's UI widget does not support this out of the box; would require custom JS.
