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
	/** Set by hand from the organisers' confirmation, never inferred from the date. */
	status: 'presented' | 'upcoming';
	event: string;
	eventUrl?: string;
	/** Event start date (ISO). The talk may be on a later day of a multi-day event. */
	date: string;
	endDate?: string;
	venue?: string;
	/** City, or "Online" for a live stream. */
	city: string;
	/** Streamed live rather than given on site. */
	online?: boolean;
	/** ISO 3166-1 alpha-2 code; defaults to ES. */
	country?: string;
	/** Session title exactly as the programme lists it. */
	title?: string;
	lang?: 'es' | 'en';
	/** The original abstract, quoted literally from the source named in the entry's comment. */
	abstract?: string;
	/** A short neutral summary written for this site; always shown as a summary, never as a quotation. */
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
	/** Material a source explicitly ties to this talk: its announcement, its deck, its repository. */
	materials?: Link[];
	/** Writing on the same subject that no source ties to the talk. Shown apart, as related reading. */
	relatedReading?: Link[];
	/** Third-party pages that document the session. */
	references?: Link[];
};

// The backdoor investigation. The article links the repository; no programme, recording or deck
// links either of them to a talk, so they are related reading, not talk material.
const BACKDOOR_READING: Link[] = [
	{ label: 'Backdoor en Next.js y ataque a desarrolladores', url: '/es/ataque-a-desarrolladores/' },
	{ label: 'hunting-the-hunter-episode-one', url: 'https://github.com/juangcarmona/hunting-the-hunter-episode-one' },
];

// Newest first.
export const APPEARANCES: Appearance[] = [
	{
		// Source: Juan, acceptance confirmed on 2026-11-02 (event, dates, venue). Title and abstract: the Sessionize session.
		status: 'upcoming',
		event: 'X-Ops Conference Madrid 2026',
		date: '2026-11-20',
		endDate: '2026-11-21',
		venue: 'Universidad Rey Juan Carlos',
		city: 'Móstoles',
		title: 'AI-Assisted Development at Scale: Keeping Product Decisions, Specs, and Agents Aligned',
		lang: 'en',
		abstract: 'AI-SDLC creates a traceability problem that becomes expensive as products evolve.',
		timeToBeConfirmed: true,
		sessionUrl: 'https://sessionize.com/s/juangcarmona/ai-assisted-development-at-scale-keeping-product-d/187449',
	},
	{
		// Source: Juan, 2026-11-02 (title, venue, date, abstract) and the Eventbrite listing.
		// No deck link: the published Software Engineering 2.0 deck has evolved since this session (Juan, 2026-11-03).
		// The session was adapted to the group on the day; the abstract is the one announced, not a transcript.
		status: 'presented',
		event: 'Albacete Power BI & Fabric User Group',
		eventUrl: 'https://www.eventbrite.es/e/ingenieria-del-software-20-disenar-construir-y-validar-productos-con-ia-tickets-2002798261514',
		date: '2026-10-14',
		venue: 'Fábrica Bar La Nena',
		city: 'Albacete',
		title: 'Ingeniería del Software 2.0: diseñar, construir y validar productos con IA',
		lang: 'es',
		abstract: [
			'Llevamos años recortando en buenas prácticas de ingeniería para poder entregar a tiempo. Ahora que podemos delegar en la IA buena parte de la implementación, tenemos la oportunidad de revisar y la obligación de mejorar nuestros procesos de principio a fin.',
			'Llevo más de veinte años desarrollando software y, en los últimos años, haciéndolo con IA, he tenido que replantearme muchas cosas: qué necesita mi proyecto para trabajar con agentes, qué necesitan los agentes para adaptarse al proyecto, cómo hacer que se respeten las decisiones técnicas y cómo validar que se entrega lo que se esperaba.',
			'En esta charla compartiré lo que estoy poniendo en práctica y lo que sigo refinando. Hablaremos de desarrollo agéntico, Spec-Driven Development, guardarraíles duros y blandos y de la evolución del concepto de definición de un producto de software, con ejemplos reales y explicando las ventajas e inconvenientes de la IA en cada parte del proceso y qué sigue dependiendo completamente de nosotros.',
			'La IA está cambiando la ingeniería del software y así es como algunos estamos diseñando cómo vamos a ejercer nuestra profesión en los próximos años.',
		].join('\n\n'),
		summary:
			'An adapted session on Software Engineering 2.0, exploring agentic development, Spec-Driven Development, engineering guardrails, and how AI is changing software delivery.',
		references: [
			{ label: 'Announcement on LinkedIn', url: 'https://es.linkedin.com/posts/juangcarmona_el-software-es-uno-de-los-campos-donde-m%C3%A1s-activity-7512908921179643904-Wv8m' },
			{ label: 'Post by Raúl Vinuesa', url: 'https://es.linkedin.com/posts/raulvinuesaarjona_ia-software-powerbi-activity-7513470794174320640-vRjg' },
		],
	},
	{
		// Source: the recording published by Plain Concepts (title; the abstract is the third paragraph of its description).
		// Event dates and venue: convexsummit.com.
		status: 'presented',
		event: 'CONVEX 2026',
		eventUrl: 'https://www.convexsummit.com/',
		date: '2026-06-17',
		endDate: '2026-06-18',
		venue: 'Kinépolis Ciudad de la Imagen',
		city: 'Madrid',
		title: 'IA contra IA: anatomía de un ataque dirigido a perfiles técnicos',
		lang: 'es',
		abstract:
			'Esta charla reconstruye una situación real en primera persona: una investigación nacida de una oportunidad profesional aparentemente legítima que escondía una trampa altamente sofisticada.',
		videoUrl: 'https://www.youtube.com/watch?v=gVGUC9E6HxI',
		relatedReading: BACKDOOR_READING,
	},
	{
		// Source: the event's programme (title, speaker, date, venue), checked on 2026-11-02.
		status: 'presented',
		event: 'GitHub Copilot Dev Days Madrid',
		eventUrl: 'https://githubcopilotdevdaysmadrid.techriders.es/eventos/2026-04-17-copilot-dev-days-madrid/',
		date: '2026-04-17',
		venue: 'Tajamar Tech',
		city: 'Madrid',
		title: 'Pillado por una IA: detección y disección de un ataque dirigido a desarrolladores',
		lang: 'es',
		relatedReading: BACKDOOR_READING,
	},
	{
		// Source: Juan (title). The public RootedCON site does not list the session; the abstract sent to the organisers is missing.
		status: 'presented',
		event: 'RootedCON 2026',
		eventUrl: 'https://www.rootedcon.com/',
		date: '2026-03-05',
		endDate: '2026-03-07',
		city: 'Madrid',
		title: 'Caught by an AI: Detecting and Hunting a Targeted Backdoor',
		lang: 'en',
		relatedReading: BACKDOOR_READING,
	},
	{
		// Source: the recording on Eberhard Wolff's channel (title, date, description) and Juan's announcement post.
		// Abstract: the second paragraph of the recording's description, verbatim (organiser text).
		status: 'presented',
		event: 'Software Architektur im Stream',
		eventUrl: 'https://software-architektur.tv/',
		date: '2025-07-11',
		city: 'Online',
		online: true,
		title: 'The Architecture of the Death Star - 20 Years of arc42 and What We Can Learn',
		lang: 'en',
		abstract:
			'In this session, we’ll examine the most iconic space fortress in film history through Juan’s complete arc42 documentation. This creative Star Wars project becomes an educational journey through the arc42 template - exploring how fictional architectures can teach us real lessons about software documentation.',
		videoUrl: 'https://www.youtube.com/watch?v=w0fj9kLVjEc',
		materials: [
			{ label: 'Repository', url: 'https://github.com/juangcarmona/starwars-deathstar-arc42-documentation' },
			{ label: 'Announcement', url: '/es/documentar-arquitectura-software-arc42/' },
		],
	},
	{
		// Source: CV (the presentation). Event dates and venue: the UITP and Palais des congrès announcements.
		status: 'presented',
		event: 'UITP Global Public Transport Summit 2017',
		date: '2017-05-15',
		endDate: '2017-05-17',
		venue: 'Palais des congrès de Montréal',
		city: 'Montréal',
		country: 'CA',
		summary: 'Presentation of Mastria, the smart multimodal transport system developed at the Alstom Madrid Innovation Lab.',
	},
	{
		// Source: the blog post announcing the session (topic and date) and the Betabeers listing it links.
		status: 'presented',
		event: 'IWT2 DojoUS, Universidad de Sevilla',
		date: '2012-11-09',
		city: 'Sevilla',
		title: 'SOLID y GRASP',
		lang: 'es',
		materials: [{ label: 'Announcement and material', url: '/es/iwt2-dojous-solid-y-grasp/' }],
	},
];

export type Session = {
	title: string;
	/** The opening of the Sessionize abstract, verbatim (checked on 2026-11-02). */
	summary: string;
	url?: string;
};

// Sessions offered to organisers, copied from the Sessionize profile.
export const SESSIONS: Session[] = [
	{
		title: 'Software Engineering 2.0: Designing, Building, and Validating Products with AI',
		summary:
			'For years, we have been cutting back on good engineering practices to deliver on time. Now that we can delegate much of the implementation to AI, we have an opportunity to review, and an obligation to improve, our processes from end to end.',
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
		url: 'https://talks.jgcarmona.com/soft-and-hard-guardrails/',
	},
];

/** The material a source ties to a talk, in reading order. Related reading is kept apart. */
export function talkLinks(talk: Appearance): Link[] {
	return [
		talk.sessionUrl && { label: 'Session', url: talk.sessionUrl },
		talk.videoUrl && { label: 'Recording', url: talk.videoUrl },
		talk.slidesUrl && { label: 'Slides', url: talk.slidesUrl },
		talk.talkUrl && { label: 'Talk page', url: talk.talkUrl },
		talk.sourceUrl && { label: 'Source', url: talk.sourceUrl },
		...(talk.materials ?? []),
	].filter((link): link is Link => !!link);
}

export type Course = {
	title: string;
	/** Quoted from the course's own README. */
	summary: string;
	/** What it covers, as named in the material. */
	modules?: string[];
	/** Where and how it has been given, without naming clients. */
	delivery?: string;
	links: Link[];
};

// Courses and workshops whose material is public. Internal sessions for teams and clients are not listed by name.
export const COURSES: Course[] = [
	{
		// Source: the README of github_copilot_000_hub (title, summary, modules). Delivery: Juan, 2026-11-03.
		title: 'GitHub Copilot Zero-to-Hero Crash Course',
		summary: 'Practical workshop to go from zero to hero with GitHub Copilot. Focus: real engineering workflows, not just features.',
		modules: [
			'Orientation',
			'Foundations',
			'Prompting',
			'AI workflow quality',
			'Instructions',
			'Agents',
			'AI-ready repos',
			'MCP and orchestration',
			'Spec-driven development',
			'AI-SDLC',
		],
		delivery: 'Given several times to engineering teams.',
		links: [
			{ label: 'Course and decks', url: 'https://github.com/juangcarmona/github_copilot_000_hub' },
			{ label: 'Lab 101: Basics', url: 'https://github.com/juangcarmona/github_copilot_101_copilot_basics' },
			{ label: 'Lab 102: Prompting', url: 'https://github.com/juangcarmona/github_copilot_102_prompting' },
			{ label: 'Lab 103: Validation, testing and PRs', url: 'https://github.com/juangcarmona/github_copilot_103_validation_testing_prs' },
			{ label: 'Festival platform workshop', url: 'https://github.com/juangcarmona/festival-platform-workshop' },
		],
	},
	{
		// Source: the repository README (summary), the DADS #06 video and article, and the Software Architektur im Stream recording.
		title: 'arc42: documenting software architecture',
		summary:
			'This project aims to document the fictional architecture of the Death Star by applying the arc42 model, a popular framework for structured software architecture documentation.',
		modules: ['All twelve arc42 sections', 'English and Spanish'],
		links: [
			{ label: 'Death Star arc42 repository', url: 'https://github.com/juangcarmona/starwars-deathstar-arc42-documentation' },
			{ label: 'DADS #06 video', url: 'https://www.youtube.com/watch?v=-jQLE2rilH4' },
			{ label: 'DADS #06 article', url: '/es/dads-06-documenta-arquitectura-de-software-con-arc42/' },
			{ label: 'Software Architektur im Stream', url: 'https://www.youtube.com/watch?v=w0fj9kLVjEc' },
		],
	},
	{
		// Source: the README of docker-model-runner-talk (summary). Delivery and topics: Juan, 2026-11-03.
		title: 'Running language models locally',
		summary: 'VS Code–driven, terminal-first walkthrough of Docker Model Runner (DMR). One local runtime. Multiple clients. CPU or GPU. No cloud APIs.',
		modules: ['Docker Model Runner', 'llama.cpp', 'vLLM'],
		delivery: 'Talks for teams, walking through the repositories.',
		links: [
			{ label: 'Docker Model Runner talk', url: 'https://github.com/juangcarmona/docker-model-runner-talk' },
			{ label: 'Claude Code with DMR', url: 'https://github.com/juangcarmona/claude-code-local-dmr' },
			{ label: 'Running Models Locally with DMR', url: '/en/enable-gpu-docker-model-runner-windows/' },
			{ label: 'Local LLMs Under the Hood', url: '/en/local-llms-under-the-hood/' },
			{ label: 'Quantization', url: '/en/quantization-making-llms-smaller/' },
		],
	},
];
