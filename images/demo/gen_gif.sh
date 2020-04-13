#!/bin/zsh

for file in *.mov; do
    [[ -f ${file%.mov}.gif ]] || ffmpeg -i $file -r 3 -s 1920x1080 -fs 10M ${file%.mov}.gif
done
