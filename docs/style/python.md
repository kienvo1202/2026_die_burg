# Python

Applies `../CODE_STYLE.md` to Python. Read that first; this file adds what is specific.

## Tools that do the checking

- **ruff** for linting and formatting (`ruff check`, `ruff format`): one fast tool
  replacing flake8, isort and black
- **pyright** or **mypy** for type hints, in CI
- **pytest** for tests

These are dev dependencies, listed in `requirements-dev.txt` or `pyproject.toml`.

## Allowed idioms

| Allowed | Why it's fine |
|---|---|
| One-level list/dict comprehensions | Clearer than the loop for one-step transforms |
| f-strings | Everyone reads them |
| `@dataclass` (often `frozen=True`) for data | Plain data with a type |
| Type hints on every function signature | The signature documents itself |
| `pathlib.Path` | Clearer than `os.path` string handling |
| `with` for files, locks, connections | Cleanup that can't be forgotten |
| `if not items: return` | Early return |
| `enumerate`, `zip` | Standard |

| Avoid | Prefer |
|---|---|
| Nested comprehensions (`[x for row in m for x in row if ...]`) | A loop |
| Heavy use of `:=` (walrus) | A separate assignment line |
| `*args, **kwargs` passed through layers | Explicit parameters: the signature should say what it takes |
| Mutable default arguments (`def f(items=[])`) | `items: list | None = None`, then create inside |
| Bare `except:` or `except Exception: pass` | Catch the specific error where you can act on it |
| `from module import *` | Named imports |
| Metaclasses, decorators that change signatures | Plain functions |
| `inplace=True` in pandas | Assign the result: `df = df.dropna()` |
| Classes with only `__init__` and one method | A function |

## Examples

```python
# No: a shallow wrapper
def get_json(url):
    return requests.get(url).json()

# Yes: the call, with the decisions visible
data = requests.get(url, timeout=10).json()
```

```python
# No: mutable default, and it changes the caller's list
def add_note(note, notes=[]):
    notes.append(note)
    return notes

# Yes: returns a new list; the caller's is untouched
def with_note(notes: list[Note], note: Note) -> list[Note]:
    return [*notes, note]
```

```python
@dataclass(frozen=True)
class Section:
    from_page: int
    to_page: int
    notes: tuple[Note, ...] = ()

    def __post_init__(self):
        if self.from_page > self.to_page:
            raise ValueError("from_page must be <= to_page")
```

## Data work

- **Keep raw data out of git** (`data/raw/` in `.gitignore`) and never print real
  customer rows into logs or notebooks that get committed
- **One cell, one step** in notebooks; move anything reused into a `.py` module with a
  test
- **Money is `Decimal`**, not `float`, when the exact amount matters
- **Check row counts after every join and filter.** A join that silently duplicates or
  drops rows is the data version of an off-by-one error
- **Time zones**: store UTC (`datetime.now(timezone.utc)`), convert for display

## Commands

```bash
ruff check . && ruff format --check .
pyright
pytest
```
