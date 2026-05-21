import { getCompanySourceEmissions } from "./getCompanySourceEmissions";

describe("getCompanySourceEmissions", () => {
  test("company가 null이면 모든 소스 0, yearMonth는 null이다", () => {
    const result = getCompanySourceEmissions(null);
    expect(result.emissionsBySource).toEqual({
      gasoline: 0,
      diesel: 0,
      lpg: 0,
    });
    expect(result.yearMonth).toBeNull();
  });
  test("emissions가 빈 배열이면 모든 소스 0, yearMonth는 null이다", () => {
    const result = getCompanySourceEmissions({
      id: "c1",
      name: "Empty",
      country: "KR",
      emissions: [],
    });
    expect(result.emissionsBySource).toEqual({
      gasoline: 0,
      diesel: 0,
      lpg: 0,
    });
    expect(result.yearMonth).toBeNull();
  });
  test("같은 월·같은 source가 중복되면 합산된다", () => {
    const result = getCompanySourceEmissions({
      id: "c1",
      name: "A",
      country: "KR",
      emissions: [
        { yearMonth: "2024-12", source: "gasoline", emissions: 40 },
        { yearMonth: "2024-12", source: "gasoline", emissions: 60 },
      ],
    });
    expect(result.emissionsBySource.gasoline).toBe(100);
  });
  test("최신 월에 없는 source는 0으로 채워진다", () => {
    const result = getCompanySourceEmissions({
      id: "c1",
      name: "A",
      country: "KR",
      emissions: [{ yearMonth: "2024-12", source: "gasoline", emissions: 100 }],
    });
    expect(result.emissionsBySource).toEqual({
      gasoline: 100,
      diesel: 0,
      lpg: 0,
    });
  });
});
