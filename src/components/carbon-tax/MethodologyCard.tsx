import { BookOpen, ExternalLink } from "lucide-react";
import { Card } from "@/components/common";
import {
  METHODOLOGY_FORMULAS,
  METHODOLOGY_REFERENCES,
  METHODOLOGY_ASSUMPTIONS,
} from "../../constants/methodology";

export default function MethodologyCard() {
  return (
    <Card>
      <div className="flex items-start gap-2 mb-4">
        <BookOpen size={16} className="mt-0.5 text-emerald-600 shrink-0" />
        <div>
          <h3 className="text-sm font-semibold text-gray-900">산출 근거 및 출처</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            K-ETS(배출권거래제) 공식 운영 기준을 단순화하여 적용했습니다.
          </p>
        </div>
      </div>

      <div className="space-y-1.5 mb-5 p-3 rounded-md bg-gray-50 font-mono text-xs">
        {METHODOLOGY_FORMULAS.map((f) => (
          <div key={f.title} className="flex gap-2">
            <span className="text-gray-400 w-16 shrink-0">{f.title}</span>
            <span className="text-gray-800">= {f.expr}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {METHODOLOGY_REFERENCES.map((r) => (
          <div key={r.label} className="px-3 py-2 rounded-md border border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-gray-900">{r.label}</span>
              {r.href && (
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-gray-400 hover:text-emerald-600"
                >
                  <ExternalLink size={11} />
                </a>
              )}
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">{r.detail}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-xs font-medium text-gray-700 mb-1.5">주요 가정</p>
        <ul className="space-y-1 text-[11px] text-gray-500 list-disc pl-4">
          {METHODOLOGY_ASSUMPTIONS.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
