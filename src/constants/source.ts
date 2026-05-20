import { SourceKey } from "@/types";

type SourceMeta = {
  key: SourceKey;
  label: string;
  color: string;
};

export const SOURCES: SourceMeta[] = [
  { key: "gasoline", label: "Gasoline", color: "#16A34A" },
  { key: "diesel", label: "Diesel", color: "#4ADE80" },
  { key: "lpg", label: "LPG", color: "#86EFAC" },
];

export const SOURCE_COLORS: Record<SourceKey, string> = {
  gasoline: "#16A34A",
  diesel: "#4ADE80",
  lpg: "#86EFAC",
};
