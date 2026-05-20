import { Card } from "@/components/common";
import { Company, CarbonTaxInput, SourceKey } from "@/types";
import { KAU_PRICE, SOURCE_COLORS } from "@/constants";
import { formatCurrency } from "@/lib/format";
import SourceInput from "./SourceInput";
import RangeSlider from "./RangeSlider";

type InputPanelProps = {
  companies: Company[];
  selectedCompanyId: string;
  onSelectCompany: (id: string) => void;
  yearMonth: string | null;
  input: CarbonTaxInput;
  onChange: (next: CarbonTaxInput) => void;
};

const SOURCE_META: { key: SourceKey; label: string; hint: string }[] = [
  { key: "gasoline", label: "휘발유 (Gasoline)", hint: "사업장 차량 · 보일러" },
  { key: "diesel", label: "디젤 (Diesel)", hint: "물류 · 발전기" },
  { key: "lpg", label: "LPG", hint: "사업장 가스 사용" },
];

const FREE_ALLOCATION_MARKS = [
  { value: 0, label: "0%" },
  { value: 50, label: "50%" },
  { value: 100, label: "100%" },
];

const KAU_PRICE_MARKS = [
  { value: KAU_PRICE.MIN, label: KAU_PRICE.MIN.toLocaleString() },
  { value: 20_000, label: "20,000" },
  { value: KAU_PRICE.MAX, label: KAU_PRICE.MAX.toLocaleString() },
];

export default function InputPanel({
  companies,
  selectedCompanyId,
  onSelectCompany,
  yearMonth,
  input,
  onChange,
}: InputPanelProps) {
  const set = <K extends keyof CarbonTaxInput>(key: K, value: CarbonTaxInput[K]) =>
    onChange({ ...input, [key]: value });

  const setSource = (key: SourceKey, value: number) =>
    onChange({
      ...input,
      emissionsBySource: { ...input.emissionsBySource, [key]: value },
    });

  return (
    <Card className="space-y-5 h-full w-full">
      <div>
        <h2 className="text-base font-semibold text-gray-900">입력 변수</h2>
        <p className="text-xs text-gray-500 mt-1">
          회사를 선택하고 배출량·할당량을 조정하세요. 결과는 실시간으로 업데이트됩니다.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-gray-500">대상 회사</label>
        <select
          value={selectedCompanyId}
          onChange={(e) => onSelectCompany(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-gray-500">산정 기간</label>
        <div className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-gray-50 text-gray-700">
          {yearMonth ?? "-"} (월간)
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">연료원별 배출량</span>
          <span className="text-xs text-gray-400">단위 tCO₂e</span>
        </div>
        {SOURCE_META.map(({ key, label, hint }) => (
          <SourceInput
            key={key}
            sourceKey={key}
            label={label}
            hint={hint}
            color={SOURCE_COLORS[key]}
            value={input.emissionsBySource[key]}
            onChange={(v) => setSource(key, v)}
          />
        ))}
      </div>

      <div className="space-y-3 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500">할당 · 상쇄</div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-gray-700">무상할당 비율</span>
            <span className="text-sm font-semibold text-emerald-700">
              {input.freeAllocationRate}%
            </span>
          </div>
          <RangeSlider
            value={input.freeAllocationRate}
            min={0}
            max={100}
            onChange={(v) => set("freeAllocationRate", v)}
            marks={FREE_ALLOCATION_MARKS}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">상쇄배출권 (KCU/KOC)</span>
            <span className="text-xs text-gray-400">의무량의 최대 5%</span>
          </div>
          <div className="relative">
            <input
              type="number"
              min={0}
              value={input.offsetCredits}
              onChange={(e) => set("offsetCredits", Number(e.target.value) || 0)}
              className="w-full px-3 py-2 pr-16 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              tCO₂e
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500">탄소 가격</div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">KAU 시세 적용가</span>
          <span className="text-sm font-semibold text-emerald-700">
            {formatCurrency(input.kauPrice)}
          </span>
        </div>
        <RangeSlider
          value={input.kauPrice}
          min={KAU_PRICE.MIN}
          max={KAU_PRICE.MAX}
          step={KAU_PRICE.STEP}
          onChange={(v) => set("kauPrice", v)}
          marks={KAU_PRICE_MARKS}
        />
        <div className="text-[11px] text-gray-400 space-x-3">
          <span>· 25년 평균 {formatCurrency(KAU_PRICE.AVG_2025)}</span>
          <span>· 19년 고점 {formatCurrency(KAU_PRICE.PEAK_2019)}</span>
        </div>
      </div>
    </Card>
  );
}
