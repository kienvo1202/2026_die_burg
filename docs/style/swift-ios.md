# Swift and iOS

Applies `../CODE_STYLE.md` to Swift. Read that first; this file adds what is specific to
Swift and Apple platforms.

## Settings that do the checking

- **Swift 6 language mode, or strict concurrency checking set to Complete.** Data races
  become compile errors instead of rare crashes
- Treat warnings as errors in the build settings for CI
- SwiftLint is optional. It is a dependency to install and configure; the compiler plus
  these rules cover most of it for a solo project

## Allowed idioms

| Allowed | Why it's fine |
|---|---|
| `guard let x else { return }` | Swift's built-in early return |
| `if let x { }` (shorthand) | Short, and reads clearly |
| `?.` and `??` | Common across languages |
| `struct` for data, `enum` with associated values for states | Plain data; impossible states can't be built |
| `async`/`await`, `Task {}` | Sequential code that reads sequentially |
| `map`/`filter`/`compactMap`, one per line | Like a comprehension |
| Trailing closure for the last argument | Standard Swift |
| `@Observable` (iOS 17+) for view models | Less ceremony than `ObservableObject` |

| Avoid | Prefer |
|---|---|
| `!` force-unwrap, `try!`, `as!` | `guard let`, `do/catch`, `as?`. If truly impossible, a comment saying why |
| Implicitly unwrapped optionals (`var x: Foo!`) | A real optional, or set it in `init` |
| A protocol for every type ("protocol-oriented" by default) | A concrete type until a second conformer exists |
| Custom operators | A named function |
| Combine pipelines for one-shot async work | `async`/`await` |
| `reduce(into:)` building dictionaries | A `for` loop, or `Dictionary(grouping:by:)` |
| `$0`/`$1` in closures longer than one short line | Named parameters |
| Long chains of optional chaining | Unwrap once with `guard`, then use plain values |

## The Swift version of "the one-line wrapper": protocol per type

```swift
// No: a protocol with one conformer and nothing that swaps it
protocol DateFormatting { func label(for date: Date) -> String }
struct DateFormatterService: DateFormatting {
    func label(for date: Date) -> String { date.formatted(date: .abbreviated, time: .omitted) }
}

// Yes: the call itself, where it's used
Text(order.date.formatted(date: .abbreviated, time: .omitted))
```

Add a protocol when a test needs a fake (a network client, a clock) or two real
implementations exist.

## Guard instead of nesting

```swift
// No
func show(orderID: String?) {
    if let id = orderID {
        if let order = store.order(id: id) {
            if order.isFilled {
                present(order)
            }
        }
    }
}

// Yes
func show(orderID: String?) {
    guard let id = orderID, let order = store.order(id: id) else { return }
    guard order.isFilled else { return }   // only filled orders have a receipt
    present(order)
}
```

## Compute first: view models

A SwiftUI view only draws. The logic lives in plain functions or a view model that has
no UIKit/SwiftUI imports and can be tested without a simulator.

```swift
// Pure: testable with plain values, no simulator needed.
func positionSummary(_ positions: [Position]) -> Summary {
    let exposure = positions.reduce(Decimal(0)) { $0 + $1.notional }   // a sum: reduce is fine
    return Summary(count: positions.count, exposure: exposure)
}

// Thin: draws what it's given.
struct SummaryView: View {
    let summary: Summary
    var body: some View {
        Text("\(summary.count) positions · \(summary.exposure, format: .currency(code: "USD"))")
    }
}
```

Extract a subview when it's reused or when `body` stops fitting on a screen, not for
every `HStack`.

## Platform rules

- **Secrets go in the Keychain**, never `UserDefaults` or the app bundle. Anything in
  the bundle can be read by anyone who downloads the app
- UI updates on the main actor (`@MainActor`); the compiler enforces this in strict mode
- Money is `Decimal`, formatted with `.currency(code:)`; never `Double`
- Dates are stored as `Date` (an absolute instant) and formatted for the user's locale
  only at display time
- Never commit signing certificates, provisioning profiles or `xcuserdata/`

## Commands

```bash
xcodebuild test -scheme {{SCHEME}} -destination 'platform=iOS Simulator,name=iPhone 16'
swift test   # for logic kept in a Swift package: runs on Linux CI too, much cheaper
```
