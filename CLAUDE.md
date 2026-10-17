# Die Burg

A guided German course you read, one lesson at a time, from A1 towards C2. Each lesson
is a short scene plus one real insight into how German works, so readers pick up usable
German (words, chunks, grammar) without wading through rule tables. It is a static
website now, styled as an illuminated Grimm-era storybook, and will be packaged as iOS
and Android apps later with Capacitor.

Kien owns this project and is using it to learn engineering practice. Explain the *why*
behind conventions rather than just applying them, and prefer the simplest thing that
genuinely works over the most idiomatic.

## Where things are

| | |
|---|---|
| `docs/ROADMAP.md` | Where the project is. Phases, exit criteria, Now/Next/Later |
| `docs/BACKLOG.md` | What's next, task level |
| `docs/PLAN.md` | Full design: architecture, constraints, costs |
| `docs/PRODUCT.md` | **What the reader gets.** Reader needs and how value is tested |
| `docs/LESSON_GUIDE.md` | **How a lesson is written.** Voice, layout, rubric |
| `docs/DESIGN_SYSTEM.md` | **How it looks.** Tokens, fonts, components, rules |
| `docs/WORKFLOW.md` | How changes get made here, and what we deliberately skip |
| `docs/CODE_STYLE.md` | How code should read. TypeScript rules in `docs/style/` |
| `docs/adr/` | **Why.** Decision records |
| `docs/JOURNAL.md` | What was tried and what broke, dead ends included |
| `docs/source/` | The original 52-week lesson plan (CSV). Kept unchanged as the first brief |
| `src/content/curriculum/` | Levels and per-lesson briefs: *what* each lesson teaches |
| `src/content/lessons/` | The lessons themselves (MDX): *how* it is taught |
| `src/design/` | Design tokens and ornaments. The only place colours and fonts are defined |

Some of these arrive during Phase 0; see `docs/ROADMAP.md`.

## Read the ADRs before proposing architecture

Decisions recorded so far are indexed in `docs/adr/README.md`. Proposing a rejected one
again wastes everyone's time; if you think one should be reopened, say which ADR and
what new fact changes it. The ones most likely to be re-proposed:

- **React Native / Expo for the apps**: rejected in ADR 0004. The apps wrap this site
  with Capacitor.
- **A running story across lessons**: rejected in ADR 0003. Each lesson has its own scene.
- **Paid text-to-speech**: parked in ADR 0006. It costs money; ask first.

## Conventions

- Code reads for people from any background: see `docs/CODE_STYLE.md` and
  `docs/style/typescript-javascript.md`. Model file to imitate: `src/lib/ledger.ts`
- TypeScript `strict`; `npm run check` (types + lesson checker) must pass
- No new npm package without a line in the PR saying why the platform can't do it
- **Colours, fonts, sizes and spacing only through the tokens** in
  `src/design/tokens.css`. A test fails on hex colours or font names anywhere else
- Conventional Commits, with the body saying **why**; the diff already shows what
- Branch → PR → read your own diff → squash-merge. See `docs/WORKFLOW.md`
- Node 22 (≥ 22.22) locally and in CI; `.nvmrc` holds the version

## Commands

```bash
npm run dev              # dev server on http://127.0.0.1:4321
npm test                 # every test: node --test over src/ and scripts/ (a glob)
npm run check            # types (astro check) + lesson checker
npm run build            # static site into dist/
npm run preview          # serve dist/ on http://127.0.0.1:4321
node scripts/ledger-report.ts a1-03   # what the reader knows before lesson a1-03
```

No formatter yet: match the surrounding code.

## Writing lessons

Use the `write-lesson` skill (`/write-lesson a1-03`, in `.claude/skills/write-lesson/`).
It reads `docs/LESSON_GUIDE.md`, the lesson's brief and the ledger of what the reader
already knows, then runs two German accuracy passes. Never write a lesson without its
brief: the brief is where the curriculum decides what the lesson teaches and, as
importantly, what it must not teach yet. Kien reviews new briefs before lessons are
written from them.

## Talking with Kien

Be a thinking partner, not an order-taker, and a quiet one.

- **Think before agreeing.** If you see a better approach, a missed reader need, or a
  conflict with an ADR, say so in a line before starting, then follow Kien's call.
  Ideas not taken go to `BACKLOG.md`.
- **Ask only what would change the result** and the docs and code can't answer: all at
  once, each with a recommended option. Otherwise decide, and list your assumptions at
  the end.
- **Speak up when the plan stops being right**, mid-task, instead of working around it.

## Rules for the assistant

These came from real mistakes. Each one cost something once.

- **Never spend money without an explicit yes in this conversation.** Paid API calls,
  paid text-to-speech, hosting plans, developer accounts, anything billed. An approved
  plan that lists a paid step is *not* approval to run it.
- **Never act on a live system without an explicit yes**: deploying the site, app store
  submissions, changing repository settings, real readers' data.
- **Never modify `kienvo1202/2026_project_template`.** This repo was copied from it; the
  template stays untouched, settings included.
- **German accuracy: never invent an article, plural or verb form.** If unsure, say so
  in the lesson PR and flag the word. A confident wrong article teaches a mistake that
  takes months to unlearn.
- **Don't start long-running processes detached** (`&`, `nohup`, `Start-Process`). They
  outlive the session, hold the port, and can't be stopped from the owner's terminal.
  Use the preview tool, or ask Kien to run it.
- **Ask before anything hard to undo**: force-push, deleting branches or files, rewriting
  history.
- **Write the plain version first.** Add structure when a second real use appears.
- **Verify with evidence**, not by reasoning: run the test, look at the screen, read the
  log. Say plainly what was and wasn't checked.
- **Mid-task discoveries go into `docs/BACKLOG.md`**, not into the current change.

## Traps already paid for

- **A local dev server can expose secrets to the whole network.** Many servers listen on
  every interface by default, and the OS firewall often lets them through. Astro's dev
  and preview servers here are pinned to `127.0.0.1` in `astro.config.mjs`; keep it so
- **Ignore secrets before they exist.** `.env` goes in `.gitignore` in the first commit,
  before anyone creates the file. A secret in git history stays there after you delete it
- **A CI step that has never failed proves nothing.** When adding or changing CI, push a
  deliberate error, see red, then remove it
- **A test command that names one file** silently skips every test file added later. Use
  a glob or the runner's discovery
- **Git can corrupt binaries on Windows** by guessing they're text and rewriting line
  endings (`core.autocrlf`). `.gitattributes` marks binary types explicitly
- **Windows PowerShell 5.1 mangles quotes** when passing a here-string to a native
  program (`git commit -F -`). Write multi-line text to a file, then pass the path
- **Git Bash cannot run Windows Store alias stubs** like `py`. Use PowerShell for those
- **`gh repo create --template` needs the source repo marked as a template.** Otherwise
  create an empty repo and push a clone, switching `origin` *before* pushing
- **Loading Google Fonts from Google's servers got a German website fined** (LG München,
  2022). Fonts here are self-hosted through `@fontsource` packages, which also makes the
  app work offline
- **Android's WebView has no reliable speech synthesis.** All audio goes through
  `speak()` in `src/lib/speech.ts`, so the app can swap in a native plugin in one place
- **Astro styles and whitespace.** A class passed to a child component is only styled
  because `scopedStyleStrategy: "class"`; whitespace survives because `compressHTML: false`
  (compression ate the space in "and <em>name</em>"). And anything after the last element
  of an inline component (even a newline) renders as a space: `Listen.astro` ends on its
  `</button>`
- **In MDX, a component's children arrive wrapped in `<p>`** when written on their own
  lines. Never wrap a slot in `<p>` (`Initial.astro` uses a `<div>`)
- **YAML list items containing `: ` or starting with a quote must be quoted whole**
  (`- 'which rhymes with "eye": Sie or heißen?'`). The checker names the file if not

## Current state

Phase 0: building the book (design system, app shell, lessons 1–2). **Next:** see
`docs/ROADMAP.md` → Now.
