// Deliberately failing, to prove CI goes red (CLAUDE.md: "a CI step that has never
// failed proves nothing"). Reverted in the next commit.
import { test } from "node:test";
import assert from "node:assert/strict";

test("CI must fail on this", () => {
  assert.equal(1 + 1, 3);
});
