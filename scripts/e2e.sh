#!/bin/bash
CLEAR='\033[0m'
RED='\033[0;31m'

function usage() {
  if [ -n "$1" ]; then
    echo -e "${RED}👉 $1${CLEAR}\n";
  fi
  echo "Usage: $0 [-d debug] [-r remote]"
  echo "  -d, --debug  Open browser and run"
  echo "  -r, --remote Run in Circle CI"
  echo ""
  echo "Example: $0 --dubug --remote"
  exit 1
}

# parse params
while [[ "$#" > 0 ]]; do case $1 in
  -d|--debug) DEBUG=1; shift;;
  -r|--remote) REMOTE=1;shift;;
  -v|--verbose) VERBOSE=1;shift;;
  *) usage "Unknown parameter passed: $1"; shift; shift;;
esac; done

# verify params (only mandatory ones)
#if [ -z "$DEBUG" ]; then usage "Debug is not set"; fi;

RUN="cy:run"

if [[ $DEBUG == 1 ]]; then
    RUN="cy:open"
    yarn start-server-and-test testServer http://localhost:4343 "$RUN"
elif [[ $REMOTE == 1 ]]; then
    # RUN="cy:run --record --key 12300a0c-24c0-4943-bc01-55598094f392 --parallel"
    yarn start-server-and-test testServer http://localhost:4343 cy:run --record --key 12300a0c-24c0-4943-bc01-55598094f392 --parallel
else
    yarn start-server-and-test testServer http://localhost:4343 "$RUN"
fi


