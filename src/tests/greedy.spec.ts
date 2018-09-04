import { oneHeadRoute, twoHeadRoute } from "../routes/greedy";
import { getFile } from "../fs/get-file";
import { parse } from "../parser";

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
      const parsed = parse({ file, type: "TSP" });
      const orderOneHead = oneHeadRoute(parsed);
      const orderTwoHead = twoHeadRoute(parsed);
      expect(orderOneHead).toMatchSnapshot();
      expect(orderTwoHead).toMatchSnapshot();
    });
  });
});
