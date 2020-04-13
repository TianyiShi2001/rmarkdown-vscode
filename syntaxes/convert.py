"""convert markdown syntax to rmarkdown syntax
"""
import re
import json
import os

# import toolz


def main():
    this_dir = os.path.dirname(__file__)
    src = os.path.join(this_dir, "markdown.tmLanguage.json")
    dst = os.path.join(this_dir, "rmarkdown.tmLanguage.json")
    with open(src) as f:
        content = json.load(f)
    content = conv_chunkparser(content)
    with open(dst, "w") as f:
        json.dump(content, f)


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


if __name__ == "__main__":
    main()
