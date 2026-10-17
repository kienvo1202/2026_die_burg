# How a lesson is written

The quality bar for every lesson in Die Burg. Lessons are written one at a time, often by
an AI in a fresh session (`/write-lesson a1-03`), so everything a writer needs to get a
lesson right is either here, in the lesson's brief, or in the ledger. If a rule keeps
being broken, it belongs in this file.

Why lessons look like this: ADR 0002 (one sitting, one idea) and ADR 0003 (standalone
scenes, derived ledgers). What the reader needs from a lesson: `docs/PRODUCT.md`.

---

## The reader

An English-speaking adult reading on a phone, in one sitting of 15–25 minutes, in order.
They are clever and busy. They have read every earlier lesson and nothing else: assume
they know exactly what the ledger says, no more. Nobody will correct them, so every
exercise must check itself.

## The voice

**A knowledgeable friend, not a textbook.** Someone who has lived in Germany, loves the
language, and explains it over coffee.

- Talk to the reader: "you", short paragraphs, plain words.
- Lead with the *use*, then the *why*. Grammar terms are optional, in brackets, after the
  plain explanation: "the verb's ending tells you who is doing it (*conjugation*)".
- Earn every sentence. If a paragraph wouldn't surprise or help someone, cut it.
- Be exact. "Usually", "in the north", "in speech" are fine; vague is not.
- Never condescend ("Don't worry, German is easy!") and never frighten ("the dreaded
  dative").

## The rules

1. **One idea per lesson.** One insight the reader should still remember next month.
   Everything else serves it or waits for another lesson.
2. **A need first, grammar second.** Start from something the reader wants to say. The
   grammar arrives as the answer to "how do I say this?".
3. **Chunk first, explain later.** Useful phrases can appear before their grammar is
   taught, as fixed chunks with a literal gloss ("Wie geht's?": *how goes it?*). Say
   which lesson will explain them, if the brief does.
4. **Real sentences only.** Every German sentence is something a real person would say in
   that situation. No "The pen of my aunt is on the table".
5. **Only what the reader knows, plus this lesson's words.** Every German word in the
   lesson is either in the ledger (earlier lessons), in this lesson's `newWords`, or part
   of a chunk. Proper names (Hamburg, Diego) are free.
6. **No grammar from the brief's `notYet` list**, except inside a chunk.
7. **Recycle on purpose.** Bring back 8–12 earlier words, favouring the least-seen ones
   (the ledger report lists them). List them in `recycles`.
8. **Every German line can be heard.** Use `Say`, `Line`, `Chunk` or `WordList`; they mark
   the text `lang="de"` and add a listen button. Never put German in plain prose.
9. **Explain with English.** The richest "aha" moments come from what English kept, lost
   or changed: *thou comest* / *du kommst*, *hight* / *heißen*, *night* / *Nacht*.
10. **Check yourself, always with an answer.** Every question has its answer behind a
    tap; every "your turn" task has a model answer and a checklist.

## Word budgets

| Level | New words per lesson |
|---|---|
| A1 | 20–26 |
| A2 | 24–30 |
| B1 | 28–35 |
| B2 and above | 30–40 |

The brief sets the exact budget (`newWordBudget`); `npm run check` enforces it. Fixed
greetings and set phrases count as one word each.

A word is declared once, in the lesson that introduces it, with everything a learner
needs to use it:

| Kind | Fields |
|---|---|
| Noun | `article` (der/die/das) and `plural` in dictionary style: `-e`, `¨-e`, `-en`, `-s`, `-` (no change), or `""` (no plural) |
| Verb | `forms`: the forms taught so far, e.g. `ich bin · du bist · Sie sind` |
| Phrase | the whole phrase as `de`, with punctuation: `Freut mich!` |

## The layout

Every lesson has the same sections in the same order, so a reader always knows where they
are. Section headings are Markdown `##` headings.

| # | Section | What goes in it | Components |
|---|---|---|---|
| 1 | Hook | 2–4 sentences: why this matters, in a real moment | `Initial` |
| 2 | Warm-up | 3–5 recall questions from earlier lessons (none in lesson 1) | `Check` |
| 3 | The scene | 6–16 lines of dialogue, with a place and a moment | `Dialogue`, `Line` |
| 4 | Phrases to keep | 2–4 chunks: literally / means | `Chunk` |
| 5 | The insight | 300–600 words, one idea, at most one small table | `Insight`, `Say`, `Deeper` |
| 6 | Sound (A1 only) | One pronunciation point, using this lesson's words | `Say` |
| 7 | New words | The lesson's `newWords` | `WordList` |
| 8 | How people really say it | Culture and register, ~150 words | `Say` |
| 9 | Watch out | 2–4 traps English speakers fall into | `Say` |
| 10 | Check yourself | 8–12 questions, mixed kinds | `Check` |
| 11 | Your turn | One task, a model answer, a checklist | `YourTurn` |
| 12 | Recap | 2–4 "now you can…" lines | `Recap` |

`Deeper` blocks hold optional depth anywhere (closed by default). Never put the lesson's
core idea in one.

### Skeleton

```mdx
---
title: "Hallo!"
canDo: "Greet someone and say your name"
minutes: 18
newWords:
  - { de: "Hallo!", en: "Hello! / Hi!", pos: phrase }
  - { de: "Frau", en: "Ms, Mrs; woman", pos: noun, article: die, plural: "-en" }
  - { de: "heißen", en: "to be called", pos: verb, forms: "ich heiße · du heißt · Sie heißen" }
recycles: []          # word keys from earlier lessons: "der morgen", "heißen"
grammar: [heissen-ich-du-sie]   # tags this lesson uses (taught earlier or by its brief)
---

<Initial>The hook…</Initial>

## The scene

<Dialogue title="Check-in" setting="A hostel in Hamburg, early evening">
  <Line who="Jonas" de="Moin! Willkommen!" en="Hi! Welcome!" />
</Dialogue>

## Phrases to keep

<Chunk de="Freut mich!" literal="(It) pleases me!" means="Nice to meet you!" />

## The insight

<Insight title="…">

Paragraphs in Markdown, with <Say de="Wie heißt du?" en="What's your name?" /> inline.

</Insight>

## New words

<WordList words={frontmatter.newWords} />

## Check yourself

<Check q="It's 9 a.m. What do you say?">

<Say de="Guten Morgen!" />

</Check>

## Your turn

<YourTurn model="Hallo! Ich heiße Sam." checklist={["Did you…?"]}>

The task…

</YourTurn>

<Recap canDo={["greet someone at any time of day"]} />
```

Markdown inside a component needs a blank line after the opening tag and before the
closing tag, or it is shown as plain text.

## Grammar tags

Each brief lists the grammar it `introducesGrammar`; each lesson lists the grammar it
uses in `grammar`. The checker fails a lesson that uses a tag neither its brief nor an
earlier lesson introduces. Tags are lower-case ASCII with hyphens, named for what the
reader learns: `sein-ich-du-sie`, `present-tense-endings`, `w-question-wo-woher`. Before
inventing a tag, check the ledger report: reuse an existing tag for the same thing.

## The German accuracy pass

A confident wrong article teaches a mistake that takes months to unlearn. Before a lesson
is done, check **every** German string, in this order:

1. **Every noun:** article and plural, against what you know with certainty. If not
   certain, don't use the word; or flag it in the PR as unverified.
2. **Every verb form:** person ending, stem changes (`du sprichst`), and the forms in
   `forms`.
3. **Every sentence:** word order (verb second in statements, first in yes/no questions,
   at the end after modals), case after prepositions, capital letters on nouns and `Sie`.
4. **Every chunk and culture claim:** is it what people actually say, in that region and
   register? Is every claim about history or etymology one you are sure of?
5. **Spelling:** ß vs ss (`heißen`, `Tschüss`), umlauts, typographic quotes.

Then a second, independent pass: someone (or a separate AI session) who did not write the
lesson checks the same list. Record what was verified, and anything left uncertain, in
the PR and in `docs/JOURNAL.md`.

## Boring versus insightful

**No:** a rule, stated.
> The verb *heißen* means "to be called". It is conjugated: ich heiße, du heißt, Sie
> heißen. To ask someone's name, say "Wie heißt du?".

**Yes:** a question the reader didn't know they had, answered.
> Germans don't ask *what* your name is. They ask *how* you are called: "Wie heißt du?".
> It sounds odd until you meet the word English lost. Byron wrote of his hero, "Childe
> Harold was he *hight*": was he called. *Hight* and *heißen* are the same old word;
> German simply kept it.

**No:** a list of exceptions.
> Some verbs change their vowel in the du-form, for example sprechen → du sprichst.

**Yes:** the exception placed in the reader's path, with a promise.
> One verb in today's scene breaks the pattern: *du sprichst*, not *du sprechst*. A few
> dozen common verbs change their vowel like this. Take it as a chunk for now;
> a later lesson shows the pattern behind them.

**No:** culture as trivia.
> In Germany, people use Sie in formal situations.

**Yes:** culture as a decision the reader will have to make.
> Walk into a bakery and you are *Sie*. Walk into a hostel and you are *du* before you've
> put your bag down. When you can't tell, use *Sie*: being too polite costs nothing, and
> the other person can always offer *du*.

## The rubric

Score each lesson 1–5 on each line, in the PR and in `JOURNAL.md`. A lesson ships at 4+
on every line; a 3 means rework, with the reason written down.

| | 5 means |
|---|---|
| **Hook** | The first lines make the reader want this lesson, today |
| **Insight** | The core idea is genuinely illuminating, true, and stated once, clearly |
| **Usability** | After reading, the reader can do the can-do without scrolling back |
| **Accuracy** | Every German string passed both accuracy passes; nothing left uncertain |
| **Load** | Within the word budget; one idea; readable in one sitting |
| **Recycling** | 8–12 earlier words return naturally (n/a for lesson 1) |
| **Self-check** | Questions test the can-do, not trivia; every answer is behind a tap |
