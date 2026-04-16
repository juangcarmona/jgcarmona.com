## 1. Tier 1 — Scriptable Bulk Operations

- [x] 1.1 Run PowerShell script to remove `categories:` blocks from all post frontmatter (regex multiline strip). Inspect `git diff` before committing.
- [x] 1.2 Run PowerShell script to rename tag `software` → `sw-craftsmanship` in all post frontmatter (74 files). Inspect `git diff`, then commit as `chore: rename software tag to sw-craftsmanship`.
- [x] 1.3 Run PowerShell script to rename tag `security` → `cybersecurity` in all frontmatter. Inspect `git diff`, then commit as `chore: merge security into cybersecurity`.

## 2. Singleton Tag Absorption

- [x] 2.1 Absorb network/home-lab singletons into `infra`: find posts tagged `network-architecture`, `self-hosting`, `home-assistant`, `home-automation`, `dns`, `wireguard` — replace with `infra`.
- [x] 2.2 Absorb identity/auth singletons into `cybersecurity`: find posts tagged `authentication`, `identity`, `azure-entra-id` — replace with `cybersecurity` (add `azure` where Azure-specific).
- [x] 2.3 Absorb misc singletons: `local-llm` → `ai` + `devex`; `dotnet` → `sw-craftsmanship`; `aspire` → `azure` + `devex`; `resilience` → `sw-architecture`. Update each affected post.
- [x] 2.4 Commit singleton absorptions: `chore: absorb singleton tags into canonical vocabulary`.

## 3. DevEx Backfill — Tooling & Environment

- [x] 3.1 Add `devex` tag to posts about local dev setup, Docker dev workflows, editor/IDE tooling:
  `installing-docker-desktop-on-different-drive`, `enable-gpu-docker-model-runner-windows`, `ubuntu-linux-en-windows-con-wsl`, `python-en-docker-con-visual-studio-trucos-y-consejos`, `docker-practico-sonarqube`, `eliminar-fondos-de-imagenes`, `linux-para-administradores-de-red`.
- [x] 3.2 Add `devex` tag to posts about AI-assisted coding and local LLMs:
  `github-copilot-pru-usage`, `claude-code-local-glm-4-7-flash`, `ia-sin-ceder-codigo`, `run-ai-locally-with-tabby-ml`.
- [x] 3.3 Add `devex` tag to posts about collaboration, PRs, and version control workflow:
  `crear-pull-requests-revisiones-codigo`, `colaboracion-descentralizada-git-radicle`, `radicle-decentralized-git-collaboration`, `radicle-xyz-cheat-sheet`, `using-mcp-with-microsoft-agent-framework`.
- [x] 3.4 Add `devex` tag to posts about testing practices and code quality:
  `introduccion-a-los-tests-unitarios-tdd-y-mocking`, `primeros-pasos-con-moq-un-ejemplo-basico-de-tdd-con-mocking`, `tests-unitarios-y-refactorizacion-hacia-una-arquitectura-de-microservicios-1`, `gestion-errores-aspnet-core`.
- [x] 3.5 Add `devex` tag to posts about API design, documentation, and architecture communication:
  `rest-api-best-practices`, `guia-rest-api`, `comunica-arquitectura-software-c4`, `documentar-arquitectura-software-arc42`, `dads-06-documenta-arquitectura-de-software-con-arc42`.
- [x] 3.6 Add `devex` tag to remaining framework/tooling posts:
  `run-agent-framework-locally`, `i-wanna-get-aspirified`, `sobre-migraciones-con-entity-framework-core`, `como-crear-una-aplicacion-angular-6-con-asp-net-core-2-1`, `angular-9-i18n-ssr`, `aplicacion-de-google-maps-android-api-v2-desde-cero`, `aplicaciones-de-google-maps-v2-desde-cero-ii`, `google-maps-api-key-para-apk-firmados`, `crear-aplicaciones-multiidioma-para-android`, `migrar-una-aplicacion-de-android-a-xamarin`.
- [x] 3.7 Commit devex backfill: `feat: add devex tag to developer experience post cluster`.

## 4. Untagged Posts — SW Craftsmanship & Architecture Cluster

- [x] 4.1 Tag GRASP series (all 8 posts) with `sw-craftsmanship`:
  `grasp-alta-cohesion-y-bajo-acoplamiento`, `grasp-controlador`, `grasp-creador`, `grasp-experto-en-informacion`, `grasp-fabricacion-pura`, `grasp-indireccion`, `grasp-polimorfismo`, `grasp-variaciones-protegidas`.
- [x] 4.2 Tag SOLID principle posts with `sw-craftsmanship`:
  `srp-single-responsibility-principle-...`, `ocp-open-closed-principle-...`, `lsp-liskov-substitution-principle-...`, `isp-interface-segregation-principle-...`, `dip-dependency-inversion-principle-...`, `principios-solid`, `principios-solid-2`, `solid-y-grasp-buenas-practicas-...`, `iwt2-dojous-solid-y-grasp`, `equilibrio-arquitectura-solid-grasp`, `patrones-generales-de-asignacion-de-responsabilidades`.
- [x] 4.3 Tag design pattern and clean code posts with `sw-craftsmanship`:
  `creational-design-patterns`, `la-potencia-de-una-interfaz-simple`, `mastering-software-development`.
- [x] 4.4 Tag software architecture posts with `sw-architecture`:
  `arquitectura-monolito`, `arquitectura-de-aplicaciones-android`, `arquitecturas-software-2025`, `sobre-arquitecturas-en-android`, `dads-01-introduccion-sistemas-distribuidos`, `dads-02-sistemas-distribuidos-de-cap-a-pacelc`, `dads-03-concurrencia-y-paralelismo`, `uml-ddd-cqrs`, `uml-de-batalla`.
- [x] 4.5 Commit sw-craftsmanship and sw-architecture tagging batch.

## 5. Untagged Posts — Methodology & Process Cluster

- [x] 5.1 Tag Kanban series with `agile`: `el-metodo-kanban-introduccion`, `el-corazon-del-metodo-kanban`, `el-tablero-kanban`.
- [x] 5.2 Tag Scrum posts with `agile`: `mi-resumen-de-scrum`, `scrum-boards`, `scrum-planificacion-de-un-sprint`.
- [x] 5.3 Tag Lean/Agile posts with `agile`: `principios-lean-metodologias-agiles`, `sobre-requisitos-e-iteraciones-en-metodologias-agiles`, `waterfall-agile-modelo-hibrido-desarrollo-software`.
- [x] 5.4 Tag DevOps posts with `devops`: `pilares-devops`, `automatizar-la-subida-de-imagenes-a-azure`, `claves-migrar-azure`.
- [x] 5.5 Commit methodology and devops tagging batch.

## 6. Untagged Posts — AI & Azure Cluster

- [x] 6.1 Tag AI-focused posts with `ai`:
  `ai-agents-nutshell`, `agentic-reasoning-with-microsoft-agent-framework`, `el-futuro-segun-la-ia`, `ia-privada-pymes-rag-fine-tuning`, `quien-es-quien-inteligencia-artificial`, `soluciones-de-vision-por-computadora`, `implementacion-ia-us-marines`, `preparar-hijos-futuro-ia`, `stop-llms-from-leaking-data`.
- [x] 6.2 Tag MAF series posts with `maf` + `ai`:
  `building-local-chat-agent-microsoft-agent-framework-dotnet`, `building-workflows-with-maf-and-dmr`, `memory-in-docker-cagent`, `teaching-agents-to-act-tools-in-docker-cagent`, `what-is-docker-cagent-a-first-look-at-declarative-ai-agents`, `change-dmr-context-size`.
- [x] 6.3 Tag Azure posts with `azure`: `introduccion-a-los-servicios-de-azure-ai`, `curso-de-inteligencia-artificial-con-azure-de-la-teoria-a-la-practica`, `configurar-wordpress-multisite-en-azure-10-pasos`, `asp-net-core-2-1-angular-6-autenticacion-y-autorizacion-en-10-pasos`, `automatizar-la-subida-de-imagenes-a-azure`.
- [x] 6.4 Tag infrastructure and cybersecurity posts: `build-cheap-ai-workstation-europe-4gpu` → `ai` + `infra`; `building-a-sovereign-home-network` → `infra`; `dns-quad9-privacidad-seguridad` → `infra` + `cybersecurity`; `ataque-a-desarrolladores` → `cybersecurity`; `apagon-28-abril-2025-ciberataque-simulacion-scada` → `cybersecurity`; `como-sobrevivir-a-cryptowall-3-0` → `cybersecurity`; `what-if-your-identity-provider-goes-down` → `cybersecurity` + `infra`; `stop-llms-from-leaking-data` → `cybersecurity` + `ai`.
- [x] 6.5 Commit AI, Azure, infra, and cybersecurity tagging batch.

## 7. Untagged Posts — Personal, Leadership & Mindset Cluster

- [ ] 7.1 Tag leadership and tech lead posts with `leadership`:
  `3-reglas-de-oro-para-conectar-con-la-gente`, `autoevaluacion-soft-skills`, `cualidades-lider-tecnico`, `coaching-vs-mentoring-tecnologia`, `desarrollador-tech-lead`, `personal-branding`, `sindrome-impostor-efecto-dunning-kruger`, `recuperar-control-vida-profesional`, `renovarse-o-morir`, `tecnologia-equilibrio-liderazgo-vida-personal`.
- [ ] 7.2 Tag Japanese philosophy and personal mindset posts with `personal`:
  `ikigai-para-desarrolladores-de-software`, `kaizen-para-desarrolladores-de-software`, `shuhari-el-camino-de-la-maestria-en-el-desarrollo-de-software`, `wabi-sabi-simplicidad-e-imperfeccion-en-desarrollo-de-software`, `nintai-perseveancia-desarrollo-software`, `hara-hachi-bu-el-arte-japones-del-equilibrio-aplicado-al-software`, `ganbatte-para-desarrolladores-enfrentar-los-desafios-con-valentia`, `oubaitoori-mejorando-el-desarrollo-de-software-...`, `yugen-profundizando-en-la-conciencia-del-universo-del-software`.
- [ ] 7.3 Tag personal career and life posts with `personal`:
  `back-to-engineering-plain-concepts`, `cierre-jgcarmona-consulting`, `como-encontrar-tu-proposito`, `el-primer-paso-siempre-es-el-mas-dificil`, `retomar-la-divulgacion`, `equilibrando-tecnologia-y-sostenibilidad`, `open-source-freelance-platform`, `tfst-una-nueva-plataforma-freelance-open-source`, `la-herramienta-que-necesitas-para-mejorar-tu-productividad-y-tu-calendario`, `mejorar-en-programacion-con-filosofias-japonesas`, `muda-mejorando-la-eficiencia-en-el-desarrollo-de-software`.
- [ ] 7.4 Tag Gredos/mountain posts and off-topic personal content with `personal`:
  `actualizado-gredos-virtual-3d`, `gredos-virtual-3d-1-2`, `mis-montanas-en-3d`, `mi-primera-aplicacion-android-gredos-3d`, `parque-nacional-de-ordesa-y-monte-perdido-en-3d`, `laliga-blocks-2025`, `genocidio-en-gaza`, `gran-engano-cambio-climatico`, `web-3-0-la-metaformfosis`, `calendario-fiscal-para-autonomos-y-pymes`.
- [ ] 7.5 Commit personal and leadership tagging batch.

## 8. Verification

- [ ] 8.1 Run `npm run build` and confirm no schema validation errors.
- [ ] 8.2 Verify `/tags/devex` page renders with ≥20 posts.
- [ ] 8.3 Verify `/tags/sw-craftsmanship` page renders with ≥74 posts (the renamed ones plus newly tagged).
- [ ] 8.4 Verify `/tags/software` page no longer exists in the build output.
- [ ] 8.5 Confirm no post frontmatter contains `categories:` key (grep check).
- [ ] 8.6 Confirm all 26 old singleton/deprecated tags are gone from the corpus (grep check).
- [ ] 8.7 Confirm every post has at least one tag (build-time validation or grep check).
