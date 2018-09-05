import { oneHeadRoute, twoHeadRoute } from "../routes/greedy";
import { getFile } from "../fs/get-file";
import { parse } from "../parser";
import { toMatrixLDR } from "../misc/to-matrix";

describe.only("greety solver", () => {
  const cases = [
    { n: "data/gr17.tsp" },
    { n: "data/gr21.tsp" },
    { n: "data/gr48.tsp" },
    { n: "data/gr120.tsp" },
    { n: "data/brazil58.tsp" },
    { n: "data/berlin52.tsp" },
    { n: "data/fri26.tsp" },
    { n: "data/eil51.tsp" },
    { n: "data/eil76.tsp" },
    { n: "data/eil101.tsp" },
    { n: "data/a280.tsp" }
  ];

  cases.forEach(({ n }) => {
    test(n, () => {
      const file = getFile(n);
      const parsed = parse({ file });
      const { dimension } = parsed;
      const matrix = toMatrixLDR(parsed);
      const orderOneHead = oneHeadRoute({ matrix, dimension });
      const orderTwoHead = twoHeadRoute({ matrix, dimension });
      expect(orderOneHead).toMatchSnapshot();
      expect(orderTwoHead).toMatchSnapshot();
    });
  });
});
