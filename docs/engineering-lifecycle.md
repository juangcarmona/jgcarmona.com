# Engineering lifecycle

**Project**: jgcarmona.com · **Adopted**: 2026-10-19 · **Last amended**: 2026-10-19

## Definition of Ready

An item is ready when the intended reader-facing outcome, content or site behavior, and observable acceptance criteria are clear. Mark inapplicable dimensions `N/A` with a reason.

| # | Dimension | This project requires |
| --- | --- | --- |
| 1 | Title | States the reader-facing outcome. |
| 2 | Description | Explains the current problem or content gap and intended reader. |
| 3 | Actor / stakeholder | Identifies the reader or site maintainer when relevant. |
| 4 | Priority | Optional; no formal priority field is used. |
| 5 | Dependencies | Lists content, images, translation, or external links needed, or none. |
| 6 | Acceptance criteria | Gives visible content, navigation, accessibility, or build outcomes. |
| 7 | Scope | States in-scope and excluded pages or content. |
| 8 | Product rules | N/A; there is no separate product model. |
| 9 | Affected behaviour | Names affected routes, navigation, search, or publishing behavior. |
| 10 | Quality expectations | States language, accessibility, SEO, performance, and image expectations when relevant. |
| 11 | Test impact | Identifies build or browser evidence; no test suite is currently configured. |
| 12 | Existing decisions | Links relevant OpenSpec documents and repository conventions. |
| 13 | Unknowns / risks | Records content, licensing, privacy, and publication uncertainty. |

### Additional to this project

Posts are bilingual where applicable. New images must be licensed for publication and placed with their owning post.

## Definition of Done

**In this project, done means**: the site change is complete, the production build passes, content and routes are reviewed, and the change is ready to publish. A merge to `main` automatically deploys the site.

| # | Dimension | This project requires | Lane | Role |
| --- | --- | --- | --- | --- |
| 1 | Acceptance criteria | Each reader-visible criterion is demonstrated in the built site or documented evidence. | both | Repository Owner |
| 2 | Implementation completeness | All scoped pages, links, translations, and assets are accounted for. | both | Repository Owner |
| 3 | Tests | No automated test suite is configured; review relevant page behavior manually. | judgement | Repository Owner |
| 4 | Quality checks | `npm run build` succeeds, including Astro and Pagefind generation. | deterministic | none |
| 5 | Security | No secrets or unlicensed/private content are introduced. | both | Repository Owner |
| 6 | Architecture / design conformance | Keep the static Astro architecture and existing content schema. | judgement | Repository Owner |
| 7 | Documentation | Update contributor guidance when publishing or content conventions change. | both | Repository Owner |
| 8 | Product / spec consistency | Keep changes consistent with OpenSpec decisions where an active change applies. | both | Repository Owner |
| 9 | Evidence | Link the passing build and relevant browser or visual evidence in the PR. | deterministic | none |
| 10 | Human review | Repository Owner reviews content, translations, and publication impact before merge. | judgement | Repository Owner |
| 11 | Known limitations | Record omitted language versions, broken external dependencies, or publication limitations. | both | Repository Owner |

### Additional to this project

Merge to `main` triggers production deployment. Treat integration as a production gate; Fast Forward stops before merge unless the Owner explicitly authorizes publication.

### Deterministic checks

| Check | How it runs | Evidence it produces |
| --- | --- | --- |
| Site build | `npm run build` | Astro site and Pagefind index generated successfully |

## Lifecycle stages and states

GitHub issue state remains separate from lifecycle status. Each open issue has exactly one canonical `status:*` label.

| Stage | State on entry | State on exit | Transition | Fired by |
| --- | --- | --- | --- | --- |
| `refine` | `status:backlog` | `status:ready` | Set Ready after the gate passes | `refine` |
| `propose` | `status:ready` | `status:proposed` | Set after the plan passes review | `propose` |
| `implement` | `status:proposed` | `status:in-progress` → `status:in-review` | Set in-progress on entry; set in-review when the Done gate passes and the PR is ready | `implement` |
| `integrate` | `status:in-review` | `status:done`, issue closed | Merge only after owner approval; verify issue closure, then set done | `integrate` |
| `review` | `status:done` | `status:done` | Create the per-item retrospective; no lifecycle transition | `review` |

Reopen, reject, block, or close outside a merged linked PR are human-only transitions.

## Label conventions

Use `status:backlog`, `status:ready`, `status:proposed`, `status:in-progress`, `status:in-review`, and `status:done`. Keep classification labels independent. `blocked` and `owner-review` are optional overlays. New issues start at `status:backlog`.

Post-merge retrospectives use one file per issue at `docs/reviews/issue-<number>.md`. The baseline date is 2026-10-19; earlier merges are historical and excluded from review debt. No separate process ledger is used.

| Concern | This project uses |
| --- | --- |
| Provider and state store | GitHub Issues labels |
| Canonical lifecycle statuses | The six `status:*` labels above |
| Optional overlays | `blocked`, `owner-review` only when applicable |
| Issue and pull request conventions | Issue form with acceptance criteria; PR body uses `Closes #<number>` |
| Per-item review record | `docs/reviews/issue-<number>.md` |
| Retrospective baseline date | 2026-10-19 |
| Process ledger and conflict practice | `Not used` |

## Fast Forward

| Setting | This project requires |
| --- | --- |
| Enabled | Yes when the active harness can attest a distinct reviewer model |
| Executor and reviewer | Resolve at run time; reviewer must be a different model |
| Maximum correction rounds | 3 per gate |
| Substitutable judgement items | None by default; content approval remains Owner-only |
| Durable evidence | `docs/delivery/ff/<work-item-id>/<run-id>/run.json` and `summary.md` |
| Human-only or protected gates | Owner content review, production deployment through `main`, required forge approvals, and repository red lines |

Invoke `/agentic-sdlc:ff <work-item-id>` in Claude Code or `ff <work-item-id>` in portable skill hosts. It may prepare the PR and complete other configured gates. Merging to `main` deploys production, so the run stops there for Owner authorization.

## Work item fields

| Field | Identifier | Required by | Notes |
| --- | --- | --- | --- |
| Title | issue `title` | creation | Reader outcome |
| Description and acceptance criteria | issue `body` | Ready | Preserve issue form sections |
| Lifecycle status | one `status:*` label | every transition | Exactly one on each open issue |
| Pull request link | `Closes #<number>` in PR body | integration | Closes only on merge |

## Work in progress

**WIP cap**: Not used · **Query used at pickup**: Not used · **Sprint commitment**: Not used · **Board**: Not used

## Roles

| Role | Who | Decides |
| --- | --- | --- |
| Repository Owner | Juan García Carmona | Editorial correctness, translations, quality, security, publication, and every human-only gate |
| Independent reviewer | Distinct runtime-selected model | Plan and implementation review evidence; does not authorize publication |

## Installed roles

Role sources are in `.agents/skills/`; `.claude/skills/` contains generated copies.

| Role skill | Adapted from | Installed | Projected to |
| --- | --- | --- | --- |
| `read-work-item` | Agentic SDLC GitHub Issues template | 2026-10-19 | Codex, Claude Code |
| `read-work-item-links` | Agentic SDLC GitHub Issues template | 2026-10-19 | Codex, Claude Code |
| `create-work-item` | Agentic SDLC GitHub Issues template | 2026-10-19 | Codex, Claude Code |
| `update-work-item` | Agentic SDLC GitHub Issues template | 2026-10-19 | Codex, Claude Code |
| `transition-work-item` | Agentic SDLC GitHub Issues template | 2026-10-19 | Codex, Claude Code |
| `comment-work-item` | Agentic SDLC GitHub Issues template | 2026-10-19 | Codex, Claude Code |
| `create-branch` | Agentic SDLC branch template | 2026-10-19 | Codex, Claude Code |
| `checkout-branch` | Agentic SDLC branch template | 2026-10-19 | Codex, Claude Code |
| `open-pull-request` | Agentic SDLC GitHub template | 2026-10-19 | Codex, Claude Code |
| `inspect-pull-request` | Agentic SDLC GitHub template | 2026-10-19 | Codex, Claude Code |
| `update-pull-request` | Agentic SDLC GitHub template | 2026-10-19 | Codex, Claude Code |
| `merge-pull-request` | Agentic SDLC GitHub template | 2026-10-19 | Codex, Claude Code |
| `inspect-ci-result` | Agentic SDLC GitHub Actions template | 2026-10-19 | Codex, Claude Code |

## Provided roles

OpenSpec-generated skills under `.claude/skills/` provide the propose/apply/archive workflows; use their installed names for the plan-artifact contracts.

## Amendment log

| Date | Section | Change | Why |
| --- | --- | --- | --- |
| 2026-10-19 | All lifecycle conventions | Adopted shared status labels, per-item retrospective baseline, and bounded Fast Forward. | Homogenize issue and PR handling while protecting production publishing. |
