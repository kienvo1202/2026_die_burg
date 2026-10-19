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

// An open book: the course.
export const ICON_BOOK = {
  fill: "",
  stroke:
    "M12 6.2 C9.6 4.6 6.2 4.2 3 4.7 V18.6 C6.2 18.1 9.6 18.5 12 20.1 C14.4 18.5 17.8 18.1 21 18.6 V4.7 C17.8 4.2 14.4 4.6 12 6.2 Z M12 6.2 V20.1",
};

// A quill: the reader's dictionary of words.
export const ICON_QUILL = {
  fill: "M19.8 3.2 C13.5 4.2 8.6 8.8 7.2 15.4 C10.4 14.6 13 13.4 15 11.2 C13.2 11.2 12 11 11 10.4 C13.4 10.2 15.3 9.4 16.6 8.1 C15.4 7.9 14.6 7.6 14 7.1 C16.4 6.6 18.6 5.2 19.8 3.2 Z",
  stroke: "M4.5 20.5 L9.6 12.4",
};

// A folded map: the German map of grammar and words.
export const ICON_MAP = {
  fill: "",
  stroke: "M3 6.2 L9 4 L15 6.2 L21 4 V17.8 L15 20 L9 17.8 L3 20 Z M9 4 V17.8 M15 6.2 V20",
};

export const ICON_SUN = {
  fill: "M12 7.5 A4.5 4.5 0 1 1 11.99 7.5 Z",
  stroke:
    "M12 1.8 V4.4 M12 19.6 V22.2 M1.8 12 H4.4 M19.6 12 H22.2 M4.8 4.8 L6.6 6.6 M17.4 17.4 L19.2 19.2 M4.8 19.2 L6.6 17.4 M17.4 6.6 L19.2 4.8",
};
