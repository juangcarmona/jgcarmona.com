import type { APIRoute } from 'astro';
import { ECOSYSTEM, SITE_DESCRIPTION, SITE_HEADLINE, SITE_TITLE, SITE_URL } from '../consts';
import { APPEARANCES } from '../data/speaking';
import { FLAGSHIP_PROJECTS } from '../data/projects';
import { getPosts, postUrl, type Post } from '../utils/posts';

// /llms.txt following https://llmstxt.org/: posts link to their Markdown source.
const RECENT_SINCE = new Date('2024-01-01');

const entry = (post: Post) =>
	`- [${post.data.title}](${SITE_URL}${postUrl(post).replace(/\/$/, '.md')}): ${post.data.description}${post.data.lang === 'es' ? ' (Spanish)' : ''}`;

export const GET: APIRoute = async () => {
	const posts = await getPosts();
	const recent = posts.filter((post) => post.data.pubDate >= RECENT_SINCE);
	const older = posts.filter((post) => post.data.pubDate < RECENT_SINCE);

	const body = `# ${SITE_TITLE}

> ${SITE_HEADLINE}. ${SITE_DESCRIPTION}

Personal site and blog of Juan G. Carmona (Juan García Carmona), with articles in English and Spanish since 2012. Current focus: Software Engineering 2.0, AI-assisted delivery, Product Definition as Code, software architecture and secure systems. Each article link below points to its Markdown source; the HTML version lives at the same path ending in a slash.

## About

- [About](${SITE_URL}/about/): biography, experience and contact
- [Talks](${SITE_URL}/talks/): ${APPEARANCES.length} conference appearances and the sessions offered to organisers
- [Projects](${SITE_URL}/projects/): ${FLAGSHIP_PROJECTS.map((project) => project.name).join(', ')} and other open source

## Related sites

${ECOSYSTEM.map((site) => `- [${site.name}](${site.url})`).join('\n')}

## Posts

${recent.map(entry).join('\n')}

## Optional

${older.map(entry).join('\n')}
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
