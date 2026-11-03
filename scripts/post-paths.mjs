// Maps each post id to its canonical path (/<lang>/<id>/) by reading the frontmatter, for build configuration.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export function canonicalPostPaths(root) {
	const paths = new Map();
	for (const entry of readdirSync(root)) {
		const dir = join(root, entry);
		const file = statSync(dir).isDirectory() ? ['index.md', 'index.mdx'].map((name) => join(dir, name)).find(exists) : dir;
		if (!file || !/\.mdx?$/.test(file)) continue;
		const id = entry.replace(/\.mdx?$/, '').toLowerCase().replace(/\./g, '');
		const lang = readFileSync(file, 'utf8').match(/^lang:\s*['"]?(\w+)/m)?.[1] ?? 'en';
		paths.set(id, `/${lang}/${id}/`);
	}
	return paths;
}

/** Canonical post path → the last date in its frontmatter (updatedDate, else pubDate), for the sitemap's lastmod. */
export function postDates(root) {
	const dates = new Map();
	for (const entry of readdirSync(root)) {
		const dir = join(root, entry);
		const file = statSync(dir).isDirectory() ? ['index.md', 'index.mdx'].map((name) => join(dir, name)).find(exists) : dir;
		if (!file || !/\.mdx?$/.test(file)) continue;
		const text = readFileSync(file, 'utf8');
		const id = entry.replace(/\.mdx?$/, '').toLowerCase().replace(/\./g, '');
		const lang = text.match(/^lang:\s*['"]?(\w+)/m)?.[1] ?? 'en';
		const date = (key) => text.match(new RegExp(`^${key}:\\s*['"]?([0-9T:.\\-Z]+)`, 'm'))?.[1];
		const value = new Date(date('updatedDate') ?? date('pubDate') ?? '');
		if (!Number.isNaN(value.valueOf())) dates.set(`/${lang}/${id}/`, value);
	}
	return dates;
}

function exists(path) {
	try {
		return statSync(path).isFile();
	} catch {
		return false;
	}
}
