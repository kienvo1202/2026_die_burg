// What the reader knows before a lesson: the words (least-seen first, the ones most
// worth recycling) and the grammar taught so far. Used by the write-lesson skill.
//
//   node scripts/ledger-report.ts a1-03

import { courseOrder, knownBefore } from "../src/lib/ledger.ts";
import { readCourse } from "./read-course.ts";

const lessonId = process.argv[2];
const { levels, briefs, lessons } = readCourse();
const entry = courseOrder(levels).find((lesson) => lesson.id === lessonId);

if (!lessonId || !entry) {
  console.error(`Usage: node scripts/ledger-report.ts <lesson-id>   (e.g. a1-03; ids are in levels.yaml)`);
  process.exit(1);
}

const known = knownBefore(levels, briefs, lessons, lessonId);
const brief = briefs.find((b) => b.id === lessonId);
const written = lessons.some((lesson) => lesson.id === lessonId);

console.log(`# Ledger before lesson ${lessonId}: ${entry.title}`);
console.log(`Brief: ${brief ? `briefs/${lessonId}.yaml (budget ${brief.newWordBudget} new words)` : "MISSING: write the brief first"}`);
console.log(`Lesson file: ${written ? "exists (rewriting it)" : "not written yet"}\n`);

console.log(`## Grammar taught so far (${known.grammar.length})`);
console.log(known.grammar.length > 0 ? known.grammar.map((tag) => `- ${tag}`).join("\n") : "(none)");
if (brief && brief.introducesGrammar.length > 0) {
  console.log(`\nThis lesson's brief introduces: ${brief.introducesGrammar.join(", ")}`);
}

const leastSeenFirst = [...known.words].sort((a, b) => a.timesSeen - b.timesSeen || a.key.localeCompare(b.key));
console.log(`\n## Known words (${known.words.length}), least seen first`);
console.log("Use these keys in `recycles`. Seen = introduced once + each lesson that recycled it.\n");
for (const word of leastSeenFirst) {
  console.log(`- ${word.key}  (${word.word.en}; from ${word.introducedIn}; seen ${word.timesSeen}×)`);
}
