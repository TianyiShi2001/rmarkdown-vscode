// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Rmarkdown } from "./rmarkdown";
import * as decorations from "./decorations";
import * as listEditing from "./listEditing";
import * as formatting from "./formatting";
import { newPostCommand } from "./blogdown/newPost";
import { serveSiteCommand } from "./blogdown/serveSite";
import * as path from "path";
import * as fs from "fs";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("rmarkdown extension activated!!!");

  decorations.activate(context);
  listEditing.activate(context);
  formatting.activate(context);
  new newPostCommand(context);
  new serveSiteCommand(context);

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

// function loadCommands(context: vscode.ExtensionContext) {
//   try {
//     let commandPath = context.asAbsolutePath(path.join("out", "commands"));
//     let files = fs.readdirSync(commandPath);
//     for (const file of files) {
//       if (path.extname(file) === ".js") {
//         let baseName = path.basename(file, ".js");
//         let className = baseName + "Command";

//         let commandClass = require(`./commands/${baseName}`);
//         new commandClass[className](context);
//       }
//     }
//   } catch (err) {
//     console.error("Command loading error:", err);
//   }
// }
