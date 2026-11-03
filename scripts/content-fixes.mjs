// Build-time fixes for imported articles. The Markdown sources stay as published; only the rendered HTML changes.
import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const walk = (node, visit, parent) => {
	visit(node, parent);
	for (const child of [...(node.children ?? [])]) walk(child, visit, node);
};

/**
 * - The layout already renders the article title as the page's only h1, so body headings of depth 1 become h2.
 * - Images whose local file never made it out of WordPress (truncated data URIs, img_not_found.jpg) are dropped;
 *   Astro would otherwise print its unresolved image placeholder into the page.
 */
export function remarkContentFixes() {
	return (tree, file) => {
		const dir = dirname(file.path ?? file.history?.[0] ?? '.');
		walk(tree, (node, parent) => {
			if (node.type === 'heading' && node.depth === 1) node.depth = 2;
			if (node.type === 'image' && parent && !/^(https?:|data:|\/)/.test(node.url)) {
				node.url = node.url.replace(/^\(+/, '');
				const path = resolve(dir, decodeURI(node.url.split(/[?#]/)[0]));
				if (!existsSync(path)) parent.children.splice(parent.children.indexOf(node), 1);
			}
		});
	};
}

/** Astro drops an empty alt from Markdown images (it only prints truthy attributes). Restore alt="" so they stay decorative. */
export function emptyAltFix() {
	return {
		name: 'empty-alt-fix',
		hooks: {
			'astro:build:done': async ({ dir }) => {
				const root = fileURLToPath(dir);
				for (const entry of await readdir(root, { recursive: true })) {
					if (!entry.endsWith('.html')) continue;
					const path = join(root, entry);
					const html = await readFile(path, 'utf8');
					const fixed = html.replace(/<img(?![^>]*\balt=)/g, '<img alt=""');
					if (fixed !== html) await writeFile(path, fixed);
				}
			},
		},
	};
}
