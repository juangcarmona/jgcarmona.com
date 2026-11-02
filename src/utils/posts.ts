import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const postUrl = (post: Post) => `/${post.data.lang}/${post.id}/`;

export const byDateDesc = (a: Post, b: Post) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

export async function getPosts() {
	return (await getCollection('blog')).sort(byDateDesc);
}

const PAGE_SIZE = 20;

export async function getBlogPages() {
	const posts = await getPosts();
	const total = Math.ceil(posts.length / PAGE_SIZE);
	return Array.from({ length: total }, (_, i) => ({
		page: i + 1,
		total,
		posts: posts.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE),
	}));
}
