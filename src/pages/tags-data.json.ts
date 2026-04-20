import { getCollection } from 'astro:content';

export async function GET() {
	const posts = await getCollection('blog');

	// Count posts per tag
	const tagCounts = new Map<string, number>();
	for (const post of posts) {
		const tags: string[] = (post.data as any).tags ?? [];
		for (const tag of tags) {
			tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
		}
	}

	// Build co-occurrence map: for each pair of tags on the same post, increment weight
	const coOccurrence = new Map<string, number>();
	for (const post of posts) {
		const tags: string[] = (post.data as any).tags ?? [];
		for (let i = 0; i < tags.length; i++) {
			for (let j = i + 1; j < tags.length; j++) {
				const key = [tags[i], tags[j]].sort().join('::');
				coOccurrence.set(key, (coOccurrence.get(key) ?? 0) + 1);
			}
		}
	}

	const nodes = Array.from(tagCounts.entries()).map(([id, count]) => ({ id, count }));

	const links = Array.from(coOccurrence.entries())
		.filter(([, weight]) => weight >= 2)
		.map(([key, weight]) => {
			const [source, target] = key.split('::');
			return { source, target, weight };
		});

	return new Response(JSON.stringify({ nodes, links }), {
		headers: { 'Content-Type': 'application/json' },
	});
}
