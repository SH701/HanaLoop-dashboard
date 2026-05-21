"use client";

import { useEffect } from "react";
import {
  Activity,
  TrendingDown,
  Building2,
  BadgeDollarSign,
} from "lucide-react";

import { KpiCard, EmissionsChart, SourceChart, PostList } from "@/components/dashboard";
import { Card } from "@/components/common";
import { KpiCardSkeleton, ChartSkeleton, PostListSkeleton } from "@/components/skeleton";
import { useDashboard } from "@/hooks/useDashboard";
import { useCompanyStore } from "@/stores/useCompanyStore";
import { fetchCompanies, fetchCountries } from "@/lib/api";
import { K_ETS_RATE } from "@/constants";
import FilterBar from "@/components/FilterBar";

export default function Home() {
  const { setCompanies, setCountries, setLoading, setError, isLoading, error } = useCompanyStore();
  const { totalEmissions, momChange, topCompany, estimatedTax } =
    useDashboard();

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCompanies(), fetchCountries()])
      .then(([companies, countries]) => {
        setCompanies(companies);
        setCountries(countries);
      })
      .catch(() => setError("데이터를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [setCompanies, setCountries, setLoading, setError]);

  const momLabel =
    momChange == null
      ? "-"
      : `${momChange > 0 ? "+" : ""}${momChange.toFixed(1)}% 전월 대비`;

  const momTrend =
    momChange == null ? "neutral" : momChange > 0 ? "up" : "down";

  if (error) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl md:text-2xl font-semibold text-text">탄소 배출 대시보드</h1>
        <FilterBar />
      </div>

      {/* KPI 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
          </>
        ) : (
          <>
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
              value={
                estimatedTax > 0 ? `₩${estimatedTax.toLocaleString()}` : "-"
              }
              sub={`K-ETS ₩${K_ETS_RATE.toLocaleString()}/tCO₂e`}
              icon={BadgeDollarSign}
            />
          </>
        )}
      </div>

      {/* 스택 바 차트 */}
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <Card>
          <EmissionsChart />
        </Card>
      )}

      <div className="flex flex-col lg:flex-row gap-4 lg:items-stretch">
        {/* 도넛 차트 */}
        {isLoading ? (
          <ChartSkeleton
            chartClassName="h-[250px]"
            wrapperClassName="lg:flex-[4]"
          />
        ) : (
          <Card className="lg:flex-[4]">
            <SourceChart />
          </Card>
        )}
        {/* 보고서 목록 */}
        {isLoading ? (
          <Card className="lg:flex-[6]">
            <PostListSkeleton />
          </Card>
        ) : (
          <Card className="lg:flex-[6]">
            <PostList />
          </Card>
        )}
      </div>
    </div>
  );
}
