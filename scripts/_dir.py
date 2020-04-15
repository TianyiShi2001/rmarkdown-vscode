import os
from pathlib import Path

project_dir = os.path.split(os.path.dirname(__file__))[0]
project_dir_path = Path(project_dir)
src_dir = os.path.join(project_dir, "src")
src_dir_path = Path(src_dir)

ch_src_dir = lambda: os.chdir(src_dir)
