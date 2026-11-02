import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_URL } from '../../consts';
import { postUrl } from '../../utils/posts';

// Markdown source of each post, referenced from /llms.txt.
export const getStaticPaths = (async () => {
	const posts = await getCollection('blog');
	return posts.map((post) => ({ params: { lang: post.data.lang, slug: post.id }, props: { post } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
	const { post } = props as { post: CollectionEntry<'blog'> };
	const { title, description, pubDate, lang, tags } = post.data;
	const header = [
		`# ${title}`,
		'',
		`> ${description}`,
		'',
		`Author: Juan G. Carmona · Published: ${pubDate.toISOString().slice(0, 10)} · Language: ${lang} · Tags: ${tags.join(', ')}`,
		`Canonical: ${SITE_URL}${postUrl(post)}`,
		'',
	].join('\n');
	return new Response(`${header}\n${post.body ?? ''}`, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
