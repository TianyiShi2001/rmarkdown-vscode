// adapted from https://github.com/Borvik/vscode-postgres/blob/master/src/common/baseCommand.ts
import * as vscode from "vscode";

export abstract class BaseCommand {
  subextension: string | undefined;
  constructor(context: vscode.ExtensionContext) {
    console.log("hello from basecommand");
    this.init();
    let fullCommandName = "rmarkdown_vscode.";
    let commandName = this.constructor.name.replace(/Command$/, "");
    if (this.subextension !== undefined) {
      fullCommandName += this.subextension + ".";
    }
    fullCommandName += commandName;
    let disposable = vscode.commands.registerCommand(fullCommandName, this.run, this);
    console.log("hello from basecommand");
    console.log("pushing: ", fullCommandName);
    context.subscriptions.push(disposable);
  }

  init() {
    this.subextension = undefined;
  }

  abstract run(...args: any[]): void;
}
