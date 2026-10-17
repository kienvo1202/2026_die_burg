# Roadmap

**Phases only.** Individual tasks live in [BACKLOG.md](BACKLOG.md); what already shipped
is in [CHANGELOG.md](../CHANGELOG.md); why things are built this way is in
[adr/](adr/README.md). This file exists so there is one place to see where the project is.

No dates: there is no deadline, so any date here would be fiction. **Now / Next / Later**
instead.

`✔` done · `◐` in progress or partially done · `○` not started · `⛔` blocked

---

## Status

| Phase | Delivers | Exit criteria | Status |
|---|---|---|---|
| **0 — The book** | Design system, app shell (title page, course map, lesson page, dictionary), content model and checker, lessons 1–2 | 1. Kien approves the design from screenshots (phone + desktop, both themes) · 2. Lessons 1–2 each read well in one sitting on phone and desktop, and each has at least one insight Kien finds new · 3. German accuracy pass documented: what was verified and what wasn't (native-speaker check if available) · 4. CI green, and seen red once | ◐ |
| **1 — A1.1 on the web** | Lessons 3–14 written one per session with `/write-lesson`; the site deployed | All 14 A1.1 lessons pass the checker and the rubric · the site is live on a host Kien chose · Kien reads lessons 3–14 and would recommend them | ○ |
| **2 — The apps** | iOS and Android apps via Capacitor, native text-to-speech, offline | Both apps run on a real phone, offline, with audio · progress survives an app restart · store submission only after Kien's explicit yes | ○ |
| **3+ — The rest of the course** | A1.2 → C2.2, level by level, briefs written just before each level | Per level: all lessons pass checker and rubric; the level's checkpoint lesson reads well | ○ |

---

## Now

**Phase 0: the book.** Built in four stacked PRs (docs, design system, app shell,
lessons 1–2). Design approved (with Cinzel Decorative replacing Fraktur), CI seen red
once. **What remains is Kien's read:** lessons 1–2 on a phone, in one sitting, scored
against the rubric in `docs/LESSON_GUIDE.md`. That read closes exit criterion 2.

## Next

1. Phase 1: write A1.1 lessons 3–14, one per session.
2. Choose a host and deploy (needs Kien's yes).

## Later

The apps (Phase 2), then the rest of the course, and the Someday list in the backlog.
Deliberately unordered: sequencing them before real readers have read real lessons would
be guessing.

---

## Keeping this honest

1. **Phases only.** The moment individual tasks appear here, there are two task lists and
   they will disagree within a fortnight.
2. **Update it when a phase changes state**, not per commit.
3. **Never mark something done to feel good.** `◐` with a stated reason is more useful
   than `✔` that is not true.

A phase can also end in **change** or **kill**. Writing "Phase 0 showed X; direction
changed, see ADR NNNN" is a success of the process, not a failure of the project.
