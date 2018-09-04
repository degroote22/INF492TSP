import { range } from "../misc/utils";

export const evenOddRoute = (dimension: number) => {
  const arr = range(dimension).map(x => x + 1);
  let evens = [] as number[];

  let odds = [] as number[];

  arr.forEach(i => {
    if (i % 2 === 0) {
      evens.push(i);
    } else {
      odds.push(i);
    }
  });

  const sorted = [...odds, ...evens];

  return [...sorted, sorted[0]];
};
