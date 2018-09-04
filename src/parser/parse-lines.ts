import { IParsed } from "./types";

function makeIntList(curr: string): number[] {
  return curr
    .split(" ")
    .filter(x => x.length)
    .map(x => parseInt(x, 10));
}

function makeNumberList(curr: string): number[] {
  return curr
    .split(" ")
    .filter(x => x.replace(/ /g, "").length !== 0)
    .map(x => Number(x));
}

function captureBlockLineEdgeWeightSection(
  prev: { [key: string]: any },
  curr: string
): { [key: string]: any } {
  return {
    ...prev,
    edge_weight_section: [
      ...(prev.edge_weight_section || []),
      ...makeIntList(curr)
    ]
  };
}

function captureBlockLineNodeCoordSection(
  prev: { [key: string]: any },
  curr: string
): { [key: string]: any } {
  return {
    ...prev,
    node_coord_section: [
      ...(prev.node_coord_section || []),
      makeNumberList(curr)
    ]
  };
}

function shouldIgnoreLine(curr: string): boolean {
  return curr.replace(/ /g, "").length === 0 || curr.startsWith("EOF");
}

function parseLine(curr: string, prev: { [key: string]: any }) {
  const parts = curr.replace(/ /g, "").split(":");
  const name = parts[0].toLowerCase();
  const value = name === "dimension" ? parseInt(parts[1], 10) : parts[1];
  return { ...prev, [name]: value };
}

export const parseLines = (lines: RegExpMatchArray | null) => {
  if (!lines) {
    throw Error(`Arquivo com aparente defeito.`);
  }

  let capturingBlockEdgeWeightSection = false;
  let capturingBlockNodeCoordSection = false;
  const mapped = lines.reduce(
    (prev, curr) => {
      if (shouldIgnoreLine(curr)) {
        return prev;
      }

      if (capturingBlockNodeCoordSection) {
        return captureBlockLineNodeCoordSection(prev, curr);
      }

      if (capturingBlockEdgeWeightSection) {
        return captureBlockLineEdgeWeightSection(prev, curr);
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
        return parseLine(curr, prev);
      }
    },
    {} as { [key: string]: any }
  );

  return mapped as IParsed;
};
