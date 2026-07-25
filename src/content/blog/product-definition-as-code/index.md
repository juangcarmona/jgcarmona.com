---
lang: en
title: "Moving Left: Product Definition as Code for the AI-SDLC"
description: 'AI accelerates software delivery and shifts the bottleneck to product thinking. I propose Product Definition as Code: a versioned graph of product artifacts that provides deterministic context to agents and humans before a single line of code is written.'
pubDate: 2026-07-25
heroImage: "images/product_definition_as_code_-_hero_image.png"
tags:
  - "ai-sdlc"
  - "product-thinking"
  - "spec-driven-development"
  - "architecture"
  - "documentation"
  - "ai"
---

Lately, I have been working as a FDE (Forward Development Engineer) at [Plain Concepts](https://www.plainconcepts.com/who-we-are/), helping different clients introduce AI into their software development lifecycle. AI-SDLC and Spec-Driven Development are my two main areas of focus and I have been thinking a lot about the implications of AI-assisted development on the software lifecycle. 

There is something that for me became clear a few months ago, because the technologies change; the organizations change; the constraints change... But the problems, however, are surprisingly consistent, and most of them are not really AI problems.

They are **documentation problems**.

That should not surprise anyone, IMHO, documentation and documentation management have always been a disaster across the software industry. (and I am being polite...)

## AI is exposing old problems

For years, software teams have survived with fragmented knowledge:

- Product decisions hidden in meeting notes.
- Business rules buried inside tickets.
- Requirements scattered across documents, chats and people's memory.
- Architecture decisions disconnected from the code.
- Designs that no longer match the implementation.
- Operational knowledge that only exists in the minds of a few engineers.

This was already inefficient when humans were doing most of the implementation work, but with AI-assisted development, it becomes a **structural problem**.

AI can generate code very quickly. It can inspect repositories, propose changes, write tests and execute complex development loops, but it still needs to understand *what the product is supposed to do*. "The intent" is the constraint. The better the intent, the better the implementation.

When the product definition is incomplete, contradictory or distributed across multiple tools and people's heads, AI does what engineers have always done: to guess. 
When product knowledge is fragmented, AI has to reconstruct it on every invocation. it guesses, so it drifts and makes mistakes.

(Side note: this is the same drift problem I wrote about in [*Spec-Driven Development: Controlling AI-Generated Drift*](/spec-driven-done-right/). SDD attacks it from the implementation side. This article goes one step further left, before the spec even exists.)

---

## 1. The SDLC is moving left

We normally represent the software development lifecycle from left to right:

![The SDLC represented as a left-to-right timeline, with a marker showing today's focus moving left towards product definition.](images/product_definition_as_code_-_the_sdlc_is_a_timeline.png)

The exact labels vary between organizations, but the direction is always the same: from left toi right, from abstract ideas to concrete implementation.

Today, most AI engineering effort is concentrated around development and the activities immediately surrounding it:

- Code generation.
- Testing.
- Code review.
- Refactoring.
- CI/CD.
- Infrastructure.
- Incident analysis.
- Maintenance.

This is useful, but it addresses the **middle and right side** of the lifecycle.

As implementation becomes increasingly automated, the bottleneck moves left.

The difficult questions are no longer only:

- How should we implement this?
- Which framework should we use?
- How should we test it?

The difficult questions become:

- Who is this product for?
- What are they trying to achieve?
- Which behaviour should exist?
- Which rules govern that behaviour?
- What does the domain language mean?
- Which requirements follow from those decisions?
- What exactly are we asking the AI to change?

This is where I want to focus.

To the **left of development**.

---

## 2. Where AI investment is today

This is not a theoretical observation. It is where the money and the engineering effort actually sit.

![Two timelines comparing today's AI investment, concentrated on development and operations, versus the future opportunity on the left side of the lifecycle.](images/product_definition_as_code_-_where_the_ai_investment_is_today.png)

Most AI effort today is concentrated in development, DevOps and operations. Code assistants, test generators, review bots, CI copilots, incident analyzers. All of them live on the right half of the timeline.

That is where the ROI was easiest to demonstrate, so it is where the industry invested first. Reasonable.

But it is also a saturated frontier now. The next meaningful opportunity lies on the **left side** of the lifecycle — where product intent is formed, where language is defined, where requirements are born.

The left side is harder. It is messier, less structured, and historically owned by humans talking to humans. Which is exactly why it has resisted automation so far.

That resistance is the signal. The bottleneck has moved.

---

## 3. The documentation chaos

So why is the left side so hard to automate?

Because product knowledge is fragmented.

![A chaotic network of disconnected information sources: Jira tickets, Slack threads, docs, meetings, code comments and people's heads, with no shared model connecting them.](images/product_definition_as_code_-_the_current_documentation_chaos.png)

Product decisions live in Jira. Conversations live in Slack. Long-form reasoning lives in Docs. Half of it lives in meetings that were never minuted. The rest lives in code comments and in the heads of two senior engineers who will eventually leave.

AI does not have a **product model**. It has fragments.

And fragments are not context. Fragments are noise that the model has to reconstruct into a model on every single invocation, with no guarantee it reconstructs the same model twice.

That is the opposite of determinism.

This is the root cause underneath everything I wrote in [*The Missing Standard Behind AI-Assisted Development*](/ai-tooling-lacks-foundational-standards/). There, the fragmentation was at the tooling layer — every vendor scanning its own files. Here, the fragmentation is deeper: it is at the **product knowledge layer**, before any tool even runs.

You cannot standardize discovery if there is nothing canonical to discover.

---

## 4. The proposed solution: Product Definition as Code

The deliberately inelegant word I keep using is **artifacting**.

The idea is simple.

Instead of treating product understanding as a collection of conversations, tickets and documents, we represent its different dimensions as explicit, versioned and related artifacts.

Not one enormous product document.

Not a 200-page specification nobody reads.

A **graph of small, focused product artifacts**.

![The proposed product model: Actors → Journeys → Use Cases → Business Rules → Domain → Requirements, with the generated product graph showing explicit relationships between artifacts.](images/product_definition_as_code_-_the_proposed_solution.png)

For example:

```
→ Actors
→ Journeys
→ Use Cases
→ Business Rules
→ Domain Knowledge
→ Requirements
```

An actor participates in a journey.

A journey contains use cases.

A use case is governed by business rules.

Business rules and domain concepts lead to requirements.

The documents are useful, but the real methodology is in the **relationships between them**.

Those relationships make product knowledge navigable, traceable and usable by both humans and AI.

The working name for this idea is **Product Definition as Code**.

The basic principles are:

- Product knowledge lives close to the software, inside the repository.
- Markdown is the canonical representation.
- Every artifact has a stable identity.
- Relationships are explicit and machine-readable.
- The product graph is generated from the documents.
- Backlog items are projections of product changes, not the source of truth.
- Spec-Driven Development tools consume product context, but do not own the product definition.

A repository could contain something like:

```
docs/product/
├── actors/
├── journeys/
├── use-cases/
├── business-rules/
├── domain/
├── requirements/
└── changes/
```

This is not documentation for documentation's sake.

The objective is to create a reliable product context that can be inspected, validated, changed and passed into an AI-assisted development workflow.

---

## 5. Separation of responsibilities

A Product Owner request should not immediately become a user story.

It should first become a **Product Change**.

![The flow from Product Definition → Product Change → Delivery Slice → Backlog → Spec-Driven Development → Implementation, with the boundary between Product Thinking and Software Delivery clearly marked.](images/product_definition_as_code_-_separation_of_responsibilities.png)

That change can identify:

- Which actors are affected.
- Which journeys change.
- Which use cases are added or modified.
- Which business rules apply.
- Which requirements are introduced.
- Which questions remain unresolved.

Only then should the change be divided into coherent delivery slices and projected into a backlog.

The flow becomes:

```
Product Definition
→ Product Change
→ Delivery Slice
→ Backlog Item
→ SDD Specification
→ Implementation
```

This creates a clean boundary.

**Product Definition** owns *what* should exist.

**Spec-Driven Development** owns *how* it will be built.

Each layer has a different responsibility, and that separation is what makes the whole thing governable. When the boundary is missing, the backlog silently becomes the product definition — and the backlog is a terrible place to model a product.

This is not another SDD framework. There are already useful approaches for Spec-Driven Development, such as [OpenSpec](https://github.com/Fission-AI/OpenSpec) and [Spec Kit](https://github.com/github/spec-kit) — both of which I covered in [*Moving Toward Spec-Driven Development*](/moving-toward-spec-driven-development/).

Product Definition as Code is intended to sit **before** them.

It should not replace their structures or force them to adopt a new lifecycle.

Instead, it should generate a stable handoff containing the relevant product subgraph for one delivery increment:

```
Product Definition
        ↓
Product Handoff
        ↓
OpenSpec, Spec Kit or another SDD workflow
        ↓
Implementation
```

The product model remains canonical.

The SDD workspace remains native to the chosen framework.

The relationship is intentionally **one-way**.

Product knowledge feeds delivery. Delivery may reveal contradictions or missing information, but it must not silently rewrite the product definition.

---

## 6. The shift we are making

So what does software engineering look like if we adopt this?

![Side-by-side comparison: Yesterday — Ideas → Stories → Code. Tomorrow — Ideas → Product Model → Product Changes → AI-assisted Delivery → Code.](images/product_definition_as_code_-_the_shift_we_are_making.png)

**Yesterday:** Ideas → Stories → Code.

**Tomorrow:** Ideas → Product Model → Product Changes → AI-assisted Delivery → Code.

The shape of the pipeline changes. The expensive part is no longer translation from story to code — that part is collapsing. The expensive part becomes forming a coherent, versioned, machine-readable model of what the product *is* and *is becoming*.

> AI makes product thinking the highest-leverage activity in software engineering.

That is the shift. Not "AI replaces engineers." AI replaces the *translation* layer between intent and implementation — which means the quality of the intent itself becomes the constraint.

A vague requirement given to one engineer may result in a few questions and a delayed implementation.

A vague requirement given to an autonomous development agent may result in twenty changed files, a new abstraction, six tests and a beautifully implemented misunderstanding.

The better the product context, the better the development loop.

Product Definition as Code could give agents:

- Precise actors and goals.
- Relevant journeys and use cases.
- Explicit business rules.
- Shared domain terminology.
- Traceable functional and quality requirements.
- A bounded context for each requested change.
- A clear indication of what must not change.

This does not make AI infallible.

It makes its inputs less terrible.

That is already a meaningful improvement. 🙂

---

## In a Nutshell

1. **The bottleneck is moving left.** As AI automates implementation, the hard part becomes knowing what to build.
2. **Investment is still on the right.** Most AI effort targets code, tests, CI and ops — the saturated frontier.
3. **The root cause is fragmentation.** Product knowledge lives in fragments, not a model. Fragments are not context.
4. **Model the product as a graph.** Versioned, related artifacts: Actors → Journeys → Use Cases → Business Rules → Domain → Requirements.
5. **Separate the concerns.** Product Definition owns *what*; SDD owns *how*. The handoff is one-way.
6. **Product thinking becomes leverage.** When translation collapses, intent quality is the constraint.

The first version does not need to solve the entire product lifecycle.

It needs to prove one idea:

> A versioned graph of product artifacts can provide better context to both humans and AI before software implementation begins.

From there, the same approach could eventually connect other dimensions of the lifecycle — architecture as code, design systems as code, operational requirements, SRE practices, maintenance knowledge, traceability from product intent to runtime evidence.

But the first step is further left.

Before architecture.

Before the backlog.

Before the specification.

Before the code.

Because the faster we become at building software, the more important it becomes to know **what we are actually trying to build**.

---

## References

- [*Spec-Driven Development: Controlling AI-Generated Drift*](/spec-driven-done-right/) — the predecessor article. SDD as a control system against drift, from the implementation side.
- [*Moving Toward Spec-Driven Development with OpenSpec or Spec Kit*](/moving-toward-spec-driven-development/) — where Product Definition as Code hands off: the SDD frameworks that consume the product handoff.
- [*The Missing Standard Behind AI-Assisted Development*](/ai-tooling-lacks-foundational-standards/) — the tooling-layer fragmentation problem. This article is its product-layer counterpart.
- [*Multi-Agent AI Repository Architecture*](/multi-agent-ai-repository-architecture/) — canonical semantic layer for AI artifacts. Product Definition as Code is what makes that layer worth discovering.
- [Plain Concepts](https://www.plainconcepts.com/who-we-are/) — the engineering context where these ideas are being tested against real clients.
- [OpenSpec](https://github.com/Fission-AI/OpenSpec) — lightweight, brownfield-first SDD framework.
- [GitHub Spec Kit](https://github.com/github/spec-kit) — intent-driven SDD toolkit from GitHub.
