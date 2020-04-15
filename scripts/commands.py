from _dir import src_dir_path, project_dir_path
import os
from pathlib import Path
import re
import json

SUBPACKAGES = ("rmarkdown-core", "bookdown", "blogdown")
TITLE_PATTERN = re.compile(r"""__title__ = (["'`])([^\1]+?)\1""")
PACKAGE_NAME = "rmarkdown_vscode"


def main():
    auto_ts = src_dir_path / "auto.ts"
    package_json_file = project_dir_path / "package.json"
    package_json_content = json.loads(package_json_file.read_text())
    commands = package_json_content["contributes"]["commands"]
    commands_in_package_json = [c["command"] for c in commands]
    import_statements = "import * as vscode from 'vscode';"
    load_function = "export function loadCommands(context: vscode.ExtensionContext) {"
    for subpackage in SUBPACKAGES:
        subpackage_path = src_dir_path / subpackage
        commands_ts = subpackage_path.glob("commands/*.ts")
        for command_ts in commands_ts:
            command_name = command_ts.name[:-3]
            command_name_full = ".".join([PACKAGE_NAME, subpackage, command_name])
            content = command_ts.read_text()
            TITLE = TITLE_PATTERN.findall(content)[0][1]

            if command_name_full not in commands_in_package_json:
                commands.append({"command": command_name_full, "title": TITLE})

            x = next(c for c in commands if c["command"] == command_name_full)
            if x["title"] != TITLE:
                commands[commands.index(x)] = {"command": command_name_full,"title": TITLE}

            import_statements += f"import {{ {command_name} }} from './{command_ts.with_suffix('').relative_to(src_dir_path)}';"
            load_function += make_subscription_push(command_name_full, command_name)
    load_function += "}"

    package_json_file.write_text(json.dumps(package_json_content))

    auto_ts.write_text(import_statements + load_function)


def make_subscription_push(command_name_full, command_name):
    return (
        'context.subscriptions.push(vscode.commands.registerCommand("'
        + command_name_full
        + '", () => { new '
        + command_name
        + "().run();}));"
    )


if __name__ == "__main__":
    main()
