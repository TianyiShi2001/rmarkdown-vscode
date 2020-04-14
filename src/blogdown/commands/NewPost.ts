// @ts-nocheck
import * as vscode from "vscode";
import { MultiStepInput } from "../../common";
import { BaseCommand } from "../../common/BaseCommand";
import { promises as fsPromises, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { slugify } from "../../utils/slugify";

const { readdir } = fsPromises;

// const extOptions = [
//   { label: "Rmd", ext: ".Rmd" },
//   { label: "md", ext: ".md" },
// ];

// always Rmd, always today

// __title__ = "Blogdown: New Post";
export class NewPost extends BaseCommand {
  readonly TotalSteps: number = 4;

  async run() {
    const state = { projectDir: vscode.workspace.workspaceFolders![0].uri.path } as Partial<NewPostOptions>;
    if (!(await MultiStepInput.run((input) => this.setTitle(input, state)))) {
      // command cancelled
      return;
    }
    const slug = slugify(state.title!);
    const newPostPath = join(state.category!, slug + ".Rmd");
    simpleNewPostGenerator(state.archetype!, newPostPath, state as NewPostOptions);
    vscode.workspace.openTextDocument(newPostPath).then((document) => vscode.window.showTextDocument(document));
  }

  async setTitle(input: MultiStepInput, state: Partial<NewPostOptions>) {
    state.title = await input.showInputBox({
      title: this.TITLE,
      step: input.CurrentStepNumber,
      totalSteps: this.TotalSteps,
      prompt: "The Title to be Displayed",
      placeholder: "Hello Blogdown",
      ignoreFocusOut: true,
      value: "",
      //value: typeof state.host === "string" ? state.host : "",
      validate: async (value) => (!value || !value.trim() ? "Title is required" : ""),
    });
    return (input: MultiStepInput) => this.setAuthor(input, state);
  }

  async setAuthor(input: MultiStepInput, state: Partial<NewPostOptions>) {
    state.author = await input.showInputBox({
      title: this.TITLE,
      step: input.CurrentStepNumber,
      totalSteps: this.TotalSteps,
      prompt: "Author",
      placeholder: "your name goes here",
      ignoreFocusOut: true,
      value: typeof state.author === "string" ? state.author : "",
      validate: async (value) => (!value || !value.trim() ? "Author is required" : ""),
    });
    return (input: MultiStepInput) => this.setCategory(input, state);
  }

  async setCategory(input: MultiStepInput, state: Partial<NewPostOptions>) {
    const categories = await getCategories(state.projectDir!);
    const active = undefined; // TODO: last used; most used
    state.category = await input.showQuickPick({
      title: this.TITLE,
      step: input.CurrentStepNumber,
      totalSteps: this.TotalSteps,
      placeholder: 'Category (which subdirectory of "content")',
      ignoreFocusOut: true,
      items: categories,
      activeItem: active,
      convert: async (value: CategoryPickItem) => value.fullPath,
    });
    return (input: MultiStepInput) => this.setArchetype(input, state);
  }

  async setArchetype(input: MultiStepInput, state: Partial<NewPostOptions>) {
    // first need the databases
    const archetypes = await getArchetypes(state.projectDir!);
    const active = undefined; // TODO: last used; most used
    state.archetype = await input.showQuickPick({
      title: this.TITLE,
      step: input.CurrentStepNumber,
      totalSteps: this.TotalSteps,
      placeholder: 'Archetype (in the "archetypes" directory',
      ignoreFocusOut: true,
      items: archetypes,
      activeItem: active,
      convert: async (value: ArchetypePickItem) => value.fullPath,
    });
  }
}

interface NewPostOptions {
  projectDir: string;
  title: string;
  author: string;
  category: string;
  archetype: string;
}

interface CategoryPickItem extends vscode.QuickPickItem {
  fullPath: string;
}

async function getCategories(projectDir: string): Promise<CategoryPickItem[]> {
  const categoriesParentDir = join(projectDir, "content");
  const categories = await (await readdir(categoriesParentDir, { withFileTypes: true })).filter((p) => p.isDirectory()).map((p) => p.name);
  return Array.from(categories, (cat) => {
    return { label: cat, fullPath: join(categoriesParentDir, cat) };
  });
}

interface ArchetypePickItem extends vscode.QuickPickItem {
  fullPath: string;
}

async function getArchetypes(projectDir: string): Promise<ArchetypePickItem[]> {
  const archetypesDir = join(projectDir, "archetypes");
  const archetypes = await (await readdir(archetypesDir, { withFileTypes: true })).filter((p) => p.isFile() && p.name.slice(p.name.length - 2) === "md").map((p) => p.name);
  return Array.from(archetypes, (arc) => {
    return { label: arc, fullPath: join(archetypesDir, arc) };
  });
}

function simpleNewPostGenerator(src: string, dst: string, options: NewPostOptions) {
  const archetypeLines = readFileSync(src, "utf8").split(/\r?\n/g);
  if (archetypeLines[0] !== "---") {
    throw Error("Archetypes files must have YAML frontmatter");
  }
  let n = 0; // number of '---'s
  let content = archetypeLines
    .map((line) => {
      if (n === 2) {
        return line;
      } else if (line.slice(0, 3) === "---") {
        n++;
        return line;
      }
      let m = line.match(/^[a-z]+/);
      if (m !== null) {
        switch (m[0]) {
          case "title": {
            return "title: " + options.title;
          }
          case "author": {
            return "author: " + options.author;
          }
          case "date": {
            return "date: " + new Date().toISOString().slice(0, 10);
          }
        }
      }
      return line;
    })
    .join("\n");
  writeFileSync(dst, content, "utf8");
}
