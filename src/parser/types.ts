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
