import { calculateShipping } from "../utils/shipping";

describe("test de shipping", () => {

  const tests: [number, number, string, number, string][] = [
    [0, 5, "standard", 10, "distance 0 km"],
    [25, 5, "standard", 10, "distance 25 km"],
    [50, 5, "standard", 10, "distance 50 km"],
    [51, 5, "standard", 25, "distance 51 km"],
    [500, 5, "standard", 25, "distance 500 km"],
    [501, 5, "standard", 50, "distance 501 km"],
    [10, 10, "standard", 15, "poids 10 kg"],
    [10, 50, "standard", 15, "poids 50 kg"],
    [10, 5, "express", 20, "mode express"]
  ];

  for (let i = 0; i < tests.length; i++) {

    const test = tests[i];
    if (!test) continue;

    const distance = test[0];
    const weight = test[1];
    const type = test[2];
    const expected = test[3];
    const description = test[4];

    it(description as string, () => {
      expect(calculateShipping(distance as number, weight as number, type as any)).toBe(expected);
    });

  }

  it("distance invalide", () => {
    expect(() => calculateShipping(-1, 5, "standard")).toThrow();
  });

  it("poids invalide", () => {
    expect(() => calculateShipping(10, 0, "standard")).toThrow();
  });

  it("poids trop lourd", () => {
    expect(() => calculateShipping(10, 51, "standard")).toThrow();
  });

});