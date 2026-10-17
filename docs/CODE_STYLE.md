# Code style: written for every reader

Code here should be easy to follow for someone who knows only the basics of the language,
whatever they learned first: Python scripts, functional programming, or classic
object-oriented code. Most of the code is written by an AI assistant; these rules are
what it is held to, and what a review checks.

Language-specific rules and the list of allowed idioms are in `style/`:
`csharp-dotnet.md`, `swift-ios.md`, `typescript-javascript.md`, `python.md`, `mql.md`.
The illustrated version, with sixteen side-by-side comparisons, is
`style/examples/code-for-every-reader.html`.

Examples below are in Python because it reads closest to pseudocode. The rules are the
same in every language.

---

## The idea underneath

Readers from different backgrounds share some common ground: **plain functions, plain
data, loops and early returns, names from the problem itself, and inputs you can see in
the signature.** Code that stays there reads well for all of them.

Every rule below reduces one of four things the reader has to hold in their head:

| | What it costs the reader |
|---|---|
| **Jumps** | Leaving this spot to look up another function or file |
| **Idioms** | Language tricks they must already know |
| **Hidden state** | Things that affect the result but aren't visible here |
| **Nesting** | How many open conditions they track at once |

**The one-line test:** could someone who knows only the basics of the language
understand this file by reading it top to bottom, without opening another?

---

## The rules

### 1. Call libraries directly
*Jumps, hidden state.* A wrapper whose body is one library call adds a name and hides
nothing. Worse, readers assume a custom function handles something (timeouts, errors,
retries) and it doesn't.

```python
# No: a shallow wrapper                 # Yes: the call itself
def get_text(url):                      html = requests.get(url, timeout=10).text
    return requests.get(url).text
```

Wrap a library call only when the wrapper **adds a decision** (a default, a retry, an
error message, a domain name) **and** has two or more callers. That is a *deep* function:
small interface, real work behind it.

### 2. Don't split a recipe into crumbs
*Jumps.* A short linear task cut into helpers that are each used once spreads one idea
over many places. Extract a piece only when it is used twice or more, when it is pure
logic worth its own test, or when its name says something the body can't say quickly.
"It made the function shorter" is not a reason.

### 3. Functions first; classes for things with a lifecycle
*Jumps, hidden state.* Start with a function. Use a class for something that owns state
and behaviour that change together over time (a connection, a session, a view: open,
use, close). Add inheritance or an interface only when **two real variants** exist, not
imagined ones. A base class, a subclass and a factory for one case are three jumps for
nothing.

### 4. Plain data over accessor classes
*Hidden state.* Data is a plain record: a dict with a type, a dataclass, a C# `record`, a
Swift `struct`. No getters and setters with nothing behind them. Plain data serialises,
prints and compares without ceremony. Keep a class or a validating constructor only when
something must stay true on every change (`from_page <= to_page`).

### 5. Compute first, touch the world last
*Hidden state, jumps.* Put the thinking in a function that takes data and returns data.
Put screens, files, databases and the network in a separate thin function that only
carries out what the first decided. (Gary Bernhardt's name for this: *functional core,
imperative shell*.) The logic is then testable with plain values, and the side effects
are all in one visible place.

```python
def order_size(balance, risk_pct, stop_distance, lot_step):   # pure: easy to test
    raw = balance * risk_pct / stop_distance
    return math.floor(raw / lot_step) * lot_step

def place_order(broker, signal, account):                     # thin: only does I/O
    size = order_size(account.balance, 0.01, signal.stop_distance, broker.lot_step)
    broker.submit(signal.symbol, size)
```

### 6. Loops when building up; map/filter for one step
*Idioms.* `map`/`filter` (or a comprehension, or LINQ `Where`/`Select`) for a one-step
transform, one step per line. A plain loop when accumulating into a structure or doing
several things per item. `reduce`/`Aggregate` only for sums. No nested ternaries. A
well-named built-in (`groupby`, `GroupBy`, `Object.groupBy`) beats both, if readers know it.

### 7. Return early instead of nesting
*Nesting.* Each guard closes a case and the reader can forget it. The real work sits at
the bottom, not four levels in. At most three levels deep.

```python
def on_pick(page, book):
    if book is None:
        return
    section = find_section(book, page)
    if section is None:          # nothing analysed here yet
        return
    if section.running:          # results arrive when the call ends
        return
    show_notes(section)
```

### 8. A short, written list of allowed idioms
*Idioms.* Every language has shorthand insiders read instantly and visitors misread.
Don't ban it all: pick a few that earn their keep, list them in `style/<language>.md`,
and keep the rest out. Two operators are learned once; a dozen are a barrier.

### 9. Names from the problem
*Hidden state, jumps.*
- Use the domain's own words (order, position, page, invoice), and **one word per
  concept**. If the store says `chunk` and the screen says `section`, a newcomer has to
  discover they are the same thing
- Units in names: `timeout_ms`, `price_usd`, `stop_distance_pips`
- Booleans as yes/no questions: `is_stale`, `has_position`
- Functions named for what they return (`order_size`) or what they do (`place_order`);
  never `process`, `handle`, `manager`, `do_stuff`
- No single letters outside tiny loops and lambdas

### 10. Comments say why
*Hidden state.* The code says *what*. A comment records what the code can't: a reason, a
trap, a decision that looks wrong at first glance.

```python
# Round down, not to nearest: rounding up could exceed the risk limit.
size = math.floor(raw / lot_step) * lot_step
```

A comment that repeats the code (`# loop over orders`) is noise, and goes stale.

### 11. Every input in the signature
*Hidden state.* No module-level mutable state read from inside functions; no singletons
reached for from anywhere. If a function depends on it, it's a parameter. For three or
more parameters, or any true/false flag, pass named arguments or an options object, so
`render(cells, True, False, 3)` becomes `render(cells, current=3, on_pick=open_page)`.

### 12. Let errors throw; catch where it means something
*Hidden state, nesting.* Don't catch, log and return `None`: it turns a clear error at
the source into a confusing one far away. Catch only where you can do something useful
(tell the user what went wrong and what to do, retry, or fall back on purpose). Never
an empty catch.

### 13. async/await over callback chains
*Nesting.* Sequential async code reads like a recipe: one `await` per line. Nested
callbacks or `.then` chains put the logic in a pyramid.

### 14. Keep things next to their only user
*Jumps.* A constant or helper used in one place lives in that file, near its use. It
moves to a shared module when it gets a second user. Avoid folders named `utils`,
`helpers`, `common` or `constants`: they group by *kind*, so reading one feature means
opening four files. Group by feature.

### 15. Don't change what you were handed
*Hidden state.* A function doesn't modify the objects passed into it; it returns a new
value. Changing a local you just created is fine. The rule is about other people's data.

### 16. Don't overcorrect
"Fewer functions" is not the goal. A 300-line function doing five unrelated things is as
hard as forty tiny ones. The goal: each function does one thing you could name out loud,
and every name a reader meets is worth learning.

---

## Reviewing AI-written code against this

After any change, ask the assistant (and yourself):

1. Read the diff as someone who knows only the basics of the language. Which lines would
   they need to look up? *(Each one is a candidate to simplify.)*
2. For each new function, class or interface: who calls it? One caller and not pure and
   tested → inline it.
3. Is there a new file, folder or layer? What would this look like without it?
4. Does any function read something that isn't in its parameters?
5. Is any error caught and swallowed?
6. Does every comment say why rather than what?

The assistant imitates the code around it more than it follows written rules. Keep one
clean **model file** and name it in `CLAUDE.md`; fix messy files before they get copied.
