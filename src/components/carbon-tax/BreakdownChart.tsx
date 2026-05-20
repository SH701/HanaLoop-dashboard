"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { Card } from "@/components/common";
import { CarbonTaxResult } from "@/types";
import { BREAKDOWN_STAGE_COLORS, COLORS } from "@/constants";
import { formatNumber, formatMillion, formatCurrency } from "@/lib/format";

type BreakdownChartProps = {
  result: CarbonTaxResult;
  kauPrice: number;
};

const CHART_HEIGHT = 220;
const BAR_RADIUS: [number, number, number, number] = [6, 6, 0, 0];

type Stage = {
  key: keyof typeof BREAKDOWN_STAGE_COLORS;
  label: string;
  sub: string;
  value: number;
  display: string;
};

const buildStages = (result: CarbonTaxResult, kauPrice: number): Stage[] => {
  const appliedOffset = result.taxableBeforeOffset - result.taxable;
  const freeRatio =
    result.totalEmissions > 0
      ? Math.round((result.freeAllocation / result.totalEmissions) * 100)
      : 0;

  return [
    {
      key: "total",
      label: "총 배출량",
      sub: "Scope 1+2+3",
      value: result.totalEmissions,
      display: formatNumber(result.totalEmissions),
    },
    {
      key: "free",
      label: "무상할당",
      sub: `${freeRatio}% 비율`,
      value: result.freeAllocation,
      display: `-${formatNumber(result.freeAllocation)}`,
    },
    {
      key: "offset",
      label: "상쇄배출권",
      sub: "KCU/KOC",
      value: appliedOffset,
      display: `-${formatNumber(appliedOffset)}`,
    },
    {
      key: "taxable",
      label: "과세대상",
      sub: "tCO₂e",
      value: result.taxable,
      display: formatNumber(result.taxable),
    },
    {
      key: "tax",
      label: "탄소세",
      sub: `× ${formatCurrency(kauPrice)}`,
      value: result.tax / 1000,
      display: formatMillion(result.tax),
    },
  ];
};

const LEGEND = [
  { color: BREAKDOWN_STAGE_COLORS.total, label: "총량" },
  { color: BREAKDOWN_STAGE_COLORS.free, label: "차감" },
  { color: BREAKDOWN_STAGE_COLORS.taxable, label: "과세대상" },
];

export default function BreakdownChart({ result, kauPrice }: BreakdownChartProps) {
  const stages = buildStages(result, kauPrice);

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">계산 단계별 분해</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            총 배출 → 할당/상쇄 차감 → 과세대상 → 탄소세
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-gray-500">
          {LEGEND.map((l) => (
            <span key={l.label} className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <BarChart data={stages} margin={{ top: 24, right: 8, left: 0, bottom: 20 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: COLORS.text }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Bar dataKey="value" radius={BAR_RADIUS}>
            <LabelList
              dataKey="display"
              position="top"
              style={{ fontSize: 12, fill: COLORS.textStrong, fontWeight: 600 }}
            />
            {stages.map((s) => (
              <Cell key={s.key} fill={BREAKDOWN_STAGE_COLORS[s.key]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-5 text-center text-[11px] text-gray-400 -mt-3">
        {stages.map((s) => (
          <span key={s.key}>{s.sub}</span>
        ))}
      </div>
    </Card>
  );
}
