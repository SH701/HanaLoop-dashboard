import { useFilteredCompanies } from "@/hooks/useFilteredCompanies";
import { K_ETS_RATE } from "@/constants";
import { Company } from "@/types";

export type MomTrend = "up" | "down" | "neutral";

export type DashboardStats = {
  totalEmissions: number;
  momChange: number | null;
  momLabel: string;
  momTrend: MomTrend;
  topCompany: string | null;
  estimatedTax: number;
};

const sumEmissions = (c: Company) =>
  c.emissions.reduce((acc, e) => acc + e.emissions, 0);

const pickTopCompany = (companies: Company[]) =>
  companies.length === 0
    ? null
    : companies.reduce((top, c) => (sumEmissions(c) > sumEmissions(top) ? c : top))
        .name;

export function useDashboard(): DashboardStats {
  const filtered = useFilteredCompanies();

  const allEntries = filtered.flatMap((c) => c.emissions);
  const months = Array.from(new Set(allEntries.map((e) => e.yearMonth))).sort();
  const latestMonth = months.at(-1) ?? null;
  const prevMonth = months.at(-2) ?? null;

  const sumByMonth = (month: string) =>
    allEntries
      .filter((e) => e.yearMonth === month)
      .reduce((acc, e) => acc + e.emissions, 0);

  const totalEmissions = latestMonth ? sumByMonth(latestMonth) : 0;
  const prevTotal = prevMonth ? sumByMonth(prevMonth) : null;
  const momChange =
    prevTotal != null && prevTotal > 0
      ? ((totalEmissions - prevTotal) / prevTotal) * 100
      : null;

  const momLabel =
    momChange == null
      ? "-"
      : `${momChange > 0 ? "+" : ""}${momChange.toFixed(1)}% 전월 대비`;

  const momTrend: MomTrend =
    momChange == null ? "neutral" : momChange > 0 ? "up" : "down";

  return {
    totalEmissions,
    momChange,
    momLabel,
    momTrend,
    topCompany: pickTopCompany(filtered),
    estimatedTax: totalEmissions * K_ETS_RATE,
  };
}
