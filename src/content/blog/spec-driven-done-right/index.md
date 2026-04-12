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