---
title: Canonical article URLs with static redirect pages
status: accepted
date: 2026-11-02
---

# Canonical article URLs with static redirect pages

## Status

Accepted, 2026-11-02.

## Context

Every post was published twice (`/en/` and `/es/`, one an untranslated copy) and the WordPress-era `/slug/` URLs pointed at broken meta refreshes. Static Web Apps cannot hold about 490 redirect rules within its 20 KB configuration limit.

## Decision

Serve each article only at `/<lang>/<id>/` of its original language. Render the other language prefix, `/<id>/` and `/blog/1/` as static redirect pages with an immediate meta refresh, an absolute canonical and `noindex`, and keep them out of the sitemap. Keep server rules for the few non-article redirects.

## Consequences

One indexable URL per article and working legacy links. Redirects are not HTTP 301, which some audit tools flag.
