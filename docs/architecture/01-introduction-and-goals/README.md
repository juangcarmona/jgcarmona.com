---
title: Introduction and goals
arc42-section: "01"
description: System purpose, stakeholders, and architecture goals.
---

# 1. Introduction and goals

## Requirements overview

jgcarmona.com is the personal site and blog of Juan G. Carmona: about 160 articles in English and Spanish since 2012, plus pages for talks, projects, books and an about page. The product definition lives in [`docs/product/model`](../../product/model/), and its journeys are reading an article, evaluating the author as a speaker or collaborator, and publishing.

## Quality goals

| Priority | Goal | Product source |
| --- | --- | --- |
| 1 | Every article has one canonical URL and valid metadata for search engines and agents. | BR-CANONICAL-URL, QR-VALID-METADATA |
| 2 | Reading sets no cookies. | BR-NO-COOKIES |
| 3 | Readable on narrow screens in light and dark appearance. | QR-READABLE-ANYWHERE |
| 4 | Small, token-based styling that is cheap to change. | QR-SMALL-STYLESHEET |

<!-- pdac:cite id="BR-CANONICAL-URL" digest="sha256:1e706c4482baff2177a6d596b75aea28026fc446f28700aa089f971c04b3f561" -->
<!-- pdac:cite id="QR-VALID-METADATA" digest="sha256:14a02a9e3f4dd191adda9f82b383971e4c4feff6ea6728fd979c05811ce0bc0d" -->
<!-- pdac:cite id="BR-NO-COOKIES" digest="sha256:b1dd085a18db5696945d1ea141ef46bd2306e93275c9e20f3911d7bcaecee974" -->
<!-- pdac:cite id="QR-READABLE-ANYWHERE" digest="sha256:d10c1ed73f2cc58ecc232dc95e6b8bd319dc11ccbd3029695d30eaafbeb142af" -->
<!-- pdac:cite id="QR-SMALL-STYLESHEET" digest="sha256:02d4c5c7e018df94473324ebf78bcf2e4d75c96c1de6a8714713fbcd3229d034" -->

## Stakeholders

| Stakeholder | Expectation |
| --- | --- |
| Readers | Fast, clean articles with no banners or tracking. |
| Event organisers and hiring contacts | Verifiable talks, roles and projects, and a contact route. |
| The author | Publishing by merging Markdown, and a site that states only sourced facts. |
| Search engines and AI agents | Canonical URLs, a sitemap, structured data, RSS and llms.txt. |
