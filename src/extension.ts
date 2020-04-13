// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Rmarkdown } from "./rmarkdown";
import * as decorations from "./decorations";
import * as listEditing from "./listEditing";
import * as formatting from "./formatting";
import { newPostCommand } from "./blogdown/newPost";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("rmarkdown extension activated");

  decorations.activate(context);
  listEditing.activate(context);
  formatting.activate(context);
  new newPostCommand(context);

  let rmd = new Rmarkdown();
  context.subscriptions.push(
    vscode.commands.registerCommand("rmarkdown_vscode.knit", () => {
      rmd.knit();
    })
  );
  vscode.languages.setLanguageConfiguration("rmarkdown", {
    wordPattern: /(-?\d*\.\d\w*)|([^\!\@\#\%\^\&\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s\，\。\《\》\？\；\：\‘\“\’\”\（\）\【\】\、]+)/g,
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
