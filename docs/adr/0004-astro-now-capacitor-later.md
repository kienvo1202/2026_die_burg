# 0004 — A static Astro site now; the same files packaged with Capacitor for the stores later

**Status:** Accepted
**Date:** 2026-10-17

## Context

Kien wants a website first and Google Play / App Store apps later, reusing either the
code or at least the styling and layout. The course is mostly reading: long text, a
little interactivity (reveal answers, play audio, remember progress). The look is an
illuminated manuscript, which leans heavily on CSS: `::first-letter` drop caps, OpenType
small caps, ornamental borders, texture via SVG filters.

## Decision

**Build a static site with Astro (MDX + strict TypeScript). In Phase 2, package the
built `dist/` folder as iOS and Android apps with Capacitor.**

Cheap decisions made now so that step stays cheap:

- Static output only, no server features; every asset (fonts included) bundled, so the
  app works offline.
- Reading progress goes through one module, `src/lib/progress.ts`, which the app can
  switch to Capacitor Preferences.
- Audio goes through one function, `speak()` in `src/lib/speech.ts`, which the app can
  switch to a native text-to-speech plugin (ADR 0006).
- Mobile-first layout, `viewport-fit=cover` and safe-area insets, touch targets of at
  least 44px, a bottom tab bar on phones.

## Alternatives rejected

- **Expo / React Native for web and apps.** Truly native apps from one codebase, but
  React Native styling has no `::first-letter`, weak typography features and no CSS
  filters, so the manuscript look would be much harder and the website weaker. Kien
  chose the Capacitor route.
- **A React single-page app (Vite) + Capacitor.** More app-like navigation, but more
  JavaScript, worse for a reading site and for search engines, for little gain.
- **Native Swift/Kotlin apps.** Three codebases for one person.

## Consequences

- One codebase and one design system for web and apps.
- Apple sometimes rejects apps that are "just a website" (guideline 4.2). Offline
  lessons, audio and progress make the app more than that, but it is not guaranteed.
- Open question: Capacitor's local server may not resolve `/course/` to
  `/course/index.html`. If it doesn't, switch Astro to `build.format: 'file'`.

## Revisit if

App review rejects the app as a website wrapper, or reading performance in the WebView
is poor on a mid-range Android phone.
