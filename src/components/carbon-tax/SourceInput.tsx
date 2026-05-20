import { SourceKey } from "@/types";

type SourceInputProps = {
  sourceKey: SourceKey;
  label: string;
  hint: string;
  color: string;
  value: number;
  onChange: (v: number) => void;
};

export default function SourceInput({
  label,
  hint,
  color,
  value,
  onChange,
}: SourceInputProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-sm inline-block"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-gray-700">{label}</span>
        </div>
        <span className="text-xs text-gray-400">{hint}</span>
      </div>
      <div className="relative">
        <input
          type="number"
          value={value}
          min={0}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full px-3 py-2 pr-16 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          tCO₂e
        </span>
      </div>
    </div>
  );
}
