#! /bin/bash

source $(dirname $0)/log.sh

OUTPUT_FILE=CHANGELOG.md

# get last two tags
firstTag=$1 
secondTag=$(git tag | sort -r | head -2 | awk '{split($0, tags, "\n")} END {print tags[1]}')

# This is the new change log
CHANGELOG=`git log --pretty=format:' - %s [%h](https://github.com/letterpad/editor/commit/%H")' ${secondTag}...${firstTag} 2>&1`

releaseDate=$(date +%F)
# Create release title
TITLE="### Release: $firstTag ($releaseDate)"$'\r'
printf "$TITLE\n\n $CHANGELOG \n\n" | cat - CHANGELOG.md > /tmp/out && mv /tmp/out CHANGELOG.md
