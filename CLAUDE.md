# {{PROJECT_NAME}}

<!-- TEMPLATE: Two or three sentences. What it does for the user, then what it is
technically. Example: "Adds the scaffolding a textbook has and a paperback doesn't,
generated as you read. A Chrome/Edge MV3 extension wrapping its own PDF.js viewer." -->
{{ONE_PARAGRAPH_DESCRIPTION}}

<!-- TEMPLATE: Optional learning-mode paragraph. Keep it if the project is also a way to
learn engineering practice; delete it otherwise. -->
{{OWNER}} is {{BACKGROUND, e.g. "a data analyst, not a software engineer"}}, and is using
this project to learn engineering practice. Explain the *why* behind conventions rather
than just applying them, and prefer the simplest thing that genuinely works over the most
idiomatic.

## Where things are

| | |
|---|---|
| `docs/ROADMAP.md` | Where the project is. Phases, exit criteria, Now/Next/Later |
| `docs/BACKLOG.md` | What's next, task level |
| `docs/PLAN.md` | Full design: architecture, constraints, costs |
| `docs/PRODUCT.md` | **What the user gets.** User needs and how value is tested |
| `docs/WORKFLOW.md` | How changes get made here, and what we deliberately skip |
| `docs/CODE_STYLE.md` | How code should read. Language rules in `docs/style/` |
| `docs/adr/` | **Why.** Decision records |
| `docs/JOURNAL.md` | What was tried and what broke, dead ends included |

## Read the ADRs before proposing architecture

<!-- TEMPLATE: As decisions accumulate, list the ones an AI is most likely to propose
again. Reversed decisions matter most. One line each, with the ADR number. Example:
- A bundler or UI framework: rejected, ADR 0002
- Batching the whole job up front: reversed, ADR 0011 -> 0016 -->
Decisions recorded so far are indexed in `docs/adr/README.md`. Proposing a rejected one
again wastes everyone's time; if you think one should be reopened, say which ADR and
what new fact changes it.

## Conventions

<!-- TEMPLATE: Keep this short and checkable. Each line is something a reviewer could
point at. Delete lines that don't apply. -->
- Code reads for people from any background: see `docs/CODE_STYLE.md` and
  `docs/style/{{LANGUAGE}}.md`. Model file to imitate: `{{PATH_TO_A_CLEAN_FILE}}`
- {{TYPE_CHECKING_RULE, e.g. "Nullable reference types on; warnings are errors"}}
- {{DEPENDENCY_RULE, e.g. "No new package without an ADR"}}
- Conventional Commits, with the body saying **why**; the diff already shows what
- Branch → PR → read your own diff → squash-merge. See `docs/WORKFLOW.md`
- {{RUNTIME_VERSION_RULE, e.g. ".NET 9 locally and in CI"}}

## Commands

```bash
{{RUN_COMMAND}}          # run the app / harness
{{TEST_COMMAND}}         # every test
{{TYPECHECK_OR_BUILD}}   # types / warnings as errors
{{FORMAT_CHECK}}         # formatting, if any
```

<!-- TEMPLATE: Examples by stack.
.NET:    dotnet run --project src/App | dotnet test | dotnet build -warnaserror | dotnet format --verify-no-changes
iOS:     xcodebuild test -scheme App -destination 'platform=iOS Simulator,name=iPhone 16'
Python:  python -m app | pytest | pyright | ruff check && ruff format --check
Node:    node serve.js | npm test | npx tsc --noEmit
MQL:     compile in MetaEditor; backtest in Strategy Tester with a saved .set file -->

## Talking with {{OWNER}}

Be a thinking partner, not an order-taker, and a quiet one.

- **Think before agreeing.** If you see a better approach, a missed user need, or a
  conflict with an ADR, say so in a line before starting, then follow {{OWNER}}'s call.
  Ideas not taken go to `BACKLOG.md`.
- **Ask only what would change the result** and the docs and code can't answer: all at
  once, each with a recommended option. Otherwise decide, and list your assumptions at
  the end.
- **Speak up when the plan stops being right**, mid-task, instead of working around it.

## Rules for the assistant

These came from real mistakes. Each one cost something once.

- **Never spend money without an explicit yes in this conversation.** Paid API calls,
  cloud resources, live trading orders, anything billed. An approved plan that lists a
  paid step is *not* approval to run it. Use dry runs, fakes and test accounts; when a
  real call would help, say what it tests and what it costs, then wait.
- **Never act on a live system without an explicit yes**: production databases, live
  broker accounts, app store submissions, real users' data.
- **Don't start long-running processes detached** (`&`, `nohup`, `Start-Process`). They
  outlive the session, hold the port, and can't be stopped from the owner's terminal.
  Use the preview tool, or ask {{OWNER}} to run it.
- **Ask before anything hard to undo**: force-push, deleting branches or files, rewriting
  history, schema migrations against shared data.
- **Write the plain version first.** Add structure when a second real use appears.
- **Verify with evidence**, not by reasoning: run the test, look at the screen, read the
  log. Say plainly what was and wasn't checked.
- **Mid-task discoveries go into `docs/BACKLOG.md`**, not into the current change.

## Traps already paid for

<!-- TEMPLATE: The most valuable section over time. Each trap: the symptom, the cause,
and the rule. Starter set below came from earlier projects; keep the ones that apply to
this stack and delete the rest. -->

- **A local dev server can expose secrets to the whole network.** Many servers listen on
  every interface by default, and the OS firewall often lets them through. If the server
  sits next to `.env` or private data, anyone on the same Wi-Fi can read them. Bind
  `127.0.0.1`, refuse dot-paths, check the `Host` header, and keep a test that holds it
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
- {{PROJECT_SPECIFIC_TRAPS}}

## Current state

<!-- TEMPLATE: Short and dated. Which phase, what was last done, what is next, and
anything that needs the owner's yes. Rewrite this section rather than appending to it;
the history lives in CHANGELOG and JOURNAL. -->
Phase {{N}}: {{STATUS}}. **Next:** {{NEXT_STEP}}.
