## ADDED Requirements

### Requirement: Search index is built at build time
The system SHALL generate a full-text search index over all published blog posts and static pages (`/about`, `/books`) as part of the `astro build` step. The index SHALL be produced by running `pagefind` against the built HTML output in `dist/`. No runtime server or external API SHALL be required.

#### Scenario: Index is generated after build
- **WHEN** the build command (`npm run build`) completes
- **THEN** a `dist/_pagefind/` directory exists containing the Pagefind index files

#### Scenario: All blog posts are indexed
- **WHEN** a blog post exists in `src/content/blog/`
- **THEN** its title, description, and full body text are included in the search index

#### Scenario: Static pages are indexed
- **WHEN** `about.md` or `books.md` is rendered during build
- **THEN** their content is included in the search index

#### Scenario: Header and footer are excluded from index
- **WHEN** Pagefind crawls a page
- **THEN** content inside `<header>` and `<footer>` elements (marked `data-pagefind-ignore`) is NOT included in search results

---

### Requirement: Language filter is available
The search index SHALL expose a `lang` filter derived from each post's `lang` frontmatter field (`'en'` or `'es'`). The filter SHALL be set via `data-pagefind-filter="lang:<value>"` on the indexed content element.

#### Scenario: Filter by English content
- **WHEN** a user selects the "EN" language filter on the search page
- **THEN** only posts with `lang: en` appear in results

#### Scenario: Filter by Spanish content
- **WHEN** a user selects the "ES" language filter on the search page
- **THEN** only posts with `lang: es` appear in results

#### Scenario: No language filter selected
- **WHEN** a user performs a search without selecting a language filter
- **THEN** results from both `en` and `es` posts are returned

---

### Requirement: Tag filter is available
The search index SHALL expose a `tag` filter for each tag value in a post's `tags[]` frontmatter field. Multiple tags per post SHALL each be registered as a separate filter value via `data-pagefind-filter`.

#### Scenario: Filter by a single tag
- **WHEN** a user selects a tag (e.g., "docker") on the search page
- **THEN** only posts that include "docker" in their `tags[]` field appear in results

#### Scenario: Post with multiple tags matches any selected tag
- **WHEN** a post has `tags: [docker, ai, maf]` and the user filters by "ai"
- **THEN** that post appears in the filtered results

---

### Requirement: Search page is accessible at /search
The site SHALL serve a `/search` page that contains a text input, language filter controls, tag filter chips, and a result list. The page SHALL follow the standard `BaseHead → Header → <main> → Footer` layout chain.

#### Scenario: Navigating to /search
- **WHEN** a user navigates to `https://jgcarmona.com/search`
- **THEN** a search input and filter controls are displayed

#### Scenario: Entering a query shows results
- **WHEN** a user types a query into the search input
- **THEN** matching results appear below, each showing: title, language badge, publication date, and a content excerpt

#### Scenario: Empty query shows no results
- **WHEN** the search input is empty
- **THEN** no results are displayed and no error is shown

---

### Requirement: Search is reachable from the site header
The `Header.astro` component SHALL include a navigation link to `/search`.

#### Scenario: Header contains search link
- **WHEN** any page on the site is loaded
- **THEN** the main navigation contains a link that navigates to `/search`

---

### Requirement: Search page is excluded from SEO indexing
The `/search` page SHALL include a `noindex` meta tag and SHALL NOT appear in the auto-generated sitemap. Search result content is client-rendered and provides no SEO value.

#### Scenario: Search page has noindex meta tag
- **WHEN** a crawler visits `/search`
- **THEN** the page `<head>` contains `<meta name="robots" content="noindex">`
