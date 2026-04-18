---
lang: en
title: "One Word to Rule Them All: Orchestration"
description: "From spec-driven development to orchestration: what GitHub Copilot Dev Days Madrid, OpenSpec, and Spec Kit taught me about keeping AI-generated systems coherent."
pubDate: 2026-04-18
categories:
  - "software-development"
  - "artificial-intelligence"
  - "architecture"
heroImage: "images/spec-driven-done-right.png"
slug: "orchestration-ai-software-development"
tags:
  - "software-architecture"
  - "ai"
  - "best-practices"
  - "spec-driven-development"
  - "orchestration"
---

Software architecture used to be about structure. Then AI changed the constraint: the problem is no longer building systems—it's keeping them coherent while they evolve at a speed no human can match alone.

That shift forces a different center of gravity.

**Orchestration.**

---

## How I Got There

A week ago I published [*Spec-Driven Development: Controlling AI-Generated Drift*](https://jgcarmona.com/en/spec-driven-done-right/), born from a very concrete feeling: today we generate code faster than we can read it, understand it, and govern it. The thesis was simple—if AI accelerates execution, the specification must become the control system. Not as bureaucracy. Not as ritual. As a survival mechanism.

This article goes one step further. I don't want to stop at "use specs." I want to land what it actually means to move **towards** spec-driven development when you work with agents, with GitHub Copilot, with living repos, with brownfield, with real pressure and absurd velocity. And I'm writing from something very concrete: my experience at **GitHub Copilot Dev Days Madrid**, the **Spec Kit workshop** by Rodrigo Liberoff and Borja Piris de Castro, and my recent exploration of **OpenSpec**.

Two things clicked.

A conversation with Andoni Santamaría led me to **[OpenSpec](https://github.com/Fission-AI/OpenSpec)**—a lightweight, brownfield-first framework for living specifications.

And at GitHub Copilot Dev Days Madrid, after sessions with Rodrigo and Borja, I started digging into **[Spec Kit](https://github.com/github/spec-kit)**—GitHub's own toolkit for making specs executable and operable.

That combination changed the framing. Not because they introduce something radically new—but because they make explicit something that was already missing: **the loop**.

The interesting thing is not choosing a religion. It's understanding why these tools exist, what problem they try to solve, and what part of that problem we can no longer afford to ignore.

---

## From Controlling Drift to Taking Intent Seriously

If in the previous article the thesis was that the great enemy is *drift*, here the thesis is different—though really it's the same one seen up close: the problem isn't that AI writes code. The problem is that it writes code **too soon, too fast, and too often without the intent being sufficiently stabilized**. That was the intuition behind my earlier text when I talked about **semantic anchors**, boundaries, stable language, meaning review, and hard rollback when needed. It wasn't a defense of documents. It was a defense of control.

That's why I'm interested in talking about "towards" and not "the one true way." I don't believe in silver bullets, and even less so at this stage. What I do believe is that we're entering a phase where improvising prompts is no longer enough. The discipline is no longer in writing better code by hand. It's in **designing better the context that governs agents**. GitHub calls this *Spec-Driven Development*, and in the Madrid workshop, Rodrigo lands it very well: separating **spec** as the *what/why* from **plan** as the *how* stops being theory and becomes a reproducible operational sequence. The workshop materials themselves present this as an explicit transition from *vibe coding* toward *context engineering*.

---

## Madrid as a Turning Point

GitHub Copilot Dev Days is a global series of in-person, community-driven, hands-on events to explore real workflows with GitHub Copilot. Microsoft and GitHub present it as a format of sessions and workshops with locally adapted agendas, and the [official initiative repository](https://github.com/github/GitHub-Copilot-Dev-Days) places the 2026 edition between March 15 and May 15.

The Madrid edition was held on **April 17, 2026** at **Tajamar Tech**, organized by [TechRiders_es](https://www.linkedin.com/posts/techriders-es_github-copilot-dev-days-madrid-2026-talleres-activity-7444773747707822082-0Job) and GitHub Community España, with a morning of workshops, GitHub Copilot, MCP, and networking. The public listing mentioned 450 seats and a roughly 9:30–14:00 schedule.

I was invited to share my talk **"Pillado por una IA: detección y disección de un ataque dirigido a desarrolladores"** (Caught by an AI: detecting and dissecting a targeted attack on developers). The clearest public verification I've found is [Plain Concepts' pre-event post](https://www.linkedin.com/posts/plainconcepts_copilotdevdaysmadrid-copilot-copilot-activity-7450456300070694913-qaOo), which mentions the session and how Copilot helped detect and analyze a targeted developer attack.

But for me, the important thing about that day wasn't just being on stage. It was crossing paths with people who are thinking about the SDLC with the same discomfort I've been feeling. [Rodrigo Liberoff](https://sessionize.com/rliberoff/) is publicly listed as **Cloud & Software Senior Architect / Generative AI Tech Lead** and **Microsoft MVP for Azure / Azure AI Foundry**. [Borja Piris de Castro](https://www.linkedin.com/posts/borja-piris_los-reyes-magos-suelen-traen-regalos-muy-activity-7414620806175150080-fWLX) serves as **Head of AI Platform Engineering & Principal Tech Lead** and was recently accepted into the Microsoft MVP Program.

It wasn't the first time they'd spoken about this publicly. In a recent session at [AgentCamp](https://sessionize.com/s/rliberoff/gestionando-equipos-de-agentes-el-futuro-de-la-pro/169669/), Rodrigo and Borja were already framing the same transition: less manual writing, more managing and editing agent output; less dependence on the lucky prompt; more strategy with tools like Spec Kit, BMad Method, and OpenSpec. That interests me because it connects exactly with what I wanted to keep writing: not a hymn to a tool, but a **mental posture shift**.

And then there was the workshop. The [repository used for the session](https://github.com/rliberoff/2026-github-copilot-dev-days-workshop) is perhaps the most valuable artifact from the whole day: it wasn't an empty demo. It was a didactic, roughly two-hour walkthrough, with materials in Spanish, SDD artifacts in English, and four executable reference projects—greenfield and brownfield, in C# and Python. The workshop explicitly covered the flow **constitution → specify → plan → tasks → implement**, added a module on presets and extensions, and distinguished without caricature between starting from scratch and landing discipline on an existing system. That detail matters because that's where so many explanations fail: they sell SDD as if it only works for clean, new, frictionless projects. Here, brownfield was part of the core narrative.

---

## I've Always Been on This Path

This didn't come out of nowhere.

I've always leaned into what most teams avoid:

- **UML**, when it was still the default language for structure
- **[C4 Model](https://c4model.com/)** for clarity and hierarchy
- **[Mermaid](https://mermaid.js.org/)** to keep diagrams close to code, lightweight, and versioned
- **[arc42](https://arc42.org/)** to structure architecture documentation properly
- **Design Patterns** when I need proven solutions instead of improvising under pressure

That was my "gang of five." Not academic. Not dogmatic. Just tools that help me keep the system understandable while everything else tries to move faster than I can think.

And now:

- **OpenSpec** → specs as living, executable artifacts
- **Spec Kit** → operationalizing specs in real workflows with agents

Individually, these are tools. Together, they point to something else entirely.

---

## The Missing Piece Was Never Documentation

Documentation was never the problem.

**Static** documentation is.

You can define:

- Perfect domain language
- Clean boundaries
- Clear diagrams

And still lose the system within weeks.

Because nothing enforces alignment over time.

That's the gap OpenSpec and Spec Kit start to close. They don't just describe the system—they **plug into how it evolves**.

---

## What Convinces Me About OpenSpec

[OpenSpec](https://github.com/Fission-AI/OpenSpec) attacks the problem from a specific angle. Its official sources present it as a lightweight, universal, open-source framework compatible with multiple assistants—including GitHub Copilot—with a very explicit philosophy: **fluid not rigid**, **iterative not waterfall**, **easy not complex**, and **brownfield-first**. That statement of intent says a lot. It doesn't try to look like a corporate process. It tries to be a minimal layer of structure where intent survives velocity.

Its mental model is also distinct. OpenSpec separates two spaces: `openspec/specs/` as the source of truth for the system's current behavior, and `openspec/changes/` as a folder for proposed changes. Each change lives as a self-contained package with `proposal.md`, `design.md`, `tasks.md`, and *delta specs*. The documentation summarizes the flow as: **proposal → specs → design → tasks → implement**. That's especially sane for living repos, because the conversation stops evaporating in chat and starts being archived in the code itself.

The basic operational flow is very short: install, `openspec init`, start with `/opsx:propose`, execute with `/opsx:apply`, and consolidate with `/opsx:archive`. For the expanded profile, commands like `/opsx:new`, `/opsx:continue`, `/opsx:verify`, and `/opsx:sync` appear. It's no accident this works well with brownfield: OpenSpec insists that most real software doesn't start from scratch, and that it makes no sense to "generate all specs upfront"—you create them as needed and archive them to preserve the *why*, not just the *what*.

What I like about OpenSpec is precisely this: it doesn't try to win you over with monumentality. It wins if you understand that your biggest problem isn't starting—it's **maintaining stable context across sessions, changes, and people**. If I had to summarize it honestly: OpenSpec is a reminder that a useful spec doesn't have to be heavy, but it does have to be **persistent**.

---

## What Convinces Me About Spec Kit

[Spec Kit](https://github.com/github/spec-kit), for its part, is the most explicit attempt I've seen from GitHub to convert that intuition into an integrated flow. GitHub open-sourced it in September 2025 and describes it as a toolkit for turning specifications from disposable scaffolding into executable, shareable artifacts. Its official documentation makes the central idea very clear: **intent-driven development**, project principles, multi-phase refinement, and less "one-shot" generation from loose prompts.

The base flow is also explicit. First, **constitution**: guiding principles for the project. Then **specify**: what I want to build and why. Then **clarify** if there are ambiguities. Then **plan**: technical decisions, architecture, and stack. Then **tasks**, optionally **analyze**, and finally **implement**. I like it because it forces you to separate intent from solution, and because it leaves a trail in versionable artifacts: `constitution.md`, `spec.md`, `plan.md`, `tasks.md`, and even contracts, research, and quickstart in richer examples.

Beyond that, Spec Kit doesn't stop at the happy path. It has a clear route for **presets** and **extensions**. Presets let you modify templates and commands without forking the core; extensions add new capabilities. Template resolution follows a concrete stack: *project overrides → presets → extensions → core templates*. In serious environments, that matters a lot—it's the frontier between "using a tool" and "adapting it to your workflow without breaking it."

The workshop repository was especially revealing because it teaches Spec Kit the best way possible: **by using it**. The workshop isn't just about explaining SDD; it's built with SDD artifacts itself. The `plan.md` describes four executable projects and Spanish materials; the `research.md` explains why the Python greenfield uses stdlib and why the Python brownfield uses Flask; the `tasks.md` organizes work by phases and stories; and the exercises make visible the difference between greenfield and brownfield in very concrete cases: **TodoLite CLI** from scratch and a preexisting **Notes API** that gets a `GET /notes/search` added.

The customization module shows small but important things. A preset introduces a **"Verifiable Acceptance Criteria"** section in the spec template and a **"Key Decisions"** table in the plan. And the greenfield exercise explains when to mark a principle as **`(NON-NEGOTIABLE)`**—for instance, security rules, compliance, or test-first. It's not about generating documents. It's about deciding which parts of the context are soft and which must never degrade. That's where I see the real value of the approach.

---

## Comparing Without Caricatures

My reading, after seeing both approaches up close, is that **OpenSpec and Spec Kit are not enemies**. They are two different responses to the same pain: execution is already cheap, but ambiguity has become extremely expensive. The differences matter, yes, but mainly for choosing where to introduce discipline and with what level of opinion.

| Aspect | OpenSpec | Spec Kit |
|---|---|---|
| Philosophy | Lightweight, fluid, iterative, brownfield-first | More guided, more opinionated, oriented to intent + complete artifacts |
| Source of truth | `openspec/specs/` + changes in `openspec/changes/` | Constitution + numbered specs + plans + tasks within the Spec Kit flow |
| Base flow | `propose → apply → archive` | `constitution → specify → clarify → plan → tasks → analyze → implement` |
| Strength | Maintaining living, reviewable context in repos that already exist | Formalizing a pipeline from intent to implementation with clear guardrails |
| Customization | Profiles and expanded workflow | Presets, extensions, and overrides with a resolution stack |
| Best fit | Teams wanting minimal but persistent structure | Teams needing more framework, more traceability, and more homogeneity |

```mermaid
flowchart LR
    A[Idea or change] --> B1[OpenSpec<br/>/opsx:propose]
    B1 --> C1[proposal + delta specs + design + tasks]
    C1 --> D1[/opsx:apply]
    D1 --> E1[/opsx:archive]

    A --> B2[Spec Kit<br/>/speckit.constitution]
    B2 --> C2[/speckit.specify]
    C2 --> D2[/speckit.clarify]
    D2 --> E2[/speckit.plan]
    E2 --> F2[/speckit.tasks]
    F2 --> G2[/speckit.analyze]
    G2 --> H2[/speckit.implement]
```

If I had to say it in one sentence: **OpenSpec feels like a continuity layer; Spec Kit, a governance layer**. And they're not incompatible as ideas. In fact, if there's one thing I take away from these weeks, it's that the mature conversation isn't about favorite frameworks—it's about how much explicit context your system demands to not fall apart when you push it with agents.

---

## Orchestration Is the Only Thing That Scales

Specs define intent.

Code implements it.

Agents accelerate both.

But none of that guarantees coherence.

**Orchestration** does.

Not as a tool. As a control system:

- **Specs** → drive generation
- **Generation** → produces artifacts
- **Artifacts** → are validated against specs
- **Deviations** → trigger correction

That loop is the system.

Break it, and everything drifts.

---

## Vertical Slices Become the Unit of Truth

This only works if the system is decomposed correctly.

Not by layers. By behavior.

Vertical slices give you:

- A bounded piece of domain meaning
- A direct mapping between spec and implementation
- A unit that both humans and agents can reason about

This is where Spec Kit becomes practical. It gives structure to slices. It makes them operable.

Without slices, orchestration is abstract. With them, it's enforceable.

---

## The Real Change Is Not the Tool

In the LinkedIn thread by [Matthias Lange](https://www.linkedin.com/posts/matthias-lange-a811a1152_can-everyone-calm-down-for-a-second-activity-7448773115284758529-G6eP), several ideas surfaced that fit too well with all of this. The first, the simplest: **"AI doesn't replace expertise—it amplifies it."** The second, from Kevin Radtke, spoke of a **"noise-to-signal problem"** and how AI lowers the barrier to entry while raising the demands for architectural integrity. The third, almost classical carpentry, was Eric Johannsen's **"Measure twice—cut once."** I couldn't have summarized it better.

That's exactly what I see behind this whole movement toward spec-driven development. We're not witnessing the end of engineering. We're witnessing the end of the comfort of working with implicit intent, oral context, and decisions that "will sort themselves out." That worked when the bottleneck was human. Now the bottleneck is different: **aligning meaning before the machine turns it into a surface of code**.

So if I have to leave a clear position, it's this: moving toward spec-driven development doesn't mean marrying a specific framework. It means accepting that the craft has changed. That now you have to design intent better, harden invariants more deliberately, leave more useful traces in the repository, and review less by intuition and more by contract. It means going from the brilliant prompt to the stable work system. From "let's see what it generates" to "this is what must not degrade." From enthusiasm for speed to **responsibility for orchestration**.

---

## A Note on Honesty

I've been able to publicly verify the event date, the title of my session, the existence of the workshop, Rodrigo's and Borja's profiles, the repository structure, and the official flows of OpenSpec and Spec Kit. What I **have not** been able to verify in any publicly accessible agenda is the exact slot of my talk within the schedule, nor the exact identity of the colleague from Plain Concepts who introduced me to OpenSpec and gave a talk about it this week. That attribution I leave, for honesty's sake, as **not publicly specified** with the open sources I was able to review.

---

## Annotated Links

- [My previous article: *Spec-Driven Development: Controlling AI-Generated Drift*](https://jgcarmona.com/en/spec-driven-done-right/) — conceptual starting point for this piece: control, drift, and semantic anchors.
- [GitHub Copilot Dev Days 2026 — official repository](https://github.com/github/GitHub-Copilot-Dev-Days) — global context of the initiative, formats, and base materials.
- [Microsoft for Developers — GitHub Copilot Dev Days](https://developer.microsoft.com/blog/github-copilot-dev-days) — official description of the series and typical agenda.
- [TechRiders_es — GitHub Copilot Dev Days Madrid 2026 announcement](https://www.linkedin.com/posts/techriders-es_github-copilot-dev-days-madrid-2026-talleres-activity-7444773747707822082-0Job) — date, venue, and local focus for the Madrid event.
- [Plain Concepts — pre-event post](https://www.linkedin.com/posts/plainconcepts_copilotdevdaysmadrid-copilot-copilot-activity-7450456300070694913-qaOo) — public verification of my talk's title.
- [Rodrigo Liberoff — Sessionize](https://sessionize.com/rliberoff/) — public role and MVP status.
- [Borja Piris de Castro — Microsoft MVP Program recognition](https://www.linkedin.com/posts/borja-piris_los-reyes-magos-suelen-traen-regalos-muy-activity-7414620806175150080-fWLX) — public confirmation of his MVP acceptance.
- [Sessionize — "Gestionando equipos de agentes: el futuro de la programación en la era de la IA"](https://sessionize.com/s/rliberoff/gestionando-equipos-de-agentes-el-futuro-de-la-pro/169669/) — recent session by Rodrigo and Borja connecting agents, OpenSpec, BMad, and Spec Kit.
- [Workshop repo: `rliberoff/2026-github-copilot-dev-days-workshop`](https://github.com/rliberoff/2026-github-copilot-dev-days-workshop) — the most valuable material from the day: SDD taught by applying it.
- [Spec Kit — official repo](https://github.com/github/spec-kit) — philosophy, flow, and customization with presets and extensions.
- [OpenSpec — official repo](https://github.com/Fission-AI/OpenSpec) — lightweight approach, per-change artifacts, and `propose/apply/archive` flow.
- [Matthias Lange's LinkedIn thread](https://www.linkedin.com/posts/matthias-lange-a811a1152_can-everyone-calm-down-for-a-second-activity-7448773115284758529-G6eP) — a good thermometer of the current conversation: expertise, architectural integrity, and less empty hype.

---

## Distilled

- **UML / C4 / Mermaid / arc42** → ways to describe and structure systems
- **OpenSpec** → makes specs first-class and executable
- **Spec Kit** → operationalizes specs in real workflows
- **Orchestration** → keeps everything aligned over time

Everything else is secondary.

---

## Final Thought

Speed is no longer the advantage.

Control is.

And in this new landscape, there's only one word that matters:

**Orchestration.**
---
title: "Spec-Driven Development: Controlling AI-Generated Drift"
description: "How specification-driven development serves as a control system to maintain product consistency when AI generates code at unprecedented speeds."
pubDate: 2026-04-11
categories:
  - "software-development"
  - "artificial-intelligence"
  - "architecture"
heroImage: "images/spec-driven-done-right.png"
slug: "spec-driven-done-right"
tags:
  - "software-architecture"
  - "ai"
  - "best-practices"
---

TL;DR; How do we maintain software quality when production is approaching the speed of light and we generate code faster than we can read it? I don’t have a definitive answer, but here are my two cents.

## The New Reality

I've been coding, daily, even on weekends, for more than half of my life. Things started to change in 2023 when a new chat tool appeared and I found it extremely useful and helpful while coding, ChatGPT. I had heard about GPT, but ChatGPT blew our minds and many fell in love at first sight, including me. What a moment to be alive. At that point in time it became my coding mate. We did pair programming and I became a pioneer of what then everyone called vibe coding. 

That was three years ago, three years that feel like many, many more... And today, a single person with zero or almost zero software engineer knowledge or coding skills or experience, can deliver "complete" products in days. Everyone talks about it. Haven't noticed? You can sit on a café terrace and hear people talking about image or video generation or manipulation and many other things it can do for us... or replacing us... And, IMHO, I feel that society is half amazed and half scared. In Software Development, my profesional field, this new Gen AI era has changed the field. We've lived an entire paradignm shift and the problem is no longer writing code, it is maintaining product consistency, maintainability, reliability and avoid drift while managing AI agents that, as I said before, write code and other assets at the speed of light. In general the problem that many skilled professionals have noticed is that they, our new tools, our new development team under our management, have a huge lack of attention. And Attention is key in this field.

Before Generative AI, there was already drift between what was requested and what was implemented. Vibe coding works extremely well for demos and rapid progress, but it also amplifies that drift, introducing both technical and functional debt at a brutal pace. The larger the product, the more visible and costly that drift becomes.

What has changed now is not just speed, but scale and impact. AI doesn’t just generate more code, it generates more problems, and it does it faster than we can detect and fix them. Recent studies show that AI-generated pull requests contain significantly more issues than human-written ones ([source](https://tech.yahoo.com/ai/copilot/articles/ai-generated-code-contains-more-105117833.html)), that a notable percentage of AI-generated commits introduce defects that persist over time ([source](https://arxiv.org/abs/2603.28592)), and that AI-assisted development can increase the number of vulnerabilities in a codebase ([source](https://www.researchgate.net/publication/397890586_Empirical_Analysis_of_AI-Assisted_Code_Generation_Tools_Impact_on_Code_Quality_Security_and_Developer_Productivity)).

This is no longer a linear or a Poisson Distribution (I mean human) problem. Drift compounds, and as production accelerates, so does the accumulation of hidden defects, inconsistencies, performance botlenecks and architectural decay, often unnoticed until they surface in real usage.

Yes, it is April 12th 2026 and these are my thoughts on this topic, on using AI for software development. I apologize for the chaos, but it reflects how chaotic my own thinking on this is, full of philosophical and technical contradictions. Why is that? Because I’ve been fighting Gen AI drift for three years now. I sometimes feel like a super-powered engineer, like a superhero with many of the powers of those around me. 

![Homelander metaphor](images/homelander.webp)

But I can’t be like Homelander, and neither should you, blindly proud, because the crash would be epic.

> If you’ve ever felt like him and then crashed, shipped something broken, introduced a stupid regression, or just created a mess, then Spec-Driven Development is for you. It’s what I’ve found helps me avoid drift (and those crashes) the most.

## What Spec-Driven Development Really Means

Spec-Driven Development just means putting some kind of control system in place, *whatever works for you*, to define intent, language, limits, and review criteria when an AI is producing code at an absurd rate. 

> Wait a minute! That didn't answer the question! What should I use?

I am sorry, it depents, there is no silver bullet. In practice, for me, it looks like this:

* Define as much as possible before prompting anything
* Lock down vocabulary and concepts that must not degrade
* Write enough docs and specs to guide execution
* Work in small, controlled chunks
* Validate not only that it works, but that it remains true to the product
* Roll back hard when things drift (because they will)

And this is also where I lean on my usual toolkit. Specs are not just text. They are structure. They are visuals. They are contracts. 

1. C4 to keep context, containers, and boundaries explicit
2. UML when behavior, flows, or relationships need precision
3. Mermaid to keep those diagrams lightweight, versioned, and close to the code
4. Design Patterns when I need proven solutions instead of improvising under pressure
5. arc42 to give the whole thing a consistent structure and backbone

This is my “gang of five”. Not academic. Not dogmatic. Just a set of tools that help me keep the system understandable while everything else is trying to move faster than I can think.
## Semantic Anchors: The Foundation of Consistency

Certain terms, concepts, and system boundaries must remain stable if you want the product to mean the same thing tomorrow as it does today:

* Domain names
* Functional concepts
* Architecture contracts
* Behavior rules
* Language across docs, prompts, pull requests, and code

This is where semantic anchors come in. Not as a heavy framework, but as a very practical trick: using well-known, stable concepts as compressed instructions the model already understands.

You don’t need to explain everything every time. You just say things like:

* “Use SOLID principles”
* “Keep it DRY and follow YAGNI”
* “Respect the existing architecture boundaries”
* “Do not introduce new abstractions unless justified”

And the model aligns.

That’s the key. Anchors are not just definitions. They are shortcuts for intent.

Ralf D. Müller formalizes this idea in a much more complete way, defining explicit anchors and contracts to stabilize communication with LLMs. But even a lightweight version of that approach already pays off.

Because without anchors, models drift. They rename things. They generalize. They simplify. They reshape your system into something that looks plausible but no longer means the same.

In small systems, you might get away with it. In larger ones, that’s how everything slowly breaks.

Semantic anchors don’t make the AI smarter. They just make it behave.

## What works for me

My approach is definitely not perfect, it's not academic at all... It’s jsut something that has emerged from real work and real mistakes and a fair amount of rollback during last few years using cloud and local Generative AI. 

In practice, it looks more or less like this:

1. Start with a clear product idea or intent (but notice that ideas evolve...) `Pen and paper rocks!`
2. Write documentation and specs to anchor it (you can use your favourite LLM for this)
3. Define the semantic anchors that must not drift (domain and technical)
4. Break the work into small, controlled tasks or prompts (at least a roadmap with a set of milestones)
5. Review not just the diff, but the behavior and meaning
6. Detect and correct drift early, after every run 
7. Roll back hard when things go off track

This is not about process for the sake of process. It’s about staying in control with discipline and specifications, because they’re what keep the system from falling apart.

## Real-World Applications

I've recently created threee products with Spec driven:

### Qibla-Now
It is a simple tool to quickly find the Qibla direction from anywhere, focused on clarity, speed, and ease of use. A more focused product with less architectural pressure, demonstrating how Spec-Driven Development works on a small scale.

- [Qibla Now Site](https://qibla-now.com/)
- [Repo](https://github.com/juangcarmona/qibla-now)

### LuSplit
It is a shared expense tracking app designed to split costs between people in a simple, transparent, and fair way. Nothing new, right? But it had more product evolution showing how prompts, PRs, and focus change as the project develops, illustrating learning and process refinement. (You could follow PR history to feel drifts and rollbacks)

- [LuSplit Site](https://lusplit.com/)
- [Repo](https://github.com/juangcarmona/lusplit)

### DomusMind
A household coordination system built to reduce mental load by organizing tasks, responsibilities, and daily life across a family. A larger product with greater domain complexity and risk of drift, proving why specs, anchors, and discipline cease to be optional.

- [Domus Mind Site](https://domusmind.org/)
- [Repo](https://github.com/juangcarmona/domusmind)

**On a small scale, Spec-Driven Development delivers speed; on a large scale, it delivers survival.**

## Last few chaotic thougts...

Developers, experienced or unexperieced, with local or paid AI, have incredible execution capabilities nowadays. We can leverage classic SDLC models to produce serious software in weeks. This doesn't eliminate the engineering, just the opposite, it forces us to be it.

> **AI doesn't eliminate engineering; it makes engineering more important.**

There's no silver bullet. Everyone will have their own process. Specification-Driven Development works if you know how to define meaning, limit drift, and review with sound judgment.

> **The easier it is to generate code, the more important it becomes to define the product well. And the more powerful the AI, the more responsibility falls on the human who decides what is actually being built.**