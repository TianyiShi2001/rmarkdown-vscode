//// @ts-nocheck
import { Rcall, Rscript } from "r-helper";
import * as vscode from "vscode";
import { MultiStepInput, InputFlowAction } from "../common/MultistepInput";
import { BaseCommand } from "../common/BaseCommand";
import { promises as fsPromises, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { slugify } from "../utils/slugify";
import { verbatimOutput } from "../utils/verbatimOutput";
import { spawn } from "child_process";

export class serveSiteCommand extends BaseCommand {
  private _outputChannel: vscode.OutputChannel | undefined;
  init() {
    this.subextension = "blogdown";
    this._outputChannel = vscode.window.createOutputChannel("Blogdown");
  }
  async run() {
    console.log("trying to serve");
    let p = spawn(Rscript(Rcall("blogdown::serve_site")), { cwd: vscode.workspace.workspaceFolders![0].uri.path, shell: true });
    console.log(p);
    verbatimOutput(p, this._outputChannel as vscode.OutputChannel);
  }
}
