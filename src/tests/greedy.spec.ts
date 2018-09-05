import { oneHeadRoute, twoHeadRoute } from "../routes/greedy";
import { getFile } from "../fs/get-file";
import { parse } from "../parser";
import { evaluate } from "../evaluate";
import { toMatrixLDR } from "../misc/to-matrix";

describe("oneHead greedy solver", () => {
  // prettier-ignore
  const matrix = [
    [0         ],
    [1 , 0     ],
    [2 , 1 , 0 ]
  ];

  const dimension = 3;

  expect(oneHeadRoute({ matrix, dimension })).toMatchObject([1, 2, 3, 1]);
});

describe("two head greedy solver can be worse than one head", () => {
  // prettier-ignore
  const matrix = [
    [ 0                        ],
    [ 1 , 0                    ],
    [ 1 , 9 , 0                ],
    [ 9 , 9 , 9 , 0            ],
    [ 9 , 2 , 1 , 9 , 0        ],
    [ 2 , 9 , 9 , 9 , 9 , 0    ],
  ];

  const dimension = 6;
  const twoHead = twoHeadRoute({ matrix, dimension });
  const oneHead = oneHeadRoute({ matrix, dimension });
  expect(evaluate({ order: oneHead, matrix })).toBeLessThan(
    evaluate({ order: twoHead, matrix })
  );
});

describe("greety solver", () => {
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
