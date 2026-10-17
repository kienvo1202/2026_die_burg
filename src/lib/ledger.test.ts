import { test } from "node:test";
import assert from "node:assert/strict";
import { courseOrder, findProblems, knownBefore, wordKey } from "./ledger.ts";
import type { BriefLimits, LessonWords, Level } from "./ledger.ts";

// A tiny course: two levels, three lessons, the first two written.
const levels: Level[] = [
  {
    id: "a1-2",
    name: "A1.2",
    title: "Everyday life",
    canDo: "",
    lessons: [{ id: "a1-15", number: 15, title: "Your day", canDo: "" }],
  },
  {
    id: "a1-1",
    name: "A1.1",
    title: "First words",
    canDo: "",
    lessons: [
      { id: "a1-02", number: 2, title: "Where from", canDo: "" },
      { id: "a1-01", number: 1, title: "Hello", canDo: "" },
    ],
  },
];

const briefs: BriefLimits[] = [
  { id: "a1-01", newWordBudget: 3, introducesGrammar: ["sein"] },
  { id: "a1-02", newWordBudget: 3, introducesGrammar: ["verb-endings"] },
];

function cleanLessons(): LessonWords[] {
  return [
    {
      id: "a1-01",
      newWords: [
        { de: "Morgen", en: "morning", pos: "noun", article: "der", plural: "-" },
        { de: "heißen", en: "to be called", pos: "verb" },
      ],
      recycles: [],
      grammar: ["sein"],
    },
    {
      id: "a1-02",
      newWords: [{ de: "kommen", en: "to come", pos: "verb" }],
      recycles: ["der Morgen", "heißen"],
      grammar: ["sein", "verb-endings"],
    },
  ];
}

test("wordKey joins article and lemma, lower-cased", () => {
  assert.equal(wordKey({ de: "Morgen", article: "der" }), "der morgen");
  assert.equal(wordKey({ de: "heißen" }), "heißen");
});

test("courseOrder sorts levels by id and lessons by number", () => {
  assert.deepEqual(
    courseOrder(levels).map((lesson) => lesson.id),
    ["a1-01", "a1-02", "a1-15"],
  );
});

test("a clean course has no problems", () => {
  assert.deepEqual(findProblems(levels, briefs, cleanLessons()), []);
});

test("knownBefore lists earlier words with how often they were seen", () => {
  const known = knownBefore(levels, briefs, cleanLessons(), "a1-15");
  const morgen = known.words.find((word) => word.key === "der morgen");
  assert.equal(morgen?.introducedIn, "a1-01");
  assert.equal(morgen?.timesSeen, 2); // introduced in 01, recycled in 02
  assert.deepEqual(known.grammar.sort(), ["sein", "verb-endings"]);
});

test("knownBefore the first lesson is empty", () => {
  const known = knownBefore(levels, briefs, cleanLessons(), "a1-01");
  assert.deepEqual(known, { words: [], grammar: [] });
});

// Each broken fixture below must be reported. If one isn't, the checker has a blind spot.

function problemsAfter(change: (lessons: LessonWords[]) => void, briefList = briefs): string[] {
  const lessons = cleanLessons();
  change(lessons);
  return findProblems(levels, briefList, lessons);
}

test("reports a word introduced twice", () => {
  const problems = problemsAfter((lessons) => {
    lessons[1].newWords.push({ de: "Morgen", en: "morning", pos: "noun", article: "der" });
  });
  assert.match(problems.join("\n"), /introduces "der morgen" again; a1-01 already did/);
});

test("reports a lesson over its word budget", () => {
  const problems = problemsAfter((lessons) => {
    lessons[1].newWords.push(
      { de: "Land", en: "country", pos: "noun", article: "das", plural: "¨-er" },
      { de: "sprechen", en: "to speak", pos: "verb" },
      { de: "Stadt", en: "town", pos: "noun", article: "die", plural: "¨-e" },
    );
  });
  assert.match(problems.join("\n"), /a1-02 introduces 4 new words; its brief allows 3/);
});

test("reports a recycled word that was never introduced", () => {
  const problems = problemsAfter((lessons) => lessons[1].recycles.push("die Nacht"));
  assert.match(problems.join("\n"), /recycles "die Nacht", which no earlier lesson introduces/);
});

test("reports a word recycled before it is introduced", () => {
  const problems = problemsAfter((lessons) => lessons[0].recycles.push("kommen"));
  assert.match(problems.join("\n"), /a1-01 recycles "kommen"/);
});

test("reports grammar that has not been taught yet", () => {
  const problems = problemsAfter((lessons) => lessons[0].grammar.push("verb-endings"));
  assert.match(problems.join("\n"), /a1-01 uses grammar "verb-endings"/);
});

test("grammar from the brief of an unwritten lesson does not count as taught", () => {
  // Lesson 2 is briefed (it will teach "perfekt") but not written; lesson 3 uses it.
  const threeLessons: Level[] = [
    {
      ...levels[1],
      lessons: [
        { id: "a1-01", number: 1, title: "One", canDo: "" },
        { id: "a1-02", number: 2, title: "Two", canDo: "" },
        { id: "a1-03", number: 3, title: "Three", canDo: "" },
      ],
    },
  ];
  const threeBriefs: BriefLimits[] = [
    { id: "a1-01", newWordBudget: 3, introducesGrammar: ["sein"] },
    { id: "a1-02", newWordBudget: 3, introducesGrammar: ["perfekt"] },
    { id: "a1-03", newWordBudget: 3, introducesGrammar: [] },
  ];
  const written: LessonWords[] = [
    { id: "a1-01", newWords: [], recycles: [], grammar: ["sein"] },
    { id: "a1-03", newWords: [], recycles: [], grammar: ["perfekt"] },
  ];
  assert.match(findProblems(threeLessons, threeBriefs, written).join("\n"), /a1-03 uses grammar "perfekt"/);
});

test("reports a lesson without a brief", () => {
  const problems = problemsAfter(() => {}, [briefs[0]]);
  assert.match(problems.join("\n"), /Lesson a1-02 has no brief/);
});

test("reports a lesson and a brief missing from the table of contents", () => {
  const problems = problemsAfter(
    (lessons) => lessons.push({ id: "a1-99", newWords: [], recycles: [], grammar: [] }),
    [...briefs, { id: "a1-99", newWordBudget: 1, introducesGrammar: [] }],
  );
  const text = problems.join("\n");
  assert.match(text, /Lesson a1-99 has no entry in levels.yaml/);
  assert.match(text, /Brief a1-99 has no entry in levels.yaml/);
});

test("reports a lesson listed twice in the table of contents", () => {
  const doubled: Level[] = [
    { ...levels[1], lessons: [...levels[1].lessons, { id: "a1-01", number: 3, title: "Again", canDo: "" }] },
  ];
  assert.match(findProblems(doubled, briefs, []).join("\n"), /lists lesson a1-01 twice/);
});
