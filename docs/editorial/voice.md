# Editorial voice

Juan has written this site himself since 2012. His first blog started earlier, "a comienzos de siglo", and is not part of this archive. The site shows that work in his own voice. Copy written for the site describes and links; it does not replace his writing with slogans.

## How Juan writes

Observed in his published articles. Each example is a literal quotation.

- **He starts from what happened to him, with dates and context.** "Hace tres semanas conté en LinkedIn que cerraba." ([Comienzo un Nuevo Ciclo](/es/cierre-jgcarmona-consulting/), 2025). "Last three months have been intense." ([Back to engineering](/en/back-to-engineering-plain-concepts/), 2025).
- **He is open about doubt.** "I don’t have a definitive answer, but here are my two cents." "I apologize for the chaos, but it reflects how chaotic my own thinking on this is, full of philosophical and technical contradictions." ([Spec-Driven Development: Controlling AI-Generated Drift](/en/spec-driven-done-right/), 2026).
- **He uses humour and pop culture.** "But I can’t be like Homelander, and neither should you, blindly proud, because the crash would be epic." (same article). "Spanish `burro-crazy` remains undefeated." (Back to engineering).
- **He explains with plain words, then with lists and bold emphasis.** "Spec-Driven Development just means putting some kind of control system in place, *whatever works for you*, to define intent, language, limits, and review criteria when an AI is producing code at an absurd rate."
- **He writes in English and Spanish**, depending on the audience, and does not translate everything.
- **He thanks people by name** and credits the teams he worked with (Comienzo un Nuevo Ciclo).
- **How he describes himself.** "arquitecto de software e IA" (2025). Three words, in 2020: "tecnología, creatividad y coraje" ([Personal Branding](/es/personal-branding/)). LinkedIn headline: "Software Architect | AI Strategist | Critical & Secure Systems".

## Provenance

Text in this repository has five origins. Name the origin before reusing any text, and never present one as another.

| Origin | What it is | How the site may use it |
| --- | --- | --- |
| Original writing | The body of an article Juan published, his talk abstracts, his own project sites | Quote literally, with a link to where it was published |
| Imported metadata | Frontmatter brought over from WordPress (`Imported Old Site Posts!`, 2025) or added later for SEO: descriptions, tags, featured flags | SEO and listings only. It is not evidence of what Juan wrote or said |
| Organiser text | Programmes, listings and descriptions published by an event | Quote literally and name the organiser as the source |
| Redesign copy | Labels and descriptive sentences written for this site during the 2026 redesign | Mark as new; it must state documented facts and add no claims |
| Agent-generated summaries | Text an AI agent wrote, in this redesign or earlier | Never presented as Juan's words or as a quotation. Shown only as a labelled summary, or removed |

**An article being in the repository, or committed under Juan's name, does not establish that its frontmatter was written by him.** Only the published body is treated as his original writing. The homepage therefore shows the opening of each article, taken literally from its body (`src/utils/excerpt.ts`), and keeps the frontmatter description for search engines.

## Rules for site copy

1. Quote him or describe what he did. Do not write taglines on his behalf.
2. Mark every piece of site copy as a **literal** quotation, a **paraphrase** of a named source, or **new** descriptive text, in the table below.
3. Literal quotations are exact and link to their source. Paraphrases name their source. New text states facts that have a source (CV, programme, repository) and adds no claims.
4. AI-assisted engineering is his current work, not the whole story. The homepage also shows the earlier career, the sectors he has worked in, the publications, the courses and the older writing.
5. Historical articles are never rewritten. Dates, authorship and URLs stay as published.
6. No metrics, credentials or recognitions that are not documented.
7. No personal quotation that cannot be found, word for word, in something Juan published.
8. A talk links only the material a source ties to it. Writing on the same subject is shown apart, as related reading.
9. A cover image does not prove a publication. Every publication carries its verified status and format.

## Homepage copy and its sources

| Text | Kind | Source |
| --- | --- | --- |
| "Software Architect · AI Strategist · Critical & Secure Systems" | Literal | LinkedIn headline, without the employer |
| "More than twenty years designing and building software for aerospace and defence, rail and smart mobility, motorsport and data platforms, and a company of my own…" | New | CV and /about; sectors confirmed by Juan on 2026-11-02 |
| "I've been coding, daily, even on weekends, for more than half of my life." | Literal | Body of Spec-Driven Development: Controlling AI-Generated Drift, 2026 |
| Career strip (2005–2025) | New | CV and /about |
| "Blog archive from 2012 · On stage since 2012" | New | The oldest article in this archive (August 2012); IWT2 DojoUS, 9 November 2012 |
| Article titles | Literal | Each article's frontmatter title, as published |
| Article excerpts | Literal, cut with "…" | The first paragraph of each article's body |
| Project headlines and summaries | Literal | Each project's own site, checked on 2026-11-02 |
| Talk titles and abstracts | Literal | The source named for each talk in `src/data/speaking.ts` |
| Albacete English summary | Summary | Juan, 2026-11-02; shown labelled as a summary on /talks |
| Publication titles and status labels | Literal titles; new labels | /books; status as audited in `audit-2026-11-02.md` |
| Course titles and video counts | Literal | The YouTube playlists, checked on 2026-11-02 |
| Section titles | New | Plain labels |

## Inner pages and their sources

| Page | Text | Kind | Source |
| --- | --- | --- | --- |
| /blog, /tags, /search | Article excerpts | Literal, cut with "…" | The first paragraph of each article's body |
| /blog | Counts and the first year | New | Computed from the archive at build time |
| /talks | Talk titles, abstracts, links | Literal | `src/data/speaking.ts`, as on the homepage |
| /talks | Session openings under "Sessions I offer" | Literal | Sessionize profile, checked word for word on 2026-11-02 |
| /projects | Headline and summary of each project | Literal | Each project's own site |
| /projects | Descriptions and stacks | New | Each project's README and site; no claims beyond them |
| /books | Introduction and book descriptions | Literal | The original /books page (WordPress import) |
| /books | Status of each book | New | `audit-2026-11-02.md` |
| /about | First-person paragraphs, "How I work", "Outside of tech", the closing line | Literal | The About page Juan published before the redesign (`src/pages/about.md`, commit cea36da) |
| /about | First blog sentence | Literal | *El primer paso siempre es el más difícil*, 2022 |
| /about | "Now" paragraph and experience list | New | CV |
