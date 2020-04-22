#! /bin/bash

source $(dirname $0)/log.sh

# Current version in package.json
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

# If there is a release branch, delete it
git branch -D release-branch &>/dev/null 

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
secondTag=$(git describe --abbrev=0) 

if [ $firstTag == $secondTag ]; then
    log "ERROR" "The tag ${firstTag} already exist"
    exit 1;
fi

log "INFO" "Review Changes between ${secondTag} and HEAD"

# Add temp tag 
git tag $NEW_VERSION  &>/dev/null 

CHANGELOG=`git log --pretty=format:' - %B (<a href="https://github.com/letterpad/editor/commit/%H">%h</a>)' ${secondTag}...HEAD 2>&1`

# preview the log
git log --pretty=format:' * %s %b' ${secondTag}..HEAD

# delete temp tag
git tag -d $NEW_VERSION  &>/dev/null 
# confirm
read -p "Should we add this to ChangeLog and commit (y/n)?" CONT
if [ "$CONT" == "y" ] || [ -z "$CONT"]; then
    # create tag for new version from -master
    releaseDate=$(date +%F)
    # Create release title
    TITLE="### Release: $firstTag ($releaseDate)"$'\r'
    printf "$TITLE\n\n $CHANGELOG \n\n" | cat - CHANGELOG.md > /tmp/out && mv /tmp/out CHANGELOG.md
    npm version $NEW_VERSION --force
    log "INFO" "Updated version in package.json to $NEW_VERSION"
    ## Publishing npm
    log "INFO" "Publishing to npm..."
    npm publish
    git checkout -b release-branch &>/dev/null

    ## commit this in a new release-branch and merge back to master
    log "INFO" "Commiting the files in release-branch"
    git add CHANGELOG.md package.json &>/dev/null
    git commit -m "Update CHANGELOG.md" &>/dev/null
    git checkout master &>/dev/null
    git merge release-branch &>/dev/null
    git branch -d release-branch &>/dev/null
    log "INFO" "Merged release-branch to master"
else
    # git stash &>/dev/null
    exit 0
fi

git tag $NEW_VERSION  &>/dev/null 
log "INFO" "Added git tag $NEW_VERSION"
git push origin $NEW_VERSION &>/dev/null
log "INFO" "Release to $NEW_VERSION was successful"