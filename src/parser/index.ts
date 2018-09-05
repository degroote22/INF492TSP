export * from "./types";
import { parseLines } from "./parse-lines";

export const parse = ({ file, type }: { file: string; type: "TSP" }) => {
  const arrayOfLines = file.match(/[^\r\n]+/g);

  if (!arrayOfLines) {
    throw Error(`Arquivo com aparente defeito.`);
  }
  const parsed = parseLines(arrayOfLines);
  if (!parsed.type.startsWith(type)) {
    throw Error("Tipo de arquivo não suportado");
  }

  return parsed;
};
