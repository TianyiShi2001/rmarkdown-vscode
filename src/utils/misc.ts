import { TextEditor } from "vscode";

export function isRmarkdownEditor(editor: TextEditor) {
  return editor && editor.document && editor.document.languageId === "rmarkdown";
}

/** Scheme `File` or `Untitled` */
export const rmdDocSelector = [
  { language: "rmarkdown", scheme: "file" },
  { language: "rmarkdown", scheme: "untitled" },
];
