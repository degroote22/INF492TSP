export const range = (n: number) => {
  let x = [];
  for (let index = 0; index < n; index++) {
    x.push(index);
  }
  return x;
};
export const inOrderOrder = (dimension: number) => {
  const arr = range(dimension).map(x => x + 1);

  return [...arr, arr[0]];
};

export const evenOddOrder = (dimension: number) => {
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
