---
title: "GitHub Copilot: What Consumes Premium Request Units (PRUs)"
description: "Practical guide to GitHub Copilot Premium Request Units (PRUs): what features consume them, what doesn't, and how to optimize usage when using Copilot autocomplete, chat, CLI, agents, and code reviews."
pubDate: 2026-03-17
categories:
  - "software-development"
  - "artificial-intelligence"
  - "devops"
heroImage: "images/github-copilot-pru-usage.png"
slug: "github-copilot-pru-usage"
tags:
  - "ai"
  - "devops"
  - "best-practices"
---

## TL;DR

> Autocomplete is free. Inline Copilot suggestions do not consume PRUs.
> Chat, CLI, and coding agents may consume PRUs depending on the model > ed.
> Code reviews, Spark, and third-party agents always consume PRUs.
> Use autocomplete for daily coding and expect PRU consumption when invoking models explicitly.


## Quick Reference

| Feature                                    | PRU Usage          |
| ------------------------------------------ | ------------------ |
| IDE autocomplete / tab completion          | ❌ No PRUs          |
| Copilot Chat (Ask / Edit / Agent)          | ⚠ Depends on model |
| Copilot CLI                                | ⚠ Depends on model |
| Copilot coding agent sessions              | ⚠ Depends on model |
| Copilot Spaces                             | ⚠ Depends on model |
| OpenAI Codex vs Code integration (preview) | ⚠ Depends on model |
| Copilot code review (PR review)            | ✅ Always consumes  |
| IDE code review action                     | ✅ Always consumes  |
| Copilot Spark                              | ✅ 4 PRs per prompt |
| Third-party coding agents (preview)        | ✅ Always consumes  |


## Brief Explanation

### ❌ Does NOT Consume PRUs

**IDE Autocomplete / Tab Completion**

Standard Copilot inline suggestions while typing are **unlimited on paid plans** and **do not consume PRUs**.

Typical cases:

* Writing code normally
* Accepting suggestions with `Tab`
* Rapid iteration in the editor

### ⚠ Depends on Model

These features invoke the model directly. PRU usage depends on the **selected model’s rate**.

**Copilot Chat**

Modes:

* Ask
* Edit
* Agent

Each prompt:

```
PRUs = model rate × prompt
```

**Copilot CLI**

Terminal prompts also use the model.

Example:

```
copilot explain ./service.ts
```

PRU usage scales with the model.


**Copilot Coding Agent**

Agent sessions can trigger multiple prompts internally.

Cost depends on:

* prompts generated during the session
* steering instructions
* model rate

**Copilot Spaces**

Each user interaction counts as:

```
1 PR × model rate
```

**OpenAI Codex vs Code Integration (Preview)**

Prompt-based model interaction.

```
1 PR × model rate
```

### ✅ Always Consumes PRUs

**Copilot Code Review**

When Copilot reviews a pull request.

```
1 PR per review
```

**IDE Code Review Action**

Review requests triggered inside the IDE also consume PRUs.

**Copilot Spark**

Higher-cost operation.

```
4 PRs per prompt
```

**Third-Party Coding Agents (Preview)**

External agents integrated with Copilot.

```
1 PR per prompt
```

## Summary

| Feature                                | PRU Usage         |
| -------------------------------------- | ----------------- |
| IDE autocomplete / tab completion      | ❌ No PRUs         |
| Copilot Chat / CLI / Agents            | ⚠ Model-dependent |
| Code Review / Spark / 3rd-party agents | ✅ Always consumes |

## Practical Recommendations

### 1. Treat autocomplete as your default workflow

Keep most coding activity inside the editor using inline suggestions.
This yields maximum productivity with **zero PRU cost**.

Typical use:

* writing routine code
* iterating on implementations
* small refactors
* boilerplate generation

Autocomplete is where Copilot provides the **highest value per cost: infinite suggestions, zero PRUs**.

**2. Use chat for high-value interactions**

Copilot Chat becomes valuable when the task requires **reasoning rather than typing**.

Good use cases:

* architectural reasoning
* exploring unfamiliar codebases
* refactoring strategies
* generating documentation
* explaining complex logic

Avoid using chat for trivial code snippets that autocomplete can already produce.

### 3. Be conscious of model choice

PRU consumption scales with the model rate.

Use stronger models when the task requires:

* multi-file reasoning
* architecture decisions
* complex transformations

For routine interactions, lighter models often provide the same outcome at a lower PRU cost.

### 4. Use code review automation selectively

Copilot PR reviews are powerful but should be used intentionally.

Best scenarios:

* large pull requests
* unfamiliar modules
* security-sensitive changes
* consistency checks across multiple files

Running automated reviews on every small PR quickly wastes PRUs.

### 5. Use Agent mode deliberately - and give it real context

Agent mode can deliver exceptional value when the agent understands the system.

Provide context first:

* architecture documentation
* domain models
* specifications
* coding conventions
* repository structure

With clear constraints and intent, the agent can:

* scaffold entire features
* implement vertical slices
* wire domain, application, and infrastructure layers
* generate tests
* respect project conventions

This often turns **a single PRU into a large amount of implemented work**.

Agent sessions also support **conversation compaction**, allowing long reasoning sessions without degrading context efficiency.

A strong pattern is **architect-first prompting**:

Define goals, constraints, architecture, and boundaries before asking for code.


### 6. Combine Copilot with other AI systems

Copilot excels inside the IDE, but its value multiplies when combined with other AI tools.

A practical workflow:

1. Explore architecture and ideas with another model (ChatGPT, Claude, etc.)
2. Refine constraints and design
3. Move to Copilot Agent inside the IDE
4. Implement directly in the repository

Local models can help analyze documentation, reason about architecture, or prototype ideas before implementation.

Copilot then performs the **actual implementation within the codebase**.

### 7. Separate exploration from implementation

Exploration generates prompts quickly.

A more efficient approach:

1. Explore and reason externally
2. Define architecture and intent
3. Execute implementation with Copilot Agent

This reduces unnecessary PRU usage and improves output quality.

## The 7 Practical Rules

1. **Use autocomplete for daily coding - it’s free.**
2. **Use chat for reasoning, not typing.**
3. **Choose the right model for the task.**
4. **Run automated code reviews only when they add value.**
5. **Feed Agent mode real architecture and documentation.**
6. **Combine Copilot with other AI tools for thinking vs. implementing.**
7. **Separate exploration from implementation to control PRU usage.**
