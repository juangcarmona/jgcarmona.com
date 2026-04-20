// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://jgcarmona.com',
	integrations: [mdx(), sitemap({
		filter: (page) => !page.includes('/search') && !page.includes('/tags-data.json'),
	})],
	vite: {
		build: {
			rollupOptions: {
				external: ['/_pagefind/pagefind.js'],
			},
		},
	},
});
