# JGCARMONA.COM

**WordPress → Astro migration. 142+ blog posts. Zero hosting cost. Instant load times.**

## What is this?

A complete blog migration from WordPress to [Astro 5.x](https://astro.build) - trading database queries for static HTML, sluggish PHP for instant page loads, and monthly hosting fees for Azure Static Web Apps' free tier.

## Stack

- **Framework**: Astro 5.x with MDX support
- **Content**: Markdown/MDX files in `src/content/blog/` (goodbye MySQL dumps!)
- **Hosting**: Azure Static Web Apps (free tier)
- **Build**: GitHub Actions CI/CD → push to `main` = instant deploy
- **SEO**: Auto-generated sitemap + RSS feed via `@astrojs/sitemap` + `@astrojs/rss`
- **Performance**: 100% static pre-rendered pages, Sharp image optimization, zero JS bloat

## Why Astro?

- **Content-first**: Write in Markdown, version control with Git
- **Fast AF**: Pre-rendered static pages = instant loads
- **Zero lock-in**: Your content is just `.md` files
- **Type-safe**: Content collections with Zod schema validation

## Development

```bash
npm run dev      # http://localhost:4321
npm run build    # Generate static site
npm run preview  # Test production build
```

## Migration Notes

Content lives in `src/content/blog/` with schema validation in `content.config.ts`. Each post is either a standalone `.md` file or a directory with `index.md` + images. Frontmatter fields: `title`, `description`, `pubDate` (required), `heroImage` (optional).

Original WordPress archive: 120+ posts spanning software architecture, AI/ML, DevOps, and engineering leadership topics. Currently ~140 posts migrated and growing.

---
### **IMPORTANT:**
> *No WordPress instances were harmed in the making of this site.*
---