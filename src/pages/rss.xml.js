import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getPosts, postUrl } from '../utils/posts';

const MAX_ITEMS = 50;

export async function GET(context) {
	const posts = (await getPosts()).slice(0, MAX_ITEMS);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		xmlns: { atom: 'http://www.w3.org/2005/Atom' },
		customData: `<atom:link href="${new URL('rss.xml', context.site)}" rel="self" type="application/rss+xml" />`,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: postUrl(post),
			categories: post.data.tags,
		})),
	});
}
