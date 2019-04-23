#!/bin/sh
echo "[$(date "+%H:%M:%S %d/%m/%y")]: Building..."
meteor build .
echo "[$(date "+%H:%M:%S %d/%m/%y")]: Uploading build to server..."
scp -i ./hr-space ./hr-space.tar.gz webadmin@185.83.149.108:/home/hr-space
#echo "[$(date "+%H:%M:%S %d/%m/%y")]: Running deployment script on server..."
#ssh -i ~/work/keys/hr-space webadmin@185.83.149.108 "bash /home/hr-space/script.sh"
echo "[$(date "+%H:%M:%S %d/%m/%y")]: Done..."
