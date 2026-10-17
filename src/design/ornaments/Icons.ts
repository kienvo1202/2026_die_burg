// Small UI icons as SVG path data, drawn on a 24×24 grid.
// Kept as data (not components) because buttons render them inline with their own
// size and colour.

export const ICON_LISTEN = {
  fill: "M4 9 H8 L13 5 V19 L8 15 H4 Z",
  stroke: "M16.2 9 Q18.2 12 16.2 15 M18.8 6.5 Q22.4 12 18.8 17.5",
};

// A crescent moon: "switch to Candlelight (dark)". A candle was tried first, but at
// icon size it read as the letter "i".
export const ICON_MOON = {
  fill: "M20.5 14.6 A8.6 8.6 0 1 1 9.4 3.5 A6.8 6.8 0 0 0 20.5 14.6 Z",
  stroke: "",
};

export const ICON_SUN = {
  fill: "M12 7.5 A4.5 4.5 0 1 1 11.99 7.5 Z",
  stroke:
    "M12 1.8 V4.4 M12 19.6 V22.2 M1.8 12 H4.4 M19.6 12 H22.2 M4.8 4.8 L6.6 6.6 M17.4 17.4 L19.2 19.2 M4.8 19.2 L6.6 17.4 M17.4 6.6 L19.2 4.8",
};
