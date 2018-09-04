export const range = (n: number) => {
  let x = [];
  for (let index = 0; index < n; index++) {
    x.push(index);
  }
  return x;
};

export const getDistance = ({
  c1,
  c2,
  ldrMatrix
}: {
  ldrMatrix: number[][];
  c1: number;
  c2: number;
}) => {
  // subtrai 1 pq as cidades vem indexadas começando de 1
  const min = Math.min(c1, c2) - 1;
  const max = Math.max(c1, c2) - 1;

  return ldrMatrix[max][min];
};
