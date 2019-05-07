#! /bin/bash
RED='\033[0;31m'
GREY='\033[0m'
WHITE='\033[97m'
YELLOW='\033[33'

function log() {
    function logline() {
        colorprint $1 "* $script_name $2: $3"
    }

    case $1 in
        INFO)
            logline ${WHITE} "$1" "$2" ;;
        WARN)
            logline ${YELLOW} "$1" "$2" >&2 ;;
        ERROR)
            logline ${RED} "$1" "$2" >&2 ;;
        DEBUG)
            logline ${GREY} "$1" "$2" ;;
        *)
            log "ERROR"  "unknown log level"
            return 1
            ;;
    esac
}

function colorprint() {
    # $1 = color number, for example 31, 33, 1;37
    # $2 = message to be echoed
    
    # printf "I ${RED}lo"
    echo -e " $1$2\033[0m" 
}
