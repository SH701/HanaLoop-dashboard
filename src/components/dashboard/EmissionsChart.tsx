"use client";

import { useSource } from "@/hooks/useSource";
import { SOURCES, SOURCE_COLORS } from "@/constants/source";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const REDUCTION_TARGET = 200;

export default function EmissionsChart() {
  const { monthlyData, activeSources } = useSource();
  return (
    <div>
      <h2 className="text-sm font-medium text-text-muted mb-4">월별 배출량</h2>
      {/* 범례 */}
      <div className="flex items-center gap-4 mb-3 justify-end">
        {activeSources.map((s) => (
          <div
            key={s.key}
            className="flex items-center gap-1.5 text-xs text-text-muted"
          >
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ backgroundColor: s.color }}
            />
            {s.label}
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <span className="inline-block w-5 border-t-2 border-dashed border-danger" />
          감축 목표
        </div>
      </div>
      {/* 차트 */}
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={monthlyData}
          margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
            vertical={false}
          />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} />
          <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} unit=" t" />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid #E5E7EB",
            }}
            formatter={(value, name) => {
              const label =
                SOURCES.find((s) => s.key === name)?.label ?? String(name);
              return [`${value} tCO₂e`, label];
            }}
          />
          <ReferenceLine
            y={REDUCTION_TARGET}
            stroke="#DC2626"
            strokeDasharray="4 4"
          />
          {activeSources.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              stackId="a"
              fill={SOURCE_COLORS[s.key]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
