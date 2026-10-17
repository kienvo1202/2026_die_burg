// Holds the design system to its own rules (docs/DESIGN_SYSTEM.md):
//   1. every text colour is readable (≥ 4.5:1, WCAG AA) on both page and card,
//      in both themes;
//   2. the two copies of the dark theme in tokens.css are identical.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("./tokens.css", import.meta.url), "utf8");

/** The `--color-*: #RRGGBB` values declared inside the block that starts at `marker`. */
function hexColoursIn(marker: string): Map<string, string> {
  const start = css.indexOf(marker);
  assert.notEqual(start, -1, `tokens.css has no block starting "${marker}"`);
  const end = css.indexOf("}", start);
  const block = css.slice(start, end);
  const colours = new Map<string, string>();
  for (const match of block.matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]{6})\b/g)) {
    colours.set(match[1], match[2]);
  }
  return colours;
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const TEXT_COLOURS = ["ink", "ink-soft", "rubric", "lapis", "verdigris", "gold-text"];
const BACKGROUNDS = ["page", "card"];

const themes = {
  Vellum: hexColoursIn(":root {"),
  Candlelight: hexColoursIn(':root[data-theme="dark"] {'),
};

for (const [name, colours] of Object.entries(themes)) {
  for (const text of TEXT_COLOURS) {
    for (const background of BACKGROUNDS) {
      test(`${name}: ${text} on ${background} is at least 4.5:1`, () => {
        const ratio = contrast(colours.get(text)!, colours.get(background)!);
        assert.ok(ratio >= 4.5, `${text} on ${background} is only ${ratio.toFixed(2)}:1`);
      });
    }
  }

  test(`${name}: text on a rubric button is at least 4.5:1`, () => {
    const ratio = contrast(colours.get("on-rubric")!, colours.get("rubric")!);
    assert.ok(ratio >= 4.5, `on-rubric on rubric is only ${ratio.toFixed(2)}:1`);
  });
}

test("the system-preference and toggle copies of Candlelight are identical", () => {
  const start = css.indexOf(':root:not([data-theme="light"]) {');
  const bodyOf = (from: number) => css.slice(css.indexOf("{", from) + 1, css.indexOf("}", from)).trim();
  const fromMedia = bodyOf(start);
  const fromToggle = bodyOf(css.indexOf(':root[data-theme="dark"] {'));
  const normalise = (block: string) => block.replace(/\s+/g, " ");
  assert.equal(normalise(fromMedia), normalise(fromToggle));
});
