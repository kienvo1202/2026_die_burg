# How this project is built

Written down so there is something to follow on days when thinking about *how* to work is
more effort than doing the work.

This is a **solo** project, built with an AI assistant. Most visible software process is
team-coordination machinery (standups, sprints, estimates, approval gates), which costs
real time here and buys nothing. What is kept below is the subset that pays for one
person, and nearly all of it aims at the same target: **arguing with your future self**,
who will not remember why any of this is the way it is.

If a second person joins, revisit "What this project deliberately does not do" at the
bottom first. Most of those omissions exist only because there is one person.

---

## The outer loop — per phase

This is the product loop, and it has the same shape as an analysis: you are trying to
find out whether something is true, as cheaply as possible.

1. **Name the riskiest assumption.** Not the biggest feature: the thing that, if false,
   makes the rest pointless.
2. **Find the cheapest thing that tests it.** Usually not a feature. Often not even a UI.
3. **Build only that.** Resist building the thing you already know how to build.
4. **Look at the result honestly**, including the parts you would rather not have seen.
5. **Decide: continue, change, or kill.**

Write the exit criteria into `ROADMAP.md` **before** step 3. Afterwards, judging the
result is a check against something written down, not a mood.

### Feasibility is not value

A first phase usually tests *can it be built?* Passing that says nothing about *is it
worth using?* One earlier project built output that was accurate on every test, then on
first real use was judged only 20–30% better than doing without. Test value with a real
user (usually yourself), on real material, against criteria written in advance. See
`PRODUCT.md`.

---

## The inner loop — per change

1. **Capture.** Anything that surfaces mid-task goes straight into `BACKLOG.md`. Do not
   chase it now. This is the single highest-value solo habit: it is what lets you finish
   things.
2. **Pick one item**, and write its Definition of Done in one line before starting.
3. **Branch.**
4. **Write the test first, where the thing is testable.** Parsers, calculations, rules
   and matchers are. Layout and "does this feel right" are not. Don't write a fake test
   for the second kind to keep a rule; verify those by looking.
5. **Implement** until it passes.
6. **Verify end to end** in the real app, not only in the unit test.
7. **Open a PR and read your own diff.**
8. **Write an ADR if it was a decision.**
9. **Update `CHANGELOG.md`**, and `JOURNAL.md` if you learned something.

### Why a PR, when there is no reviewer

Because **a diff reads differently from an editor**. In the editor you see the code you
meant to write; in a diff you see the code you actually wrote, stripped of context, next
to what it replaced. Debris shows up: a stray debug print, a rename applied in four
places out of five, a comment that is now a lie.

It costs about two minutes. It is also the loop used everywhere in industry, which is
most of what makes it worth learning.

### Definition of Done

- [ ] The stated behaviour works, checked end to end and not only in a unit test
- [ ] Tests pass and types/build check (commands in `CLAUDE.md`)
- [ ] New behaviour that *can* be tested, is
- [ ] Failure modes are handled explicitly: no silent `catch {}`, no guessing
- [ ] Own diff read
- [ ] Docs updated: ADR if a decision, CHANGELOG always, JOURNAL if something was learned

---

## Working with an AI assistant

The assistant writes most of the code. You own the decisions, the verification, and the
memory of why. These habits keep it that way.

**Before a change**
- Point it at the relevant docs: "read ROADMAP Now, BACKLOG item X, and ADR 0007 first."
  It will otherwise guess, and its guesses lean toward more structure than you need.
- For anything bigger than a small fix, ask for a short plan first and read it. Cheap to
  change a plan; expensive to change a diff.
- Say which kind of answer you want. "Just explain, don't edit" and "do it" are both
  fine; an unstated one gets you whichever the model guesses.

**During**
- One change per branch. If it drifts, have it put the drift in the backlog.
- The assistant must ask before spending money, touching live systems, or doing anything
  hard to undo (rules in `CLAUDE.md`). An approved plan is not approval to spend.

**After**
- **Read the diff yourself**, then ask it to read the diff as a reader would:
  - "Read your diff as someone who knows only the basics of TypeScript. List every
    line they'd need to look up."
  - "For each new function, class or interface, list its callers. Inline any with one
    caller unless it's pure and tested."
  - "What did you not verify?"
- Ask for evidence, not reassurance: the test output, a screenshot, the log.
- When it gets something wrong in a way that will recur, add a line to `CLAUDE.md`
  (a rule or a trap) so the next session doesn't repeat it.

**When the conversation is for thinking, not building**
Say so up front. Some of the best sessions produce no code: a product question, a
review of the approach, a comparison of options. Their output goes into `PRODUCT.md`,
an ADR, or the journal.

---

## Commands

```bash
git checkout main && git pull                 # start from current main
git checkout -b fix/order-size-rounding       # branch

# ... work ...

npm test
npm run check && npm run build

git add -p                                    # stage in reviewable pieces
git commit                                    # message: see Naming below
git push -u origin fix/order-size-rounding
# open the PR, read the diff, wait for CI, squash-merge

git checkout main && git pull && git branch -d fix/order-size-rounding
```

`git add -p` walks through each change and asks whether to stage it. It is the cheapest
possible code review and it happens before the commit exists.

---

## Naming

**Branches:** `feat/…`, `fix/…`, `docs/…`, `chore/…`, `refactor/…`, `test/…`: the same
prefixes as commits, so a branch announces its own kind of risk.

**Commits** follow [Conventional Commits](https://www.conventionalcommits.org/):

```
fix: round order size down to the instrument's lot step

A 0.137-lot order was rejected because the broker only accepts multiples of
0.01. Rounding down rather than to nearest keeps the order inside the risk
limit that produced the size.

Closes #12
```

**The body says why, not what.** The diff already shows what. In six months the only
question you will have is why, and the diff cannot answer it.

Squash-merge PRs so `main` stays linear and each commit on it is one complete change.

---

## When to write an ADR

The test: **would future-me ask "why on earth is it like this?"**

Write one when a choice is not recoverable from the code: when the reason lives in a
constraint, a cost, or an alternative you rejected. Don't write one for things the code
already explains.

Reversing an earlier decision **always** deserves one, and the superseded record stays
exactly as written. See `docs/adr/README.md`.

---

## Testing, honestly

Test the things where being wrong is silent:

- **Parsers, matchers, calculations and rules.** They fail by producing plausible wrong
  answers, which is the worst kind of failure.
- **Anything with an index, an offset, a rounding step or a time zone.** Off-by-one and
  off-by-an-hour errors don't announce themselves.
- **Money.** Every path that computes a price, a size, a fee or a balance.
- **Anything that must refuse.** Returning "no answer" for a bad input matters as much
  as the right answer for a good one, because a confident wrong answer is trusted.

Do not chase a coverage number. Coverage measures which lines ran, not whether they were
correct, and optimising for it produces tests that assert nothing.

---

## CI

`.github/workflows/ci.yml` runs on every push and PR, and runs the **same commands** as
`CLAUDE.md` lists for local use. Types and warnings are checked in CI because otherwise
they are only checked while a file happens to be open in an editor, so they can quietly
stop being true.

**Keep runtime versions matched** between local and CI. It removes a whole class of
"works on my machine".

**Test your CI when you change it.** Push a deliberate error, confirm the build goes red,
then remove it. An untested pipeline produces a green tick that means nothing, which is
strictly worse than no pipeline, because you will trust it.

---

## What this project deliberately does not do

Recorded so the omissions read as decisions rather than oversights.

| Not doing | Why |
|---|---|
| Estimates, story points, velocity | Forecasting tools for people who must coordinate with other people. There is one person. |
| Sprints, standups, retros | Same. The retro function is served by `JOURNAL.md`. |
| Approval gates on PRs | Nobody else to approve. Self-review is the useful part; a required approval from yourself is theatre. |
| Coverage targets | Measures which lines ran, not whether they were right. |
| Release tags / semver | Nothing consumes this as a dependency. Phases are the unit. Revisit when the apps ship (Phase 2): stores need version numbers. |
| Issue templates, milestones | `BACKLOG.md` is one file and can be edited in three seconds. |

Revisit any of these the moment a second person joins: most of them exist for that case.
