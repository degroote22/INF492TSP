const parseLines = (lines: RegExpMatchArray | null) => {
  if (!lines) {
    throw Error(`Arquivo com aparente defeito.`);
  }

  let capturingBlockEdgeWeightSection = false;
  let capturingBlockNodeCoordSection = false;
  const mapped = lines.reduce(
    (prev, curr) => {
      if (curr.replace(/ /g, "").length === 0 || curr.startsWith("EOF")) {
        return prev;
      }

      if (capturingBlockNodeCoordSection) {
        return {
          ...prev,
          ["NODE_COORD_SECTION".toLowerCase()]: [
            ...(prev["NODE_COORD_SECTION".toLowerCase()] || []),
            curr
              .split(" ")
              .filter(x => x.replace(/ /g, "").length !== 0)
              .map(x => Number(x))
          ]
        };
      }

      if (capturingBlockEdgeWeightSection) {
        return {
          ...prev,
          ["EDGE_WEIGHT_SECTION".toLowerCase()]: [
            ...(prev["EDGE_WEIGHT_SECTION".toLowerCase()] || []),
            ...curr
              .split(" ")
              .filter(x => x.length)
              .map(x => parseInt(x, 10))
          ]
        };
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
        const parts = curr.replace(/ /g, "").split(":");
        const name = parts[0].toLowerCase();
        const value =
          name === "dimension"
            ? parseInt(parts[1], 10)
            : parts[1].split(" ")[0];
        return { ...prev, [name]: value };
      }
    },
    {} as { [key: string]: any }
  );

  return mapped as IParsed;
};

interface IParsedBase {
  name: string;
  type: "TSP";
  comment: string;
  dimension: number;
}

export interface IParsedExplicit extends IParsedBase {
  edge_weight_type: "EXPLICIT";
  edge_weight_format: "LOWER_DIAG_ROW" | "UPPER_ROW";
  edge_weight_section: number[];
}

export interface IParsedEuc2D extends IParsedBase {
  edge_weight_type: "EUC_2D";
  node_coord_section: number[][];
}

export type IParsed = IParsedExplicit | IParsedEuc2D;

export const parse = ({ file, type }: { file: string; type: "TSP" }) => {
  const arrayOfLines = file.match(/[^\r\n]+/g);

  const parsed = parseLines(arrayOfLines);
  if (!parsed.type.startsWith(type)) {
    throw Error("Tipo de arquivo não suportado");
  }

  return parsed;
};
