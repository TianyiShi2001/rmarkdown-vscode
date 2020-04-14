import { TextEditor } from "vscode";

export function isRmarkdownEditor(editor: TextEditor) {
  return editor && editor.document && editor.document.languageId === "rmarkdown";
}
