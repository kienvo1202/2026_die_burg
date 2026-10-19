// The tales (ADR 0007, proposed): short stories read between lessons. They are still
// hand-made drafts in src/drafts/tales/, so this reads them straight from the files
// rather than from a content collection; each names the lesson it follows (`readAfter`).

export interface TaleFrontmatter {
  title: string;
  readAfter: string; // lesson id, e.g. "a1-02"
  minutes: number;
}

export interface Tale {
  slug: string; // "rumpelstilzchen": the page is /tales/<slug>
  frontmatter: TaleFrontmatter;
  Content: (props: { components: Record<string, unknown> }) => unknown;
}

interface TaleFile {
  default: Tale["Content"];
  frontmatter: TaleFrontmatter;
}

export function loadTales(): Tale[] {
  const files = import.meta.glob<TaleFile>("../drafts/tales/*.mdx", { eager: true });
  return Object.entries(files).map(([path, file]) => ({
    slug: path.split("/").pop()!.replace(/\.mdx$/, ""),
    frontmatter: file.frontmatter,
    Content: file.default,
  }));
}

/** The tale read after this lesson, if there is one. */
export function taleAfter(tales: Tale[], lessonId: string): Tale | undefined {
  return tales.find((tale) => tale.frontmatter.readAfter === lessonId);
}
