## 1. Dependency Setup

- [x] 1.1 Install `pagefind` as a dev dependency: `npm install --save-dev pagefind`
- [x] 1.2 Update `package.json` build script to `"build": "astro build && pagefind --site dist"` so the index is generated after every production build

## 2. Layout Annotation

- [x] 2.1 In `src/layouts/BlogPost.astro`, add `data-pagefind-body` to the prose/article wrapper element and `data-pagefind-ignore` to the `<header>` and `<footer>` elements
- [x] 2.2 In `src/layouts/BlogPost.astro`, add `data-pagefind-filter="lang:<lang>"` to the indexed body element using the post's `lang` prop
- [x] 2.3 In `src/layouts/BlogPost.astro`, render one visually-hidden `<span data-pagefind-filter="tag:<tag>">` per tag inside the indexed body element, using the post's `tags` prop
- [x] 2.4 In `src/layouts/Page.astro`, add `data-pagefind-body` to the prose wrapper and `data-pagefind-ignore` to `<header>` and `<footer>`

## 3. Sitemap Exclusion

- [x] 3.1 In `astro.config.mjs`, add a `filter` option to the `sitemap()` integration to exclude the `/search` path from the generated sitemap

## 4. Search Page

- [x] 4.1 Create `src/pages/search.astro` following the `BaseHead → Header → <main> → Footer` layout chain with `interface Props` defined (no props needed, but structure must be correct)
- [x] 4.2 In `search.astro`, add `<meta name="robots" content="noindex">` via a prop to `BaseHead` or directly in the `<head>` block
- [x] 4.3 In `search.astro`, add a `<div id="search">` container inside `<main>` for the Pagefind UI widget to mount into
- [x] 4.4 In `search.astro`, load the Pagefind UI assets (`/_pagefind/pagefind-ui.js`, `/_pagefind/pagefind-ui.css`) and initialize `PagefindUI` in a client-side `<script>` block targeting `#search`
- [x] 4.5 Style the search page using only existing CSS variables from `src/styles/global.css`; ensure the Pagefind UI widget visually matches the site theme (dark background, `--accent` color for highlights)

## 5. Header Navigation

- [x] 5.1 In `src/components/Header.astro`, add a `<HeaderLink href="/search">Search</HeaderLink>` entry to the internal navigation links alongside Home, Blog, Tags, About

## 6. Validation

- [x] 6.1 Run `npm run build` and confirm `dist/_pagefind/` directory is created with no build errors
- [x] 6.2 Run `npm run preview` and navigate to `/search`; verify the search input renders and a query returns results with title, language, date, and excerpt
- [x] 6.3 Verify language filter: search a term, apply "ES" filter, confirm only Spanish posts appear; apply "EN" filter, confirm only English posts appear
- [x] 6.4 Verify tag filter: select a tag (e.g., "docker"), confirm only posts tagged "docker" appear
- [x] 6.5 Confirm `/search` does not appear in the generated `dist/sitemap-*.xml`
- [x] 6.6 Confirm `about` and `books` pages are included in search results (search a distinctive term from each)
