import { IParsed } from "./parser";
import { toMatrixLDR } from "./parser/to-matrix";
const getDistance = ({
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

const makePairs = (order: number[]) => {
  const pairs = order.reduce(
    (prev, curr, index, array) => {
      const next = array[index + 1];
      const hasNext = next !== undefined;
      if (hasNext) {
        return [...prev, [curr, next] as [number, number]];
      }
      return prev;
    },
    [] as [number, number][]
  );

  return pairs;
};

const getSummedDistance = (
  pairs: [number, number][],
  ldrMatrix: number[][]
) => {
  const distance = pairs
    .map(pair => getDistance({ ldrMatrix, c1: pair[0], c2: pair[1] }))
    .reduce((p, c) => p + c, 0);

  return distance;
};

export const evaluate = ({
  order,
  parsed
}: {
  parsed: IParsed;
  order: number[];
}) => {
  const ldrMatrix = toMatrixLDR(parsed);
  const pairs = makePairs(order);

  return getSummedDistance(pairs, ldrMatrix);
};
