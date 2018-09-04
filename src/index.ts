import { evaluate } from "./evaluate";
import { getFile } from "./fs/get-file";
import { parse } from "./parser";
import { inOrderOrder, evenOddOrder } from "./utils";
import { toMatrixLDR } from "./to-matrix";

const main = () => {
  const file = getFile("data/gr17.tsp");
  const parsed = parse({ file, type: "TSP" });
  const matrix = toMatrixLDR(parsed);

  evaluate({ matrix, order: inOrderOrder(parsed.dimension) });
  evaluate({ matrix, order: evenOddOrder(parsed.dimension) });
};

main();
