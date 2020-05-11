"""make indexes e.g. from common/*.ts to common.ts
"""
import re
import json
import os
from pathlib import Path

TARGETS = ["common", "utils"]
EXPORT_PATTERN = re.compile(
    r"^export.+?(?:function|const|let|class|type|interface) (\w+)", re.MULTILINE
)

from _dir import src_dir


def main():
    for target in TARGETS:
        target_dir = Path(src_dir) / target
        target_ts = Path(src_dir) / f"{target}.ts"
        export_statement = ""
        for ts in target_dir.glob("*.ts"):
            content = ts.read_text()
            if exports := EXPORT_PATTERN.findall(content):
                export_statement += f"export {{ {', '.join(exports)} }} from './{target}/{ts.name[:-3]}';\n"
        target_ts.write_text(export_statement)

        # for ts in os.listdir(target):
        #     if (not ts.endswith("ts")) or (ts[0] in [".", "_"]):
        #         continue
        #     with open(ts) as f:
        #         content = f.read()
        #     print(content)


if __name__ == "__main__":
    main()
