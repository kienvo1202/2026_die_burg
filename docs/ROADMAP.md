# Roadmap

**Phases only.** Individual tasks live in [BACKLOG.md](BACKLOG.md); what already shipped
is in [CHANGELOG.md](../CHANGELOG.md); why things are built this way is in
[adr/](adr/README.md). This file exists so there is one place to see where the project is.

No dates. Dated roadmaps on uncertain work turn into commitments you cannot keep, and
<!-- TEMPLATE: if there IS a real deadline, say so here and date only what it forces. -->
this project has no deadline, so any date here would be fiction. **Now / Next / Later**
instead.

`✔` done · `◐` in progress or partially done · `○` not started · `⛔` blocked

---

## Status

<!-- TEMPLATE: Phase 0 always tests the riskiest assumption, the thing that makes
everything else pointless if it is false. It is usually not a feature and often has no
UI. Exit criteria are written BEFORE the work, so closing a phase is a check, not a
mood. -->

| Phase | Delivers | Exit criteria | Status |
|---|---|---|---|
| **0 — {{riskiest assumption}}** | {{the cheapest thing that tests it}} | {{2–4 checkable criteria, written now}} | ○ |
| **1 — {{core loop}}** | {{smallest end-to-end version a real user could use}} | {{criteria}} | ○ |
| **2 — {{next}}** | {{...}} | {{...}} | ○ |

*(example)* A trading project's Phase 0 might be *"the signal has an edge after costs"*:
a backtest script over two years of data, no UI and no broker connection, with exit
criteria like "positive expectancy after spread and commission on out-of-sample data".

When a phase closes, write one paragraph under the table: which criteria were met, how,
and the **known limitations carried forward** (each one also in the backlog).

---

## Now

{{One paragraph: what is being worked on and why it is the most important thing.}}

## Next

1. {{...}}
2. {{...}}

## Later

{{Later phases and the Someday list in the backlog. Deliberately unordered: sequencing
them before the current phase has met reality would be guessing.}}

---

## Keeping this honest

Three rules, all of which exist because roadmap documents usually rot:

1. **Phases only.** The moment individual tasks appear here, there are two task lists and
   they will disagree within a fortnight.
2. **Update it when a phase changes state**, roughly every few weeks, not per commit. If
   it needs updating more often than that, the granularity is wrong.
3. **Never mark something done to feel good.** `◐` with a stated reason is more useful
   than `✔` that is not true.

A phase can also end in **change** or **kill**. Writing "Phase 1 showed X; direction
changed, see ADR NNNN" is a success of the process, not a failure of the project.

### When the GitHub repo exists

This table can stop being hand-maintained. The industry pattern is one source of truth
with generated views:

| This file | Becomes |
|---|---|
| Phase rows | **Milestones** |
| Backlog items | **Issues**, assigned to a milestone |
| Status column | The milestone progress bar: computed, never typed |
| Now / Next / Later | A **GitHub Projects** board with those three columns |

Closing an issue from a PR body (`Closes #12`) then moves the board and advances the
milestone automatically: **status becomes a by-product of doing the work** rather than a
separate chore. This file then keeps only the phase table and the Now/Next/Later prose.
