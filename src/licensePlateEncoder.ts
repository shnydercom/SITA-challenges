type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type Letter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";
type UppercaseLetter = Uppercase<Letter>;
type PossiblePlateSymbols = Digit | UppercaseLetter;
export type LicensePlateTuple = [
  PossiblePlateSymbols,
  PossiblePlateSymbols,
  PossiblePlateSymbols,
  PossiblePlateSymbols,
  PossiblePlateSymbols,
  PossiblePlateSymbols
];

function encodeRTL(
  input: number = 0,
  prefixCount: number = 6,
  digits: Digit[],
  letters: UppercaseLetter[],
  licensePlateLength: number
): [Digit[], UppercaseLetter[]] {
  let overflowBoundary = 10 ** prefixCount;
  if (input <= overflowBoundary - 1) {
    let base10results = input
      .toString()
      .padStart(prefixCount, "0")
      .split("") as Digit[];
    //recursive end condition
    return [base10results, letters];
  }
  let remainder = input % overflowBoundary;
  let postfixOverflow = Math.floor(input / overflowBoundary);
  let prevLettersLength = letters.length;
  if (input >= 10 ** licensePlateLength) {
    letters = incrementBase26Results(letters, 1);
    return encodeRTL(
      remainder + (postfixOverflow - 1) * overflowBoundary,
      prefixCount - letters.length + prevLettersLength,
      digits,
      letters,
      licensePlateLength
    );
  }
  letters = incrementBase26Results(letters, postfixOverflow);
  return encodeRTL(
    remainder,
    prefixCount - letters.length + prevLettersLength,
    digits,
    letters,
    licensePlateLength
  );
}

// base 26 conversion inspired from here: https://stackoverflow.com/a/50638753
function getBase26Value(s: string): number {
  return s.split("").reduce((r, a) => r * 26 + parseInt(a, 36) - 9, 0) - 1;
}

function setBase26Value(n: number): string {
  var result = "";
  do {
    result = ((n % 26) + 10).toString(36) + result;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return result.toUpperCase();
}

function incrementBase26Results(
  input: UppercaseLetter[],
  increment: number
): UppercaseLetter[] {
  let inputAsInt = getBase26Value(input.join(""));
  inputAsInt += increment;
  let base26results = setBase26Value(inputAsInt).split("") as UppercaseLetter[];
  return base26results;
}

const LICENSE_PLATE_MAX_INT = getBase26Value("ZZZZZZ") + 999999;
/*
  //my initial assumption:
  LICENSE_PLATE_MAX_INT =
  10 ** 6 +
  10 ** 5 * 26 +
  10 ** 4 * 26 +
  10 ** 3 * 26 +
  10 ** 2 * 26 +
  10 ** 1 * 26;*/
export function encodeLicensePlateAsTuple(
  n: number,
  licensePlateLength: number
): PossiblePlateSymbols[] {
  //LicensePlateTuple {
  if (n > LICENSE_PLATE_MAX_INT) {
    throw new Error("input value exceeds possible range");
  }
  const result: PossiblePlateSymbols[] = encodeRTL(
    n,
    licensePlateLength,
    [],
    [],
    licensePlateLength,
  ).flat();
  return result;
}

export function encodeLicensePlate(
  n: number,
  licensePlateLength: number = 6
): string {
  return encodeLicensePlateAsTuple(n, licensePlateLength).join("");
}
