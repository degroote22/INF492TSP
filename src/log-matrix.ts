import { toMatrixLDR } from "./to-matrix";
import { range } from "./utils";
import { IParsed } from "./parser";

const numberToStringCorrectLength = (length: number) => (numbers: number[]) =>
  numbers
    .map(number => {
      const s = String(number);

      const remaining = length - s.length;

      if (remaining > 0) {
        return (
          s +
          range(remaining)
            .map(_ => " ")
            .reduce((p, c) => p + c, "")
        );
      } else if (remaining < 0) {
        throw Error("Number too big to print");
      } else {
        return s;
      }
    })
    .join("");

const printMatrix = (parsed: IParsed) =>
  toMatrixLDR(parsed)
    .map(numberToStringCorrectLength(7))
    .join("\n");

export const logMatrix = (parsed: IParsed) => {
  console.log(printMatrix(parsed));
};
