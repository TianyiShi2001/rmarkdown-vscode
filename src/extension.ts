// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Rmarkdown } from "./rmarkdown";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let rmd = new Rmarkdown();
  context.subscriptions.push(
    vscode.commands.registerCommand("rmarkdown.knit", () => {
      rmd.knit();
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
