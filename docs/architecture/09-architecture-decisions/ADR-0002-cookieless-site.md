---
title: A site without cookies
status: accepted
date: 2026-11-02
---

# A site without cookies

## Status

Accepted, 2026-11-02.

## Context

Google Analytics loaded without consent and giscus loaded on every article; a cookie banner would be needed to keep both.

## Decision

Remove Google Analytics, keep GoatCounter (no cookies), keep the appearance in localStorage and load giscus only after the reader asks for comments.

## Consequences

No consent banner and a plain statement on /privacy. Less analytics detail than GA4.
