# 0002 — One-sitting lessons, in levels that run to C2

**Status:** Accepted
**Date:** 2026-10-17

## Context

The starting plan (`docs/source/german_A1-B2_52_weeks.csv`) was 52 weekly units of
chat-tutor prompts: 10–15 hours of work a week, 60–150 new words a week, 4,540 words by
B2, mock exams at weeks 11, 24, 38 and 52. Week 1 alone covered the alphabet, twelve hard
sounds, 60 words, pronouns, sein/heißen, W-questions and ten dialogues.

This course is *read*. A reader takes in one idea per sitting and can learn perhaps 20–35
words well from a single reading with audio and self-checks. A week-sized unit cannot be
read; it can only be worked through.

For scale: Goethe's official word lists are about 650 words for A1, 1,300 for A2 and
2,400 for B1.

## Decision

**A lesson is one sitting (15–25 minutes) with one core idea and roughly 20–35 new
words. Lessons are grouped into levels A1.1, A1.2, … C2.2 (about 13 lessons plus a
checkpoint each), and the course grows until it covers C2.** It never tells the reader
to go elsewhere for a level. Depth that would overload a sitting goes into collapsible
"Go deeper" blocks, or into another lesson.

Each lesson starts from something the reader wants to say, and the grammar arrives as
the answer to "how do I say this?". Useful chunks ("Ich hätte gern…") come before their
grammar is explained. The verb bracket (*Satzklammer*) is taught once and reused for
modals, separable verbs, the Perfekt and verb-final clauses.

The levels live in `src/content/curriculum/levels.yaml`; adding a level is adding an
entry.

## Alternatives rejected

- **52 week-sized lessons, each one long page.** Too many ideas per page to read in one
  go. Kien chose one-sitting lessons.
- **52 lessons split into parts.** Same content as this decision with an extra layer of
  structure that nothing needs yet.
- **Stop at B2 and say "B2 also needs outside reading".** Kien's call: the course should
  be complete. If a level needs more lessons, it gets more lessons.
- **Mock exams as lessons.** Replaced by checkpoint lessons (a longer reading using
  everything so far). An optional Goethe exam appendix is under Someday.

## Consequences

- Roughly 110 lessons to B2.2 and more for C1/C2: many sessions of writing. The
  write-lesson skill and the ledgers exist to keep them consistent.
- The CSV's culture notes and topic ideas are reused in briefs; its weekly routine
  (Anki, tandem, daily prompts) is dropped.
- Word counts per lesson are a budget, checked by script, not a target.

## Revisit if

Readers routinely finish a lesson in under 10 minutes (too thin) or stop halfway (too
heavy), or the rubric shows "Go deeper" blocks being used to smuggle in a second core
idea.
