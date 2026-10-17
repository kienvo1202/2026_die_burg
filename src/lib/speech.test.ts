import { test } from "node:test";
import assert from "node:assert/strict";
import { pickGermanVoice } from "./speech.ts";

test("prefers a voice from Germany over other German voices", () => {
  const voices = [{ lang: "de-AT" }, { lang: "de-DE" }, { lang: "en-US" }];
  assert.equal(pickGermanVoice(voices)?.lang, "de-DE");
});

test("falls back to any German voice", () => {
  const voices = [{ lang: "en-GB" }, { lang: "de-CH" }];
  assert.equal(pickGermanVoice(voices)?.lang, "de-CH");
});

test("prefers an on-device voice among equals", () => {
  const voices = [
    { lang: "de-DE", localService: false },
    { lang: "de-DE", localService: true },
  ];
  assert.equal(pickGermanVoice(voices)?.localService, true);
});

test("accepts Android-style underscores", () => {
  assert.equal(pickGermanVoice([{ lang: "de_DE" }])?.lang, "de_DE");
});

test("returns nothing when there is no German voice", () => {
  assert.equal(pickGermanVoice([{ lang: "en-US" }, { lang: "fr-FR" }]), undefined);
});
