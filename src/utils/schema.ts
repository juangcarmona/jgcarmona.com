import { CONTACT_EMAIL, ECOSYSTEM, PROFILES, SITE_DESCRIPTION, SITE_HEADLINE, SITE_TITLE, SITE_URL } from '../consts';

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const person = {
	'@type': 'Person',
	'@id': PERSON_ID,
	name: SITE_TITLE,
	alternateName: 'Juan García Carmona',
	url: `${SITE_URL}/`,
	email: `mailto:${CONTACT_EMAIL}`,
	jobTitle: SITE_HEADLINE,
	description: SITE_DESCRIPTION,
	worksFor: { '@type': 'Organization', name: 'Plain Concepts', url: 'https://www.plainconcepts.com/' },
	alumniOf: [
		{ '@type': 'CollegeOrUniversity', name: 'Universidad Pontificia de Salamanca' },
		{ '@type': 'CollegeOrUniversity', name: 'Universidad Politécnica de Madrid' },
	],
	knowsAbout: [
		'Software architecture',
		'Software Engineering 2.0',
		'AI-assisted software development',
		'Product Definition as Code',
		'Secure and critical systems',
		'Microsoft Azure',
		'DevSecOps',
		'Site Reliability Engineering',
	],
	sameAs: Object.values(PROFILES),
};

export const website = {
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	url: `${SITE_URL}/`,
	name: SITE_TITLE,
	inLanguage: ['en', 'es'],
	author: { '@id': PERSON_ID },
	publisher: { '@id': PERSON_ID },
};

// The other sites of the ecosystem, each credited to the same person.
export const ecosystem = ECOSYSTEM.map((site) => ({
	'@type': 'WebSite',
	'@id': `${site.url}#website`,
	name: site.name,
	url: site.url,
	author: { '@id': PERSON_ID },
}));

export const graph = (...nodes: object[]) => JSON.stringify({ '@context': 'https://schema.org', '@graph': [person, website, ...nodes] });
