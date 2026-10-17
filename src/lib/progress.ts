// Which lessons the reader has finished, and which one they opened last.
// Kept in localStorage on this device only: there are no accounts (PLAN.md).
//
// All storage goes through loadProgress/saveProgress, so the Capacitor app can swap
// in Capacitor Preferences here and nowhere else (ADR 0004).

export interface Progress {
  finished: string[]; // lesson ids, in the order they were finished
  last: string | null; // the lesson opened most recently
}

export const PROGRESS_KEY = "die-burg:progress";

const EMPTY: Progress = { finished: [], last: null };

/** Read stored progress, tolerating anything missing or malformed (it starts fresh). */
export function parseProgress(raw: string | null): Progress {
  if (!raw) return EMPTY;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return EMPTY;
  }
  if (typeof data !== "object" || data === null) return EMPTY;
  const record = data as Record<string, unknown>;
  const finished = Array.isArray(record.finished)
    ? record.finished.filter((id): id is string => typeof id === "string")
    : [];
  const last = typeof record.last === "string" ? record.last : null;
  return { finished, last };
}

export function withFinished(progress: Progress, lessonId: string): Progress {
  if (progress.finished.includes(lessonId)) return progress;
  return { ...progress, finished: [...progress.finished, lessonId] };
}

export function withOpened(progress: Progress, lessonId: string): Progress {
  return { ...progress, last: lessonId };
}

export function loadProgress(): Progress {
  try {
    return parseProgress(localStorage.getItem(PROGRESS_KEY));
  } catch {
    return EMPTY; // storage blocked (private mode): reading still works, progress doesn't stick
  }
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // storage blocked or full: nothing useful to do; the page keeps working
  }
}
