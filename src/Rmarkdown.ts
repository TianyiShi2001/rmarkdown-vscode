import { basename, dirname } from "path";
import * as vscode from "vscode";
// import { spawn } from "child_process";
import { render } from "rmarkdown";

export class Rmarkdown {
  private _outputChannel: vscode.OutputChannel;
  private _fullpath?: string;
  private _filename?: string;
  private _dirname?: string;
  constructor() {
    this._outputChannel = vscode.window.createOutputChannel("Knit");
  }
  public async knit() {
    this._initialize();
    this._outputChannel.show();
    // const command = `Rscript -e 'rmarkdown::render("${this._filename}", "all")'`;
    // this._outputChannel.appendLine("[R Markdown] " + command);
    // let p = spawn(command, [], { cwd: this._dirname, shell: true });
    let p = render(this._fullpath);
    p.stdout.on("data", (data) => {
      this._outputChannel.append(data.toString());
    });
    p.stderr.on("data", (data) => {
      this._outputChannel.append(data.toString());
    });
  }
  private _initialize(): void {
    this._fullpath = vscode.window.activeTextEditor!.document.fileName;
    this._filename = basename(this._fullpath);
    this._dirname = dirname(this._fullpath);
  }
}
