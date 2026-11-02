---
title: Publish llms.txt and Markdown sources
status: accepted
date: 2026-11-02
---

# Publish llms.txt and Markdown sources

## Status

Accepted, 2026-11-02.

## Context

AI agents increasingly read the site on behalf of people and parse HTML poorly.

## Decision

Generate `/llms.txt` following llmstxt.org v2 at build time, listing recent posts first and older ones under Optional, each linking to a Markdown source at `/<lang>/<id>.md`.

## Consequences

Agents get a compact index and clean text; one more route to keep in sync, generated from the same collection.
