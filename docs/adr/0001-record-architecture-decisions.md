# 0001 — Record architecture decisions

**Status:** Accepted
**Date:** {{YYYY-MM-DD}}

## Context

This is a solo project built largely with an AI assistant. Two kinds of forgetting are
expected:

- **The owner forgets** why a choice was made, months later, and either re-argues it or
  undoes it without knowing what it protected.
- **The assistant never knew.** Each session starts without memory of earlier ones. Left
  to itself it proposes the obvious design, including ones already tried and rejected.

The code shows what was built. It cannot show the alternatives that lost, the constraint
that forced the choice, or the measurement that decided it.

## Decision

**Every decision that isn't recoverable from the code gets a short record in
`docs/adr/`**, in the format described in `docs/adr/README.md`. `CLAUDE.md` tells the
assistant to read them before proposing architecture, and lists the decisions it is
most likely to propose again.

## Alternatives rejected

- **Code comments only.** Good for a decision local to one function; useless for one that
  spans the project, or for an alternative that left no code behind.
- **A single design document.** It gets rewritten as the design changes, which erases the
  history of what was tried. `PLAN.md` exists for the design; ADRs record the steps.
- **Nothing.** Cheapest today; most expensive the first time a rejected idea is rebuilt.

## Consequences

- A few minutes per decision.
- Reversals become visible and teachable, instead of silent.
- The assistant gets the project's history in a form it reads in seconds.

## Revisit if

The records stop being read, which shows as the same rejected idea being proposed twice.
Then the fix is a shorter list in `CLAUDE.md`, not fewer records.
