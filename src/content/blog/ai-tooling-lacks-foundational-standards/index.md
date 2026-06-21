---
title: 'The Missing Standard Behind AI-Assisted Development'
description: 'While designing a vendor-agnostic AI architecture for repositories, I discovered the ecosystem is missing a fundamental standard: a shared discovery protocol for AI artifacts. The problem is not prompt engineering or package management. It is architecture.'
pubDate: 'Jun 21 2026'
heroImage: 'images/hero-placeholder.png'
tags: ['ai-sdlc', 'devex', 'platform-engineering', 'architecture', 'standards', 'multi-agent', 'ai-infrastructure']
featured: true
featuredOrder: 2
lang: 'en'
---

## The Problem

AI-assisted development is becoming part of modern software engineering.

But while we standardize APIs, dependencies, containers, contracts, and infrastructure, one foundational layer remains completely fragmented.

**AI tooling has no shared architectural standard.**

![Foundational Standards Would Achieve](images/foundational-standards.png)

---

## We Are Repeating The Same Mistake

Every vendor defines its own repository conventions:

```
CLAUDE.md
AGENTS.md
.github/prompts/*
.github/instructions/*
.github/agents/*
.claude/*
.cursor/rules/*
.opencode/*
```

Different folder structures. Different discovery mechanisms. Different formats. Different assumptions.

This is not a new pattern. The industry has seen this before. Before OpenAPI, every API had its own documentation format. Before Docker, every deployment had its own packaging model. Before Protobuf, every service had its own contract definition.

The immediate consequences are familiar:

- **Semantic duplication** — The same instructions repeated across multiple vendor-specific files
- **Vendor lock-in** — Repository structure coupled to specific tooling choices
- **Synchronization drift** — Updates to one convention miss others
- **Maintenance overhead** — Scales linearly with every new tool a team adopts

---

## The Obvious Engineering Instinct

The natural engineering response is to create a vendor-agnostic canonical structure:

```
.ai/
  prompts/
  instructions/
  agents/
  skills/
  workflows/
```

Single source of truth. Deterministic structure. Vendor independent.

This idea came directly from an architecture I described in my previous article, **[Multi-Agent AI Repository Architecture](/multi-agent-ai-repository-architecture)**, where I proposed a vendor-agnostic semantic layer for repository-level AI governance.

On paper, centralizing semantics feels like the correct architectural move.

---

## Why Single Source Of Truth Was Not Enough

The implementation looked straightforward. The canonical `.ai/` layer contained the semantic definitions. Vendor-specific wrappers referenced that canonical layer. Bootstrap enforcement logic was designed to force every agent to resolve the canonical instructions before continuing execution.

At first, it looked elegant.

Then the realization became clear.

The duplication problem was not eliminated. It was simply moved elsewhere.

The canonical layer existed. The vendor wrappers still existed. The synchronization problem still existed. The architecture had added an indirection layer without solving the underlying discovery problem.

---

## The Build Model Looked Like The Right Answer

The pattern was familiar from `package.json`, npm, NuGet, protobuf, and OpenAPI generation. The repository stores only the canonical definition. A build step generates vendor-specific outputs.

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

Generated locally. Gitignored. No committed duplication.

This initially looked like the cleanest resolution. The canonical source remained the single truth. Vendor artifacts were ephemeral build outputs. No synchronization drift because nothing was committed.

Then I discovered [Microsoft APM](https://github.com/microsoft/apm).

---

## Then I Found Microsoft APM

APM forced me to partially reconsider the architecture I had been building.

APM introduces something genuinely important to the ecosystem: a package management model for AI capabilities. Reusable prompts, reusable instructions, reusable agents, vendor abstraction, installable packages.

For the first time, I saw an attempt to treat AI capabilities as software artifacts.

```
apm.yml
      ↓
apm install
      ↓
.github/*
.claude/*
.cursor/*
```

[Felip Martín Ferrari](https://felipmartin.com) pointed me toward APM after reviewing my initial article. He also argued that vendors would eventually converge on a standard layer — some form of MCP, tooling protocol, or foundational abstraction — and that we would not need to solve this manually.

That is a reasonable expectation. It is also not the reality today.

---

## APM Solves Distribution, Not Discovery

![What APM Achieves](images/what-apm-achieves.png)

APM is valuable. It enables reusable AI capabilities distributed as packages:

```bash
apm install company/security-review
apm install org/coding-conventions
```

Package distribution. Ecosystem packages. Installable capabilities. This is real progress for teams that want to share AI artifacts across repositories.

APM solves package management. It does not solve artifact discovery.

---

## The Real Problem Is Vendor Discovery

Vendors do not consume abstract AI capability definitions. They rely on hardcoded repository scanners tied to vendor-specific filesystem conventions.

GitHub Copilot looks under `.github`. Claude scans `CLAUDE.md` and `.claude`. Cursor expects `.cursor`. OpenCode reads `.opencode`.

None of them scan `.ai/*`, `.apm/*`, or `apm.yml`.

The canonical source may exist. But vendors never see it.

The package management model works locally. It does not work when the vendor's discovery mechanism never finds your canonical source.

**This is not a package management problem.**

**This is a standards problem.**

---

## Local Generation Creates Another Problem

If artifacts are generated locally only, the repository itself no longer contains what vendors expect to discover.

Developer A has GitHub artifacts. Developer B has Claude artifacts. The CI runner has nothing. Remote environments have nothing.

The consequences are concrete:

- CI pipelines cannot reproduce the same agent behavior
- Remote executions lose repository-level context
- Autonomous agents behave differently depending on the local environment
- Repository behavior becomes non-deterministic

---

## Cloud Agents Change The Equation

![What APM Does Not Achieve](images/what-apm-does-not-achieve.png)

The problem deepens when you consider how modern vendors actually operate.

Vendors increasingly rely on remote execution, server-side indexing, repository embeddings, prompt caches, and background context scanning. GitHub indexes your repository. Claude builds token caches. Cursor pre-scans your codebase.

If artifacts exist only locally, cloud systems never see them.

The result is cache inefficiency, inconsistent cloud behavior, and remote agents that operate without the context that exists on your machine. The same repository produces different AI behavior depending on whether it runs locally or in the cloud.

This is not a theoretical concern. It is an infrastructure problem.

---

## Committing Generated Artifacts Brings Back The Original Problem

The alternative is to commit the generated artifacts:

```
.ai/*
.github/*
.claude/*
.cursor/*
.opencode/*
```

And the original problem returns. Duplicated semantics. Synchronization drift. Merge conflicts. Repeated instructions.

There is another issue. Some vendors recursively scan markdown files. If the same instruction exists in `.ai/security.md`, `.github/prompts/security.md`, and `CLAUDE.md`, it may be loaded multiple times into the same context window.

Token waste. Repeated context. Prompt pollution. Unpredictable agent behavior.

---

## We Are Facing An Architectural Constraint

The pattern is clear. We cannot simultaneously achieve:

1. Single source of truth
2. Zero semantic duplication
3. Native vendor integration

Every current architecture eventually sacrifices one of these properties.

Single source of truth plus native vendor integration requires duplication. Single source of truth plus zero duplication loses native discovery. Zero duplication plus native integration loses the single source of truth.

---

## This Is Not A Tooling Problem

This is not a prompt engineering problem.

This is not a package management problem.

This is not an APM problem.

**This is a standards problem.**

The ecosystem lacks a standardized AI artifact discovery protocol. Every vendor forces repositories to adapt to vendor-specific filesystem conventions. There is no shared mechanism. No common protocol. No vendor-agnostic architecture.

The current ecosystem forces developers to adapt repositories to vendors.

The inversion should be the opposite.

**Vendors should adapt to standardized repository semantics.**

---

## AI Artifacts Are Becoming Supply Chain Artifacts

![Foundational Standards Would Achieve](images/foundational-standards.png)

We are slowly introducing AI artifacts into the software development lifecycle itself.

Prompts, agents, repository instructions, semantic context, capability definitions, autonomous workflows.

These are no longer experimental assets.

They are becoming first-class software artifacts inside the software supply chain itself.

And yet we have no standards governing how these artifacts should exist inside the supply chain.

I work with engineering organizations adopting AI-SDLC and DevEx practices. This pattern is already emerging in real teams. Mature teams increasingly want centralized AI governance, repository-level AI standards, deterministic agent behavior, and portable vendor-agnostic capabilities. They are hitting the same architectural walls documented here.

---

## The Industry Is Missing Its Next OpenAPI Moment

We standardized APIs through OpenAPI. We standardized dependencies through package managers. We standardized containers through Docker. We standardized contracts through Protobuf.

AI tooling is evolving without a shared protocol for how repositories declare, expose, and distribute AI capabilities.

We have no equivalent of `package.json` for AI artifacts.

The industry is currently solving AI tooling as an interaction problem. The deeper challenge is infrastructure.

As AI agents become part of software delivery pipelines, repository architectures themselves must evolve. The next challenge is no longer prompt engineering. It is AI-SDLC architecture.

Until the ecosystem converges around a common standard, engineering teams will continue duplicating artifacts, fighting vendor conventions, and introducing architectural inconsistencies directly into their codebases.

The entire ecosystem is currently building AI-native development workflows on top of filesystem conventions that were never designed to become infrastructure standards.

Eventually, that architectural debt will surface.
