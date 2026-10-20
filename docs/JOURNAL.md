# Engineering journal

Dated, informal, honest. What was tried, what broke, what was learned, **including the
dead ends**, which is exactly what ADRs leave out. ADRs record decisions; this records the
experience of arriving at them.

Newest last.

---

## 2026-10-17 — Planning: from a 52-week tutor plan to a book

Started from a CSV of 52 weekly chat-tutor prompts (A1 → B2, 10–15 hours a week, 60–150
new words a week, Goethe mock exams). Its grammar order is sound; its unit size is not
something anyone can *read*. Week 1 alone held the alphabet, twelve hard sounds, 60
words, pronouns, sein/heißen, W-questions and ten dialogues.

What changed while planning:

- **Lesson size went from "a week" to "a sitting".** About 5–7 lessons per CSV week.
- **The verb bracket became the backbone.** The CSV teaches modal verbs, separable verbs,
  the Perfekt and verb-final clauses weeks apart, as four topics. They are one structure
  (*Satzklammer*). Teaching it once and reusing it is the biggest "aha" German offers an
  English speaker.
- **A first draft said "B2 also needs reading outside the site".** Kien rejected that:
  the course should be as complete as it needs to be, up to C2. **Honesty about limits
  is right; building the limit into the plan was the mistake.** Depth now goes in "Go
  deeper" blocks and more lessons, not in a disclaimer.
- **Kien chose standalone scenes over a running story.** Recycling words therefore can't
  ride on a plot; it rides on the ledger instead (ADR 0003).
- **Creating the repo** with `gh repo create --template` failed: the template repo wasn't
  marked as a template. Created an empty repo and pushed a clone instead, switching
  `origin` first so nothing could reach the template. Added to the traps in `CLAUDE.md`.

---

## 2026-10-17 — Design checkpoint: Fraktur out

The first design used Fraktur (UnifrakturMaguntia) for the brand, level titles and drop
caps. In isolation, on the word "Märchen", it looked exactly right. Kien's verdict at the
checkpoint: the most fitting style and the worst to read. Replaced with Cinzel Decorative
(ADR 0005, amendment).

**Judge type by reading a paragraph that starts with it, not by looking at one word.** The
specimen showed the font at its best; the drop cap on a real paragraph showed the cost.

Three smaller things the screenshots caught that no test would have:

- Every SVG ornament rendered page-wide: Astro's default style scoping drops styles for a
  class passed to a child component. Fixed with `scopedStyleStrategy: "class"`.
- Astro's HTML compression removed the space between a word and an inline element on the
  next line ("and <em>name</em>" became "andname"). Fixed with `compressHTML: false`.
- The candle icon for the dark theme read as the letter "i" at icon size; it is a moon now.

---

## 2026-10-17 — Lessons 1–2, and the two accuracy passes

Wrote lessons 1 (*Hallo!*) and 2 (*Where are you from?*) to the new lesson guide, then
had an independent reviewer (a separate AI session that hadn't written them) check every
German string, gloss and claim.

**The reviewer found two outright errors my own pass missed.**

1. Lesson 2 said "only the du-form changes its vowel" (*du sprichst*). True of ich/du/Sie,
   false of German: *er spricht* changes too. A learner would have had to unlearn it.
2. Lesson 1 pointed at "the second column" of a table whose second column was the other
   verb.

And fifteen doubtful points, all applied. The main ones:

- *Gute Nacht* is also a late-night goodbye.
- *Grüß Gott* is southern Germany, not just Bavaria.
- "Huber. Franz Huber." was the James Bond formula, not normal usage.
- *Wo kommst du her?* is good German, so it needed mentioning next to the
  "Wo kommst du?" warning.
- Belgium is German-speaking too.
- "Almost every verb" became "most verbs".
- ß is a sharp s, not a "double" one.

**A claim that is true of the three forms on the page can still be false of the
language.** Write rules that will survive the next lesson.

Verified by both passes:
- every article and plural (der Herr, die Frau, die Schweiz);
- every verb form;
- every dialogue line;
- the Byron line ("Childe Harold was he hight", 1812);
- Job 1:7 ("Whence comest thou?");
- the Angles and Angeln;
- the gh/ch and y/g correspondences;
- the ich/ach rule.

Not verified:
- that Moin is said "even at midnight" (widely reported, anecdotal);
- whether Old English asked names with "how" (the claim was removed instead).

Rubric, my scores before Kien's read (1–5):

| | Hook | Insight | Usability | Accuracy | Load | Recycling | Self-check |
|---|---|---|---|---|---|---|---|
| Lesson 1 | 4 | 5 | 5 | 4 | 4 | n/a | 5 |
| Lesson 2 | 4 | 5 | 5 | 4 | 4 | 5 | 5 |

Accuracy stays at 4 until a native speaker has read them. Load is 4 because both lessons
are at the long end of a sitting: three scenes in lesson 1, twelve self-checks in
lesson 2. **The verdict is Kien's read on a phone, not these numbers.**

Also learned, the hard way: `git revert -q` isn't a valid option. The revert failed, and
the `git commit --amend` chained after it reworded the *wrong* commit. Only the rejected
push saved it from reaching GitHub. **Never chain `--amend` (or anything that rewrites)
after a command that might have failed: run it, look, then amend.**

---

## 2026-10-19 — Too few lessons? No: too few meetings, and only one order

Kien's worry was that 14 lessons per half-level is too few, and that nobody rereads a
dialogue more than two or three times. Then a second one: reviewing means rereading
scattered lessons.

**The count turned out to be the wrong question.** 28 A1 lessons at about 23 words each
is about 650 words, which is what Goethe's A1 list asks for. What the ledger showed
instead: before lesson 3, **32 of the 46 known words have been seen exactly once**. A word
needs something like 10–20 meetings before it sticks. The plan had quietly been counting
on rereading to supply them, and rereading is the dullest way to get them.

**More lessons would have made it worse**: more words, the same exposure each. The
answer is more *text* made of *old* words. Hence tales between lessons (ADR 0007),
starting with Rumpelstilzchen, whose plot is literally "Wie heißt du?".

**The review problem is about order, not volume.** Lessons follow what you want to
*say*; a reviewer wants what German *is*. Two views of one course, and only one existed.
Hence the German map (ADR 0008).

The one design rule carried over from ADR 0003: **the map is built from the lessons, not
written beside them.** The grammar tags lessons already declared were loose strings; the
map gives each a home, and lights up when a lesson that uses it is finished.

Honest limits, written down before anyone builds on them:
- "95%+" is realistic for grammar (136 points cover it, A1 to C2) and not for words.
- Goethe's word lists are copyrighted; a backbone list needs an open source.
- Sounds taught in lessons 1–2 have no tag, so their map points stay fogged.

Both are hand-made samples first, as PRODUCT.md §4 says. Rewriting the guide, schema and
skill before anyone has read a tale would be guessing.
