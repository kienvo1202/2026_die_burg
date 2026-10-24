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
- [x] **Tales on the course map**, between lessons; a lesson's last link leads to its tale
- [ ] **Map integrity**: `check-lessons.ts` fails on a lesson grammar tag no map point
      holds, and reports coverage ("N of M points taught"); briefs choose tags from the map
- [x] **Sound spotlights get tags**, so the map's Sounds region can light up (ei/ie and ch
      are taught in lessons 1–2 but stay fogged)
- [ ] **Declared-but-unused warning**: the checker flags a `newWords` entry the lesson
      never uses (lemma or an inflected form). Lessons 3, 5 and 6 each had one or more,
      found by a throwaway script
- [ ] **Word keys can't tell *sie* from *Sie***: the key is the lower-cased lemma, so *sie*
      (she, they) collides with *Sie* (polite you). Lessons 5 and 6 work round it with
      combined entries (`er · sie · es`, `wir · ihr · sie`); a key that includes the
      meaning or a sense number would fix it
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

## Reading devices (proposed 2026-10-24, not yet chosen)

Tools that keep the course a book you read through: each works like something a printed
book has (a footnote, a bookmark, someone reading aloud, a phrasebook at the back).
Ordered by value for the cost. Each names its reader need (PRODUCT.md §1) and how to test
it by hand first (§4–5). Kien's own read of lessons 1–8 decides the order of 4–6.

- [ ] **1. Tap a word, see its gloss.** *Retention, Understanding; lessons and tales.*
      Tap any German word: a footnote card with article, plural, meaning, Listen, and
      "first met in lesson N". The data is already in the ledger. Test on one tale first,
      where words appear out of their lesson's context
- [ ] **2. Read the scene aloud.** *Sound; lessons and tales.* One button plays a whole
      dialogue line by line, highlighting the line being spoken, with a slower speed. A
      queue around `speak()`, so the Android swap stays in one place. Test on lesson 7
- [ ] **3. Der/die/das marks.** *Understanding, Retention; word lists, `/words`, glosses.*
      A small steady mark per gender on every noun, through tokens, and never colour
      alone (a letter-shaped mark too, for colour-blind readers). Test on `/words` alone
- [ ] **4. A short reread** (was Someday "Review mode"). *Retention; a new page.* Five
      minutes of words and checks from finished lessons, older ones returning less often.
      Tales alone won't bring every word back. Test with a hand-made page for lessons 1–4
      before writing any spacing logic
- [ ] **5. Your phrasebook.** *Use; a new page.* The chunks and can-do lines of finished
      lessons, grouped by situation (café, flat, shop): the page a reader opens abroad.
      Test by generating it once from lessons 1–8
- [ ] **6. Margin marks.** *Retention, personal; any German word or line.* Mark it
      "unsure"; marks collect in `/words` as the reader's own review list, on this device
      only (like `progress.ts`). Test together with 1
- [ ] **7. "This lesson lit up…"** *Orientation; the lesson's end.* List the map points
      the lesson lit, linked, so lessons and map point at each other. Cheap
- [ ] **8. Record and compare.** *Sound, Use; "Your turn".* Record yourself saying a line,
      play it beside the model voice. The browser records without a server, but it needs
      microphone permission, and a plugin in the apps. Later

Deliberately left out, as they pull away from a read-through course: streaks, points,
hearts, timed drills, an AI chat partner (paid, and a different product), an in-app
flashcard deck (the Anki export under Someday does that job).

## Parked

- **Paid text-to-speech** (ADR 0006). Reopen if browser voices are missing or poor on
  readers' devices.

## Someday

- **Anki export** generated from the ledger: every word with article, plural, example
- **Placement test** to start at a later level
- **Capacitor routing check**: does the local server resolve `/course/` to
  `/course/index.html`? If not, `build.format: 'file'` (PLAN open question)
- **Goethe exam appendix**: exam formats and strategies, per level
