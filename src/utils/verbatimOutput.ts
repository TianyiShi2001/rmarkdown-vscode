import { ChildProcessWithoutNullStreams } from "child_process";

import { OutputChannel } from "vscode";
import * as chalk from "chalk";

export function verbatimOutput(p: ChildProcessWithoutNullStreams, outputChannel: OutputChannel): void {
  outputChannel.show();
  p.stdout.on("data", (data) => {
    outputChannel.append(data.toString());
  });
  p.stderr.on("data", (data) => {
    outputChannel.append(chalk.red(data.toString()));
  });
}
