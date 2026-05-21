"use client";

import { useEffect, useMemo, useState } from "react";
import { useCompanyStore } from "@/stores/useCompanyStore";
import { fetchCompanies, fetchCountries } from "@/lib/api";
import { CarbonTaxInput } from "@/types";
import {
  KAU_PRICE,
  FREE_ALLOCATION_DEFAULT,
  AUTO_OFFSET_RATIO,
} from "@/constants";
import { getCompanySourceEmissions } from "@/lib/getCompanySourceEmissions";
import { useCarbonTax } from "@/hooks/useCarbonTax";
import {
  InputPanel,
  ResultCard,
  BreakdownChart,
  MethodologyCard,
} from "@/components/carbon-tax";

const INITIAL_INPUT: CarbonTaxInput = {
  emissionsBySource: { gasoline: 0, diesel: 0, lpg: 0 },
  freeAllocationRate: FREE_ALLOCATION_DEFAULT,
  offsetCredits: 0,
  kauPrice: KAU_PRICE.DEFAULT,
};

const sumSources = (s: CarbonTaxInput["emissionsBySource"]) =>
  s.gasoline + s.diesel + s.lpg;

export default function CarbonTaxPage() {
  const { companies, setCompanies, setCountries } = useCompanyStore();
  const [selectedId, setSelectedId] = useState<string>("");
  const [input, setInput] = useState<CarbonTaxInput>(INITIAL_INPUT);

  useEffect(() => {
    if (companies.length > 0) return;
    Promise.all([fetchCompanies(), fetchCountries()]).then(([cs, ctry]) => {
      setCompanies(cs);
      setCountries(ctry);
    });
  }, [companies.length, setCompanies, setCountries]);

  useEffect(() => {
    if (companies.length > 0 && !selectedId) {
      setSelectedId(companies[0].id);
    }
  }, [companies, selectedId]);

  const selectedCompany = useMemo(
    () => companies.find((c) => c.id === selectedId) ?? null,
    [companies, selectedId]
  );
  const sourceData = useMemo(
    () => getCompanySourceEmissions(selectedCompany),
    [selectedCompany]
  );

  useEffect(() => {
    if (!selectedCompany) return;
    const { emissionsBySource } = sourceData;
    setInput((prev) => ({
      ...prev,
      emissionsBySource,
      offsetCredits: Math.round(sumSources(emissionsBySource) * AUTO_OFFSET_RATIO),
    }));
  }, [selectedCompany, sourceData]);

  const result = useCarbonTax(input);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <header>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">탄소세 시뮬레이터</h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          K-ETS(배출권거래제) 기반 월간 탄소세 추정. 입력값을 조정하면 실시간 반영됩니다.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-4 md:gap-6 items-stretch">
        <aside className="col-span-12 lg:col-span-4 flex">
          <InputPanel
            companies={companies}
            selectedCompanyId={selectedId}
            onSelectCompany={setSelectedId}
            yearMonth={sourceData.yearMonth}
            input={input}
            onChange={setInput}
          />
        </aside>

        <section className="col-span-12 lg:col-span-8 flex flex-col gap-4 md:gap-6">
          <ResultCard result={result} kauPrice={input.kauPrice} />
          <BreakdownChart result={result} kauPrice={input.kauPrice} />
          <MethodologyCard />
        </section>
      </div>
    </div>
  );
}
