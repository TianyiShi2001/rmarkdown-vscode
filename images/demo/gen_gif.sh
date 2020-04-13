#!/bin/zsh

for file in *.mov; do
    [[ -f ${file%.mov}.gif ]] || ffmpeg -i $file -filter:v fps=25 ${file%.mov}.gif
done
