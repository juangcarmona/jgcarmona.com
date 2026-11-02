// Speaking record: past appearances and the sessions available to organisers.
// Add each new talk to APPEARANCES; the /talks page, the home page and the
// structured data are all generated from this file.
// Only record what has a source: the event's own programme, the recording or the slides.

export const SPEAKER_LINKS = {
	SESSIONIZE: 'https://sessionize.com/juangcarmona',
	TALKS_SITE: 'https://talks.jgcarmona.com/',
	TALKS_SOURCE: 'https://github.com/juangcarmona/presentations',
};

export type Link = { label: string; url: string };

export type Appearance = {
	event: string;
	eventUrl?: string;
	/** Event start date (ISO). The talk may be on a later day of a multi-day event. */
	date: string;
	endDate?: string;
	venue?: string;
	city: string;
	/** ISO 3166-1 alpha-2 code; defaults to ES. */
	country?: string;
	/** Session title exactly as the programme lists it. */
	title?: string;
	/** The session abstract, quoted from its source. */
	summary?: string;
	/** True while the organisers have not published the session's day and time. */
	timeToBeConfirmed?: boolean;
	/** The session as the organisers or Sessionize publish it. */
	sessionUrl?: string;
	/** The talk's own page on talks.jgcarmona.com. */
	talkUrl?: string;
	slidesUrl?: string;
	videoUrl?: string;
	sourceUrl?: string;
	/** Articles that tell the story behind the talk. */
	relatedPosts?: Link[];
	/** Repositories and demos shown in the talk. */
	repos?: Link[];
};

// The investigation behind CONVEX, Copilot Dev Days and RootedCON.
const BACKDOOR_POST: Link = { label: 'Backdoor en Next.js y ataque a desarrolladores', url: '/es/ataque-a-desarrolladores/' };
const HUNTING_REPO: Link = { label: 'hunting-the-hunter-episode-one', url: 'https://github.com/juangcarmona/hunting-the-hunter-episode-one' };

// Newest first.
export const APPEARANCES: Appearance[] = [
	{
		// Source: acceptance confirmed by the organisers on 2026-11-02; abstract from the Sessionize session.
		event: 'X-Ops Conference Madrid 2026',
		date: '2026-11-20',
		endDate: '2026-11-21',
		venue: 'Universidad Rey Juan Carlos',
		city: 'Móstoles',
		title: 'AI-Assisted Development at Scale: Keeping Product Decisions, Specs, and Agents Aligned',
		summary: 'AI-SDLC creates a traceability problem that becomes expensive as products evolve.',
		timeToBeConfirmed: true,
		sessionUrl: 'https://sessionize.com/s/juangcarmona/ai-assisted-development-at-scale-keeping-product-d/187449',
	},
	{
		// Source: talks/ingenieria-del-software-2_0 in the presentations repository (README and web.ts).
		event: 'Albacete Power BI & Fabric User Group',
		date: '2026-10-14',
		venue: 'Cervecería La Nena',
		city: 'Albacete',
		title: 'Ingeniería del Software 2.0',
		summary: 'Diseñar, construir y validar productos con IA.',
		talkUrl: 'https://talks.jgcarmona.com/software-engineering-2_0/',
		slidesUrl: 'https://talks.jgcarmona.com/decks/software-engineering-2_0/',
		sourceUrl: 'https://github.com/juangcarmona/presentations/tree/main/talks/ingenieria-del-software-2_0',
	},
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
		relatedPosts: [BACKDOOR_POST],
		repos: [HUNTING_REPO],
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
		relatedPosts: [BACKDOOR_POST],
		repos: [HUNTING_REPO],
	},
	{
		// TODO: add the summary sent to the organisers.
		event: 'RootedCON 2026',
		eventUrl: 'https://www.rootedcon.com/',
		date: '2026-03-05',
		endDate: '2026-03-07',
		city: 'Madrid',
		title: 'Caught by an AI: Detecting and Hunting a Targeted Backdoor',
		relatedPosts: [BACKDOOR_POST],
		repos: [HUNTING_REPO],
	},
	{
		// Source: CV. Event dates and venue: the UITP and Palais des congrès announcements.
		event: 'UITP Global Public Transport Summit 2017',
		date: '2017-05-15',
		endDate: '2017-05-17',
		venue: 'Palais des congrès de Montréal',
		city: 'Montréal',
		country: 'CA',
		summary: 'Presentation of Mastria, the smart multimodal transport system developed at the Alstom Madrid Innovation Lab.',
	},
	{
		// Source: the blog post announcing the session.
		event: 'IWT2 DojoUS, Universidad de Sevilla',
		date: '2012-11-09',
		city: 'Sevilla',
		title: 'SOLID y GRASP',
		relatedPosts: [{ label: 'IWT2 DojoUS: SOLID y GRASP', url: '/es/iwt2-dojous-solid-y-grasp/' }],
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
		url: 'https://sessionize.com/s/juangcarmona/ai-assisted-development-at-scale-keeping-product-d/187449',
	},
	{
		title: 'Hard and Soft Guardrails for Agentic Software Engineering',
		summary: 'An agent can only be as safe as the engineering discipline it is given.',
		lang: 'EN',
		url: 'https://talks.jgcarmona.com/soft-and-hard-guardrails/',
	},
];
