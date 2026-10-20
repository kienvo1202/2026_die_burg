// The course's content, validated when the site builds. A file that doesn't match its
// schema fails the build with the file name and the field.
//
// Cross-file rules (words introduced twice, word budgets, grammar not yet taught) are
// checked by scripts/check-lessons.ts, which uses src/lib/ledger.ts.

import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const tocLesson = z.object({
  id: z.string().regex(/^[abc][12]-\d{2}$/, 'lesson ids look like "a1-01"'),
  number: z.number().int().positive(),
  title: z.string(),
  canDo: z.string(),
});

// The table of contents: levels and the lessons planned in each.
const levels = defineCollection({
  loader: file("src/content/curriculum/levels.yaml"),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    canDo: z.string(),
    lessons: z.array(tocLesson),
  }),
});

// What a lesson must teach, and must not teach yet. One file per lesson, written just
// before the lesson. See docs/LESSON_GUIDE.md for how each field is used.
const briefs = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "src/content/curriculum/briefs" }),
  schema: z.object({
    canDo: z.string(),
    scene: z.object({
      place: z.string(),
      situation: z.string(),
      characters: z.array(
        z.object({ name: z.string(), who: z.string(), register: z.enum(["du", "Sie"]) }),
      ),
    }),
    coreInsight: z.string(),
    notYet: z.array(z.string()),
    introducesGrammar: z.array(z.string()),
    chunks: z.array(
      z.object({ de: z.string(), literal: z.string(), means: z.string(), explainedIn: z.string().optional() }),
    ),
    newWordBudget: z.number().int().positive(),
    soundSpotlight: z.string().optional(),
    cultureNote: z.string(),
    traps: z.array(z.string()),
    selfCheckIdeas: z.array(z.string()),
    yourTurn: z.object({ prompt: z.string(), modelNotes: z.string() }),
  }),
});

const word = z.object({
  de: z.string(),
  en: z.string(),
  pos: z.enum(["noun", "verb", "adjective", "adverb", "phrase", "pronoun", "other"]),
  article: z.enum(["der", "die", "das"]).optional(),
  plural: z.string().optional(),
  forms: z.string().optional(),
});

const lessons = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "src/content/lessons" }),
  schema: z.object({
    title: z.string(),
    canDo: z.string(),
    minutes: z.number().int().positive(),
    newWords: z.array(word),
    recycles: z.array(z.string()).default([]),
    grammar: z.array(z.string()).default([]),
  }),
});

export const collections = { levels, briefs, lessons };
