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
- [ ] **CI seen red once**: push a deliberate failure on a branch, see it fail, remove it
- [ ] **Lesson guide** with rubric and No/Yes example pairs
- [ ] **A1.1 and A1.2 briefs**: titles for all, full briefs for lessons 1–2
- [ ] **Lessons 1–2**, with a documented German accuracy pass
- [ ] **write-lesson skill**
- [ ] Read lessons 1–2 for real on a phone; score against the rubric in `JOURNAL.md`

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
