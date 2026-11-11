// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import mermaid from 'astro-mermaid';
import { emptyAltFix, remarkContentFixes } from './scripts/content-fixes.mjs';
import { canonicalPostPaths, postDates } from './scripts/post-paths.mjs';

const SITE = 'https://jgcarmona.com';
// Only canonical URLs go in the sitemap; redirect pages (/slug/, the other language prefix, /blog/1/) stay out.
const canonical = canonicalPostPaths('./src/content/blog');
const dates = postDates('./src/content/blog');
const postSlug = (path) => /^\/(?:en|es)\/([^/]+)\/$/.exec(path)?.[1];
const isLegacyPath = (path) => [...canonical.keys()].some((slug) => path === `/${slug}/`);

// https://astro.build/config
export default defineConfig({
	site: SITE,
	trailingSlash: 'ignore',
	markdown: { remarkPlugins: [remarkContentFixes] },
	// Markdown images get a srcset and sizes; the site CSS already sizes them, so no injected styles.
	image: { layout: 'constrained', responsiveStyles: false },
	integrations: [
		mermaid({ autoTheme: true }),
		mdx(),
		sitemap({
			filter: (page) => {
				const path = new URL(page).pathname;
				if (['/search/', '/es/search/', '/404/', '/blog/1/'].includes(path)) return false;
				const slug = postSlug(path);
				if (slug && canonical.has(slug)) return canonical.get(slug) === path;
				return !isLegacyPath(path);
			},
			serialize: (item) => {
				const lastmod = dates.get(new URL(item.url).pathname);
				return lastmod ? { ...item, lastmod: lastmod.toISOString() } : item;
			},
		}),
		emptyAltFix(),
	],
});
