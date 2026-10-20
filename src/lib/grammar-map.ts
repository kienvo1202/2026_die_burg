// The German map as the pages need it: every region and point, each point with the
// written lessons that teach it and its card, when it has one.
// Astro-only (it reads the content collections), like course.ts.

import { getCollection, type CollectionEntry } from "astro:content";
import { loadCourse, type CourseLesson } from "./course.ts";

export type MapRegion = CollectionEntry<"grammarMap">["data"] & { id: string };
export type MapPoint = MapRegion["topics"][number]["points"][number];

export interface PlacedPoint extends MapPoint {
  /** Written lessons whose `grammar` includes one of this point's tags, in reading order. */
  taughtIn: CourseLesson[];
  card?: CollectionEntry<"mapCards">;
}

export interface PlacedRegion extends Omit<MapRegion, "topics"> {
  topics: { title: string; points: PlacedPoint[] }[];
}

export async function loadMap(): Promise<PlacedRegion[]> {
  // Collections don't keep file order, so regions carry their own: the Gate first.
  const regions = (await getCollection("grammarMap")).sort((a, b) => a.data.order - b.data.order);
  const cards = new Map((await getCollection("mapCards")).map((card) => [card.id, card]));
  const { lessons } = await loadCourse();
  const written = lessons.filter((lesson) => lesson.entry);

  return regions.map(({ id, data }) => ({
    id,
    ...data,
    topics: data.topics.map((topic) => ({
      title: topic.title,
      points: topic.points.map((point) => ({
        ...point,
        taughtIn: written.filter((lesson) => lesson.entry!.data.grammar.some((tag) => point.tags.includes(tag))),
        card: cards.get(point.id),
      })),
    })),
  }));
}

/** Every point of a region, topics flattened. */
export function pointsOf(region: PlacedRegion): PlacedPoint[] {
  return region.topics.flatMap((topic) => topic.points);
}
