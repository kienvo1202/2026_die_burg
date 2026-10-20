// The whole course as the pages need it: levels in order, and every planned lesson in
// reading order, with its lesson file attached when it has been written.
// Astro-only (it reads the content collections); the pure logic lives in ledger.ts.

import { getCollection, type CollectionEntry } from "astro:content";
import { courseOrder, type Level, type TocLesson } from "./ledger.ts";

export interface CourseLesson extends TocLesson {
  level: Level;
  /** The lesson file, when the lesson has been written. */
  entry?: CollectionEntry<"lessons">;
}

export async function loadCourse(): Promise<{ levels: Level[]; lessons: CourseLesson[] }> {
  const levels: Level[] = (await getCollection("levels"))
    .map((entry) => ({ id: entry.id, ...entry.data }))
    .sort((a, b) => a.id.localeCompare(b.id));

  const written = new Map((await getCollection("lessons")).map((entry) => [entry.id, entry]));
  const levelOfLesson = new Map<string, Level>();
  for (const level of levels) {
    for (const lesson of level.lessons) levelOfLesson.set(lesson.id, level);
  }

  const lessons = courseOrder(levels).map((toc) => {
    const entry = written.get(toc.id);
    return {
      ...toc,
      // A written lesson's own frontmatter has the final title and can-do.
      title: entry?.data.title ?? toc.title,
      canDo: entry?.data.canDo ?? toc.canDo,
      level: levelOfLesson.get(toc.id)!,
      entry,
    };
  });

  return { levels, lessons };
}
