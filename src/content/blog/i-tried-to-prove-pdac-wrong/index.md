---
title: 'I Tried to Prove PDaC Wrong'
description: 'A real app shipped two different models of the same tax form. The strange part: its own spec folder both forbids and requires the same service, in one file. I replayed that mistake with Product Definition as Code in place to see if it would get caught. Here is what happened.'
pubDate: 'Aug 21 2026'
tags: ['pdac', 'product-definition-as-code', 'sdd', 'ai-sdlc', 'productshape', 'experiment']
heroImage: './images/conflict-detection-with-pdac.png'
lang: 'en'
---

I am shaping [Product Definition as Code](https://github.com/product-definition-as-code/spec) (PDaC) specification and building its first reference implementation, [productshape](https://github.com/juangcarmona/productshape), and this week I tried to prove it wrong.

## The bug

I went looking on GitHub for projects using OpenSpec with a serious volume of specs. I wanted a real codebase, not a toy example. I found one I cannot name yet (I still need to talk with the maintainers before calling them out publicly), but the numbers speak for themselves: at the moment I studied it, it had **160 specs** and **273 archived spec changes**. It does spec-driven development seriously.

And still, it shipped, at least, **two different models of the same tax form**.

The Dutch VAT return existed twice in the code. Two schemas, two field sets, two different lifecycles. The result was real: the wrong schema got picked at runtime, integrations failed, and there was a security hole where a stranger could create a tax filing inside someone else's books.

Now here is the part that should worry every team doing specs.

You could say: fine, the code drifted from the spec, that happens. It is not what happened. **The spec folder itself holds the contradiction.** One file, the official, current, "this is the truth" VAT spec, says this:

> ThisProject adds no per-app controller for BTW filing

and a few requirements later says a service `MUST NOT` be written at all. Then, **380 lines further down in the same file**, it requires that exact service by name, and requires the second model too. Forbidden and mandatory, same file, same day, both marked MUST.

Two other official specs are built on the forbidden model. And the file even admits the problem in its own notes: it says there are two schemas for one thing, and that the *official* one is the empty one — the "wrong" model is the one with real data in it.

I verified all of this myself, line by line, in the public repo. Not in old history, but in the current spec folder. It is not a story. It happened.

So this is not a team that forgot to write specs, and not a team whose code drifted. It is a team whose **source of truth had two truths in it**, and nothing anywhere could tell.

## Why specs did not stop it

The team did not lack specs. It had too many, and no single place that held the product truth. Each feature change wrote its own proposal, design, and tasks, and those documents checked each other, not the product.

Then each finished change was filed away, and its new requirements were merged into the official spec **without anyone checking them against the requirements already there**. That is how "no controller" and "you must call this controller's service" ended up in one file. The contradiction was not caught at the door. It was let in and stamped official.

And no tool complained, because no tool can. Validation checks shape, not meaning. It cannot know that `VatReturn` and `VATReturn` are the same tax form.

This is exactly the problem PDaC claims to solve. So it is also the perfect test: **replay that exact mistake with PDaC in place. If PDaC does not catch it, PDaC does not work.**

## The experiment

I rebuilt "the day before the mistake": a small PDaC product model holding only decisions that were already accepted in that repo: one VAT entity, generic API only, and tenant access rules. I ran this on an early productshape build, version 0.12.0, built from source at commit `68bac7a`. Every artifact points at the original file it came from. Then we replayed the historical change against it, five ways. I wrote down my predictions before running the last two.

One thing to be straight about: their spec folder held both sides of the fight, so to build the model I had to **pick a side**. I picked the side their own official spec stated as the decision. That is a real thumb on the scale, and it is written down in the protocol.

## What happened

**The dumb checks alone did not catch it.** A Product Change adding the duplicate model passed validation with zero errors. The tooling checks structure and IDs, not meaning. It cannot know that `VATReturn` and `VatReturn` are the same thing. I even cheated on purpose (fake exemptions plus one irrelevant citation) and the gate went green. Anyone who tells you a linter alone fixes this is selling something.

**But the original change could never have merged.** PDaC requires every spec document to be *bound* to the product model, with citations. The historical change cited nothing. Under PDaC's CI gate it fails on all four documents, immediately.

**And the process caught everything twice.** I gave the same feature request to a fresh AI agent, with no hints, and told it to follow the PDaC change workflow. It refused to create the second model, refused the forbidden controllers, named every conflict with the exact rule IDs, and turned them into questions for a human instead of deciding alone. It even applied the tenant access rule without being asked: the rule whose absence caused the real security hole.

Then I did it again with pressure. I handed a second agent the failing historical change and said only: *make CI pass*. This is exactly the situation where the original mistake happened. The agent made CI pass honestly. It added real citations, declared zero fake exemptions, flagged the violating tasks with a hold, and ended its report with: *"Should the change proceed as written? No."* Followed by the full list of conflicts.

## What this does and does not prove

It does **not** prove PDaC prevents this bug always. It is one run, one team's mistake, and the agents were from the same AI family that ran the experiment. Green CI is still not "safe to merge": the difference between honest and dishonest green lives in the diff, and a human still has to read it.

And here is the uncomfortable one, which I would rather say myself than have someone say for me. The thing that went wrong in that repo was a **source of truth that contradicted itself**. My own tool would not catch that either. Nothing in PDaC's automatic checks stops one accepted rule saying "never build this service" and a later accepted requirement saying "you must call that service". PDaC puts them in one graph, side by side, where a human reviewing can actually see them, instead of 380 lines apart in one file among 160 files, where nobody did. That is a real improvement. It is not a guarantee, and I am not going to sell it as one.

What the experiment **does** show is simpler: when the product decisions exist as first-class, citable text, contradicting them becomes harder than respecting them, even for an AI under pressure to just ship. The original repo had no artifact whose *job* was to hold those three decisions. That was the whole failure.

It also gave me the next thing to build: a check that fires when a new requirement demands something an accepted rule forbids by name. Cheap, mechanical, and it would have caught this one.

The experiment (protocol, predictions, outputs, agent transcripts) is public and repeatable. If you can make it fail, I genuinely want to know.
