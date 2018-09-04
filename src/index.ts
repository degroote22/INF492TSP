import { evaluate } from "./evaluate";
import { getFile } from "./fs/get-file";
import { parse } from "./parser";
import { inOrderOrder, evenOddOrder } from "./utils";

const main = () => {
  const file = getFile("data/gr17.tsp");
  const parsed = parse({ file, type: "TSP" });

  evaluate({ parsed, order: inOrderOrder(parsed.dimension) });
  evaluate({ parsed, order: evenOddOrder(parsed.dimension) });
};

main();
