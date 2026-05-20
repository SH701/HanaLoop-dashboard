export const SOURCES = [
  { key: "gasoline", label: "Gasoline", color: "#16A34A" },
  { key: "diesel",   label: "Diesel",   color: "#4ADE80" },
  { key: "lpg",      label: "LPG",      color: "#86EFAC" },
];

export const SOURCE_COLORS = Object.fromEntries(SOURCES.map((s) => [s.key, s.color]));