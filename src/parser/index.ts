export * from "./types";
import { parseLines } from "./parse-lines";

export const parse = ({ file }: { file: string }) => {
  const arrayOfLines = file.match(/[^\r\n]+/g);

  if (!arrayOfLines) {
    throw Error(`Arquivo com aparente defeito.`);
  }

  return parseLines(arrayOfLines);
};
