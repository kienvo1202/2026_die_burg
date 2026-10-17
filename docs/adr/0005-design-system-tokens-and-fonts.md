# 0005 — The design system lives in CSS tokens; fonts are self-hosted; Fraktur is display-only

**Status:** Accepted
**Date:** 2026-10-17

## Context

Kien wants a look that recalls medieval Europe and the Grimm fairy tales, defined once
and reused across the website and the future apps. Two forces pull against each other:
ornament (which sets the mood) and readability (which is the whole point of a reading
course). Learners also need to see German letterforms clearly: Fraktur's long s (ſ) and
its k/t/f shapes are hard even for many Germans today.

## Decision

**All colours, fonts, sizes, spacing and motion are CSS custom properties in
`src/design/tokens.css`, with a light ("Vellum") and a dark ("Candlelight") theme.**
Components use only tokens; a test fails on hex colours or font names anywhere else.
Every text-on-background pair is held at ≥ 4.5:1 contrast by a test.

**Fonts are self-hosted via `@fontsource` packages:**

- **EB Garamond** for body text and all German the reader learns from.
- **IM Fell English** (and **IM Fell English SC**) for headings and labels.
- **UnifrakturMaguntia** (Fraktur) for display only: the brand, level titles and drop
  caps. Never for text a learner must read.

Ornaments (dividers, corners, wax seal, ribbon) are inline SVG coloured by tokens, so
they follow the theme. Paper texture is an SVG noise filter, not an image.

`docs/DESIGN_SYSTEM.md` holds the rules; the `/design` page shows every token and
component in both themes.

## Alternatives rejected

- **Google Fonts from Google's CDN.** Fails offline in the app, and a German court
  (LG München, 2022) fined a site for sending visitors' IP addresses to Google that way.
- **Tokens in JSON with a build step generating CSS.** Only needed if a non-web app
  (Swift/Kotlin) ever consumes them. Capacitor apps use the CSS directly. Revisit then.
- **Fraktur for headings.** Beautiful, but learners would be reading an unfamiliar
  script at the moment they are trying to learn a word.
- **A UI framework (Tailwind, a component library).** Fights a bespoke look and adds a
  second vocabulary for styling. Plain CSS with tokens is enough.

## Consequences

- Restyling (or a third theme) is a change to one file.
- Ornament has to earn its place: it frames text, never sits behind it.
- Three font families add about 150–250 KB on first load; cached after that and bundled
  in the app.

## Revisit if

A native (non-WebView) app is started, so tokens need to be shared as data. Or the fonts
measurably slow the first page on mobile.
