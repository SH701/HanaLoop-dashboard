"use client";

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
import { useCompanyStore } from "@/stores/useCompanyStore";

const SOURCES = [
  { key: "gasoline", label: "Gasoline", color: "#16A34A" },
  { key: "diesel",   label: "Diesel",   color: "#4ADE80" },
  { key: "lpg",      label: "LPG",      color: "#86EFAC" },
];

const SOURCE_COLORS = Object.fromEntries(SOURCES.map((s) => [s.key, s.color]));

const REDUCTION_TARGET = 200;

export default function EmissionsChart() {
  const { companies, selectedCountry, selectedCompany } = useCompanyStore();

  const filtered = companies.filter((c) => {
    if (selectedCompany) return c.id === selectedCompany;
    if (selectedCountry) return c.country === selectedCountry;
    return true;
  });

  const monthMap: Record<string, Record<string, number>> = {};
  for (const company of filtered) {
    for (const e of company.emissions) {
      if (!monthMap[e.yearMonth]) monthMap[e.yearMonth] = {};
      monthMap[e.yearMonth][e.source] = (monthMap[e.yearMonth][e.source] ?? 0) + e.emissions;
    }
  }

  const data = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, sources]) => ({ month, ...sources }));

  const activeSources = SOURCES.filter((s) =>
    filtered.some((c) => c.emissions.some((e) => e.source === s.key))
  );

  return (
    <div>
      {/* 범례 */}
      <div className="flex items-center gap-4 mb-3 justify-end">
        {activeSources.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: s.color }} />
            {s.label}
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <span className="inline-block w-5 border-t-2 border-dashed border-danger" />
          감축 목표
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} />
          <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} unit=" t" />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB" }}
            formatter={(value, name) => {
              const label = SOURCES.find((s) => s.key === name)?.label ?? String(name);
              return [`${value} tCO₂e`, label];
            }}
          />
          <ReferenceLine y={REDUCTION_TARGET} stroke="#DC2626" strokeDasharray="4 4" />
          {activeSources.map((s) => (
            <Bar key={s.key} dataKey={s.key} stackId="a" fill={SOURCE_COLORS[s.key]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

