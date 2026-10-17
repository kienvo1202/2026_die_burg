# Engineering journal

Dated, informal, honest. What was tried, what broke, what was learned, **including the
dead ends**, which is exactly what ADRs leave out. ADRs record decisions; this records the
experience of arriving at them. It also does the job a retrospective does on a team.

Newest last.

<!-- TEMPLATE: Write an entry when something surprised you, not on a schedule. Good
entries name the bug, the wrong belief that let it in, and one lesson in bold. The two
example entries below show the style; delete them once you have your own. -->

---

## {{YYYY-MM-DD}} — {{what this session was about}}

*(example)* Goal: find out whether {{riskiest assumption}} holds, before building
anything on top of it. No UI, no API calls.

### Three bugs, all of which would have been silent

**1. The rule I described was never implemented.** The design said "page numbers are
short, narrow and vertically isolated". The code checked short and narrow only, so a
one-line body sentence was filed as a page number. **Writing a rule down is not
implementing it.**

**2. The test passed because it tested what I imagined.** The fuzzy matcher's test
corrupted a word in the middle of a quote, because that's where I imagined corruption.
Real noise was at the start, where the matcher anchored. The bug lived in the gap
between my imagination and reality, which is where most bugs live.

---

## {{YYYY-MM-DD}} — {{planning}}

*(example)* Three early decisions were reversed before any code, all because the owner
asked a question about their actual situation rather than from technical review. The most
instructive: an option was rejected because it cost 5–15 seconds per item. The number was
right and the conclusion wrong: it was costed as paid on every use, when it is paid once
at setup. **A cost is meaningless until you know how often it is paid.**
