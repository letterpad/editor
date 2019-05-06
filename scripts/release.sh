#! /bin/bash

source $(dirname $0)/log.sh

# Current version in package.json
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

git branch -D release-branch

branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
NEW_VERSION=v$1

## verify the correctness of the version
if [ $NEW_VERSION == $PACKAGE_VERSION ]; then
 log "ERROR" "Version already exist."
 exit 1
fi

OUTPUT_FILE=CHANGELOG.md

MASTER_BRANCH=master

if [ $branch != "master" ]; then
    log "ERROR" "Releases can be made only from master."
    exit 1;
fi

# get last two tags
firstTag=$NEW_VERSION 
secondTag=$(git tag | sort -r | head -2 | awk '{split($0, tags, "\n")} END {print tags[1]}')

if [ $firstTag == $secondTag ]; then
    log "ERROR" "The tag ${firstTag} already exist"
    exit 1;
fi

log "Review Changes between ${secondTag} and ${firstTag}"

# Add temp tag 
git tag $NEW_VERSION

LOG=`git log --pretty=format:' - %s - <a href="https://github.com/letterpad/editor/commit/%H">%h</a>' ${secondTag}...${firstTag} 2>&1`

# preview the log
git log --pretty=format:' * %s' ${secondTag}...${firstTag}

# delete temp tag
git tag -d $NEW_VERSION
# confirm
read -p "Should we add this to ChangeLog and commit (y/n)?" CONT
if [ "$CONT" == "y" ] || [ -z "$CONT"]; then
    # create tag for new version from -master
    releaseDate=$(date +%F)
    TITLE="### Release: $secondTag ($releaseDate)"$'\r'
    echo "$TITLE $LOG" | cat - CHANGELOG.md > /tmp/out && mv /tmp/out CHANGELOG.md
    npm version $NEW_VERSION --force
    log "INFO" "Updated version in package.json to $NEW_VERSION"
    ## Publishing npm
    log "INFO" "Publishing to npm..."
    npm publish
    git checkout -b release-branch

    ## commit this in a new release-branch and merge back to master
    log "INFO" "Commiting the files in release-branch"
    git add CHANGELOG.md package.json
    git commit -m "Update CHANGELOG.md"
    git checkout master
    git merge release-branch
    git branch -d release-branch
    log "INFO" "Merged release-branch to master"
else
    git stash
    exit 0
fi

git tag $NEW_VERSION
log "INFO" "Added git tag $NEW_VERSION"
git push tag $NEW_VERSION 
log "INFO" "Release to $NEW_VERSION was successful"