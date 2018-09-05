import { IParsed, IParsedEuc2D, IParsedExplicit } from "./types";

const makeIntList = (curr: string): number[] => {
  return curr
    .split(" ")
    .filter(x => x.length)
    .map(x => parseInt(x, 10));
};

const makeNumberList = (curr: string): number[] => {
  return curr
    .split(" ")
    .filter(x => x.replace(/ /g, "").length !== 0)
    .map(x => Number(x));
};

const captureBlockLineEdgeWeightSection = (
  prev: Partial<IParsedExplicit>,
  curr: string
): Partial<IParsedExplicit> => {
  return {
    ...prev,
    edge_weight_section: [
      ...(prev.edge_weight_section || []),
      ...makeIntList(curr)
    ]
  };
};

const captureBlockLineNodeCoordSection = (
  prev: Partial<IParsedEuc2D>,
  curr: string
): Partial<IParsedEuc2D> => {
  return {
    ...prev,
    node_coord_section: [
      ...(prev.node_coord_section || []),
      makeNumberList(curr)
    ]
  };
};

const shouldIgnoreLine = (curr: string): boolean => {
  return curr.replace(/ /g, "").length === 0 || curr.startsWith("EOF");
};

const captureLine = (
  curr: string,
  prev: Partial<IParsed>
): Partial<IParsed> => {
  const parts = curr.replace(/ /g, "").split(":");
  const name = parts[0].toLowerCase();
  if (!parts[1]) {
    throw Error();
  }
  const value = name === "dimension" ? parseInt(parts[1], 10) : parts[1];
  return { ...prev, [name]: value };
};

export const parseLines = (lines: RegExpMatchArray) => {
  let capturingBlockEdgeWeightSection = false;
  let capturingBlockNodeCoordSection = false;
  const mapped = lines.reduce(
    (prev, curr) => {
      if (shouldIgnoreLine(curr)) {
        return prev;
      }

      if (capturingBlockNodeCoordSection) {
        return captureBlockLineNodeCoordSection(
          prev as Partial<IParsedEuc2D>,
          curr
        );
      }

      if (capturingBlockEdgeWeightSection) {
        return captureBlockLineEdgeWeightSection(
          prev as Partial<IParsedExplicit>,
          curr
        );
      }

      if (curr === "NODE_COORD_SECTION") {
        // parse block
        capturingBlockNodeCoordSection = true;
        return prev;
      } else if (curr === "EDGE_WEIGHT_SECTION") {
        // parse block
        capturingBlockEdgeWeightSection = true;
        return prev;
      } else {
        // parse line
        try {
          return captureLine(curr, prev);
        } catch {
          throw Error("Erro capturando linha: " + curr);
        }
      }
    },
    {} as Partial<IParsed>
  );

  return mapped as IParsed;
};
