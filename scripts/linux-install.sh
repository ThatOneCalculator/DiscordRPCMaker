#!/bin/bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi
install -m755 ./drpc /usr/bin/drpc
install -m755 ./rpcmaker /usr/bin/rpcmaker
cp ./assets/rpcmaker.desktop /usr/share/applications/
cp ./assets/drpc.desktop /usr/share/applications/
cp ./assets/rpcmaker.png /usr/share/icons/hicolor/48x48/apps/
echo "Done!"
