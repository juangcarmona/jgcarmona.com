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

function exists(path) {
	try {
		return statSync(path).isFile();
	} catch {
		return false;
	}
}
