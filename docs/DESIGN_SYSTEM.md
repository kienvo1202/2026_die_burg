# Design system

How Die Burg looks, and the rules that keep every page (and later the apps) looking like
the same book. The living version is the `/design` page: it renders every token and
component in the current theme. **If a component isn't on `/design`, it isn't part of the
system yet.** Why it is built this way: ADR 0005.

## The idea

**An illuminated storybook, read comfortably.** Parchment pages, iron-gall ink, red
rubrics, a little gold, Fraktur for the grand moments. The Brothers Grimm are the patron
saints: they collected the fairy tales *and* began the great German dictionary.

Three principles, in order of priority:

1. **Reading comes first.** Ornament frames text; it never sits behind it, never shrinks
   it, never replaces a word the learner must read.
2. **One source of truth.** Every colour and font comes from `src/design/tokens.css`.
3. **Colour is never the only signal.** Gender colours always accompany the printed
   article; states (finished, current) have a shape (seal, ribbon) and a text label.

## Tokens (`src/design/tokens.css`)

### Colour

Two themes share one set of names. **Vellum** (light) is the default; **Candlelight**
(dark) follows the system setting, and the toggle in the header overrides either way.

| Token | Use | Text? |
|---|---|---|
| `--color-page` | The page | background |
| `--color-card` | Cards, callouts, drop-cap box | background |
| `--color-ink` | Body text | ✔ |
| `--color-ink-soft` | Translations, captions, secondary text | ✔ |
| `--color-rubric` | Red headings, labels, speaker names, primary button | ✔ |
| `--color-lapis` | Links; *der* | ✔ |
| `--color-verdigris` | *das* | ✔ |
| `--color-gold` | Ornament: fleurons, corners, gilt frames | **never text** |
| `--color-gold-text` | Gold that is dark enough to read (listen icons, ticks) | ✔ |
| `--color-rule` | Hairlines and borders | no |
| `--color-on-rubric` | Text on a rubric background | ✔ (on rubric) |

Roles to use in components, rather than the raw names: `--gender-der`, `--gender-die`,
`--gender-das`, `--color-link`, `--color-focus`, `--color-heading`, `--color-accent`.

`src/design/tokens.test.ts` checks every text colour against page and card at ≥ 4.5:1
in both themes, and that the two copies of Candlelight in `tokens.css` are identical.

### Type

| Token | Font | For |
|---|---|---|
| `--font-body` | EB Garamond (variable) | Body text and **all German the reader learns from** |
| `--font-heading` | IM Fell English | Headings |
| `--font-label` | IM Fell English SC | Labels, speaker names, buttons |
| `--font-display` | UnifrakturMaguntia (Fraktur) | Brand, level titles, drop caps. **Display only** |

Fonts are self-hosted from `@fontsource` packages and imported once, in
`src/layouts/Base.astro`. No font is ever loaded from a CDN (offline apps; the German
Google Fonts ruling).

Sizes are fluid: `--text-xs` … `--text-2xl`, `--text-display`. Body text is
`--text-base` (about 18–21px): Garamond's small x-height needs it. Reading width is
`--measure` (65 characters). German text is marked `lang="de"` and gets weight 500 from
`base.css`, so it stands out from the English without a second typeface.

### Space, shape, motion

- Space: `--space-1` (4px) … `--space-8` (72px).
- Shape: `--radius-sm` / `--radius-md` (manuscripts are mostly square),
  `--border-hair`, `--border-gilt` (double gold), `--shadow-card`.
- Touch: `--tap-min` (44px) is the smallest anything tappable may be.
- Motion: `--ease-page`, `--duration-quick`, `--duration-page`. The page-turn fade
  (`.page-turn`) is skipped when the reader prefers reduced motion.

## Ornaments (`src/design/ornaments/`)

Inline SVG, coloured with `currentColor`, so they follow the theme:

| Ornament | Where |
|---|---|
| `Fleuron` | Between sections (via `Divider`) |
| `Corner` | The four corners of every `Card` |
| `Tower` | The brand mark; pressed into the wax seal |
| `Icons.ts` | Listen, candle (to dark), sun (to light) |

The paper grain is an SVG noise filter in a token (`--paper-grain`), not an image.

## Components

### Decorative (`src/components/ui/`)

| Component | What it is |
|---|---|
| `Initial` | Opening paragraph with an illuminated Fraktur initial. English text only |
| `Divider` | Gilt fleuron between hairlines |
| `Card` | Vellum card with gilt corners |
| `Button` | `primary` (one per page: the main action) or `plain`; a link when given `href` |
| `Seal` | Red wax seal: a finished lesson. Sizes `sm`, `md`, `lg` |
| `Ribbon` | Silk bookmark: the current lesson |
| `ThemeToggle` | Vellum ⇄ Candlelight |
| `Icon` | Renders an icon from `Icons.ts` |

### Lesson (`src/components/lesson/`)

| Component | Use in a lesson |
|---|---|
| `Say` | German inside English prose, with listen button and optional meaning |
| `Dialogue` + `Line` | The scene. English hidden until "Show the English" |
| `Chunk` | A phrase learned whole: literally / means |
| `Insight` | The lesson's one big idea, in a gilt frame. One per lesson |
| `WordList` | New words: article in gender colour *and* text, plural, forms, audio |
| `Check` | Self-check question; answer behind a tap (`<details>`, no JavaScript) |
| `Deeper` | Optional depth, closed by default. Never the core idea |
| `YourTurn` | A task, a model answer behind a tap, a "check yourself" list |
| `Recap` | "Now you can…" with the seal |
| `Listen` | The listen button inside the above; calls `speak()` |

## Rules

- **Tokens only.** No hex, `rgb()`, `hsl()` or font name outside `tokens.css`.
  `src/design/token-usage.test.ts` fails the build otherwise.
- **Fraktur is display only.** Never for German the reader must read, never for body
  text. Drop caps go on English opening paragraphs.
- **Touch targets ≥ `--tap-min`.** Nothing works only on hover.
- **Every German string is marked `lang="de"`** (the lesson components do it for you).
- **All audio goes through `speak()`** in `src/lib/speech.ts` (ADR 0006).
- **New component? Add it to `/design` and to the table above** in the same PR.
- Passing a `class` to a child component works because `astro.config.mjs` sets
  `scopedStyleStrategy: "class"`. Don't change it: the default silently drops those styles.
