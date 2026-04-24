## ADDED Requirements

### Requirement: Canonical tag vocabulary is defined and enforced by convention
The site SHALL use exactly 14 canonical tags as the complete authoring vocabulary. No tag outside this set SHALL appear in any post frontmatter after this change is applied. The vocabulary is: `sw-architecture`, `sw-craftsmanship`, `devex`, `ai`, `leadership`, `devops`, `maf`, `dmr`, `cybersecurity`, `docker`, `azure`, `agile`, `infra`, `personal`.

#### Scenario: Post uses only canonical tags
- **WHEN** a post's `tags[]` frontmatter field is inspected
- **THEN** every value SHALL be one of the 14 canonical tags defined above

#### Scenario: No categories field remains
- **WHEN** any post frontmatter is inspected
- **THEN** no `categories:` key SHALL be present

#### Scenario: Every post has at least one tag
- **WHEN** the full content collection is loaded at build time
- **THEN** every post entry SHALL have a non-empty `tags[]` array

### Requirement: sw-craftsmanship tag replaces software
The `software` tag SHALL be renamed to `sw-craftsmanship` across all posts. No post SHALL have the tag `software` after this change.

#### Scenario: Renamed tag appears in tag listing
- **WHEN** a user navigates to `/tags/sw-craftsmanship`
- **THEN** the page SHALL list all posts that previously appeared under `/tags/software`

#### Scenario: Old software tag page is gone
- **WHEN** a build is run after the rename
- **THEN** no `/tags/software` page SHALL be generated

### Requirement: cybersecurity is the sole security tag
The `security` tag SHALL be removed from all posts. Those posts SHALL receive the `cybersecurity` tag instead.

#### Scenario: security tag is eliminated
- **WHEN** any post frontmatter is inspected
- **THEN** the tag value `security` SHALL NOT appear

### Requirement: devex tag covers the developer experience cluster
The `devex` tag SHALL be applied to all posts whose primary subject is improving the developer's experience, broadly defined to include: local development tooling, editor/IDE setup, local AI models for coding, Docker development workflows, testing practices, code quality tools, PR and collaboration workflow, API design practices, and clean code principles.

#### Scenario: devex tag page renders with expected cluster
- **WHEN** a user navigates to `/tags/devex`
- **THEN** the page SHALL list at minimum the following posts (non-exhaustive anchor list):
  - github-copilot-pru-usage
  - claude-code-local-glm-4-7-flash
  - ia-sin-ceder-codigo
  - colaboracion-descentralizada-git-radicle
  - crear-pull-requests-revisiones-codigo
  - introduccion-a-los-tests-unitarios-tdd-y-mocking
  - primeros-pasos-con-moq-un-ejemplo-basico-de-tdd-con-mocking
  - tests-unitarios-y-refactorizacion-hacia-una-arquitectura-de-microservicios-1
  - python-en-docker-con-visual-studio-trucos-y-consejos
  - docker-practico-sonarqube
  - installing-docker-desktop-on-different-drive
  - enable-gpu-docker-model-runner-windows
  - ubuntu-linux-en-windows-con-wsl
  - run-ai-locally-with-tabby-ml
  - rest-api-best-practices
  - guia-rest-api
  - gestion-errores-aspnet-core
  - radicle-decentralized-git-collaboration
  - radicle-xyz-cheat-sheet

#### Scenario: devex is the dominant tag after sw-craftsmanship for dev-facing content
- **WHEN** tag frequency is measured after applying this change
- **THEN** `devex` SHALL have more than 20 posts

### Requirement: Singleton tags are absorbed into canonical parents
All 13 singleton tags present before this change SHALL be removed. Posts that held them SHALL receive the appropriate canonical tag per the absorption map.

#### Scenario: No singleton tags remain in the corpus
- **WHEN** the full set of distinct tags across all posts is enumerated
- **THEN** the result SHALL be a subset of the 14 canonical tags

### Requirement: infra tag absorbs home lab and network singletons
Posts tagged with `network-architecture`, `self-hosting`, `home-assistant`, `home-automation`, `dns`, or `wireguard` SHALL be retagged with `infra`.

#### Scenario: infra tag page includes home lab content
- **WHEN** a user navigates to `/tags/infra`
- **THEN** the page SHALL include posts about home networking, self-hosted services, DNS, and VPN setup

### Requirement: personal tag covers non-technical content
Posts about career reflections, Japanese philosophy applied to software (ikigai, kaizen, shuhari, wabi-sabi, nintai, etc.), and life-balance topics SHALL receive the `personal` tag.

#### Scenario: personal tag page renders philosophy posts
- **WHEN** a user navigates to `/tags/personal`
- **THEN** the page SHALL include posts such as ikigai-para-desarrolladores-de-software, kaizen-para-desarrolladores-de-software, shuhari-el-camino-de-la-maestria-en-el-desarrollo-de-software
