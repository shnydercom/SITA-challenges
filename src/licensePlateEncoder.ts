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
  resultSymbols: PossiblePlateSymbols[]
): [number, PossiblePlateSymbols[]] {
  let multiplicator = 10 ** -prefixCount;
  let overflowBoundary = 10 ** prefixCount;
  if (input < overflowBoundary) {
    let base10results = input
      .toString()
      .padStart(prefixCount, "0")
      .split("") as PossiblePlateSymbols[];
    //recursive end condition, concatenating minor RTL base10 and major RTL base36 results
    resultSymbols = [...base10results, ...resultSymbols]
    return [0, resultSymbols];
  }
  let remainder = input % overflowBoundary;
  let postfixOverflow = Math.floor(input * multiplicator);
  let base36results = (postfixOverflow + 9).toString(36).toUpperCase() as PossiblePlateSymbols;
  resultSymbols = [...resultSymbols, base36results]
  return encodeRTL(remainder, prefixCount - 1, resultSymbols);
}

export function encodeLicensePlateAsTuple(n: number): PossiblePlateSymbols[] {
  //LicensePlateTuple {
  const result = encodeRTL(n, 6, [])[1];
  return result;
}

export function encodeLicensePlate(n: number): string {
  return encodeLicensePlateAsTuple(n).join("");
}
