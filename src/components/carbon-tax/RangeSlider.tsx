type RangeSliderProps = {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  marks?: { value: number; label: string }[];
};

export default function RangeSlider({ value, min, max, step = 1, onChange, marks }: RangeSliderProps) {
  return (
    <div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-600"
      />
      {marks && (
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          {marks.map((m) => (
            <span key={m.value}>{m.label}</span>
          ))}
        </div>
      )}
    </div>
  );
}
