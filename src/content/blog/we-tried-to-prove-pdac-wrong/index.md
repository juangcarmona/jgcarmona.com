---
title: 'We Tried to Prove PDaC Wrong'
description: 'We found a real bug that specs did not stop: one app shipped two different models of the same tax form. Then we replayed that mistake with Product Definition as Code in place, to see if it would get caught. Here is what happened.'
pubDate: 'Aug 21 2026'
tags: ['pdac', 'product-definition-as-code', 'sdd', 'ai-sdlc', 'productshape', 'experiment']
lang: 'en'
---

<!-- EDITOR'S NOTE (remove before publishing):
The project is a real, public open-source repo. It is anonymized here on
purpose: naming it would turn forensic research into a public case study,
and we agreed not to do that before talking to its maintainers. Once you
have their OK, you can name it and link every commit. The full experiment
(protocol, results, transcripts) is on branch
claude/shillinq-vat-pdac-case-l93wet of the productshape repo, under
experiments/shillinq-vat-replay/. -->

I build [Product Definition as Code](https://github.com/product-definition-as-code/spec) (PDaC). This week I tried to prove it wrong.

## The bug

There is a real, shipped open-source accounting app. It is not a toy: at the moment we studied it, it had **160 specs** and **273 archived spec changes**. It does spec-driven development seriously.

And still, it shipped **two different models of the same tax form**.

The Dutch VAT return existed twice in the code. Two schemas, two field sets (they shared exactly one field), two different lifecycles. One spec said: use the generic API, add no custom controller. The code added a controller, a service, and seven custom endpoints anyway. Even better: inside the change that caused this, the design document said "do not build this service" and the task list said "build this service". Both were checked in together. All validation stayed green.

The result was real: wrong schema picked at runtime, failing integrations, and a security hole where a stranger could create a tax filing inside someone else's books.

I verified all of this myself, commit by commit, in the public repo. It is not a story. It happened.

## Why specs did not stop it

The team did not lack specs. It had too many, and no single place that held the product truth. Each feature change wrote its own proposal, design, and tasks — and those documents checked each other, not the product. So when the tasks contradicted the design, nothing noticed. When a second model of the same business object appeared under a slightly different name, nothing noticed either.

This is exactly the problem PDaC claims to solve. So it is also the perfect test: **replay that exact mistake with PDaC in place. If PDaC does not catch it, PDaC does not work.**

## The experiment

We rebuilt "the day before the mistake": a small PDaC product model holding only decisions that were already accepted in that repo — one VAT entity, generic API only, and tenant access rules. Every artifact points at the original file it came from. Then we replayed the historical change against it, five ways. We wrote down our predictions before running the last two.

## What happened

**The dumb checks alone did not catch it.** A Product Change adding the duplicate model passed validation with zero errors. The tooling checks structure and IDs, not meaning. It cannot know that `VATReturn` and `VatReturn` are the same thing. We even cheated on purpose — fake exemptions plus one irrelevant citation — and the gate went green. Anyone who tells you a linter alone fixes this is selling something.

**But the original change could never have merged.** PDaC requires every spec document to be *bound* to the product model, with citations. The historical change cited nothing. Under PDaC's CI gate it fails on all four documents, immediately.

**And the process caught everything — twice.** We gave the same feature request to a fresh AI agent, with no hints, and told it to follow the PDaC change workflow. It refused to create the second model, refused the forbidden controllers, named every conflict with the exact rule IDs, and turned them into questions for a human instead of deciding alone. It even applied the tenant access rule without being asked — the rule whose absence caused the real security hole.

Then we did it again with pressure. We handed a second agent the failing historical change and said only: *make CI pass*. This is exactly the situation where the original mistake happened. The agent made CI pass — honestly. It added real citations, declared zero fake exemptions, flagged the violating tasks with a hold, and ended its report with: *"Should the change proceed as written? No."* Followed by the full list of conflicts.

## What this does and does not prove

It does **not** prove PDaC prevents this bug always. It is one run, one team's mistake, and the agents were from the same AI family that ran the experiment. Green CI is still not "safe to merge": the difference between honest and dishonest green lives in the diff, and a human still has to read it.

It **does** prove something simpler: when the product decisions exist as first-class, citable text, contradicting them becomes harder than respecting them — even for an AI under pressure to just ship. The original repo had no artifact whose *job* was to hold those three decisions. That was the whole failure.

The experiment — protocol, predictions, outputs, agent transcripts — is public and repeatable. If you can make it fail, I genuinely want to know.
