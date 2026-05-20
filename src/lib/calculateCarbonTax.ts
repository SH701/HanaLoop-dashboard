import { CarbonTaxInput, CarbonTaxResult } from "@/types";
import { OFFSET_CAP_RATIO } from "@/constants";

export function calculateCarbonTax(input: CarbonTaxInput): CarbonTaxResult {
  const totalEmissions = Object.values(input.emissionsBySource).reduce(
    (a, v) => a + v,
    0
  );
  const freeAllocation = totalEmissions * (input.freeAllocationRate / 100);
  const taxableBeforeOffset = Math.max(0, totalEmissions - freeAllocation);

  const offsetCap = totalEmissions * OFFSET_CAP_RATIO;
  const appliedOffset = Math.min(input.offsetCredits, offsetCap);

  const taxable = Math.max(0, taxableBeforeOffset - appliedOffset);
  const tax = taxable * input.kauPrice;
  const annualTax = tax * 12;
  const taxableRatio = totalEmissions > 0 ? (taxable / totalEmissions) * 100 : 0;

  return {
    totalEmissions,
    freeAllocation,
    taxableBeforeOffset,
    taxable,
    tax,
    annualTax,
    taxableRatio,
  };
}
