import type { APIRoute } from 'astro';
import { ECOSYSTEM, SITE_DESCRIPTION, SITE_HEADLINE, SITE_TITLE, SITE_URL } from '../consts';
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

Personal site and blog of Juan G. Carmona (Juan García Carmona), with articles in English and Spanish since 2012. Juan is a software architect and forward deployed engineer at Plain Concepts. He writes about AI-assisted software engineering, software architecture, secure systems, local AI and open-source tools. Each article link below points to its Markdown source; the HTML version lives at the same path ending in a slash.

## About

- [About](${SITE_URL}/about/): biography, experience and contact
- [About in Spanish](${SITE_URL}/es/about/): biography, experience and contact in Spanish
- [Talks](${SITE_URL}/talks/): public talks, recordings and sessions for organisers
- [Courses and workshops](${SITE_URL}/courses/): training material and video courses
- [GitHub Copilot course](https://github-copilot.jgcarmona.com/): course modules, labs and slides
- [Publications](${SITE_URL}/books/): books and their availability
- [Projects](${SITE_URL}/projects/): ${FLAGSHIP_PROJECTS.map((project) => project.name).join(', ')} and other open source
- [Blog](${SITE_URL}/blog/): articles in English and Spanish

## Related sites

${ECOSYSTEM.map((site) => `- [${site.name}](${site.url})`).join('\n')}

## Posts

${recent.map(entry).join('\n')}

## Optional

${older.map(entry).join('\n')}
`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
