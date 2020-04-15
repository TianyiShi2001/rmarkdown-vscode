//// @ts-nocheck
import { Rcall, Rscript } from "r-helper";
import * as vscode from "vscode";
import { BaseCommand } from "../../common/BaseCommand";
import { verbatimOutput } from "../../utils/verbatimOutput";
import { spawn } from "child_process";

// __title__ = "Bookdown: Serve Book";
export class ServeBook extends BaseCommand {
  private _outputChannel: vscode.OutputChannel | undefined;
  init() {
    this._outputChannel = vscode.window.createOutputChannel("Bookdown");
  }
  async run() {
    let p = spawn(Rscript(Rcall("bookdown::serve_book()")), { cwd: vscode.workspace.workspaceFolders![0].uri.path, shell: true });
    console.log(p);
    verbatimOutput(p, this._outputChannel as vscode.OutputChannel);
  }
}
