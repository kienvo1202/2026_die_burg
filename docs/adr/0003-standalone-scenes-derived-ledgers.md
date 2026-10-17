# 0003 — Standalone scenes; what the reader knows is derived from the lesson files

**Status:** Accepted
**Date:** 2026-10-17

## Context

Lessons are written one at a time, by an AI in separate sessions that remember nothing
of each other. A lesson must only use words and grammar the reader has met, and should
deliberately bring back earlier words so they stick.

A running story (the same characters across lessons) would carry recycling naturally,
but it makes lessons hard to reorder or rewrite, and every lesson would need to know the
plot so far.

## Decision

**Each lesson has its own scene and characters. Recycling is carried by ledgers that are
computed from the lesson files themselves**, never kept by hand:

- `src/lib/ledger.ts` reads every lesson's frontmatter (`newWords`, `grammar`) and
  returns what the reader knows up to lesson N.
- `scripts/check-lessons.ts` fails the build if a word is introduced twice, a lesson
  goes over its word budget, a "recycled" word was never introduced, or a lesson uses
  grammar its brief lists as not yet taught.
- The write-lesson skill gives the ledger to the author, with the least-seen words
  first, so recycling favours the words most at risk of being forgotten.

Scenes still vary across Germany, Austria and Switzerland, and a small pool of names is
kept in the curriculum so characters feel real.

## Alternatives rejected

- **A running story with recurring characters.** Kien chose standalone scenes: easier to
  write and reorder, at the cost of less pull to read the next lesson.
- **A hand-kept vocabulary list (CSV/spreadsheet).** It would drift from the lessons the
  first time a lesson was edited. A derived list cannot.

## Consequences

- Each lesson needs a hook of its own; the guide asks for one in the first lines.
- Words must be declared in frontmatter exactly (lemma, article, plural), which is also
  what the `/words` dictionary and a future Anki export need.
- The checker sees declared words, not every word in the prose. It cannot catch an
  undeclared word slipped into a sentence; the accuracy pass and review must.

## Revisit if

Readers say lessons feel disconnected, or the checker's blind spot (undeclared words in
prose) produces real complaints. A lemmatising checker would be the next step.
