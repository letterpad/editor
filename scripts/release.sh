#! /bin/bash

source $(dirname $0)/log.sh

git branch -D release-branch

branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
versionLabel=v$1

if [ $versionLabel == "vmaster" ]; then
    versionLabel="master"
fi

OUTPUT_FILE=CHANGELOG.md

masterBranch=master

if [ $branch == "master" ]; then
    log "ERROR" "Releases can be made only from master."
    exit 1;
fi

# get last two tags
firstTag=master #$versionLabel # suppose to be $versionLabel
secondTag=$(git tag | sort -r | head -2 | awk '{split($0, tags, "\n")} END {print tags[1]}')

if [ $firstTag == $secondTag ]; then
    log "ERROR" "The tag ${firstTag} already exist"
    exit 1;
fi

log "Review Changes between ${secondTag} and ${firstTag}"

LOG=`git log --pretty=format:' * %s - <a href="https://github.com/letterpad/editor/commit/%H">%h</a>' ${secondTag}...${firstTag} 2>&1`

# preview the log
git log --pretty=format:' * %s' ${secondTag}...${firstTag}

# confirm
read -p "Should we add this to ChangeLog and commit (y/n)?" CONT
if [ "$CONT" == "y" ] || [ -z "$CONT"]; then
    # create tag for new version from -master
    

    TITLE="### Release: $secondTag"$'\r'
    echo "$TITLE $LOG" | cat - CHANGELOG.md > /tmp/out && mv /tmp/out CHANGELOG.md
    
    npm version $versionLabel
    log "INFO" "Updated version in package.json to $versionLabel"

    ## Publishing npm
    log "INFO" "Publishing to npm..."
    # npm publish

    ## commit this in a new release-branch and merge back to master
    git checkout -b release-branch
    log "INFO" "Commiting the files in release-branch"
    git add CHANGELOG.md package.json
    git commit -m "Update CHANGELOG.md"
    git stash
    git checkout master
    # git merge release-branch
    # git branch -d release-branch
    # log "INFO" "Merged release-branch to master"
    exit 1;
else
    exit 0;
fi

# git tag $versionLabel
log "INFO" "Added git tag $versionLabel"
# git push tag $versionLabel 