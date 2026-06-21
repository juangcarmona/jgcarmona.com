---
title: 'The Missing Standard Behind AI-Assisted Development'
description: 'While designing a vendor-agnostic AI architecture for repositories, I discovered the ecosystem is missing a fundamental standard: a shared discovery protocol for AI artifacts. The problem is not prompt engineering or package management. It is architecture.'
pubDate: 'Jun 21 2026'
heroImage: 'images/ai-tooling-lacks-foundational-standards.png'
tags: ['ai-sdlc', 'devex', 'platform-engineering', 'architecture', 'standards', 'multi-agent', 'ai-infrastructure']
featured: true
featuredOrder: 2
lang: 'en'
---

Over the last months I have been helping engineering organizations move their software delivery lifecycle toward AI-assisted development. 

Prompts, agents, autonomous workflows, semantic context, Spec Driven Development, repository-level intelligence.

But while we have spent decades shaping best practices and standardizing APIs, dependencies, infrastructure, contracts and packaging systems, one foundational layer remains completely fragmented.

> **AI tooling has no shared architectural standard.**

And I believe this problem will become much bigger than most people currently realize.

We are quietly building a new big ball of mud.

## We Have Seen This Before

The software industry has solved this kind of fragmentation many times before. Before OpenAPI, every API had its own documentation format. Before Docker, every deployment had its own packaging model. Before Protobuf, distributed systems relied on incompatible contract definitions. Standardization emerged because fragmentation simply does not scale.

And now AI tooling is entering exactly the same phase. Every vendor defines its own repository conventions. Different folder structures, discovery mechanisms, conventions and assumptions. And the consequences are predictable:

- **Duplication** → same instructions repeated across multiple vendor files
- **Vendor lock-in** → repository structure coupled to tooling choice
- **Synchronization drift** → updates to one convention miss others
- **Maintenance overhead** → complexity grows with every new vendor adopted

## The Obvious Engineering Instinct

The natural engineering reaction is straightforward: create a canonical vendor-agnostic structure. That is exactly what I did in my previous article, **[Multi-Agent AI Repository Architecture](/multi-agent-ai-repository-architecture)**, where I proposed a single source of truth with a shared semantic layer, thin vendor wrappers and CI validation.

On paper, it felt like the correct architectural direction. In reality, it solved nothing. It simply moved the duplication problem somewhere else. Let me explain why.

## A Single Source Of Truth Was Not Enough

I implemented the architecture in a real repository. The canonical `.ai/` layer contained the semantic definitions, and vendor-specific wrappers pointed to the canonical layer. I even introduced bootstrap enforcement logic to force every agent to resolve canonical instructions before execution, something like this:

```
You MUST load canonical instructions from .ai/

Read these files:

'.ai/file1.md'
'.ai/file2.md'

If unavailable:

STOP immediately

Warn the user

Do not continue execution
```

I also added CI validation to ensure artifact consistency. Architecturally it looked elegant, then I started seeing the cracks.

## The Build Model Looked Much Better

Then a colleague at Plain Concepts challenged the approach. His point was simple: even if wrappers point to canonical files, agents today are still inconsistent when resolving references across files. In theory, wrappers should work. In practice, behavior is often unreliable. And honestly… he was right.

> Public thanks to **Felipe Martín Ferrari** for pushing me to revisit the problem.

He proposed something I had initially discarded: treat AI artifacts like software build artifacts. The repository stores only the canonical source, and a build step generates vendor-specific outputs:

```
.ai/*
ai-manifest.yaml
      ↓
build-ai
      ↓
.github/*
.claude/*
.cursor/*
.opencode/*
```

Generated locally, gitignored, no committed duplication. This immediately felt much cleaner.

And then he reminded me about something I had on my research TODO list: Microsoft APM. 

## Enter Microsoft APM

APM introduces something genuinely important to the ecosystem. For the first time I saw a serious attempt to treat AI capabilities as software artifacts: prompts, instructions, agents, vendor abstraction, installable packages.

A package management model for AI.

```
apm.yml
      ↓
apm install
      ↓
.github/*
.claude/*
.cursor/*
```

At first glance I thought: damn… Microsoft might already be solving what I've been thinking about for days. So, I got deep into it.

## Why I Immediately Liked APM

![What APM Achieves](images/what-apm-achieves.png)

APM enables reusable AI capabilities distributed as packages:

```bash
apm install company/security-review
apm install my-org/coding-conventions
```

That is a meaningful contribution. It introduces package distribution, capability reuse, package ecosystems, vendor abstraction, portable AI capabilities. This is exactly the kind of thinking the industry needs.

But after going deeper into the architecture, I realized something important: APM solves package distribution, but it does not solve discovery architecture.

## Vendors Still Own Discovery

This was the key realization. Vendors do not consume abstract AI definitions, they consume hardcoded filesystem conventions. GitHub Copilot scans `.github`. Claude scans `CLAUDE.md` and `.claude`. Cursor scans `.cursor`. OpenCode scans `.opencode`. They do **not** scan `.ai/`, `.apm/` or `apm.yml`.

The canonical source may exist, but vendors never see it. **If artifacts are generated locally only, the repository itself no longer contains what vendors expect to discover**. Developer A has GitHub artifacts, Developer B has Claude artifacts, Developer C has Cursor artifacts... But the repository itself stops being the deterministic source of AI behavior.

Immediately new problems appear: CI pipelines cannot reproduce the same agent behavior, remote executions lose repository-level context, autonomous agents behave differently depending on local environment, and repository behavior becomes non-deterministic.

## Cloud Execution Changes Everything

![What APM Does Not Achieve](images/what-apm-does-not-achieve.png)

The problem becomes bigger when you think about how vendors operate. Remote execution, cloud agents, repository indexing, server-side embeddings, context scanning, file caches, token caches. GitHub and Claude index repositories and build token caches. Cursor scans codebases remotely. Even local-first tools increasingly move in this direction.

So, if artifacts exist only on the developer machine, cloud systems never see them. The result is cache inefficiency, behavior divergence, missing semantic context, and different AI behavior locally versus remotely. The same repository produces different outcomes depending on where execution happens.

This is where I stopped thinking about prompt engineering. Because this is clearly infrastructure architecture.

## Committing Generated Artifacts Brings Back The Original Problem

The alternative becomes obvious: commit generated artifacts.

```
.ai/*
.github/*
.claude/*
.cursor/*
.opencode/*
```

And instantly the original problem returns: duplicated semantics, synchronization drift, merge conflicts, repeated instructions, maintenance complexity. 

And there is another issue. Some vendors recursively scan markdown files, so if the same instruction exists in `.ai/security.md`, `.github/prompts/security.md`, and `CLAUDE.md`, the same semantic content may enter context multiple times. That means token waste, prompt pollution, higher inference costs, and unpredictable behavior.

## The Architectural Constraint That Emerges

Doing this mental and coding exercise, I realized that we cannot simultaneously achieve three things:

1. Single source of truth
2. Zero semantic duplication
3. Native vendor integration

This is a trifecta: every current architecture sacrifices one of these properties. A canonical source combined with native vendor compatibility introduces duplication. A canonical source without duplication requires vendors to consume abstractions they do not currently support. Native compatibility without duplication pushes semantic ownership outside the repository.

Today, no architecture solves all three simultaneously.

## This Is Fundamentally A Standards Problem

As the title of this article suggests, the ecosystem lacks a standardized AI artifact discovery protocol. Every vendor forces repositories to adapt to vendor-specific filesystem conventions. There is no shared mechanism, no common discovery layer, no vendor-agnostic architecture.

I strongly believe the model should be inverted. Repositories should define semantics. Vendors should adapt to repositories. In terms of AI tooling, foundational standards must emerge around how repositories declare, expose, distribute, and execute AI capabilities. The industry needs a shared protocol for AI artifact discovery.

## We Are Creating A New Software Supply Chain

![Foundational Standards Would Achieve](images/foundational-standards.png)

We are rapidly introducing entirely new artifact categories into software delivery itself.
Agents, skills, commands, prompts, repository-wide instructions, technology-wide instructions, capability definitions, autonomous workflows, semantic context, specs, hooks. These are becoming first-class software artifacts inside the software supply chain.

I work with engineering organizations adopting AI-SDLC and DevEx practices, and I am already seeing this pattern emerge.

Mature engineering teams want centralized AI governance, deterministic agent behavior, repository-level standards, and portable vendor-agnostic capabilities.

And sooner or later they all hit the same wall.

The infrastructure layer underneath AI tooling simply does not have mature standards yet.

## The Industry Is Missing Its Next Standardization Movement

We standardized APIs through OpenAPI. We standardized dependencies through package managers. We standardized containers through Docker. We standardized contracts through Protobuf. Yet AI tooling is evolving without a shared protocol for how repositories declare, expose, distribute and execute AI capabilities.

We have no equivalent of `package.json` for AI artifacts, and I think that is the deeper problem. Right now the industry is solving AI tooling as an interaction problem, better prompts, better models, better chat interfaces, better agents. But the real challenge is infrastructure.

As AI agents become part of software delivery pipelines, repository architectures themselves must evolve. Because eventually the ecosystem will need to converge around foundational standards. The entire industry is building AI-native development workflows on top of filesystem conventions that were never designed to become infrastructure standards.

This is architectural technical debt accumulating underneath an ecosystem growing faster than its standards.

That's why I strongly think that **AI tooling needs vendor-agnostic foundational standards**.
