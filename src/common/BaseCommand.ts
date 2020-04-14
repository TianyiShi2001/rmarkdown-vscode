// adapted from https://github.com/Borvik/vscode-postgres/blob/master/src/common/baseCommand.ts
import * as vscode from "vscode";

export abstract class BaseCommand {
  constructor() {
    this.init();
    // let fullCommandName = "rmarkdown_vscode.";
    // let commandName = this.constructor.name.replace(/Command$/, "");
    // if (subpackage !== undefined) {
    //   fullCommandName += subpackage + ".";
    // }
    // fullCommandName += commandName;
    // let disposable = vscode.commands.registerCommand(fullCommandName, this.run, this);
    // console.log("pushing: ", fullCommandName);
    // context.subscriptions.push(disposable);
  }
  init(): void {}
  abstract run(...args: any[]): void;
}
