import * as vscode from "vscode";
import { Knit } from "./rmarkdown-core/commands/Knit";
import { ServeBook } from "./bookdown/commands/ServeBook";
import { ServeSite } from "./blogdown/commands/ServeSite";
import { NewPost } from "./blogdown/commands/NewPost";
export function loadCommands(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("rmarkdown_vscode.rmarkdown-core.Knit", () => {
      new Knit().run();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("rmarkdown_vscode.bookdown.serveBook", () => {
      new ServeBook().run();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("rmarkdown_vscode.blogdown.ServeSite", () => {
      new ServeSite().run();
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("rmarkdown_vscode.blogdown.NewPost", () => {
      new NewPost().run();
    })
  );
}
