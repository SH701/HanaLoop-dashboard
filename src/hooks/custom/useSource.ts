import { useCompanyStore } from "@/stores/useCompanyStore";
import { SOURCES } from "@/constants/source";

export function useSource() {
  const { companies, selectedCountry, selectedCompany } = useCompanyStore();

  const filtered = companies.filter((c) => {
    if (selectedCompany) return c.id === selectedCompany;
    if (selectedCountry) return c.country === selectedCountry;
    return true;
  });

  // 월별 데이터 (EmissionsChart용)
  const monthMap: Record<string, Record<string, number>> = {};
  for (const company of filtered) {
    for (const e of company.emissions) {
      if (!monthMap[e.yearMonth]) monthMap[e.yearMonth] = {};
      monthMap[e.yearMonth][e.source] = (monthMap[e.yearMonth][e.source] ?? 0) + e.emissions;
    }
  }

  const monthlyData = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, sources]) => ({ month, ...sources }));

  const activeSources = SOURCES.filter((s) =>
    filtered.some((c) => c.emissions.some((e) => e.source === s.key))
  );

  // 소스별 합계 (SourceChart 도넛용)
  const totals: Record<string, number> = {};
  for (const company of filtered) {
    for (const e of company.emissions) {
      totals[e.source] = (totals[e.source] ?? 0) + e.emissions;
    }
  }

  const total = Object.values(totals).reduce((a, b) => a + b, 0);

  const sourceData = SOURCES.filter((s) => totals[s.key] != null).map((s) => ({
    key: s.key,
    label: s.label,
    color: s.color,
    value: totals[s.key],
    percent: total > 0 ? Math.round((totals[s.key] / total) * 100) : 0,
  }));

  return { monthlyData, activeSources, sourceData, total };
}
