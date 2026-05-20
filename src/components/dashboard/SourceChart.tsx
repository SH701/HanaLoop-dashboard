"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useSource } from "@/hooks/useSource";
import { COLORS } from "@/constants";

export default function SourceChart() {
  const { sourceData, total } = useSource();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-medium text-text-muted mb-4">
        소스별 배출량
      </h2>
      <div className="flex gap-6 items-center justify-center">
        <div className="relative" style={{ width: 180, height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sourceData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                strokeWidth={0}
              >
                {sourceData.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} tCO₂e`, name]}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* 중앙 총합 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-text-muted">합계</span>
            <span className="text-base font-semibold text-text">
              {total.toLocaleString()}
            </span>
            <span className="text-xs text-text-muted">tCO₂e</span>
          </div>
        </div>

        {/* 범례 */}
        <div className="flex flex-col gap-3 ">
          {sourceData.map((d) => (
            <div key={d.key} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-sm text-text w-16">{d.label}</span>
              <span className="text-sm font-medium text-text">
                {d.value.toLocaleString()}
              </span>
              <span className="text-xs text-text-muted">t ({d.percent}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
