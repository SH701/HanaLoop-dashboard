export type MethodologyFormula = { title: string; expr: string };

export type MethodologyReference = {
  label: string;
  detail: string;
  href?: string;
};

export const METHODOLOGY_FORMULAS: MethodologyFormula[] = [
  { title: "총배출량", expr: "Σ (Gasoline + Diesel + LPG)" },
  { title: "과세대상", expr: "max(0, 총배출 − 무상할당 − 상쇄)" },
  { title: "탄소세", expr: "과세대상 × KAU 시세 (₩/tCO₂e)" },
];

export const METHODOLOGY_REFERENCES: MethodologyReference[] = [
  {
    label: "K-ETS (배출권거래제)",
    detail: "환경부 · 제3차 계획기간(2021–2025) 운영 지침",
    href: "https://www.me.go.kr",
  },
  {
    label: "KAU 시세",
    detail: "한국거래소(KRX) 배출권 시장 KAU24 종가 (₩5,000 ~ ₩50,000)",
    href: "https://ets.krx.co.kr",
  },
  {
    label: "GHG Protocol",
    detail: "Scope 분류 및 연료원별 배출계수 기준",
    href: "https://ghgprotocol.org",
  },
  {
    label: "상쇄배출권 5% 캡",
    detail: "K-ETS 규정 — KCU/KOC 인정량은 의무량의 최대 5%",
  },
];

export const METHODOLOGY_ASSUMPTIONS = [
  "월간 단위 계산이며, 연간 환산은 단순히 ×12로 처리합니다.",
  "무상할당 비율 78%는 3차 계획기간 평균 무상할당률을 가정한 기본값입니다.",
  "감축 시나리오는 모든 연료원에 동일 비율을 적용한 단순 모델입니다.",
];
