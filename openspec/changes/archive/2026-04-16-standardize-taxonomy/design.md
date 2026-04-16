## Context

The blog has accumulated ~130 posts with no `tags[]` at all, ~100 posts with a ghost `categories[]` field Astro ignores, a 74-post `software` tag that signals nothing, a duplicate `security` / `cybersecurity` pair, and 13 singleton tags that add noise. The content schema (`content.config.ts`) already accepts `tags[]` as optional — no schema change is needed. The work is entirely in frontmatter data across ~200 files.

**Current tag vocabulary** (26 values, functional in /tags/* pages and Pagefind):
`software`(74), `sw-architecture`(54), `ai`(27), `leadership`(21), `devops`(12), `maf`(9), `dmr`(7), `infra`(6), `cybersecurity`(5), `docker`(4), `azure`(3), `agile`(3), `security`(2), plus 13 singletons.

**Current categories** (16 values, invisible ghost data):
`desarrollo-software`(89), `arquitectura-software`(30), `ai`(29), `desarrollo-personal`(28), `devops`(27), `gestion-proyectos`(27), `proyectos`(22), `blog`(18), `aventura`(10), `testing-software`(10), `ciberseguridad`(8).

## Goals / Non-Goals

**Goals:**
- Define and document a canonical 14-tag vocabulary that becomes the authoring contract going forward
- Eliminate `categories[]` ghost field from all frontmatter (pure data cleanup, no schema change)
- Rename `software` → `sw-craftsmanship`, merge `security` → `cybersecurity`, collapse 13 singletons
- Introduce and backfill `devex` as a new first-class tag (~35-40 posts)
- Ensure every post has at least one canonical tag

**Non-Goals:**
- Changing `content.config.ts` schema
- Building `/categories/*` pages
- Automated tag suggestion via NLP or LLM
- Changing any URLs, routing, or sitemap config

## Decisions

### D1: Scriptable vs. manual operations

Frontmatter changes fall into two tiers:
- **Tier 1 — Scriptable** (safe find-replace): Remove `categories[]` blocks, rename `software`→`sw-craftsmanship`, merge `security`→`cybersecurity`. PowerShell scripts using regex on raw file content. Fast, auditable via `git diff`.
- **Tier 2 — Manual** (requires judgment): Assign tags to currently untagged posts, backfill `devex`, collapse singletons to their canonical parent. Per-post editorial decision.

Alternatives considered: Using the existing `categories[]` values as a mapping hint to auto-assign tags. Rejected — categories and tags don't map 1:1, and the judgment call (e.g., whether a "gestion-proyectos" post should get `agile` or `leadership`) requires reading the post.

### D2: Canonical 14-tag vocabulary

```
Tag               Coverage / Definition
─────────────────────────────────────────────────────────────────
sw-architecture   Architecture patterns, C4, DDD, distributed, microservices
sw-craftsmanship  SOLID, GRASP, design patterns, clean code, refactoring [renamed from software]
devex             Everything that improves the developer experience: tooling,
                  environment setup, local AI, IDE/editor, Docker dev workflows,
                  testing practices, code quality tools, CI, PR workflow, API design
ai                AI/LLMs, agents, machine learning, computer vision
leadership        Tech leadership, soft skills, team dynamics, coaching, mentoring
devops            CI/CD, infrastructure automation, deployment, cloud operations
maf               Microsoft Agent Framework series
dmr               Docker Model Runner series
cybersecurity     Security threats, identity, authentication, network security [absorbs security]
docker            Docker containers, Compose, Docker Desktop, container runtimes
azure             Azure cloud services (non-devops Azure topics)
agile             Scrum, Kanban, Lean, methodologies
infra             Infrastructure, networking, self-hosting, home lab, DNS, VPN
personal          Career reflections, Japanese philosophy, life balance, mindset
```

Alternatives considered: Keeping `software` as a broad catch-all. Rejected — it reduces Pagefind filter usefulness and hurts SEO (tag pages with focused audiences outperform generic ones). Splitting `devex` into `tooling` + `sw-practices`. Rejected — user decided devex is the widest tent.

### D3: Singleton tag absorption map

| Singleton | → Canonical | Rationale |
|---|---|---|
| `security` | `cybersecurity` | Exact synonym, 2 posts |
| `local-llm` | `ai` + `devex` | Running LLMs locally is both AI and DevEx |
| `dotnet` | `sw-craftsmanship` | .NET posts are coding practice content |
| `azure-entra-id`, `authentication`, `identity` | `cybersecurity` | Identity/auth is a security domain |
| `aspire` | `azure` + `devex` | .NET Aspire is a dev orchestration tool |
| `resilience` | `sw-architecture` | Resilience patterns are architecture |
| `network-architecture` | `infra` | Network topology is infrastructure |
| `self-hosting`, `home-assistant`, `home-automation` | `infra` | Home lab / self-hosting cluster |
| `dns`, `wireguard` | `infra` | Network infrastructure tooling |

## Risks / Trade-offs

- [Risk: Regex on frontmatter YAML] Greedy multiline regex could corrupt adjacent fields → Mitigation: Run Tier 1 scripts on a git branch, inspect `git diff` before committing. Keep scripts narrowly targeted.
- [Risk: devex backfill is subjective] Different readers might classify some posts differently → Mitigation: Document the decision in `spec.md` with explicit post list. Reviewer can audit against the vocabulary definition.
- [Risk: 130 untagged posts is a lot of manual work] Could take several apply sessions → Mitigation: Break tasks.md into logical batches by category-hint. Start with the smallest groups.
- [Risk: New `/tags/devex` page is empty if backfill is missed] → Mitigation: Tasks require backfill before the spec is marked done.

## Migration Plan

1. Branch from `main` (or current branch)
2. Run Tier 1 scripts (categories removal, renames, merges) — inspect diff
3. Commit Tier 1 as a single commit "chore: remove ghost categories[] from all posts"
4. Manually apply Tier 2 tag assignments in logical batches — commit per batch
5. Run `npm run build` and verify `/tags/devex`, `/tags/sw-craftsmanship` pages render with expected post counts
6. Merge

Rollback: `git revert` any individual commit. No production data or databases involved.
