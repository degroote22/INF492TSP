import { IParsed, IParsedExplicit, IParsedEuc2D } from "../parser";
import { range } from "./utils";

export const toMatrixLDR = (parsed: IParsed): number[][] => {
  if (parsed.edge_weight_type === "EXPLICIT") {
    if (parsed.edge_weight_format == "LOWER_DIAG_ROW") {
      return toMatrixFromLDR(parsed);
    } else if (parsed.edge_weight_format == "UPPER_ROW") {
      return toMatrixFromUR(parsed);
    } else {
      throw Error(
        "Nao implementado toMatrix para tipo " + parsed.edge_weight_format
      );
    }
  } else if (parsed.edge_weight_type === "EUC_2D") {
    return toMatrixFromEuc2D(parsed);
  }

  throw Error(
    "Não implementado o toMatrix para o tipo " +
      (parsed as any).edge_weight_type
  );
};

const toMatrixFromEuc2D = (parsed: IParsedEuc2D) => {
  return range(parsed.dimension).map((_, index) => {
    return range(index + 1).map((_, subIndex) => {
      if (index === subIndex) {
        return 0;
      } else {
        const x0 = parsed.node_coord_section[index][1];
        const x1 = parsed.node_coord_section[subIndex][1];
        const dx = Math.pow(x0 - x1, 2);

        const y0 = parsed.node_coord_section[index][2];
        const y1 = parsed.node_coord_section[subIndex][2];
        const dy = Math.pow(y0 - y1, 2);

        return Math.sqrt(dx + dy);
      }
    });
  });
};

const toMatrixFromUR = (parsed: IParsedExplicit) => {
  let startFrom = 0;

  const arr = range(parsed.dimension).reduce(
    (prev, _, index) => {
      const toAdd = parsed.dimension - 1 - index;

      const get = [...parsed.edge_weight_section].slice(
        startFrom,
        startFrom + toAdd
      );

      startFrom += toAdd;

      return [...prev, [0, ...get]];
    },
    [] as number[][]
  );

  return arr.map(x => x.reverse()).reverse();
};

const toMatrixFromLDR = (parsed: IParsedExplicit) => {
  let startFrom = 0;

  const arr = range(parsed.dimension).reduce(
    (prev, _, index) => {
      const get = [...parsed.edge_weight_section].slice(
        startFrom,
        startFrom + index + 1
      );

      startFrom += index + 1;

      return [...prev, get];
    },
    [] as number[][]
  );

  return arr;
};
