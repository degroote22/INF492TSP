import { evaluate } from "../evaluate";
import { getFile } from "../fs/get-file";
import { parse } from "../parser";
import { evenOddRoute } from "../routes/even-odd";
import { inOrderRoute } from "../routes/in-order";
import { toMatrixLDR } from "../to-matrix";

describe("evaluate inOrder and evenOddOrder", () => {
  const cases = [
    { n: "data/gr17.tsp", io: 4722, eo: 5379 },
    { n: "data/gr21.tsp", io: 6620, eo: 7478 },
    { n: "data/gr48.tsp", io: 19837, eo: 19588 },
    { n: "data/gr120.tsp", io: 50021, eo: 49769 },
    { n: "data/brazil58.tsp", io: 129267, eo: 127229 },
    { n: "data/berlin52.tsp", io: 22205.617692710774, eo: 28039.970465897914 },
    { n: "data/fri26.tsp", io: 1140, eo: 1670 },
    { n: "data/eil51.tsp", io: 1313.4683444443458, eo: 1639.036682782706 },
    { n: "data/eil76.tsp", io: 1974.7138902540141, eo: 2645.704288462497 },
    { n: "data/eil101.tsp", io: 2064.487021559086, eo: 2671.1182953709385 },
    { n: "data/a280.tsp", io: 2818.621642239474, eo: 4864.447940073834 }
  ];

  cases.forEach(({ n, io, eo }) => {
    test(n, () => {
      const file = getFile(n);
      const parsed = parse({ file, type: "TSP" });
      const matrix = toMatrixLDR(parsed);
      expect(
        evaluate({ matrix, order: inOrderRoute(parsed.dimension) })
      ).toBeCloseTo(io);
      expect(
        evaluate({ matrix, order: evenOddRoute(parsed.dimension) })
      ).toBeCloseTo(eo);
    });
  });
});
