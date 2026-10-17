// Checks the course as a whole: every lesson listed in the table of contents and
// briefed, no word introduced twice, word budgets kept, nothing recycled or used before
// it is taught. Prints each problem in plain words; exits with 1 if there are any.
//
//   node scripts/check-lessons.ts        (part of `npm run check`)
//
// Runs in plain Node, outside Astro, so it reads the YAML and MDX frontmatter itself,
// with js-yaml: the same parser Astro uses, so both read the files the same way.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { findProblems } from "../src/lib/ledger.ts";
import type { BriefLimits, LessonWords, Level } from "../src/lib/ledger.ts";

const CONTENT = new URL("../src/content/", import.meta.url).pathname;
const BRIEFS = join(CONTENT, "curriculum/briefs");
const LESSONS = join(CONTENT, "lessons");

function filesEndingWith(dir: string, extension: string): string[] {
  return readdirSync(dir)
    .filter((name) => name.endsWith(extension))
    .sort();
}

/** The YAML between the first two `---` lines of an MDX file. */
function frontmatter(text: string, path: string): Record<string, unknown> {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`${path} has no frontmatter (--- ... --- at the top).`);
  return yaml.load(match[1]) as Record<string, unknown>;
}

const levels = yaml.load(readFileSync(join(CONTENT, "curriculum/levels.yaml"), "utf8")) as Level[];

const briefs: BriefLimits[] = filesEndingWith(BRIEFS, ".yaml").map((name) => {
  const data = yaml.load(readFileSync(join(BRIEFS, name), "utf8")) as Partial<BriefLimits>;
  return {
    id: name.replace(/\.yaml$/, ""),
    newWordBudget: data.newWordBudget ?? 0,
    introducesGrammar: data.introducesGrammar ?? [],
  };
});

const lessons: LessonWords[] = filesEndingWith(LESSONS, ".mdx").map((name) => {
  const path = join(LESSONS, name);
  const data = frontmatter(readFileSync(path, "utf8"), path) as Partial<LessonWords>;
  return {
    id: name.replace(/\.mdx$/, ""),
    newWords: data.newWords ?? [],
    recycles: data.recycles ?? [],
    grammar: data.grammar ?? [],
  };
});

const problems = findProblems(levels, briefs, lessons);
if (problems.length === 0) {
  console.log(`Lessons OK: ${lessons.length} written, ${briefs.length} briefed.`);
} else {
  console.error(`${problems.length} problem(s) in the lessons:\n`);
  for (const problem of problems) console.error(`  • ${problem}`);
  process.exitCode = 1;
}
