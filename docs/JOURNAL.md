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
