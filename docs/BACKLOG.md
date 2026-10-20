# Backlog

Somewhere to put things so they stop occupying your head. **Capture first, decide
later**: anything that surfaces mid-task lands here rather than derailing the task.

Phase-level status lives in [ROADMAP.md](ROADMAP.md), not here. This file is tasks only.

Format: `- [ ] description` with `[blocked: reason]` where relevant. No priorities, no
estimates. When something is done it moves to `CHANGELOG.md` and is deleted from here
(or ticked `[x]` until the phase closes).

---

## Phase 0 — The book

- [x] **Design system**: tokens (two themes), self-hosted fonts, ornaments, decorative
      and lesson components, `/design` style guide, `docs/DESIGN_SYSTEM.md`
- [x] **Design checkpoint**: approved with one change (Fraktur → Cinzel Decorative)
- [x] **App shell**: title page, course map, lesson page with reading progress and
      previous/next, `/words`, bottom tab bar on phones, theme toggle
- [x] **Content model**: levels A1.1–C2.2, briefs schema, lesson frontmatter schema
- [x] **Ledger and checker** with tests, including broken fixtures that must fail
- [x] **CI**: Node job (test, check, build)
- [x] **CI seen red once**: a failing test on `feat/app-shell` turned the `site` job red; reverted
- [x] **Lesson guide** with rubric and No/Yes example pairs
- [x] **A1.1 and A1.2 briefs**: titles for all, full briefs for lessons 1–2
- [x] **Lessons 1–2**, with a documented German accuracy pass
- [x] **write-lesson skill** (plus `scripts/ledger-report.ts`)
- [ ] Read lessons 1–2 for real on a phone; score against the rubric in `JOURNAL.md`
- [ ] Read the sample tale (`/tales/rumpelstilzchen`) after lesson 2, and use the map
      (`/map`) to review lessons 1–2; verdicts in `JOURNAL.md`. Accept or change ADRs 0007
      and 0008

## After the tale and map samples read well (ADRs 0007, 0008)

- [ ] **Tales in the content model**: `kind: lesson | tale | checkpoint` in `levels.yaml`
      and `content.config.ts`; tale ids that don't renumber lessons (e.g. `a1-t01`); move
      the sample out of `src/drafts/`
- [ ] **Ledger counts tales** in `timesSeen`; a tale budget (≤ 6 new words, no new grammar)
      in `findProblems`, with tests and broken fixtures
- [ ] **Tales on the course map**, between lessons
- [ ] **Map integrity**: `check-lessons.ts` fails on a lesson grammar tag no map point
      holds, and reports coverage ("N of M points taught"); briefs choose tags from the map
- [ ] **Sound spotlights get tags**, so the map's Sounds region can light up (ei/ie and ch
      are taught in lessons 1–2 but stay fogged)
- [ ] **Repetition warning**: the checker flags a word that hasn't returned within N
      readings, with spacing that grows over time
- [ ] **Backbone word list**: find an openly licensed German frequency list (check the
      license before using it); a `theme` field on words; a coverage report; fill the
      Treasury region
- [ ] **Docs**: a "Tales" section and rubric in `LESSON_GUIDE.md` (references when they
      fit; pop culture referenced, never quoted); the map and tales in `PRODUCT.md`; an
      amendment to ADR 0002
- [ ] **Skills**: a tale mode or `write-tale` skill; `write-lesson` writes or extends the
      map cards for the points a lesson teaches
- [ ] **An illustrated map overview** in place of the plain region panels, once the
      structure has proved itself

## Parked

- **Paid text-to-speech** (ADR 0006). Reopen if browser voices are missing or poor on
  readers' devices.

## Someday

- **Anki export** generated from the ledger: every word with article, plural, example
- **Placement test** to start at a later level
- **Review mode**: only the warm-up and self-check items of finished lessons
- **Capacitor routing check**: does the local server resolve `/course/` to
  `/course/index.html`? If not, `build.format: 'file'` (PLAN open question)
- **Goethe exam appendix**: exam formats and strategies, per level
