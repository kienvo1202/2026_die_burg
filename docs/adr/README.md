# Architecture Decision Records

One file per decision that would otherwise make a future reader ask *"why on earth is it
like this?"*. Not every choice needs one: the test is whether the reasoning is
recoverable from the code. The code shows *what* a rule is; only an ADR can say why we
accepted its known weaknesses, or which alternatives lost and why.

## Format

**Status · Date · Context · Decision · Alternatives rejected · Consequences · Revisit if**

Copy `0000-template.md`. Keep it short: if it runs past a page, the decision probably
contains two decisions.

File names: `NNNN-short-decision-in-kebab-case.md`, numbered in order, never reused.

## Status values

| Status | Meaning |
|---|---|
| `Proposed` | Under consideration, not yet acted on |
| `Accepted` | In force |
| `Superseded by NNNN` | Replaced. **The file stays** |

**Superseded records are never deleted, and never edited into agreement with the record
that replaced them.** The value of a decision log is showing where you changed your mind
and what you learned. A log containing only the winning answers is marketing, not
engineering. Reversed pairs are usually the most useful reading in the directory.

**Small changes to a decision go in an amendment** at the bottom of the original record,
dated, rather than a new ADR. A new ADR is for when the decision itself flips.

## Writing a good one

- **Context states facts, with numbers when you have them**: costs, timings, limits,
  what was measured and when. "Batch is cheaper" is weak; "batch is half price but can
  take up to 24 hours, and a text file never needs the step it hid behind" is a reason.
- **Alternatives rejected name who decided and why.** "Owner chose buttons over automatic
  runs, for control over spending" lets a future reader know which reasons still hold.
- **Consequences include the bad ones.** What gets worse, what is now unused, what will
  sometimes be wrong.
- **A deferral names what would reopen it.** A deferral that names its reopen condition is
  a decision. One that doesn't is just a thing nobody got round to.

## Index

| # | Decision | Status |
|---|---|---|
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions | Accepted |
| [0002](0002-one-sitting-lessons-open-ended-levels.md) | One-sitting lessons, in levels that run to C2 | Accepted |
| [0003](0003-standalone-scenes-derived-ledgers.md) | Standalone scenes; what the reader knows is derived from the lesson files | Accepted |
| [0004](0004-astro-now-capacitor-later.md) | A static Astro site now; Capacitor for the stores later | Accepted |
| [0005](0005-design-system-tokens-and-fonts.md) | Design system in CSS tokens; self-hosted fonts; Fraktur display-only | Accepted |
| [0006](0006-browser-speech-for-audio.md) | Audio via the device's speech synthesis; paid text-to-speech parked | Accepted |
