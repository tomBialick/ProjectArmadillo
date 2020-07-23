#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
LIGHTRED='\033[1;31m'
NC='\033[0;0m'

SECRET=$(cat /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1) #Consider hashing
mkdir auth
echo "{
  \"secret\" : \""${SECRET}"\"
}" > ./auth/sessionSecret.json
mkdir resources

exit 0
