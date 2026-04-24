## ADDED Requirements

### Requirement: Tag graph data endpoint exists at build time
The site SHALL expose a static JSON endpoint at `/tags-data.json` generated at build time. The endpoint SHALL contain a `nodes` array (each node: `{ id: string, count: number }`) and a `links` array (each link: `{ source: string, target: string, weight: number }`). Links SHALL only include tag pairs that co-occur in at least 2 posts.

#### Scenario: Endpoint is available after build
- **WHEN** `npm run build` completes
- **THEN** `dist/tags-data.json` SHALL exist and be valid JSON with `nodes` and `links` arrays

#### Scenario: Node count reflects actual post tagging
- **WHEN** the `nodes` array is inspected
- **THEN** every tag that appears in at least one post's `tags[]` frontmatter SHALL have a corresponding node with `count` equal to the number of posts using that tag

#### Scenario: Links respect co-occurrence threshold
- **WHEN** the `links` array is inspected
- **THEN** no link SHALL have `weight` less than 2

### Requirement: Force-directed graph renders on the search page
The `/search` page SHALL render a D3.js v7 force-directed graph above the Pagefind search input. The graph SHALL be visible on viewport widths ≥ 768px and hidden on narrower viewports.

#### Scenario: Graph renders with tag nodes
- **WHEN** a user visits `/search` on a desktop viewport
- **THEN** the graph SHALL display one circular node per tag, with radius proportional to post count (minimum 8px, maximum 36px)

#### Scenario: Graph is hidden on mobile
- **WHEN** a user visits `/search` on a viewport narrower than 768px
- **THEN** the graph element SHALL NOT be visible; the Pagefind search box SHALL remain fully functional

#### Scenario: Graph labels are readable
- **WHEN** a node has radius ≥ 18px
- **THEN** the tag name SHALL be rendered as text inside the node circle
- **WHEN** a node has radius < 18px
- **THEN** hovering the node SHALL display a tooltip with the tag name and post count

### Requirement: Graph uses site CSS variables for theming
The graph SHALL use `var(--accent)` for node fill color, `var(--gray-light)` for edge color, and `var(--bg-color)` for the canvas background. No hardcoded color values SHALL appear in the component.

#### Scenario: Dark mode is applied
- **WHEN** the site is in dark mode (toggled via ThemeToggle)
- **THEN** graph node colors and edge colors SHALL update to reflect the active CSS variable values

### Requirement: Node click triggers tag-filtered Pagefind search
Clicking a graph node SHALL call the raw Pagefind JS API (`/_pagefind/pagefind.js`) with an empty query and a `tag` filter for the selected tag. Results SHALL be rendered in a dedicated `#graph-results` section below the graph.

#### Scenario: User clicks a tag node
- **WHEN** a user clicks a tag node in the graph
- **THEN** the `#graph-results` section SHALL populate with all posts tagged with that tag, showing title and excerpt
- **THEN** the clicked node SHALL appear visually highlighted (e.g., stroke or opacity change on other nodes)

#### Scenario: User clicks the same node again
- **WHEN** a user clicks an already-selected node
- **THEN** the selection SHALL be cleared and `#graph-results` SHALL be emptied

#### Scenario: Pagefind UI search is unaffected
- **WHEN** a user uses the graph to filter by tag
- **THEN** the Pagefind UI search input above the graph SHALL remain functional and independent

### Requirement: Graph data endpoint is excluded from sitemap
`/tags-data.json` SHALL NOT appear in the generated sitemap.

#### Scenario: Sitemap excludes data endpoint
- **WHEN** the build completes and `sitemap-index.xml` is inspected
- **THEN** no URL containing `tags-data.json` SHALL be present

## MODIFIED Requirements

### Requirement: Search page is the primary discovery surface
**Reason**: The search page now serves dual purpose — free-text search via Pagefind UI AND visual tag graph exploration. The previous requirement covered only Pagefind UI. This extends it to include the graph as a co-equal discovery mechanism.

- **WHEN** a user arrives at `/search` with no query
- **THEN** both the Pagefind search input AND the tag graph SHALL be visible and usable (on desktop)
- **THEN** the graph SHALL load tag data from `/tags-data.json` and render within 2 seconds on a modern browser
