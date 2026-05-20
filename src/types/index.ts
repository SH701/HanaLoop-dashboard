export type Country = {
  code: string;
  name: string;
};

export type GhgEmission = {
  yearMonth: string;
  source: string;
  emissions: number;
};

export type Company = {
  id: string;
  name: string;
  country: string;
  emissions: GhgEmission[];
};

export type Post = {
  id: string;
  title: string;
  resourceUid: string;
  dateTime: string;
  content: string;
};

export type SourceKey = "gasoline" | "diesel" | "lpg";

export type CarbonTaxInput = {
  emissionsBySource: Record<SourceKey, number>;
  freeAllocationRate: number;
  offsetCredits: number;
  kauPrice: number;
};

export type CarbonTaxResult = {
  totalEmissions: number;
  freeAllocation: number;
  taxableBeforeOffset: number;
  taxable: number;
  tax: number;
  annualTax: number;
  taxableRatio: number;
};
