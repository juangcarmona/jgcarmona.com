---
title: Quality requirements
arc42-section: "10"
description: Quality tree and measurable scenarios.
---

# 10. Quality requirements

## Quality tree

- Discoverability: canonical URLs, valid metadata, llms.txt.
- Privacy: no cookies.
- Accessibility: narrow screens, both appearances, keyboard focus.
- Maintainability: small token-based CSS.

## Quality scenarios

| Requirement | Scenario | Check |
| --- | --- | --- |
| QR-VALID-METADATA | Every JSON-LD block in `dist/` parses; canonical and `og:image` are absolute. | Build-output script |
| QR-READABLE-ANYWHERE | At 390 px in light and dark, no horizontal page scroll. | Browser check |
| QR-SMALL-STYLESHEET | Own CSS under 400 lines. | Line count of `src/styles/site.css` and `<style>` blocks |
| BR-NO-COOKIES | Browsing home, an article, talks and changing appearance leaves zero cookies. | Browser check |

<!-- pdac:cite id="QR-VALID-METADATA" digest="sha256:14a02a9e3f4dd191adda9f82b383971e4c4feff6ea6728fd979c05811ce0bc0d" -->
<!-- pdac:cite id="QR-READABLE-ANYWHERE" digest="sha256:d10c1ed73f2cc58ecc232dc95e6b8bd319dc11ccbd3029695d30eaafbeb142af" -->
<!-- pdac:cite id="QR-SMALL-STYLESHEET" digest="sha256:02d4c5c7e018df94473324ebf78bcf2e4d75c96c1de6a8714713fbcd3229d034" -->
