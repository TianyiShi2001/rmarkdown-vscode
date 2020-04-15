"""convert markdown syntax to rmarkdown syntax
"""
import re
import json
import os

from toolz.functoolz import pipe

from _dir import project_dir, project_dir_path


def main():
    syntaxes_dir_path = project_dir_path / "syntaxes"
    src_json = syntaxes_dir_path / "markdown.tmLanguage.json"
    dst_json = syntaxes_dir_path / "rmarkdown.tmLanguage.json"
    addition_json = syntaxes_dir_path / "addition.json"

    content = json.loads(src_json.read_text())
    additions = json.loads(addition_json.read_text())

    # content = conv_chunkparser(content)
    # add_new_with_context = lambda content: add_new(content, additions)
    content = pipe(content, conv_chunkparser)  # , add_new_with_context)

    dst_json.write_text(json.dumps(content))


def conv_chunkparser(content):
    langAliases = {"js": "js|javascript|node"}
    for field, attrs in content["repository"].items():
        if m := re.match(r"fenced_code_block_(\w+)", field):
            lang = m[1]
            if lang == "unknown":
                next
            engine = langAliases[lang] if langAliases.get(lang) else lang
            attrs["begin"] = r"(^|\G)(\s*)(```)\{(" + engine + r").*\}\s*$"
            attrs["end"] = r"(^|\G)(\2)(```)\s*$"
            if attrs["beginCaptures"].get("5"):
                del attrs["beginCaptures"]["5"]
    return content


def add_new(content, additions: dict):
    entries: dict = content["repository"]
    for k, v in additions.items():
        if k not in entries.keys():
            entries.update({k: v})
        extends = v["extends"]
        for e in entries.values():
            if parent_includes := e.get("patterns"):
                includes = [
                    i["include"][1:] for i in parent_includes if i.get("include")
                ]
                if (extends in includes) and (k not in includes):
                    parent_includes.append({"include": f"#{k}"})
    return content


if __name__ == "__main__":
    main()
