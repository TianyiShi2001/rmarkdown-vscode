import * as fs from "fs";
import { commands, Position, Range, TextDocument, TextEditor, Uri, workspace } from "vscode";

export function isRmarkdownEditor(editor: TextEditor) {
  return editor && editor.document && editor.document.languageId === "rmarkdown";
}

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

export function isInFencedCodeBlock(doc: TextDocument, lineNum: number): boolean {
  let textBefore = doc.getText(new Range(new Position(0, 0), new Position(lineNum, 0)));
  let matches = textBefore.match(/^```[\w \+]*$/gm);
  if (matches === null) {
    return false;
  } else {
    return matches!.length % 2 !== 0;
  }
}

export function mathEnvCheck(doc: TextDocument, pos: Position): string {
  const lineTextBefore = doc.lineAt(pos.line).text.substring(0, pos.character);
  const lineTextAfter = doc.lineAt(pos.line).text.substring(pos.character);

  if (/(^|[^\$])\$(|[^ \$].*)\\\w*$/.test(lineTextBefore) && lineTextAfter.includes("$")) {
    // Inline math
    return "inline";
  } else {
    const textBefore = doc.getText(new Range(new Position(0, 0), pos));
    const textAfter = doc.getText().substr(doc.offsetAt(pos));
    let matches;
    if ((matches = textBefore.match(/\$\$/g)) !== null && matches.length % 2 !== 0 && textAfter.includes("$$")) {
      // $$ ... $$
      return "display";
    } else {
      return "";
    }
  }
}
