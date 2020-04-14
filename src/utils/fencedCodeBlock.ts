import { Position, Range, TextDocument } from "vscode";

export function isInFencedCodeBlock(doc: TextDocument, lineNum: number): boolean {
  let textBefore = doc.getText(new Range(new Position(0, 0), new Position(lineNum, 0)));
  let matches = textBefore.match(/^```[\w \+]*$/gm);
  if (matches === null) {
    return false;
  } else {
    return matches!.length % 2 !== 0;
  }
}
