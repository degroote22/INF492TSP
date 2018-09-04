import * as fs from "fs";
export const getFile = (fileName: string) => {
  return fs.readFileSync(fileName, "utf-8");
};
