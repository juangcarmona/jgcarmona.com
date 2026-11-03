---
title: System scope and context
arc42-section: "03"
description: Business and technical context boundaries.
---

# 3. System scope and context

## Business context

```mermaid
C4Context
  title jgcarmona.com: system context
  Person(reader, "Reader", "Reads articles in English or Spanish")
  Person(organiser, "Organiser", "Evaluates talks and projects")
  Person(author, "Author", "Writes and merges content")
  System(site, "jgcarmona.com", "Static personal site and blog")
  System_Ext(crawlers, "Search engines and AI agents", "Index the site")
  System_Ext(giscus, "giscus and GitHub Discussions", "Comments, on request")
  System_Ext(goat, "GoatCounter", "Cookieless page counts")
  System_Ext(eco, "Ecosystem sites", "talks, lighthouse, arcshape, productshape")
  Rel(reader, site, "Reads")
  Rel(organiser, site, "Reviews")
  Rel(author, site, "Publishes through GitHub")
  Rel(crawlers, site, "Crawl sitemap, JSON-LD, RSS, llms.txt")
  Rel(site, giscus, "Loads comments after a click")
  Rel(site, goat, "Counts views")
  Rel(site, eco, "Links to")
```

## Technical context

| Interface | Consumer | Format |
| --- | --- | --- |
| HTML pages | Readers, organisers | Static HTML from Astro |
| `/sitemap-index.xml` | Search engines | Canonical URLs only |
| `/rss.xml` | Feed readers | RSS 2.0, latest 50 posts |
| `/llms.txt`, `/<lang>/<id>.md` | AI agents | llmstxt.org v2 and Markdown sources |
| `/posts.json` | Scripts | JSON list of posts |
| JSON-LD in every page | Search engines | schema.org graph with a stable Person `@id` |
