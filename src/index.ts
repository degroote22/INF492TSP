import { evaluate } from "./evaluate";
import { getFile } from "./fs/get-file";
import { parse } from "./parser";
import { toMatrixLDR } from "./to-matrix";
// import { evenOddRoute } from "./routes/even-odd";
// import { inOrderRoute } from "./routes/in-order";
import { oneHeadRoute, twoHeadRoute } from "./routes/greedy";
// import { logMatrix } from "./log-matrix";

const main = () => {
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

  const data = cases.map(({ n }) => {
    const file = getFile(n);
    const parsed = parse({ file, type: "TSP" });
    const matrix = toMatrixLDR(parsed);

    // const inOrder = evaluate({ matrix, order: inOrderRoute(parsed.dimension) });
    // const evenOdd = evaluate({ matrix, order: evenOddRoute(parsed.dimension) });
    const oneHead = evaluate({ matrix, order: oneHeadRoute(parsed) });
    const twoHead = evaluate({ matrix, order: twoHeadRoute(parsed) });

    return {
      n,
      // inOrder,
      // evenOdd,
      oneHead,
      twoHead
    };
  });

  // const _parsed = parse({ file: getFile("data/gr17.tsp"), type: "TSP" });
  // logMatrix(_parsed);

  console.log(data);
};

main();
