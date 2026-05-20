import { useFilteredCompanies } from "@/hooks/useFilteredCompanies";
import { K_ETS_RATE } from "@/constants";

export type DashboardStats = {
  totalEmissions: number; // 총배출량 
  momChange: number | null; // 전월대비 변화율 
  topCompany: string | null; // 최다배출회사 이름
  estimatedTax: number; // 탄소세예상액 
};

export function useDashboard(): DashboardStats {
  const filtered = useFilteredCompanies();

  const allEntries = filtered.flatMap((c) => c.emissions);
  const months = [...new Set(allEntries.map((e) => e.yearMonth))].sort();
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

  const topCompany =
    filtered.length === 0
      ? null
      : filtered.reduce((top, c) => {
          const sum = c.emissions.reduce((a, e) => a + e.emissions, 0);
          const topSum = top.emissions.reduce((a, e) => a + e.emissions, 0);
          return sum > topSum ? c : top;
        }).name;

  const estimatedTax = totalEmissions * K_ETS_RATE;

  return { totalEmissions, momChange, topCompany, estimatedTax };
}
