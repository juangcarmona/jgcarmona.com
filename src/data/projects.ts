// Projects: the open-source work shown on /projects and on the home page.
// FLAGSHIP_PROJECTS are shown in this order; keep the chain from definition to delivery.

export type ProjectLink = {
	label: string;
	url: string;
};

export type Project = {
	name: string;
	/** One line that says what it is. */
	tagline: string;
	/** The problem it exists to solve, on its own terms. */
	problem?: string;
	description: string;
	/** Its place in the toolchain. */
	role: string;
	stack: string[];
	links: ProjectLink[];
	/** Internal posts that explain the ideas behind it. */
	relatedPosts?: ProjectLink[];
};

export const FLAGSHIP_PROJECTS: Project[] = [
	{
		name: 'Product Definition as Code',
		problem: 'Product decisions end up scattered across meetings, tickets, documents and prompts, and every agent reads a different version of them.',
		tagline: 'An open specification for keeping the agreed product definition in versioned Markdown.',
		description:
			'PDaC treats the product definition as an architectural asset: rules, actors, journeys and requirements are defined once, changed explicitly through Product Changes, and cited by specifications, agent prompts and tests instead of being restated. The specification ships with a manifesto and conformance tests.',
		role: 'The method',
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
		problem: 'A rule changes, and nobody can say which specs, prompts and tests still describe the old one.',
		tagline: 'The reference implementation of Product Definition as Code.',
		description:
			'A CLI and a set of packages that validate a product definition deterministically, compile it into a graph, evolve it through approved Product Changes, and verify that specs and agent prompts cite the current version of each rule. It integrates with OpenSpec, Spec Kit, GitHub Copilot, Claude Code, Codex and OpenCode.',
		role: 'Product intent',
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
		problem: 'Architecture documentation drifts away from the code it describes, and nobody trusts it any more.',
		tagline: 'AI-assisted architecture documentation built on arc42.',
		description:
			'A CLI and agent capabilities that create and maintain arc42 architecture documentation from repository evidence, generate diagrams as SVG, PNG and Mermaid, and publish an architecture reader alongside the code it describes.',
		role: 'Architecture evidence',
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
		problem: 'Every repository reinvents its engineering standards, and agents inherit the habits instead of the standards.',
		tagline: 'A reusable engineering baseline for AI-driven software development.',
		description:
			'Package-owned guidance, profiles and deterministic checks that a repository adopts and verifies against, so every project starts from the same engineering baseline and agents inherit the team\'s standards instead of its habits.',
		role: 'Delivery baseline',
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
		role: 'A real product built with all of the above',
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
