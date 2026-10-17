# MQL4 / MQL5 (MetaTrader)

Applies `../CODE_STYLE.md` to MetaTrader Expert Advisors and indicators. Read that first.
MQL is C++-like, runs inside the terminal, and touches real money, so the rules about
hidden state and verification matter more than usual.

## Settings that do the checking

- `#property strict` at the top of every MQL4 file. It turns on stricter compilation
  that catches many silent errors. MQL5 is strict by default
- Compile with zero warnings. A warning about an unused or truncated value is often a
  real bug in a sizing calculation

## Structure: compute first, trade last

`OnTick()` stays thin: gather inputs, call pure functions, then act.

```cpp
void OnTick()
{
   if(!IsNewBar()) return;                          // decide once per bar, not per tick

   double stopDistance = StopDistance(Symbol(), ATRPeriod);
   double lots = LotSize(AccountBalance(), RiskPct, stopDistance, Symbol());
   if(lots <= 0) return;                            // risk too small for the minimum lot

   if(BuySignal()) SubmitBuy(lots, stopDistance);   // the only place that trades
}
```

`LotSize`, `StopDistance` and `BuySignal` are your own functions: they take values and
return values, so they can be checked in a script or the Strategy Tester without placing
a trade. (Not `OrderLots`: MQL4 already has a built-in by that name.)

## Rules

- **Normalise every price** to the symbol's digits (`NormalizeDouble(price, Digits)`)
  before sending it. Unnormalised prices are rejected
- **Round lot sizes down to the lot step** and clamp to the broker's min and max
  (`MarketInfo(Symbol(), MODE_LOTSTEP)` in MQL4, `SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP)`
  in MQL5). Say in a comment why down
- **Check every trade call's result** and log `GetLastError()` with the inputs. A
  silently failed order is the most expensive kind of silent bug
- **A unique magic number per EA** and filter by it, so the EA only manages its own orders
- **Inputs (`input`/`extern`) are named with units**: `RiskPct`, `StopATRMultiple`,
  `MaxSpreadPoints`
- **No global variables changed from several functions.** Pass values in; return values
  out. Globals for configuration inputs only
- **Server time is not your local time.** Write down the broker's server time zone in
  the EA's header comment, and do session logic in one function

## Verification

- **Demo account first, always.** The AI never attaches an EA to a live account or
  changes live settings without an explicit yes
- **Keep a fixed Strategy Tester setup** (symbol, period, dates, `.set` file, model) as a
  regression test. Record its result in the journal; if a change moves it, the PR says why
- Spread and commission in the tester match the real account, or the backtest is fiction

## Allowed idioms

Plain C-style code: `if`, `for`, functions with explicit parameters, `struct` for
grouped values. Avoid macros (`#define`) for logic, deep class hierarchies, and
pointer tricks.
