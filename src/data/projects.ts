// Projects: the open-source work shown on /projects and on the home page.
// FLAGSHIP_PROJECTS are shown in this order. Each project stands on its own.

export type ProjectLink = {
	label: string;
	url: string;
};

export type Project = {
	name: string;
	/** One line that says what it is. */
	tagline: string;
	/** The project's own words, quoted from its site: the headline and the meta description. */
	inOwnWords?: { headline: string; summary: string; source: string };
	description: string;
	stack: string[];
	links: ProjectLink[];
	/** Internal posts that explain the ideas behind it. */
	relatedPosts?: ProjectLink[];
};

export const FLAGSHIP_PROJECTS: Project[] = [
	{
		name: 'Product Definition as Code',
		inOwnWords: {
			headline: 'Define once. Build from it. Change without losing track.',
			summary: 'Product Definition as Code keeps the agreed product definition in versioned Markdown that delivery work cites instead of restating.',
			source: 'https://pdac.dev/',
		},
		tagline: 'An open specification for keeping the agreed product definition in versioned Markdown.',
		description:
			'PDaC treats the product definition as an architectural asset: rules, actors, journeys and requirements are defined once, changed explicitly through Product Changes, and cited by specifications, agent prompts and tests instead of being restated. The specification ships with a manifesto and conformance tests.',
		stack: ['Specification', 'Conformance tests', 'AI-SDLC'],
		links: [
			{ label: 'pdac.dev', url: 'https://pdac.dev/' },
			{ label: 'Specification', url: 'https://github.com/product-definition-as-code/spec' },
		],
		relatedPosts: [
			{ label: 'Product Definition as Code for the AI-SDLC', url: '/en/product-definition-as-code/' },
			{ label: 'I Tried to Prove PDaC Wrong', url: '/en/i-tried-to-prove-pdac-wrong/' },
			{ label: 'Define Once, Cite Everywhere', url: '/en/define-once-cite-everywhere/' },
		],
	},
	{
		name: 'ProductShape',
		inOwnWords: {
			headline: 'Keep product decisions close to the work that changes them.',
			summary: 'ProductShape helps teams define product knowledge in versioned Markdown, connect delivery work to the accepted definition, and see when that definition changes.',
			source: 'https://productshape.dev/',
		},
		tagline: 'The reference implementation of Product Definition as Code.',
		description:
			'A CLI and a set of packages that validate a product definition deterministically, compile it into a graph, evolve it through approved Product Changes, and verify that specs and agent prompts cite the current version of each rule. It integrates with OpenSpec, Spec Kit, GitHub Copilot, Claude Code, Codex and OpenCode.',
		stack: ['TypeScript', 'Node.js', 'npm', 'OpenSpec', 'Spec Kit'],
		links: [
			{ label: 'productshape.dev', url: 'https://productshape.dev/' },
			{ label: 'GitHub', url: 'https://github.com/juangcarmona/productshape' },
			{ label: 'npm', url: 'https://www.npmjs.com/package/@prodshape/cli' },
		],
		relatedPosts: [
			{ label: 'The Wiki Knows What We Learned. The Product Model States What We Mean.', url: '/en/llm-wiki-vs-product-shape/' },
			{ label: 'The Symbolic Layer Before the Spec', url: '/en/the-symbolic-layer-before-the-spec/' },
		],
	},
	{
		name: 'ArcShape',
		inOwnWords: {
			headline: 'AI driven engineering documentation.',
			summary: 'ArcShape helps teams create, evolve, and explain software architecture documentation with AI-assisted workflows grounded in your repository.',
			source: 'https://arcshape.dev/',
		},
		tagline: 'AI-assisted architecture documentation built on arc42.',
		description:
			'A CLI and agent capabilities that create and maintain arc42 architecture documentation from repository evidence, generate diagrams as SVG, PNG and Mermaid, and publish an architecture reader alongside the code it describes.',
		stack: ['TypeScript', 'arc42', 'C4', 'Mermaid', 'Playwright'],
		links: [
			{ label: 'arcshape.dev', url: 'https://arcshape.dev/' },
			{ label: 'GitHub', url: 'https://github.com/juangcarmona/arcshape' },
			{ label: 'npm', url: 'https://www.npmjs.com/package/@arcshape/cli' },
		],
		relatedPosts: [
			{ label: 'DADS #06: Documenta Arquitectura de Software con arc42', url: '/es/dads-06-documenta-arquitectura-de-software-con-arc42/' },
		],
	},
	{
		name: 'Lighthouse',
		inOwnWords: {
			headline: 'A clear path to engineering excellence.',
			summary: 'Lighthouse is an adoptable engineering baseline for practical, AI-driven software development.',
			source: 'https://lighthouse.jgcarmona.com/',
		},
		tagline: 'A reusable engineering baseline for AI-driven software development.',
		description:
			'Package-owned guidance, profiles and deterministic checks that a repository adopts and verifies against, so every project starts from the same engineering baseline and agents inherit the team\'s standards instead of its habits.',
		stack: ['TypeScript', 'Node.js', '.NET', 'GitHub Actions'],
		links: [
			{ label: 'lighthouse.jgcarmona.com', url: 'https://lighthouse.jgcarmona.com/' },
			{ label: 'GitHub', url: 'https://github.com/juangcarmona/lighthouse' },
		],
		relatedPosts: [
			{ label: 'Spec-Driven Development: Controlling AI-Generated Drift', url: '/en/spec-driven-done-right/' },
		],
	},
	{
		name: 'DomusMind',
		tagline: 'The structured cognitive layer of family life.',
		description:
			'An open product to reduce the invisible mental load of running a household: family members, responsibilities, a shared calendar and tasks. Its product is defined with ProductShape, its architecture is documented with ArcShape and its delivery follows Lighthouse, and the engineering evidence is published from the repository.',
		stack: ['.NET', 'EF Core', 'Modular monolith', 'Vertical slices', 'DDD'],
		links: [
			{ label: 'Engineering site', url: 'https://juangcarmona.github.io/domusmind/' },
			{ label: 'GitHub', url: 'https://github.com/juangcarmona/domusmind' },
		],
	},
];

export type SmallProject = {
	name: string;
	description: string;
	url: string;
};

export const OTHER_PROJECTS: SmallProject[] = [
	{
		name: 'Raccord',
		description: 'Open-source, self-hostable operations and invoicing platform for audiovisual production and equipment-rental companies (AGPLv3).',
		url: 'https://github.com/juangcarmona/raccord',
	},
	{
		name: 'Star Wars Death Star arc42',
		description: 'A bilingual example of arc42 applied to a complex system, section by section.',
		url: 'https://github.com/juangcarmona/starwars-deathstar-arc42-documentation',
	},
	{
		name: 'Hunting the Hunter',
		description: 'A real investigation into developer-targeted malware disguised as a project offer.',
		url: 'https://github.com/juangcarmona/hunting-the-hunter-episode-one',
	},
	{
		name: 'Local AI Bastion',
		description: 'Turns an AI-ready workstation into a secure, LAN-accessible local AI platform.',
		url: 'https://github.com/juangcarmona/local-ai-bastion',
	},
	{
		name: 'DDD, CQRS and Vertical Slices with .NET',
		description: 'A reference solution with feature-based organisation, CI/CD and Terraform.',
		url: 'https://github.com/juangcarmona/ddd-cqrs-vsa-example',
	},
	{
		name: 'FastAPI REST API Tutorial',
		description: 'A REST API with DDD, vertical slices, dependency injection and security (in Spanish).',
		url: 'https://github.com/juangcarmona/fastapi-rest-api-tutorial',
	},
	{
		name: 'Mermaid Playground',
		description: 'Examples of UML and C4 diagrams written in Mermaid.',
		url: 'https://github.com/juangcarmona/mermaid-playground',
	},
];
