// A vocabulary word as lessons declare it in their frontmatter, and how it is shown.

export type Article = "der" | "die" | "das";

export interface Word {
  de: string; // the lemma: "Morgen", "heißen", "Guten Morgen!"
  en: string;
  pos: "noun" | "verb" | "adjective" | "adverb" | "phrase" | "pronoun" | "other";
  article?: Article; // nouns only
  plural?: string; // nouns only: "-e", "¨-er", "-" (no change), or a full form; "" = no plural
  forms?: string; // verbs: "heißt, hieß, hat geheißen"
}

/** What the listen button reads: nouns with their article, so the gender is heard too. */
export function spokenForm(word: Word): string {
  return word.article ? `${word.article} ${word.de}` : word.de;
}

/** How the plural is printed after the noun. */
export function pluralLabel(word: Word): string {
  if (word.plural === undefined) return "";
  if (word.plural === "") return "(no plural)";
  return `(${word.plural})`;
}
