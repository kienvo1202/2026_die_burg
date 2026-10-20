# 0008 — The German map: the whole language in one structure, lit up by the lessons

**Status:** Proposed
**Date:** 2026-10-19

## Context

Lessons are ordered by what a reader wants to *say* (ADR 0002), so grammar is scattered:
verb endings in lesson 2, the verb bracket somewhere in A1.1, cases across A1 and A2. A
reader who wants to review, or to see how German works as a system, has to reread
scattered lessons. Kien asked for one complete map of the language: its key grammar and
backbone words, organised logically, nicely presented, covering it "if not 100%, then
95%+".

Two facts shape the answer:

- **Grammar is finite.** A complete map of German grammar from A1 to C2 runs to roughly
  130–150 points. The sample skeleton has 136 grammar points plus 8 word themes.
- **Words are not.** Word coverage climbs slowly: very roughly, 2,000 words cover 80–90%
  of everyday text, and 95% takes several thousand (unverified estimate). Goethe's word
  lists are copyrighted, so a backbone list needs an openly licensed source.

## Decision

**The German map is a second view of the same course, ordered by how German works.
`src/content/curriculum/grammar-map.yaml` holds the whole language as regions (rooms of
the castle) → topics → points. Each point names the lesson grammar tags that teach it,
so the map lights up from the lessons rather than being kept by hand.**

- **The whole map shows from day one.** Points no lesson has taught yet stay in fog,
  with title and one-line summary only. Points a written lesson teaches link to it. Points
  the reader has finished get a seal (from `loadProgress()`).
- **The map becomes the home of the grammar tags.** These were loose strings in lesson
  frontmatter. A point groups the tags that teach parts of it, so *sein* lights up at
  lesson 1 and is complete once every person has been taught.
- **Cards:** a point a lesson has taught gets a full card (`src/content/map/<point>.mdx`)
  that says only what the lessons have taught so far, and names what is still in the fog.
- **Form:** an overview of the regions (`/map`), each opening a readable page of points
  (`/map/<region>`). The overview uses the existing ornaments; a real illustration can
  come later.
- **The promise is honest:** every grammar point, plus a backbone word list, each marked
  with how far it gets you. Not "95% of all words".

**Proposed, not accepted:** this round is a sample: the full grammar skeleton, and cards
for the 7 points lessons 1–2 teach. This ADR becomes Accepted after Kien has used the
map on a phone to review lessons 1–2.

## Alternatives rejected

- **A separately written grammar reference.** It would drift from the lessons the first
  time either changed, for the same reason ADR 0003 rejects a hand-kept word list.
- **A map that grows only with the lessons.** Always consistent, but it isn't the
  whole-language picture Kien asked for until the course is finished. Kien chose fog.
- **One big zoomable map.** The most striking, but hard to read on a phone, heavy to
  build and hard to make accessible. Kien chose overview plus readable pages.

## Consequences

- Grammar tags gain a definition. Next step (backlog): `check-lessons.ts` fails when a
  lesson uses a tag no point holds, and reports coverage ("N of M points taught").
- The `write-lesson` skill will need to write or extend the cards of the points a lesson
  teaches, so the map stays in step.
- Sounds (ei/ie, the two ch sounds) are taught in lessons 1–2 but have no grammar tag,
  so their points stay fogged. Sound spotlights need tags (backlog).
- The skeleton is a large accuracy surface: about 144 one-line rules. An independent review
  found four outright errors (fixed); a native speaker has not read it yet.
- A fourth tab (Map) in the phone tab bar.

## Revisit if

Readers don't use the map to review. Or the fogged skeleton feels like a wall of things
not yet known, rather than a promise.
