# {{PROJECT_NAME}} — build plan

<!-- TEMPLATE: Written before code, read rarely after. When the goal or design moves,
don't rewrite the original: add a dated note at the point it changed, as in the "goal
moved" box below. The original brief is part of the record of why things are the way
they are. Delete sections that don't apply; a script needs far less than an app. -->

## Context

{{Who has what problem, today, without this. Concrete: a real person, a real situation.
One or two paragraphs.}}

{{What this project builds, in one paragraph.}}

**Target:** {{platform, e.g. ".NET 9 console service on a Windows VPS", "iOS 18 app",
"Chrome extension"}}.

**Decisions already made:** {{list anything settled before planning, with who settled it}}.

> *(example of a dated note)* **The goal moved ({{YYYY-MM-DD}}).** The first real use did
> what this section asked for, and was judged only marginally better than doing without.
> The goal is now {{...}}. See ADR {{NNNN}}. The text above is kept as the original brief.

---

## The one constraint that dictates the architecture

<!-- TEMPLATE: Most projects have one fact that shapes everything else: a platform rule,
a cost, a latency limit, a data size. Name it first; the architecture should read as a
consequence of it. Examples: "MV3 extensions cannot load remote code", "the broker API
allows 10 requests a second", "the whole book fits in the model's context". -->

{{The constraint, and what it forces.}}

## Riskiest assumption

{{The thing that, if false, makes the rest pointless. This becomes Phase 0.}}

---

## Architecture

{{Components and how data flows between them. A short list or a diagram. Name each
component by what it does for the user, not by pattern.}}

```
{{input}} → {{step}} → {{step}} → {{output}}
```

## Data model

{{The main records, their fields, and where they live. Plain shapes, no classes yet.}}

## Key flows

1. {{What happens when the user does the main thing, step by step.}}

## Failure modes

| What fails | What the user sees | What we do |
|---|---|---|
| {{network down}} | {{...}} | {{...}} |
| {{bad input}} | {{...}} | {{refuse, don't guess}} |

## Costs

<!-- TEMPLATE: Money, time, or both. Say how often each cost is paid: once at setup,
per use, per month. A cost is meaningless until you know how often it is paid. -->

| Cost | Size | Paid how often |
|---|---|---|
| {{...}} | {{...}} | {{...}} |

## Security and privacy

{{Secrets: where they live, who can read them. Private data: where it is stored, what
must never be logged or committed. Live systems: what needs an explicit yes.}}

---

## Phases

See `ROADMAP.md`. This section only records why the phases are in that order.

## Open questions

- {{Questions to answer before or during Phase 0, with who decides.}}
