# What the user gets, and how we know it's worth it

This is the reference that user-facing features are built against. When a new idea comes
up ("a dashboard!", "alerts!"), it is placed and judged here **before** any code is
written.

<!-- TEMPLATE: Delete this file for a library or an internal script with no user beyond
you. Keep it for anything someone uses. -->

## Why this file exists

In an earlier project, the first real output was accurate on every test and judged only
**20–30% better** than doing without. Every feature built up to then served one user need,
and getting better at that one need could not get much past that. The fix was to name all
the needs, check which ones the product served, and aim at the rest on purpose.

Feasibility ("it works") and value ("it's worth using") are different questions. This
file is where value is decided.

---

## 1. User needs

The questions a user has while using the product. Anything the product shows should
answer one of them. If it doesn't, it's decoration.

| Need | The user's question | Examples |
|---|---|---|
| {{Orientation}} | {{Where am I? What's going on?}} | {{...}} |
| {{Understanding}} | {{What does this mean?}} | {{...}} |
| {{Decision}} | {{What should I do now?}} | {{...}} |
| {{Confidence}} | {{Can I trust this?}} | {{...}} |
| {{...}} | {{...}} | {{...}} |

*(example, trading tool)* Orientation: "what is my exposure right now?" · Decision:
"should I take this signal?" · Confidence: "how has this setup done historically, after
costs?" · Control: "how do I stop everything, now?"

After the first real use, mark which needs the product actually serves. The gap is the
roadmap.

## 2. Surfaces

Where help appears, at what scale, and when.

| Surface | Scale | When |
|---|---|---|
| {{...}} | {{...}} | {{...}} |

## 3. Modes or presets (if users differ)

<!-- TEMPLATE: If different kinds of input or user need different behaviour (book types,
asset classes, account sizes), list them here with what changes for each. -->

## 4. The method: sample by hand, then build

Building is the expensive way to find out whether something is worth having. In order:

1. **Make samples by hand.** Write, mock or compute what the feature would produce, for
   two or three real cases. No code.
2. **Use them for real.** Read them in context, act on them, as a user would.
3. **Score them** against criteria written before step 1. For example: "at least 2 of 3
   items worth reading", "none wrong when checked", "under 30 words each".
4. **Then build the logic** (the prompt, the model, the calculation) to match the samples
   that scored well.
5. **Then build the UI.** Last, because it's the most expensive to change.

Write each score, and the verdict, in `JOURNAL.md`. A feature that fails here is a
cheap failure.

## 5. Judging a new idea

Before an idea goes in the backlog, answer here in two lines:
- Which need does it serve, and on which surface?
- How would we test it by hand first?

If neither has an answer, it goes under Someday in the backlog, not into a phase.
