# Backlog

Somewhere to put things so they stop occupying your head. **Capture first, decide
later**: anything that surfaces mid-task lands here rather than derailing the task.

Phase-level status lives in [ROADMAP.md](ROADMAP.md), not here. This file is tasks only;
keeping the two at different granularities is what stops them contradicting each other.

Format: `- [ ] description` with `[blocked: reason]` where relevant. No priorities, no
estimates, no points. When something is done it moves to `CHANGELOG.md` and is deleted
from here (or ticked `[x]` until the phase closes, if seeing progress helps).

A good item says **what** and **why**, and where it came from if that matters:

- [ ] *(example)* **Round order size to the instrument's lot step.** A 0.137-lot order
      was rejected by the broker on 2026-10-02; we pass the raw computed size
- [ ] *(example)* Settings screen loses a typed value on Esc `[blocked: decide whether
      Esc means cancel]`

---

## Phase {{N}} — {{name}}

- [ ] {{...}}

## Parked

<!-- TEMPLATE: Things deliberately deferred. Each group links the ADR that parked it and
names what would reopen it. A deferral that names its reopen condition is a decision;
one that doesn't is just something nobody got round to. -->

## Someday

<!-- TEMPLATE: Ideas with no phase yet. No commitment implied. -->
