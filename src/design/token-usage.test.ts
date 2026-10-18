// Colours and fonts are defined only in src/design/tokens.css (ADR 0005).
// This test reads every other source file and fails on a raw colour or a font name,
// so a quick fix can't quietly start a second palette.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

// fileURLToPath, not URL.pathname: on Windows .pathname gives "/D:/..." and breaks every path.
const SRC = fileURLToPath(new URL("../", import.meta.url));
const ALLOWED = new Set(["design/tokens.css"]);
const CHECKED_EXTENSIONS = [".astro", ".css", ".mdx", ".ts"];

function sourceFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...sourceFiles(path));
    else if (CHECKED_EXTENSIONS.some((ext) => entry.name.endsWith(ext))) files.push(path);
  }
  return files;
}

/** The parts of a file that style things: <style> blocks, whole .css files, style="" and SVG paint attributes. */
function stylingText(path: string, text: string): string {
  if (path.endsWith(".css")) return text;
  const parts: string[] = [];
  for (const match of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) parts.push(match[1]);
  for (const match of text.matchAll(/\b(?:style|fill|stroke|color)=["'{`]([^"'}`]*)/g)) parts.push(match[1]);
  return parts.join("\n");
}

const RAW_COLOUR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|lab|lch)\(/;
const RAW_FONT = /font-family:(?!\s*(?:var\(|inherit))/;

/** "design/tokens.css", with forward slashes on every OS, so it matches ALLOWED on Windows too. */
function nameInSrc(path: string): string {
  return relative(SRC, path).split(sep).join("/");
}

const files = sourceFiles(SRC).filter((path) => !ALLOWED.has(nameInSrc(path)));

test("found source files to check", () => {
  assert.ok(files.length > 10, `only ${files.length} files found under ${SRC}`);
});

for (const path of files) {
  const name = nameInSrc(path);
  if (name.endsWith(".test.ts")) continue;
  test(`${name} uses tokens for colours and fonts`, () => {
    const styling = stylingText(path, readFileSync(path, "utf8"));
    const colour = styling.match(RAW_COLOUR);
    assert.equal(colour, null, `raw colour "${colour?.[0]}": use a --color-* token`);
    const font = styling.match(RAW_FONT);
    assert.equal(font, null, `font-family without a token: use var(--font-*)`);
  });
}
