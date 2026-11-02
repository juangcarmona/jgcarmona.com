// Speaking record: past appearances and the sessions available to organisers.
// Add each new talk to APPEARANCES; the /talks page, the home page and the
// structured data are all generated from this file.
// Only record what has a source: the event's own programme, the recording or the slides.

export const SPEAKER_LINKS = {
	SESSIONIZE: 'https://sessionize.com/juangcarmona',
	TALKS_SITE: 'https://talks.jgcarmona.com/',
	TALKS_SOURCE: 'https://github.com/juangcarmona/presentations',
};

export type Appearance = {
	event: string;
	eventUrl?: string;
	/** Event start date (ISO). The talk may be on a later day of a multi-day event. */
	date: string;
	endDate?: string;
	venue?: string;
	city: string;
	/** Session title exactly as the programme lists it. */
	title?: string;
	summary?: string;
	/** Internal post that tells the story behind the talk. */
	relatedPost?: string;
	slidesUrl?: string;
	videoUrl?: string;
	sourceUrl?: string;
};

// Newest first.
export const APPEARANCES: Appearance[] = [
	{
		// Source: the recording published by Plain Concepts.
		event: 'CONVEX 2026',
		eventUrl: 'https://www.convexsummit.com/',
		date: '2026-06-17',
		endDate: '2026-06-18',
		venue: 'Kinépolis Ciudad de la Imagen',
		city: 'Madrid',
		title: 'IA contra IA: anatomía de un ataque dirigido a perfiles técnicos',
		summary:
			'La inteligencia artificial lo está cambiando todo, también la ciberseguridad. Esta charla reconstruye una situación real en primera persona: una investigación nacida de una oportunidad profesional aparentemente legítima que escondía una trampa altamente sofisticada.',
		videoUrl: 'https://www.youtube.com/watch?v=gVGUC9E6HxI',
	},
	{
		// Source: the event's programme (githubcopilotdevdaysmadrid.techriders.es).
		event: 'GitHub Copilot Dev Days Madrid',
		eventUrl: 'https://githubcopilotdevdaysmadrid.techriders.es/eventos/2026-04-17-copilot-dev-days-madrid/',
		date: '2026-04-17',
		venue: 'Tajamar Tech',
		city: 'Madrid',
		title: 'Pillado por una IA: detección y disección de un ataque dirigido a desarrolladores',
		summary:
			'Esta charla cuenta cómo GitHub Copilot ayudó a detectar una carga maliciosa oculta en un repositorio de un potencial cliente, y cómo esa alerta destapó un ataque dirigido.',
	},
	{
		// TODO: add the summary sent to the organisers.
		event: 'RootedCON 2026',
		eventUrl: 'https://www.rootedcon.com/',
		date: '2026-03-05',
		endDate: '2026-03-07',
		city: 'Madrid',
		title: 'Caught by an AI: Detecting and Hunting a Targeted Backdoor',
	},
];

export type Session = {
	title: string;
	summary: string;
	lang?: string;
	url?: string;
};

// Sessions offered to organisers, copied from the Sessionize profile.
export const SESSIONS: Session[] = [
	{
		title: 'Software Engineering 2.0: Designing, Building, and Validating Products with AI',
		summary:
			'For years, we have been cutting back on good engineering practices to deliver on time. Now that we can delegate much of the implementation to AI, we have an opportunity to review, and an obligation to improve, our processes from end to end.',
		lang: 'ES / EN',
		url: 'https://talks.jgcarmona.com/software-engineering-2_0/',
	},
	{
		title: 'Issue to Merge: Agentic SDLC in Practice and What Breaks It',
		summary:
			'AI is changing how we build software, but the value only shows up when it supports the whole lifecycle and not only code generation.',
	},
	{
		title: 'Make Haste Slowly: Define Better to Build Faster',
		summary:
			'No product starts with a complete and final definition. Products are discovered, tested, and refined. The problem is not that decisions change. The problem is that they become scattered across roadmaps, tickets, documents, specifications, and conversations.',
	},
	{
		title: 'Engineering an AI-SDLC for Agentic Delivery',
		summary:
			'Reviewing a PR delivered by an AI agent is the wrong time to ask questions. What was it meant to change? Where did its context come from? How was it implemented?',
	},
	{
		title: 'The Architecture Before the Agent: Product Definition as Code',
		summary:
			'Agentic delivery has a context problem. A product decision must survive through architecture, data models, specifications, prompts, tests, security controls, and code.',
	},
	{
		title: 'AI-Assisted Development at Scale: Keeping Product Decisions, Specs, and Agents Aligned',
		summary: 'AI-SDLC creates a traceability problem that becomes expensive as products evolve.',
	},
	{
		title: 'Hard and Soft Guardrails for Agentic Software Engineering',
		summary: 'An agent can only be as safe as the engineering discipline it is given.',
		lang: 'EN',
		url: 'https://talks.jgcarmona.com/soft-and-hard-guardrails/',
	},
];
