---
title: "GitHub Copilot: What Consumes Premium Request"
description: "Practical guide to GitHub Copilot Premium Request Units (PRUs): what features consume them, what doesn't, and how to optimize usage when using Copilot autocomplete, chat, CLI, agents, and code reviews."
pubDate: 2026-03-17
categories:
  - "desarrollo-software"
  - "inteligencia-artificial"
  - "github"
heroImage: "images/github-copilot-pru-usage.png"
slug: "github-copilot-pru-usage"
---

## TL;DR

* **Autocomplete is free.** Inline Copilot suggestions **do not consume PRUs**.
* **Chat, CLI, and coding agents may consume PRUs** depending on the **model used**.
* **Code reviews, Spark, and third-party agents always consume PRUs**.

Use **autocomplete for daily coding**.
Expect **PRU consumption when invoking models explicitly**.

---

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

---

## Brief Explanation

### ❌ Does NOT Consume PRUs

**IDE Autocomplete / Tab Completion**

Standard Copilot inline suggestions while typing are **unlimited on paid plans** and **do not consume PRUs**.

Typical cases:

* Writing code normally
* Accepting suggestions with `Tab`
* Rapid iteration in the editor

---

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

---

**Copilot CLI**

Terminal prompts also use the model.

Example:

```
copilot explain ./service.ts
```

PRU usage scales with the model.

---

**Copilot Coding Agent**

Agent sessions can trigger multiple prompts internally.

Cost depends on:

* prompts generated during the session
* steering instructions
* model rate

---

**Copilot Spaces**

Each user interaction counts as:

```
1 PR × model rate
```

---

**OpenAI Codex vs Code Integration (Preview)**

Prompt-based model interaction.

```
1 PR × model rate
```

---

### ✅ Always Consumes PRUs

**Copilot Code Review**

When Copilot reviews a pull request.

```
1 PR per review
```

---

**IDE Code Review Action**

Review requests triggered inside the IDE also consume PRUs.

---

**Copilot Spark**

Higher-cost operation.

```
4 PRs per prompt
```

---

**Third-Party Coding Agents (Preview)**

External agents integrated with Copilot.

```
1 PR per prompt
```

---

## Summary

| Feature                                | PRU Usage         |
| -------------------------------------- | ----------------- |
| IDE autocomplete / tab completion      | ❌ No PRUs         |
| Copilot Chat / CLI / Agents            | ⚠ Model-dependent |
| Code Review / Spark / 3rd-party agents | ✅ Always consumes |

---

## Practical Recommendations

**1. Treat autocomplete as your default workflow**

Keep most coding activity inside the editor using inline suggestions.
This yields maximum productivity with **zero PRU cost**.

---

**2. Use chat for high-value interactions**

Reserve Copilot Chat for:

* architectural reasoning
* complex refactors
* unfamiliar codebases
* documentation generation

Avoid using chat for trivial code generation.

---

**3. Be conscious of model choice**

Higher-capability models often carry **higher PRU rates**.
Use them only when the task requires deeper reasoning.

---

**4. Use code review automation selectively**

Automated Copilot PR reviews are valuable for:

* large pull requests
* unfamiliar modules
* security or consistency checks

Avoid running them on every small PR.

---

**5. Monitor agent usage**

Agent sessions can silently accumulate prompts.
Use them for **multi-step development tasks**, not quick edits.

---

**6. Separate exploration from production work**

During experimentation, PRUs can be consumed quickly.
Structure workflows so exploration happens in controlled sessions.

---

**Core principle**

Use **autocomplete for speed**,
use **chat and agents for thinking**,
and reserve **review and Spark for heavy tasks**.
