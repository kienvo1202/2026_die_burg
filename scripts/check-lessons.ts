// Checks the course as a whole: every lesson listed in the table of contents and
// briefed, no word introduced twice, word budgets kept, nothing recycled or used before
// it is taught. Prints each problem in plain words; exits with 1 if there are any.
//
//   node scripts/check-lessons.ts        (part of `npm run check`)

import { findProblems } from "../src/lib/ledger.ts";
import { readCourse } from "./read-course.ts";

const { levels, briefs, lessons } = readCourse();
const problems = findProblems(levels, briefs, lessons);

if (problems.length === 0) {
  console.log(`Lessons OK: ${lessons.length} written, ${briefs.length} briefed.`);
} else {
  console.error(`${problems.length} problem(s) in the lessons:\n`);
  for (const problem of problems) console.error(`  • ${problem}`);
  process.exitCode = 1;
}
