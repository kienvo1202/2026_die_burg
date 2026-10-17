---
name: write-lesson
description: Write (or rewrite) one Die Burg lesson from its brief, checked against the ledger of what the reader already knows, with a German accuracy pass and a rubric score. Use when asked to write, draft or redo a lesson, e.g. "/write-lesson a1-03" or "write the next lesson".
---

# Write a lesson

You are writing one lesson of Die Burg, a German course read one lesson at a time. The
reader has read every earlier lesson and nothing else. You remember none of the earlier
sessions: everything you need is in the files named below. Read them; don't guess.

**Argument:** a lesson id like `a1-03`. With no argument, take the first lesson in
`src/content/curriculum/levels.yaml` (in course order) that has no file in
`src/content/lessons/`.

## 1. Read before writing

1. `docs/LESSON_GUIDE.md`, all of it. It is the quality bar: voice, rules, layout,
   skeleton, accuracy pass, rubric.
2. The brief: `src/content/curriculum/briefs/<id>.yaml`.
   - **No brief?** Stop writing the lesson. Draft the brief instead, from the lesson's
     title and can-do in `levels.yaml`, the curriculum notes in `docs/PLAN.md` and
     `docs/adr/0002-*`, and the matching week of `docs/source/german_A1-B2_52_weeks.csv`
     (mine its culture notes). Show it to Kien and wait: the brief decides what the
     lesson teaches, which is Kien's call.
3. The ledger: `node scripts/ledger-report.ts <id>`. It lists every word the reader knows
   (least-seen first) and every grammar tag taught so far.
4. The previous two lessons, for voice and continuity, and lessons N-1, N-3 and N-7 for
   the warm-up questions.

## 2. Write

Create `src/content/lessons/<id>.mdx` following the skeleton in the guide, with the
sections in the guide's order.

- Frontmatter: `title`, `canDo`, `minutes`, `newWords` (within `newWordBudget`, every
  noun with `article` and `plural`, every verb with `forms`), `recycles` (8–12 keys from
  the ledger report, least-seen first), `grammar` (tags used).
- Every German word is in the ledger, in `newWords`, or inside a chunk. Every German
  string goes through `Say`, `Line`, `Chunk`, `WordList` or `<span lang="de">`.
- Nothing from the brief's `notYet` list, except as a chunk.
- One insight, explained through English where possible (what English kept, lost or
  changed). Make it true, then make it vivid.

## 3. Check the German, twice

1. **Your own pass**, following "The German accuracy pass" in the guide, line by line.
   Fix or remove anything you are not certain of. Never invent an article, plural or
   verb form.
2. **An independent pass.** Start a separate agent that did not write the lesson, with
   this prompt (fill in the id):

   > You are an independent reviewer of German teaching material for English-speaking
   > beginners. You did not write it; report only, do not edit. Read
   > `src/content/lessons/<id>.mdx` and check: every noun's article and plural in the
   > frontmatter; every verb form and `forms` string; every German sentence for grammar,
   > word order, capitalisation, spelling and whether a native speaker would say it in
   > that situation and register; every English gloss; every claim about language,
   > history, etymology, regions and culture. Say "uncertain" rather than guess. Report:
   > Errors (text, problem, correction), Doubtful or unnatural, Verified, Could not
   > verify. Under 700 words.

3. Fix what the reviewer finds. Keep both lists (verified / not verified) for the PR.

## 4. Check the build and look at it

```bash
npm run check     # types + lesson checker (budgets, duplicates, recycling, grammar)
npm test
npm run build
```

Then look at the page as a reader would. Run `npm run preview` and open
`http://127.0.0.1:4321/lessons/<id>` at phone width (390px) and desktop width, in both
themes (use the `run` skill, or Playwright if it is available). Confirm:
no sideways scrolling; the scene's "Show the English" works; every check reveals; the
word list shows articles in colour *and* text; the drop cap renders; no stray space
before punctuation after a listen button.

## 5. Score and record

1. Score the lesson on the rubric in the guide (1–5 per line). Anything below 4: fix it,
   or say plainly why not.
2. `docs/JOURNAL.md`: a dated entry with the scores, the accuracy results, and anything
   that surprised you.
3. `CHANGELOG.md`: one line a reader would understand ("Added: lesson 3, Spell it out").
4. If writing the lesson showed the guide or the brief was wrong, fix the guide in the
   same PR and say so; add anything bigger to `docs/BACKLOG.md`.

## 6. Hand over

Branch `content/lesson-<id>`, commit (Conventional Commits; the body says why), push,
and open a PR whose body has:

- the rubric table;
- **German accuracy**: what both passes verified, what was changed, what is still
  uncertain;
- what was *not* checked (real audio, Safari, a real phone).

Ask Kien to read the lesson on a phone before merging: the rubric is a check, not the
verdict.
