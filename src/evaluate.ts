import { getDistance } from "./misc/utils";

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
  matrix
}: {
  matrix: number[][];
  order: number[];
}) => {
  const pairs = makePairs(order);

  return getSummedDistance(pairs, matrix);
};
