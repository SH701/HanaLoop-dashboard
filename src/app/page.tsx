"use client";

import { useEffect } from "react";
import {
  Activity,
  TrendingDown,
  Building2,
  BadgeDollarSign,
} from "lucide-react";
import KpiCard from "@/components/dashboard/KpiCard";
import EmissionsChart from "@/components/dashboard/EmissionsChart";
import Card from "@/components/common/Card";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { useCompanyStore } from "@/stores/useCompanyStore";
import { fetchCompanies, fetchCountries } from "@/lib/api";

export default function Home() {
  const { setCompanies, setCountries } = useCompanyStore();
  const { totalEmissions, momChange, topCompany, estimatedTax } =
    useDashboard();

  useEffect(() => {
    Promise.all([fetchCompanies(), fetchCountries()]).then(
      ([companies, countries]) => {
        setCompanies(companies);
        setCountries(countries);
      },
    );
  }, [setCompanies, setCountries]);

  const momLabel =
    momChange == null
      ? "-"
      : `${momChange > 0 ? "+" : ""}${momChange.toFixed(1)}% 전월 대비`;

  const momTrend =
    momChange == null ? "neutral" : momChange > 0 ? "up" : "down";

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold text-text">탄소 배출 대시보드</h1>
      {/* KPI 카드  */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          title="총 배출량"
          value={`${totalEmissions.toLocaleString()} tCO₂e`}
          icon={Activity}
        />
        <KpiCard
          title="전월 대비 변화"
          value={
            momChange == null
              ? "-"
              : `${momChange > 0 ? "+" : ""}${momChange.toFixed(1)}%`
          }
          sub={momChange == null ? undefined : momLabel}
          icon={TrendingDown}
          trend={momTrend}
        />
        <KpiCard
          title="최다 배출 회사"
          value={topCompany ?? "-"}
          icon={Building2}
        />
        <KpiCard
          title="탄소세 예상액"
          value={estimatedTax > 0 ? `₩${estimatedTax.toLocaleString()}` : "-"}
          sub="K-ETS ₩40,700/tCO₂e"
          icon={BadgeDollarSign}
        />
      </div>

      {/* 스택 바 차트 */}
      <Card>
        <h2 className="text-sm font-medium text-text-muted mb-4">
          월별 배출량
        </h2>
        <EmissionsChart />
      </Card>
    </div>
  );
}
