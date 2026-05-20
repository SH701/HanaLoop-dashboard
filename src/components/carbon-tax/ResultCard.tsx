import { CarbonTaxResult } from "@/types";
import { formatCurrency, formatMillion, formatNumber, formatPercent } from "@/lib/format";

type ResultCardProps = {
  result: CarbonTaxResult;
  kauPrice: number;
};

export default function ResultCard({ result, kauPrice }: ResultCardProps) {
  const { taxable, tax, annualTax, taxableRatio } = result;

  return (
    <div className="rounded-xl bg-emerald-700 text-white p-6 shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-emerald-100/80">예상 탄소세 (월간)</p>
          <p className="mt-2 text-4xl font-mono font-bold tracking-tight">
            {formatCurrency(tax)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-emerald-100/80">과세 대상량</p>
          <p className="mt-2 text-2xl font-mono font-semibold">
            {formatNumber(taxable)}{" "}
            <span className="text-sm text-emerald-100">tCO₂e</span>
          </p>
        </div>
      </div>

      <div className="mt-4 px-3 py-2 rounded-md bg-emerald-800/40 text-xs font-mono text-emerald-50/90">
        탄소세 = {formatNumber(taxable)} tCO₂e × {formatCurrency(kauPrice)}/톤 = {formatCurrency(tax)}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-emerald-50/90">
        <span>
          연간 환산 <b className="text-white">{formatMillion(annualTax)}</b>
        </span>
        <span>
          총 배출 대비{" "}
          <b className="text-white">{formatPercent(taxableRatio)}</b>만 과세
        </span>
      </div>
    </div>
  );
}
