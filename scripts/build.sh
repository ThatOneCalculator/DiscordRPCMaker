#!/bin/bash
cd ..
pkg ./maker.js --target latest-macos-x64,latest-win-x64,latest-linux-x64,latest-alpine-x64 -c ./package.json
mv rpcmaker-win.exe ./bin/windows/rpcmaker.exe
mv rpcmaker-linux ./bin/linux/rpcmaker
mv rpcmaker-macos ./bin/macos/rpcmaker
mv rpcmaker-alpine ./bin/alpine/rpcmaker
pkg ./presence.js --target latest-macos-x64,latest-win-x64,latest-linux-x64,latest-alpine-x64 -c ./package.json
mv rpcmaker-win.exe ./bin/windows/drpc.exe
mv rpcmaker-linux ./bin/linux/drpc
mv rpcmaker-macos ./bin/macos/drpc
mv rpcmaker-alpine ./bin/alpine/drpc
cd ./bin/
rm windows.zip
rm linux.zip
rm alpine.zip
rm macos.zip
cp -r ../linux-desktop-assets/ ./linux/assets
cp -r ../linux-desktop-assets/ ./alpine/assets
cp ../scripts/linux-install.sh ./linux/install.sh
cp ../scripts/linux-install.sh ./alpine/install.sh
zip -r windows.zip ./windows
zip -r linux.zip ./linux
zip -r alpine.zip ./alpine
zip -r macos.zip ./macos
cd ..
