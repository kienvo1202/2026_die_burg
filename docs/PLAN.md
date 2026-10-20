# Die Burg — build plan

Written before code, read rarely after. When the goal or design moves, don't rewrite the
original: add a dated note where it changed.

## Context

Learning German from a textbook usually means rule tables first and real sentences
later. Learning it from a chat tutor means doing a great deal of work each week and
assembling the course yourself. Kien wants something in between: **a course you simply
read, in order, one lesson per sitting**, where each lesson leaves you able to *say*
something new and understanding *why* German says it that way.

This project builds that course as a website, designed like an illuminated Grimm-era
storybook, and later as iOS and Android apps from the same code.

**Target:** a static website (Astro, TypeScript) now; Capacitor-wrapped iOS and Android
apps later.

**Decisions already made (Kien, 2026-10-17):**

- Lessons are **one sitting** (15–25 minutes) with **one core idea** each. Extra depth
  goes in collapsible "Go deeper" sections. See ADR 0002.
- The course aims to be **complete**: A1 through C2, as many lessons as that takes. It
  never sends the reader elsewhere for a level. See ADR 0002.
- Explanations are in **English**, for a general reader.
- Each lesson has its **own scene**; no running story. See ADR 0003.
- **Web first, apps later with Capacitor.** See ADR 0004.
- **Medieval storybook look**, one design system reused everywhere. See ADR 0005.
- For now, build the structure, layout and design system, and only **lessons 1–2**.
  Later lessons are written one at a time.

The original plan was a 52-week CSV of chat-tutor prompts, kept in
`docs/source/german_A1-B2_52_weeks.csv`. Its grammar order and culture notes feed the
briefs; its week-sized units, 60–150 words a week and mock exams do not (ADR 0002).

---

## The one constraint that dictates the architecture

**Every lesson is written by an AI in a separate session that remembers nothing of the
others, and no tutor will ever correct the reader.**

That forces three things:

1. **What the reader already knows must live in files**, not in anyone's memory. The
   ledgers (known words, taught grammar) are *derived* from the lesson files, so they
   cannot drift out of date.
2. **The quality bar must be written down** (`docs/LESSON_GUIDE.md`) and checked by a
   script where it can be (`scripts/check-lessons.ts`): word budgets, grammar not yet
   taught, words introduced twice.
3. **Practice must check itself.** Every exercise has its answer behind a tap, and every
   "your turn" prompt has a model answer and a checklist.

## Riskiest assumption

**A lesson you only read can be genuinely good**: insightful, accurate, and enough to
make the reader able to use what it teaches. If a read-only lesson is boring or wrong,
the design system and the app don't matter. Phase 0 tests this with lessons 1–2.

---

## Architecture

```
src/content/curriculum/        what each lesson teaches (levels + briefs, YAML)
        │
        ▼
src/content/lessons/*.mdx  ──► src/lib/ledger.ts ──► known words / taught grammar up to lesson N
        │                              │
        │                              ├──► /words page (the reader's dictionary)
        │                              ├──► scripts/check-lessons.ts (fails the build)
        │                              └──► write-lesson skill (tells the author what the reader knows)
        ▼
Astro pages + components ──► static HTML in dist/ ──► website now, Capacitor apps later
        ▲
src/design/tokens.css + ornaments (the design system)
```

| Part | What it does for the reader |
|---|---|
| Curriculum briefs | Decide what each lesson teaches and what it must not teach yet |
| Lessons (MDX) | The reading itself, built from lesson components |
| Ledger | Makes sure every lesson builds on the ones before it |
| Design system | Makes every page feel like the same book |
| `progress.ts` | Remembers which lessons the reader has finished (this device only) |
| `speech.ts` | Reads German aloud |

## Data model

- **Level** (`src/content/curriculum/levels.yaml`): `id` (`a1-1`), `name` (`A1.1`),
  `title`, `canDo`, `status`. Levels run A1.1 → C2.2; adding one is adding an entry.
- **Brief** (`src/content/curriculum/briefs/<level>.yaml`): `id`, `number`, `title`,
  `canDo`, `scene`, `coreInsight`, `notYet`, `introducesGrammar`, `chunks`,
  `newWordBudget`, `soundSpotlight`, `cultureNote`, `traps`, `selfCheckIdeas`,
  `yourTurn`. Titles exist for planned lessons; full briefs are written a level at a time.
- **Lesson** (`src/content/lessons/<id>.mdx` frontmatter): `id`, `level`, `number`,
  `title`, `canDo`, `minutes`, `newWords[]` (`de`, `en`, `pos`, `article`, `plural`,
  `forms`), `recycles[]`, `grammar[]`.
- **Progress** (`localStorage`, one key): finished lesson ids and the last lesson opened.

## Key flows

1. **Reading a lesson.** Course map → lesson → read the scene (tap a line to hear it;
   tap to see the English) → the insight → self-check (tap to reveal) → your turn →
   "Turn the page". Reaching the end marks the lesson finished.
2. **Writing a lesson.** `/write-lesson a1-03` → the skill reads the guide, the brief
   and the ledgers → drafts → German accuracy pass → `npm run check` → build →
   screenshots → PR with rubric scores and anything unverified.

## Failure modes

| What fails | What the reader sees | What we do |
|---|---|---|
| Device has no German voice | Listen buttons | Say so once, in plain words; the text still works |
| `localStorage` blocked (private mode) | Progress not remembered | Reading works; progress silently starts fresh |
| A lesson uses a word never introduced | Nothing: the build fails first | `check-lessons.ts` names the lesson and the word |
| An article or plural is wrong | A wrong form, taught confidently | Accuracy pass per lesson; uncertain words flagged in the PR; native-speaker check when possible |

## Costs

| Cost | Size | Paid how often |
|---|---|---|
| Hosting a static site | Free tier (Cloudflare Pages, or GitHub Pages on this public repo) | Monthly, €0 |
| Apple Developer Program | ~US$99 | Yearly, from Phase 2, only with Kien's yes |
| Google Play developer account | ~US$25 | Once, from Phase 2, only with Kien's yes |
| Paid text-to-speech | Parked (ADR 0006) | Would be per character generated |
| Writing a lesson | One Claude session | Per lesson |

## Security and privacy

No accounts, no server, no secrets. Reading progress stays in the reader's own browser.
No analytics or third-party requests: fonts and scripts are self-hosted, which also keeps
the site within German/EU privacy expectations. Deploying and app store submissions need
an explicit yes.

---

## Phases

See `ROADMAP.md`. Phase 0 builds the "book" (design, structure, two lessons) because the
riskiest assumption is about lesson quality, and a lesson can only be judged properly in
the form a reader will meet it. The apps come after the website has real lessons worth
packaging.

## Open questions

- **Does Capacitor's local server resolve `/course/` to `/course/index.html`?** If not,
  switch Astro to `build.format: 'file'`. Answer in Phase 2. (Kien/assistant)
- **Who can check German accuracy natively?** A native speaker reviewing lessons 1–2
  would calibrate the accuracy pass. (Kien)
