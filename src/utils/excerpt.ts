// The opening words of an article, taken literally from its body.
// Frontmatter descriptions are SEO metadata of mixed origin; the body is what Juan wrote and published.

const SKIP = /^(#|!\[|<|import |```|\||\* \* \*|---)/;

const plain = (markdown: string) =>
	markdown
		.replace(/^>\s?/gm, '')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/(\*\*|__|\*|_|`)/g, '')
		.replace(/\s+/g, ' ')
		.trim();

/** The first prose paragraph, whole. With `max`, it is cut at a word boundary with an ellipsis. */
export function openingExcerpt(body: string | undefined, max = Infinity) {
	const paragraph = (body ?? '')
		.replace(/^﻿/, '')
		.split(/\n\s*\n/)
		.map((block) => block.trim())
		// A paragraph ending in a colon introduces a code block or a list and reads unfinished on its own.
		.find((block) => block && !SKIP.test(block) && plain(block).length > 40 && !plain(block).endsWith(':'));
	if (!paragraph) return undefined;
	const text = plain(paragraph);
	if (text.length <= max) return text;
	return text.slice(0, text.lastIndexOf(' ', max)).replace(/[,;:]$/, '') + '…';
}
