import { calculateCarbonTax } from "./calculateCarbonTax";

describe("calculateCarbonTax", () => {
  test("totalEmission는 emissionsBySource의 합계다", () => {
    const result = calculateCarbonTax({
      emissionsBySource: { gasoline: 100, lpg: 100, diesel: 100 },
      freeAllocationRate: 0,
      offsetCredits: 0,
      kauPrice: 10_000,
    });
    expect(result.totalEmissions).toBe(300);
  });
  test("freeAllocationRate가 100%면 taxable은 0이다", () => {
    const result = calculateCarbonTax({
      emissionsBySource: { gasoline: 100, lpg: 100, diesel: 100 },
      freeAllocationRate: 100,
      offsetCredits: 0,
      kauPrice: 10_000,
    });
    expect(result.tax).toBe(0);
    expect(result.taxable).toBe(0);
  });
 test("tax는 taxable × kauPrice이고 annualTax는 tax × 12다", () => {
  const result = calculateCarbonTax({
    emissionsBySource: { gasoline: 100, lpg: 100, diesel: 100 },
    freeAllocationRate: 0,
    offsetCredits: 0,
    kauPrice: 10_000,
  });
  expect(result.tax).toBe(3_000_000);       
  expect(result.annualTax).toBe(36_000_000); 
});
  test("배출량이 0이면 모든 결과값이 0이다 (taxableRatio 포함)", () => {
  const result = calculateCarbonTax({
    emissionsBySource: { gasoline: 0, diesel: 0, lpg: 0 },
    freeAllocationRate: 50,
    offsetCredits: 0,
    kauPrice: 10_000,
  });
  expect(result.totalEmissions).toBe(0);
  expect(result.tax).toBe(0);
  expect(result.taxableRatio).toBe(0); 
});
});
