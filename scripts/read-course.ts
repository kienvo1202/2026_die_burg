// Reads the course files (levels.yaml, briefs, lesson frontmatter) in plain Node, for the
// scripts that run outside Astro: check-lessons.ts and ledger-report.ts.
//
// js-yaml is the parser Astro itself uses, so these scripts and the site read the files
// the same way.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import type { BriefLimits, LessonWords, Level } from "../src/lib/ledger.ts";

// fileURLToPath, not URL.pathname: on Windows .pathname gives "/D:/..." and breaks every path.
const CONTENT = fileURLToPath(new URL("../src/content/", import.meta.url));
const BRIEFS = join(CONTENT, "curriculum/briefs");
const LESSONS = join(CONTENT, "lessons");

function filesEndingWith(dir: string, extension: string): string[] {
  return readdirSync(dir)
    .filter((name) => name.endsWith(extension))
    .sort();
}

/** Parse YAML, naming the file when it is broken (a stack trace into js-yaml helps nobody). */
function parseYaml(text: string, path: string): unknown {
  try {
    return yaml.load(text);
  } catch (error) {
    const reason = error instanceof yaml.YAMLException ? error.message : String(error);
    console.error(`Can't read ${path}:\n${reason}`);
    process.exit(1);
  }
}

/** The YAML between the first two `---` lines of an MDX file. */
function frontmatter(text: string, path: string): Record<string, unknown> {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    console.error(`${path} has no frontmatter (--- ... --- at the top).`);
    process.exit(1);
  }
  return parseYaml(match[1], path) as Record<string, unknown>;
}

export function readCourse(): { levels: Level[]; briefs: BriefLimits[]; lessons: LessonWords[] } {
  const levelsPath = join(CONTENT, "curriculum/levels.yaml");
  const levels = parseYaml(readFileSync(levelsPath, "utf8"), levelsPath) as Level[];

  const briefs = filesEndingWith(BRIEFS, ".yaml").map((name) => {
    const path = join(BRIEFS, name);
    const data = parseYaml(readFileSync(path, "utf8"), path) as Partial<BriefLimits>;
    return {
      id: name.replace(/\.yaml$/, ""),
      newWordBudget: data.newWordBudget ?? 0,
      introducesGrammar: data.introducesGrammar ?? [],
    };
  });

  const lessons = filesEndingWith(LESSONS, ".mdx").map((name) => {
    const path = join(LESSONS, name);
    const data = frontmatter(readFileSync(path, "utf8"), path) as Partial<LessonWords>;
    return {
      id: name.replace(/\.mdx$/, ""),
      newWords: data.newWords ?? [],
      recycles: data.recycles ?? [],
      grammar: data.grammar ?? [],
    };
  });

  return { levels, briefs, lessons };
}
