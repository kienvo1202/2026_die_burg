// The ledger: what a reader knows before a given lesson, worked out from the lesson
// files themselves (ADR 0003). Nothing here is kept by hand, so it cannot drift.
//
// Plain data in, plain data out: the same functions serve the /words page, the
// write-lesson skill and scripts/check-lessons.ts.

import type { Word } from "./words.ts";

/** One entry in the table of contents (levels.yaml). */
export interface TocLesson {
  id: string; // "a1-01"
  number: number;
  title: string;
  canDo: string;
}

export interface Level {
  id: string; // "a1-1"
  name: string; // "A1.1"
  title: string;
  canDo: string;
  lessons: TocLesson[];
}

/** The parts of a brief the ledger needs. The full brief has more (see content.config.ts). */
export interface BriefLimits {
  id: string;
  newWordBudget: number;
  introducesGrammar: string[];
}

/** The parts of a lesson's frontmatter the ledger needs. */
export interface LessonWords {
  id: string;
  newWords: Word[];
  recycles: string[]; // word keys, e.g. "der morgen", "heißen"
  grammar: string[]; // grammar tags the lesson uses, e.g. "verb-second"
}

export interface KnownWord {
  word: Word;
  key: string;
  introducedIn: string;
  timesSeen: number; // introduced once, plus once per later lesson that recycled it
}

/** The key a word is matched by: article and lemma, lower-cased ("der morgen"). */
export function wordKey(word: Pick<Word, "de" | "article">): string {
  const withArticle = word.article ? `${word.article} ${word.de}` : word.de;
  return withArticle.trim().toLowerCase();
}

/** Every lesson in reading order: levels by id ("a1-1" < "a1-2" < "a2-1"), then by number. */
export function courseOrder(levels: Level[]): TocLesson[] {
  const sortedLevels = [...levels].sort((a, b) => a.id.localeCompare(b.id));
  const order: TocLesson[] = [];
  for (const level of sortedLevels) {
    const lessons = [...level.lessons].sort((a, b) => a.number - b.number);
    order.push(...lessons);
  }
  return order;
}

/** Words and grammar a reader has met before `lessonId`, from lessons that exist. */
export function knownBefore(
  levels: Level[],
  briefs: BriefLimits[],
  lessons: LessonWords[],
  lessonId: string,
): { words: KnownWord[]; grammar: string[] } {
  const lessonsById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  const briefsById = new Map(briefs.map((brief) => [brief.id, brief]));
  const words = new Map<string, KnownWord>();
  const grammar = new Set<string>();

  for (const entry of courseOrder(levels)) {
    if (entry.id === lessonId) break;
    const lesson = lessonsById.get(entry.id);
    if (!lesson) continue; // planned but not written: teaches nothing yet

    for (const word of lesson.newWords) {
      const key = wordKey(word);
      if (!words.has(key)) words.set(key, { word, key, introducedIn: lesson.id, timesSeen: 1 });
    }
    for (const key of lesson.recycles) {
      const known = words.get(key.toLowerCase());
      if (known) known.timesSeen += 1;
    }
    for (const tag of briefsById.get(entry.id)?.introducesGrammar ?? []) grammar.add(tag);
  }

  return { words: [...words.values()], grammar: [...grammar] };
}

/** Everything wrong with the course's files, in plain words. An empty list means all is well. */
export function findProblems(levels: Level[], briefs: BriefLimits[], lessons: LessonWords[]): string[] {
  const problems: string[] = [];
  const order = courseOrder(levels);
  const tocIds = new Set<string>();

  for (const entry of order) {
    if (tocIds.has(entry.id)) problems.push(`levels.yaml lists lesson ${entry.id} twice.`);
    tocIds.add(entry.id);
  }

  const briefsById = new Map(briefs.map((brief) => [brief.id, brief]));
  for (const brief of briefs) {
    if (!tocIds.has(brief.id)) problems.push(`Brief ${brief.id} has no entry in levels.yaml.`);
  }

  const lessonsById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  for (const lesson of lessons) {
    if (!tocIds.has(lesson.id)) problems.push(`Lesson ${lesson.id} has no entry in levels.yaml.`);
    if (!briefsById.has(lesson.id)) problems.push(`Lesson ${lesson.id} has no brief (briefs/${lesson.id}.yaml).`);
  }

  // Walk the course in order, as a reader would, keeping track of what they know.
  const introducedIn = new Map<string, string>();
  const taughtGrammar = new Set<string>();
  for (const entry of order) {
    const lesson = lessonsById.get(entry.id);
    if (!lesson) continue; // planned but not written: the reader learns nothing from it yet
    const brief = briefsById.get(entry.id);
    // A lesson may use what earlier lessons taught, plus what its own brief introduces.
    for (const tag of brief?.introducesGrammar ?? []) taughtGrammar.add(tag);

    if (brief && lesson.newWords.length > brief.newWordBudget) {
      problems.push(
        `Lesson ${lesson.id} introduces ${lesson.newWords.length} new words; its brief allows ${brief.newWordBudget}.`,
      );
    }

    for (const key of lesson.recycles) {
      if (!introducedIn.has(key.toLowerCase())) {
        problems.push(`Lesson ${lesson.id} recycles "${key}", which no earlier lesson introduces.`);
      }
    }

    for (const tag of lesson.grammar) {
      if (!taughtGrammar.has(tag)) {
        problems.push(`Lesson ${lesson.id} uses grammar "${tag}", which neither its brief nor an earlier lesson teaches.`);
      }
    }

    for (const word of lesson.newWords) {
      const key = wordKey(word);
      const earlier = introducedIn.get(key);
      if (earlier) problems.push(`Lesson ${lesson.id} introduces "${key}" again; ${earlier} already did.`);
      else introducedIn.set(key, lesson.id);
    }
  }

  return problems;
}
