import { Company, SourceKey } from "@/types";

export type SourceEmissions = {
  emissionsBySource: Record<SourceKey, number>;
  yearMonth: string | null;
};

const SOURCE_KEYS: SourceKey[] = ["gasoline", "diesel", "lpg"];

export function getCompanySourceEmissions(company: Company | null): SourceEmissions {
  const empty: Record<SourceKey, number> = { gasoline: 0, diesel: 0, lpg: 0 };

  if (!company || company.emissions.length === 0) {
    return { emissionsBySource: empty, yearMonth: null };
  }

  const months = Array.from(new Set(company.emissions.map((e) => e.yearMonth))).sort();
  const latestMonth = months.at(-1)!;
  const latest = company.emissions.filter((e) => e.yearMonth === latestMonth);

  const emissionsBySource: Record<SourceKey, number> = { ...empty };
  for (const key of SOURCE_KEYS) {
    emissionsBySource[key] = Math.round(
      latest
        .filter((e) => e.source === key)
        .reduce((a, e) => a + e.emissions, 0)
    );
  }

  return { emissionsBySource, yearMonth: latestMonth };
}
