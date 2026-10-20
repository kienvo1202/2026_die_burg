// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [mdx()],
  // Static files only: the same dist/ folder becomes the website and, later, the
  // Capacitor apps (ADR 0004). No server features.
  output: "static",
  // Listen on this computer only. Astro's default is localhost, but saying it here
  // keeps it from silently changing (see "Traps" in CLAUDE.md).
  server: { host: "127.0.0.1", port: 4321 },
  devToolbar: { enabled: false },
  // Scope component styles with a class, so a class passed to a child component
  // (e.g. <Corner class="corner" />) is styled by the parent's <style> block.
  // The default (data attributes) silently drops those styles.
  scopedStyleStrategy: "class",
  // Keep HTML whitespace as written. Compression drops the space between a word and
  // an inline element on the next line ("and <em>name</em>" became "andname"),
  // which matters more in a reading course than a few bytes.
  compressHTML: false,
});
