import { encodeLicensePlate } from "./licensePlateEncoder";

describe("encodeRTL", () => {
  test("Should handle zero case", () => {
    const input = 0;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("000000");
  });

  test("Should handle all digits case", () => {
    const input = 999999;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("999999");
  });
  test("Should handle first overflowing digit", () => {
    const input = 10 ** 6;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("00000A");
  });

  test("Should handle second value after first overflowing digit", () => {
    const input = 10 ** 6 + 2;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("00002A");
  });
});
