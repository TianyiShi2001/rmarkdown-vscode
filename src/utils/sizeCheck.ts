import * as fs from "fs";
import { TextDocument } from "vscode";

const sizeLimit = 50000; // ~50 KB
let fileSizesCache: { [filepath: string]: [number, boolean] } = {};
export function isFileTooLarge(document: TextDocument): boolean {
  const filePath = document.uri.fsPath;
  if (!filePath || !fs.existsSync(filePath)) {
    return false;
  }
  const version = document.version;
  if (fileSizesCache.hasOwnProperty(filePath) && fileSizesCache[filePath][0] === version) {
    return fileSizesCache[filePath][1];
  } else {
    const isTooLarge = fs.statSync(filePath)["size"] > sizeLimit;
    fileSizesCache[filePath] = [version, isTooLarge];
    return isTooLarge;
  }
}
