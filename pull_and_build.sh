#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR
git pull
pm2 delete SimulShift.com
npm run build
pm2 start ecosystem.config.cjs
