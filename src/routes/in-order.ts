import { range } from "../misc/utils";

export const inOrderRoute = (dimension: number) => {
  const arr = range(dimension).map(x => x + 1);

  return [...arr, arr[0]];
};
