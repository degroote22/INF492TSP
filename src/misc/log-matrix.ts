import { range } from "./utils";

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

const printMatrixLDR = (matrix: number[][]) =>
  matrix.map(numberToStringCorrectLength(7)).join("\n");

export const logMatrixLDR = (matrix: number[][]) => {
  console.log(printMatrixLDR(matrix));
};
