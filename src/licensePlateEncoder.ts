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
  letters: UppercaseLetter[]
): [Digit[], UppercaseLetter[]] {
  let multiplicator = 10 ** -prefixCount;
  let overflowBoundary = 10 ** prefixCount;
  if (input <= overflowBoundary -1) {
    let base10results = input
      .toString()
      .padStart(prefixCount, "0")
      .split("") as Digit[];
    //recursive end condition
    return [base10results, letters];
  }
  let remainder = input % overflowBoundary;
  let postfixOverflow = Math.round(input * multiplicator);
  let prevLettersLength = letters.length;
  letters = incrementBase26Results(letters, postfixOverflow)
  return encodeRTL(remainder, prefixCount - letters.length + prevLettersLength, digits, letters);
}

function incrementBase26Results(input: UppercaseLetter[], increment: number): UppercaseLetter[] {
  let i = input.length - 1;
  if (input.length === 0) {
    let base26results = (9).toString(36).toUpperCase() as UppercaseLetter;
    input = [base26results];
    i = 0;
  }
  let result: UppercaseLetter[] = [];
  while (i >= 0) {
    let base26representation = parseInt(input[i], 36) - 9;
    base26representation += increment;
    if (base26representation > 25) {
      increment = base26representation - 26;
      base26representation = 25;
      result.push(
        (base26representation + 9).toString(36).toUpperCase() as UppercaseLetter
      );
      i += 1
      continue
    }
    result.push(
      (base26representation + 9).toString(36).toUpperCase() as UppercaseLetter
    );
    i -= 1;
  }
  return result;
}

export function encodeLicensePlateAsTuple(n: number): PossiblePlateSymbols[] {
  //LicensePlateTuple {
  const result: PossiblePlateSymbols[] = encodeRTL(n, 6, [], []).flat()
  return result;
}

export function encodeLicensePlate(n: number): string {
  return encodeLicensePlateAsTuple(n).join("");
}
