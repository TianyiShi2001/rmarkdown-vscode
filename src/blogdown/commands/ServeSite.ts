//// @ts-nocheck
import { Rcall, Rscript } from "r-helper";
import * as vscode from "vscode";
import { BaseCommand } from "../../common/BaseCommand";
import { verbatimOutput } from "../../utils/verbatimOutput";
import { spawn } from "child_process";

// __title__ = "Blogdown: Serve Site";
export class ServeSite extends BaseCommand {
  private _outputChannel: vscode.OutputChannel | undefined;
  init() {
    this._outputChannel = vscode.window.createOutputChannel("Blogdown");
  }
  async run() {
    console.log("trying to serve");
    let p = spawn(Rscript(Rcall("blogdown::serve_site")), { cwd: vscode.workspace.workspaceFolders![0].uri.path, shell: true });
    console.log(p);
    verbatimOutput(p, this._outputChannel as vscode.OutputChannel);
  }
}
