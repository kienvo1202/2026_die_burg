# What the reader gets, and how we know it's worth it

This is the reference that features and lessons are built against. When a new idea comes
up ("streaks!", "a placement test!"), it is placed and judged here **before** any code is
written.

## Why this file exists

In an earlier project, the first real output was accurate on every test and judged only
**20–30% better** than doing without. Every feature built up to then served one user need,
and getting better at that one need could not get much past that. The fix was to name all
the needs, check which ones the product served, and aim at the rest on purpose.

Feasibility ("it works") and value ("it's worth using") are different questions. This
file is where value is decided.

---

## 1. Reader needs

The questions a reader has while using the course. Anything a page shows should answer
one of them. If it doesn't, it's decoration (and the design system already supplies the
decoration).

| Need | The reader's question | Served by |
|---|---|---|
| **Orientation** | Where am I in the course? What's next? | Course map with seals and ribbon; "Continue reading" on the title page; lesson progress bar |
| **Use** | What can I *say* after this? | The can-do line at the top; the scene; chunks; "Your turn"; the "I can…" recap |
| **Understanding** | *Why* does German do this? | The insight section; "Go deeper" blocks |
| **Sound** | How does it sound? | Listen buttons on every German line and word |
| **Confidence** | Did I get it? | Self-check items with answers behind a tap; model answer and checklist in "Your turn" |
| **Retention** | Will I remember it next week? | Warm-up recall from earlier lessons; recycled words; the `/words` dictionary |
| **Culture** | What will happen when I actually go there? | Culture note: how people really say it |

After lessons 1–2 have been read for real, mark which needs they actually served. The
gap is the roadmap.

## 2. Surfaces

| Surface | Scale | When |
|---|---|---|
| Title page | The whole course | First visit; returning to continue |
| Course map | Levels and lessons | Choosing what to read; seeing progress |
| Lesson | One idea, one scene | One sitting, 15–25 minutes |
| "Go deeper" block | One sub-question | Only when the reader opens it |
| Dictionary (`/words`) | Every word met so far | Looking something up; revising |

## 3. Modes

None yet. Every reader follows the same path. Possible later: a "review only" mode, a
placement test to skip ahead. Both go under Someday until a real reader asks.

## 4. The method: sample by hand, then build

Building is the expensive way to find out whether something is worth having. In order:

1. **Make samples by hand.** Lessons 1–2 are the samples.
2. **Use them for real.** Read them on a phone, in one sitting, as a reader would.
3. **Score them** against the rubric in `docs/LESSON_GUIDE.md`, written before the lessons.
4. **Then scale**: the write-lesson skill writes the next lessons to match the samples
   that scored well.

Write each score, and the verdict, in `JOURNAL.md`. A lesson that fails here is a cheap
failure.

## 5. Judging a new idea

Before an idea goes in the backlog, answer here in two lines:
- Which reader need does it serve, and on which surface?
- How would we test it by hand first?

If neither has an answer, it goes under Someday in the backlog, not into a phase.
