# 0007 — Tales between lessons: fresh stories made of words the reader already knows

**Status:** Proposed
**Date:** 2026-10-19

## Context

Kien's worry, from reading the plan: 14 lessons per half-level feels thin, and nobody
rereads the same dialogue more than two or three times before it gets boring.

The numbers split that worry in two:

- **Coverage is about right.** 28 A1 lessons at about 23 new words each is about 650 words,
  the size of Goethe's A1 list (ADR 0002).
- **Exposure is not.** Before lesson 3, the ledger (`node scripts/ledger-report.ts a1-03`)
  shows 32 of the 46 known words seen exactly once. A word needs very roughly 10–20
  meetings in context before it sticks. Lessons recycle 8–12 earlier words each
  (LESSON_GUIDE rule 7), which helps but cannot get anywhere near that. The design quietly
  relied on rereading for the rest.

## Decision

**After every two lessons comes a tale: a short reading (5–10 minutes) that retells a
Grimm tale, a legend or a culture story using the words the reader already knows, plus at
most 6 new ones, and no new grammar.**

- At A1 a tale is bilingual: English narration, German speech. The idea is that the German
  takes over the narration as levels rise.
- A tale has no insight section and no "Your turn". It is for enjoying; repetition is the
  side effect.
- Lessons carry fairy-tale or culture references only when they fit. Tales are where the
  stories live.
- Checkpoint lessons become a longer kind of tale.

**Proposed, not accepted:** one sample exists, `src/drafts/tales/rumpelstilzchen.mdx`
(read after lesson 2), shown at `/tales/rumpelstilzchen`. It has no collection, no course
map entry and no checker support yet. This ADR becomes Accepted, and the build steps in
`BACKLOG.md` start, only after Kien has read the sample on a phone.

## Alternatives rejected

- **More, smaller lessons.** Every lesson adds words, so more lessons add more words to
  forget at the same exposure rate. Kien chose tales.
- **A tale after every lesson.** The most repetition, and twice the writing and accuracy
  checking. Kien chose every two lessons.
- **A fairy-tale section required in every lesson.** It would turn into the trivia
  `LESSON_GUIDE.md` warns against, and lengthen lessons already at the long end of a
  sitting. Kien chose "when it fits".
- **Rely on a review mode.** It is still on the Someday list, and still useful. But it
  re-shows the same material, which is the boredom Kien described.

## Consequences

- A1.1 grows from 14 readings to about 20, without adding grammar.
- Tales need a place in the content model: a `kind` field in `levels.yaml`, ids that don't
  renumber lessons, the ledger counting tales in `timesSeen`, and a tale word budget in
  `findProblems`. Until then the sample's words are checked by hand.
- More German to check. Every tale goes through the same two accuracy passes as a lesson.
- Retellings stay in the public domain (Grimm, legends). Pop culture can be referenced,
  never quoted.

## Revisit if

Readers skip tales, or read them as a chore. Or the ledger shows words still seen only
once or twice after a level's tales.
