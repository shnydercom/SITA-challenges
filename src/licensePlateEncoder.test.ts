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
    const input = 10 ** 6 + 10 ** 5 * 26 - 1;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("99999Z");
  });

  test("Should handle 3rd value after overflowing numeric", () => {
    const input = 10 ** 6 + 10 ** 5 * 26 + 3;
    const actual = encodeLicensePlate(input);
    expect(actual).toBe("0003AA");
  });

  //after finding solution on leetcode:
  //https://leetcode.com/discuss/post/1416811/google-interview-question-by-2017sp93049-is9g/
  test("Should handle working portion of leetcode test values", () => {
    const inputsAndSolutions: [number, string][] = [
      [0, "00000"],
      [1, "00001"],
      [99999, "99999"],
      [100000, "0000A"],
      [110001, "0001B"],
      [359999, "9999Z"],
      [360000, "000AA"],
      [361001, "001AB"],
      [1035999, "999ZZ"],
      [1036000, "00AAA"],
      [1036101, "01AAB"],
      [2793599, "99ZZZ"],
      [2793600, "0AAAA"],
      [2793611, "1AAAB"],
    ];
    for (let i = 0; i < inputsAndSolutions.length; i++) {
      const [input, expectedOutput] = inputsAndSolutions[i];
      const actual = encodeLicensePlate(input, 5);
      expect(actual).toBe(expectedOutput);
    }
  });

  test("Should handle working portion of leetcode test values (without exceeding call stack)", () => {
    const inputsAndSolutions: [number, string][] = [
      [7363359, "9ZZZZ"],
      [7363360, "AAAAA"],
      [7363361, "AAAAB"],
      [19244735, "ZZZZZ"],
    ];
    for (let i = 0; i < inputsAndSolutions.length; i++) {
      const [input, expectedOutput] = inputsAndSolutions[i];
      const actual = encodeLicensePlate(input, 5);
      expect(actual).toBe(expectedOutput);
    }
  });
});
