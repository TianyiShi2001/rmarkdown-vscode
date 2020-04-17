import { BaseCommand } from "../../common";
import { verbatimOutput } from "../../utils";
import * as vscode from "vscode";
import { render } from "rmarkdown-helper";

// __title__ = "Knit to All Formats";
export class Knit extends BaseCommand {
  private _outputChannel!: vscode.OutputChannel;
  private _fullpath?: string;
  init(): void {
    this._outputChannel = vscode.window.createOutputChannel("Knit");
    this._fullpath = vscode.window.activeTextEditor!.document.fileName;
  }
  public async run() {
    this._outputChannel.show();
    // const command = `Rscript -e 'rmarkdown::render("${this._filename}", "all")'`;
    // this._outputChannel.appendLine("[R Markdown] " + command);
    // let p = spawn(command, [], { cwd: this._dirname, shell: true });
    let p = render(this._fullpath);
    // p.stdout.on("data", (data) => {
    //   this._outputChannel.append(data.toString());
    // });
    // p.stderr.on("data", (data) => {
    //   this._outputChannel.append(data.toString());
    // });
    verbatimOutput(p, this._outputChannel);
  }
}
