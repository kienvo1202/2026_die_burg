# TypeScript and JavaScript

Applies `../CODE_STYLE.md` to JS/TS. Read that first; this file adds what is specific.

## Settings that do the checking

Two workable setups:

- **TypeScript**: `"strict": true` in `tsconfig.json`, and `tsc --noEmit` in CI
- **Plain JavaScript with JSDoc types** (no build step): `// @ts-check` atop every file,
  types written as JSDoc comments, and the same `tsc --noEmit` in CI. The files you
  write are the files the browser runs. Good for small projects and browser extensions

Either way, types are only real if CI checks them. Otherwise they are checked only while
a file happens to be open in the editor.

## Allowed idioms

| Allowed | Why it's fine |
|---|---|
| `a ?? b` | Default only for null/undefined. Very useful |
| `a?.b`, one or two links | Short and clear |
| Spread `{ ...defaults, ...settings }` | Standard for copying and merging |
| Arrow functions for short callbacks | Everyone reads them |
| `for (const x of items)` | The plain loop |
| `async`/`await` | Python readers know it from asyncio |
| `map`/`filter`, one per line | Like a comprehension |
| Template literals `` `pp. ${from}–${to}` `` | Everyone reads them |

| Avoid | Means | Trap | Prefer |
|---|---|---|---|
| `a \|\| 20` | 20 if a is "falsy" | 0 and `""` are falsy, so a typed 0 becomes 20 | `??` |
| `!!x` | x as a boolean | Looks like a typo to a Python reader | The comparison: `x.length > 0` |
| `+str` | Convert to number | Invisible; `""` becomes 0 | `Number(str)` |
| `ok && doThing()` | Run if ok | An expression used as a statement | `if (ok) doThing();` |
| `reduce` building objects | Group / index | Hard to read, and slow when it copies | A `for...of` loop or `Object.groupBy` |
| Nested ternaries | | Unreadable past two branches | `if` / `else` |
| `any` (TS) | | Turns the checker off | A real type, or `unknown` and a check |
| Clever generic or conditional types in app code | | Readable only by TS experts | A plain interface |
| Long `?.` chains | | Hides which part can be missing | Unwrap once, early-return |
| `const $ = (s) => document.querySelector(s)` | | A one-line wrapper that looks like jQuery | `document.querySelector(s)` |

## Examples

```js
// No: reduce building an object
const byType = notes.reduce(
  (acc, n) => ({ ...acc, [n.type]: [...(acc[n.type] ?? []), n] }), {});

// Yes: a loop
const byType = {};
for (const note of notes) {
  if (!byType[note.type]) byType[note.type] = [];
  byType[note.type].push(note);
}
```

```js
// No: dense
const max = +input.value || 20;
cfg.debug && log(state);

// Yes: spelled out
const typed = Number(input.value);
const max = typed > 0 ? typed : 20;
if (cfg.debug) log(state);
```

```js
// Event handlers: assigned rather than added when the code re-runs on every render,
// because addEventListener would stack one more handler each time.
el.onclick = (e) => { /* ... */ };
```

## Plain data with a type

```js
/**
 * @typedef {object} Section
 * @property {number} fromPage
 * @property {number} toPage
 * @property {Note[]} notes
 */

/** @type {Section} */
const section = { fromPage: 12, toPage: 30, notes: [] };
```

## Platform rules

- **A dev server binds `127.0.0.1`**, never every interface, and refuses dot-paths
  (`.env`, `.git`). Node's default is every interface
- Browser extensions (MV3) cannot load remote code: vendor libraries into the repo
- Never put secrets in front-end code. Anything shipped to a browser is public
- Prefer the platform (`fetch`, `URL`, `Intl`, `structuredClone`) over small packages

## Commands

```bash
npm test                    # node --test "test/*.test.js": a glob, not one file
npx tsc --noEmit
```
