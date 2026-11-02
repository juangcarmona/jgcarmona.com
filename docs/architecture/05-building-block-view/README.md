---
title: Building block view
arc42-section: "05"
description: Static decomposition into building blocks.
---

# 5. Building block view

## Level 1: system

```mermaid
C4Container
  title jgcarmona.com: containers
  Person(author, "Author")
  System_Boundary(repo, "Repository") {
    Container(content, "Content", "Markdown, MDX", "Articles under src/content/blog")
    Container(data, "Data", "TypeScript", "Talks, projects, site constants")
    Container(build, "Astro build", "Node.js 22", "Renders pages, feeds, sitemap, llms.txt")
  }
  Container(swa, "Static Web Apps", "Azure", "Serves dist/ with redirects and headers")
  Rel(author, content, "Writes")
  Rel(author, data, "Updates")
  Rel(content, build, "Read by")
  Rel(data, build, "Read by")
  Rel(build, swa, "Deployed by GitHub Actions")
```

## Level 2: building blocks

| Block | Location | Responsibility |
| --- | --- | --- |
| Content collection | `src/content.config.ts`, `src/content/blog` | Article schema and sources |
| Site data | `src/consts.ts`, `src/data/*.ts` | Identity, profiles, ecosystem, talks, projects |
| Layouts | `src/layouts/Base.astro`, `BlogPost.astro`, `Page.astro` | Page shell, article page, Markdown pages |
| Head and schema | `src/components/BaseHead.astro`, `src/utils/schema.ts` | Meta tags, social image, JSON-LD graph |
| Routes | `src/pages` | Home, blog, topics, search, talks, projects, about, privacy, feeds, redirects |
| Styles | `@juangcarmona/lighthouse-ui`, `src/styles/site.css` | Tokens, recipes and site layout |
| Build helpers | `scripts/brand.mjs`, `scripts/post-paths.mjs` | Brand assets; canonical paths for the sitemap |
