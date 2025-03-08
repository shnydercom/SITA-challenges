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

  test("Should handle value before second overflowing digit", () => {
    const input = 10 ** 6 + 10 ** 5 - 1;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("99999A");
  });

  test("Should handle second overflowing digit", () => {
    const input = 10 ** 6 + 10 ** 5;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("00000B");
  });

  test("Should handle third value after second overflowing digit", () => {
    const input = 10 ** 6 + 10 ** 5 + 3;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("00003B");
  });

  test("Should handle fourth value after third overflowing digit", () => {
    const input = 10 ** 6 + 10 ** 5 * 2 + 4;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("00004C");
  });

  test("Should handle value before 10th overflowing digit", () => {
    const input = 10 ** 6 + 10 ** 5 * 10 - 1;
    //this one
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("99999J");
  });
  test("Should handle fourth value after 10th overflowing digit", () => {
    const input = 10 ** 6 + 10 ** 5 * 10 + 4;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("00004K");
  });
  test("Should handle fourth value after 11th overflowing digit", () => {
    const input = 10 ** 6 + 10 ** 5 * 11 + 4;

    const actual = encodeLicensePlate(input);
    expect(actual).toBe("00004L");
  });
  test("Should handle last value before overflowing numeric", () => {
    const input = 10 ** 6 + 10 ** 5 * 26 -1;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("99999Z");
  });

  test("Should handle 3rd value after overflowing numeric", () => {
    const input = 10 ** 6 + 10 ** 5 * 26 +3;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("0003AA");
  });

});
