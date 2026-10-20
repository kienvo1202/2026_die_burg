import { test } from "node:test";
import assert from "node:assert/strict";
import { parseProgress, withFinished, withOpened } from "./progress.ts";

test("nothing stored means a fresh start", () => {
  assert.deepEqual(parseProgress(null), { finished: [], last: null });
});

test("reads what was stored", () => {
  const stored = JSON.stringify({ finished: ["a1-01"], last: "a1-02" });
  assert.deepEqual(parseProgress(stored), { finished: ["a1-01"], last: "a1-02" });
});

test("broken JSON starts fresh instead of throwing", () => {
  assert.deepEqual(parseProgress("{not json"), { finished: [], last: null });
});

test("wrong shapes are dropped field by field", () => {
  const stored = JSON.stringify({ finished: ["a1-01", 7, null], last: 3 });
  assert.deepEqual(parseProgress(stored), { finished: ["a1-01"], last: null });
});

test("finishing a lesson twice records it once", () => {
  const once = withFinished({ finished: [], last: null }, "a1-01");
  assert.deepEqual(withFinished(once, "a1-01").finished, ["a1-01"]);
});

test("does not change the progress it was given", () => {
  const before = { finished: ["a1-01"], last: null };
  withFinished(before, "a1-02");
  withOpened(before, "a1-02");
  assert.deepEqual(before, { finished: ["a1-01"], last: null });
});

test("opening a lesson remembers it as the last one", () => {
  assert.equal(withOpened({ finished: [], last: "a1-01" }, "a1-02").last, "a1-02");
});
