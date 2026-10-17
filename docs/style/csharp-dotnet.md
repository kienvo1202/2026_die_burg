# C# and .NET

Applies `../CODE_STYLE.md` to C#. Read that first; this file adds what is specific to C#.

## Project settings that do the checking

Put these in `Directory.Build.props` at the repo root so every project gets them:

```xml
<Project>
  <PropertyGroup>
    <Nullable>enable</Nullable>                       <!-- the compiler tracks null -->
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
    <ImplicitUsings>enable</ImplicitUsings>
    <AnalysisLevel>latest</AnalysisLevel>
  </PropertyGroup>
</Project>
```

Nullable warnings are where null bugs hide; treating them as errors makes the type
checker real, the same reason CI runs it. Add an `.editorconfig` and check it with
`dotnet format --verify-no-changes`.

## Allowed idioms

| Allowed | Why it's fine |
|---|---|
| `var` when the type is visible on the right (`var orders = new List<Order>()`) | No information lost |
| `?.` and `??` | Common, and readers from JS/Swift/Kotlin know them |
| `is null` / `is not null` | Reads as English |
| Simple pattern matching: `if (msg is Fill fill)` | Replaces a cast plus a check |
| `record` for data | Plain data with value equality, no boilerplate |
| String interpolation `$"..."` | Everyone reads it |
| `async`/`await` | Sequential code that reads sequentially |
| LINQ `Where`/`Select`/`OrderBy`/`GroupBy`, one call per line | Like a comprehension |
| `using var` declarations | Disposal without nesting |

| Avoid | Prefer |
|---|---|
| `var x = GetThing();` where the type isn't obvious | The explicit type |
| LINQ `Aggregate` to build collections | A `foreach` loop, or `GroupBy`/`ToDictionary` |
| LINQ query syntax (`from x in ... select`) mixed with method syntax | One style; method syntax by default |
| Switch expressions nested in switch expressions | A `switch` statement or a small method |
| `dynamic`, reflection for ordinary logic | Real types |
| Extension methods on `string`/`object` for convenience | A plain static method in the file that uses it |
| Expression-bodied members over one line | A normal body |
| `async void` (except UI event handlers) | `async Task` |
| `.Result` / `.Wait()` on tasks | `await`. Blocking can deadlock |
| `catch (Exception)` deep in the code | Let it throw; catch at the boundary |

## The C# version of "the one-line wrapper": interface per class

.NET culture adds an interface to every class "for dependency injection". With one
implementation and no test fake that needs it, it's the shallow wrapper again: two
files, two names, one behaviour, and "Go to Definition" lands on the interface instead of
the code.

```csharp
// No: one implementation, nothing swaps it
public interface IPriceFormatter { string Format(decimal price); }
public sealed class PriceFormatter : IPriceFormatter
{
    public string Format(decimal price) => price.ToString("F2", CultureInfo.InvariantCulture);
}

// Yes: just the call, where it's used
var label = price.ToString("F2", CultureInfo.InvariantCulture);
```

Add an interface when a second implementation exists (a paper broker and a live broker)
or a test genuinely needs a fake (a clock, a network client). Those are real seams.

```csharp
// A real seam: tests need to control time, and live code needs the real clock.
public interface IClock { DateTimeOffset UtcNow { get; } }
```

## Loops versus LINQ

```csharp
// No: Aggregate building a dictionary
var byType = notes.Aggregate(new Dictionary<string, List<Note>>(), (acc, n) =>
{
    if (!acc.ContainsKey(n.Type)) acc[n.Type] = new();
    acc[n.Type].Add(n);
    return acc;
});

// Yes: the built-in that names the intent
var byType = notes.GroupBy(n => n.Type).ToDictionary(g => g.Key, g => g.ToList());

// Yes: one step per line for simple transforms
var keyTexts = notes
    .Where(n => n.Weight == Weight.Key)
    .Select(n => n.Text)
    .ToList();
```

## Plain data

```csharp
// Data is a record: one line, value equality, serialises as-is.
public sealed record Note(int Page, string Text, Weight Weight);

// When something must always hold, write the constructor out and check it there.
public sealed record Section
{
    public int FromPage { get; }
    public int ToPage { get; }
    public IReadOnlyList<Note> Notes { get; }

    public Section(int fromPage, int toPage, IReadOnlyList<Note> notes)
    {
        if (fromPage > toPage) throw new ArgumentException("fromPage must be <= toPage");
        FromPage = fromPage;
        ToPage = toPage;
        Notes = notes;
    }
}
```

## Errors at the boundary

```csharp
// Deep code lets it throw.
public static Book LoadBook(string path) =>
    JsonSerializer.Deserialize<Book>(File.ReadAllText(path))
        ?? throw new InvalidDataException($"{path} is empty");

// The boundary (an endpoint, a button, Main) turns it into something useful.
try
{
    var book = LoadBook(path);
    Show(book);
}
catch (Exception ex) when (ex is IOException or JsonException or InvalidDataException)
{
    ShowStatus($"Couldn't open {Path.GetFileName(path)}: {ex.Message}");
}
```

## Trading code: extra rules

- **Money and prices are `decimal`, never `double`.** `0.1 + 0.2 != 0.3` in binary
  floating point, and that error ends up in P&L and order sizes
- **Round on purpose, to the instrument's rules**: price to tick size, size to lot step,
  and say in a comment which direction and why (down, so as not to exceed risk)
- **Every timestamp is UTC** (`DateTimeOffset.UtcNow`). Convert to local only for
  display. Session times and daylight-saving changes are classic silent bugs
- **Inject the clock** (`IClock` above) so backtests are repeatable and tests can
  set the time
- **Paper and live are separate configurations**, with paper the default. The AI never
  connects to a live account or submits an order without an explicit yes
- **Orders are idempotent**: give each a client order ID so a retry after a timeout
  doesn't place it twice
- **Log every decision with its inputs** (signal, size, price, reason) so a bad trade can
  be explained afterwards
- **A frozen backtest is a regression test**: fixed data, fixed strategy, expected trades
  checked in CI. If the result changes, the PR says why
- A kill switch that flattens positions and stops new orders exists before the first
  live trade

## Commands

```bash
dotnet build -warnaserror
dotnet test
dotnet format --verify-no-changes
```
