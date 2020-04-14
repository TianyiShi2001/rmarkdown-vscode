import { Position, Range, TextDocument } from "vscode";

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
