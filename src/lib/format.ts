export const formatNumber = (v: number) => Math.round(v).toLocaleString();

export const formatCurrency = (v: number) => `₩${Math.round(v).toLocaleString()}`;

export const formatMillion = (v: number) => `₩${(v / 1_000_000).toFixed(2)}M`;

export const formatPercent = (v: number, digits = 1) => `${v.toFixed(digits)}%`;
