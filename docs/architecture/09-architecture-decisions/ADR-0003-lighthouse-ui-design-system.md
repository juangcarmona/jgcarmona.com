---
title: Lighthouse UI as the design system
status: accepted
date: 2026-11-02
---

# Lighthouse UI as the design system

## Status

Accepted, 2026-11-02.

## Context

About 1,840 lines of CSS over 31 files, a Bear Blog base, unloaded fonts and a hand-inverted light theme had drifted from the palette the author's other sites share.

## Decision

Use `@juangcarmona/lighthouse-ui` tokens and recipes as a package (never copied) and one site stylesheet under 400 lines, with light, dark and system appearances through `data-lh-theme`.

## Consequences

Shared look with lighthouse and talks; radius and colour follow the tokens. Site styling is limited to layout and article typography.
