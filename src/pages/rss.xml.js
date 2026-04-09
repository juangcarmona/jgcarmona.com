import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

const MAX_ITEMS = 50;

export async function GET(context) {
  const posts = await getCollection('blog');

  const sorted = posts
    .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate))
    .slice(0, MAX_ITEMS);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,

    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },

    customData: `
      <atom:link
        href="${context.url.href}"
        rel="self"
        type="application/rss+xml"
      />
    `,

    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/${post.data.lang}/${post.id}/`,
      customData: `<language>${post.data.lang}</language>`,
    })),
  });
}
