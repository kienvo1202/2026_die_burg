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

// The German map (ADR 0008, proposed): the whole language, region by region. Each point
// names the lesson grammar tags that teach it, so the map lights up from the lessons.
const mapPoint = z.object({
  id: z.string(),
  title: z.string(),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  summary: z.string(),
  tags: z.array(z.string()).default([]),
});

const grammarMap = defineCollection({
  loader: file("src/content/curriculum/grammar-map.yaml"),
  schema: z.object({
    order: z.number().int().positive(),
    name: z.string(),
    german: z.string(),
    place: z.string(),
    motto: z.string(),
    topics: z.array(z.object({ title: z.string(), points: z.array(mapPoint) })),
  }),
});

// A map point explained in full. The file name is the point's id; only points a lesson
// has taught have a card yet.
const mapCards = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "src/content/map" }),
  schema: z.object({}),
});

export const collections = { levels, briefs, lessons, grammarMap, mapCards };
