import * as vscode from "vscode";
import { Rmarkdown } from "./rmarkdown";
import * as decorations from "./rmarkdown-core/decorations";
import * as listEditing from "./rmarkdown-core/listEditing";
import * as formatting from "./rmarkdown-core/formatting";
import { loadCommands } from "./auto";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("rmarkdown extension activated!!!");

  decorations.activate(context);
  listEditing.activate(context);
  formatting.activate(context);

  loadCommands(context);

  //let rmd = new Rmarkdown();
  // context.subscriptions.push(
  //   vscode.commands.registerCommand("rmarkdown_vscode.knit", () => {
  //     rmd.knit();
  //   })
  // );
  vscode.languages.setLanguageConfiguration("rmarkdown", {
    wordPattern: /(-?\d*\.\d\w*)|([^\!\@\#\%\^\&\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s\，\。\《\》\？\；\：\‘\“\’\”\（\）\【\】\、]+)/g,
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
