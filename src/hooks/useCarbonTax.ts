import { useMemo } from "react";
import { CarbonTaxInput, CarbonTaxResult } from "@/types";
import { calculateCarbonTax } from "@/lib/calculateCarbonTax";

export function useCarbonTax(input: CarbonTaxInput): CarbonTaxResult {
  return useMemo(() => calculateCarbonTax(input), [
    input.emissionsBySource.gasoline,
    input.emissionsBySource.diesel,
    input.emissionsBySource.lpg,
    input.freeAllocationRate,
    input.offsetCredits,
    input.kauPrice,
  ]);
}
