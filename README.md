# Project template

A starting kit for a solo project built with an AI coding assistant. It holds the working
process and documentation style from *Reading Companion* (2026), with everything specific
to that project taken out, so the same habits carry over to a C# trading system, a .NET
app, an iOS app, a browser extension or a data tool.

None of this is code. It is the **paperwork that makes code easy to come back to**:
where the project is, what is next, why things are the way they are, how changes are
made, and how the code should read.

---

## What's in the box

| File | Answers | Update when |
|---|---|---|
| `CLAUDE.md` | What the AI must know before touching anything | A convention, command or trap changes |
| `docs/ROADMAP.md` | Where is the project? | A phase changes state (every few weeks) |
| `docs/BACKLOG.md` | What's next, task by task? | Constantly. Capture first, decide later |
| `docs/PLAN.md` | What is the design, and why that shape? | Rarely. Add dated notes; don't rewrite |
| `docs/PRODUCT.md` | What does the user actually get, and is it worth it? | Before building any user-facing feature |
| `docs/WORKFLOW.md` | How does a change get made here? | When the process itself changes |
| `docs/CODE_STYLE.md` | How should the code read? | When a review keeps finding the same thing |
| `docs/style/*.md` | Language-specific rules and allowed idioms | Same |
| `docs/adr/` | Why is it like this? | Whenever a decision isn't obvious from the code |
| `docs/JOURNAL.md` | What was tried, what broke, what was learned | When something surprised you |
| `CHANGELOG.md` | What changed, in plain words | Every merged change |
| `.github/` | PR template and CI | When the build or test commands change |
| `.gitignore`, `.gitattributes`, `.env.example` | Keep secrets and junk out; keep line endings stable | At setup, then rarely |

`docs/style/examples/code-for-every-reader.html` is the illustrated version of the code
style guide: sixteen side-by-side comparisons. Open it in a browser.

---

## Starting a new project

1. **Copy this folder** and rename it (`D:\2027_my_project`). Or, once it is on GitHub,
   mark the repo as a *template repository* and use "Use this template".
2. **Delete what doesn't apply.** `docs/style/` keeps only your language. `PRODUCT.md`
   can go for a pure library or a script. Delete the commented-out stacks in
   `.gitignore` and `ci.yml` you don't use.
3. **Fill in the placeholders.** Search for `{{` (values to fill) and `TEMPLATE:`
   (guidance to read and delete):

   ```bash
   grep -rn "{{\|TEMPLATE:" .
   ```

4. **Write `docs/PLAN.md` before any code.** At least: the context, the one constraint
   that shapes the architecture, and the riskiest assumption.
5. **Write Phase 0 into `docs/ROADMAP.md`** with exit criteria written *now*, before the
   work. Phase 0 tests the riskiest assumption as cheaply as possible.
6. **Write ADR 0002 onward** for the decisions you made while planning. 0001 is already
   there: it records the decision to keep ADRs.
7. **`git init`, then commit the docs alone** as the first commit. The `.gitignore`
   must be in place before you create `.env`.
8. **Push a deliberate failure** to CI once, check it goes red, then remove it. A CI that
   has never failed proves nothing.
9. Start the inner loop in `docs/WORKFLOW.md`.

---

## Conventions used in these files

- `{{LIKE_THIS}}`: a value to fill in
- `<!-- TEMPLATE: ... -->`: guidance for you. Invisible when rendered, but the AI reads
  it, so delete it once acted on
- Examples marked *(example)* show the style. Replace them with your own

---

## Adapting to the kind of project

The process is the same everywhere. What changes is what to test hardest, what CI runs,
and which extra "never" rules the AI gets.

| Project | Test hardest | CI runs | Extra rules for the AI |
|---|---|---|---|
| **Trading (C#, MQL, Python)** | Order sizing, rounding to tick size, P&L, time zones, anything with money | build with warnings as errors, unit tests, a fixed backtest whose result must not change | Never connect to a live account or place an order without an explicit yes. Money is `decimal`, never `double`. Every timestamp is UTC |
| **.NET app / API** | Parsing, validation, mapping between layers, auth rules | `dotnet build -warnaserror`, `dotnet test`, `dotnet format --verify-no-changes` | No interface without a second implementation or a test that needs it |
| **iOS app** | View-model logic, date and currency formatting, persistence migrations | `xcodebuild test` on a simulator (macOS runners cost about 10× the minutes on private repos) | Secrets in the Keychain, never `UserDefaults`. No `!` force-unwrap without a comment |
| **Browser extension / web** | Parsers, anything with an index or offset, message passing | type check, unit tests | Dev server binds `127.0.0.1` only |
| **Data / ML tool** | Joins, filters, unit conversions, the numbers in the final table | lint, type check, tests on a small fixture dataset | Never print or commit real customer data. Raw data folders are gitignored |

---

## Keeping the template alive

When a project teaches you something that would have helped from day one (a trap, a
rule, a better template section), copy it back here. The traps list in `CLAUDE.md` and
the "Why" lines in `WORKFLOW.md` came from exactly that: each one was paid for once.
