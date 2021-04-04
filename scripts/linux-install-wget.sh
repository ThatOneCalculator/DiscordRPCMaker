#!/bin/sh

wget https://github.com/ThatOneCalculator/DiscordRPCMaker/releases/download/v1.8.2/drpcm-linux.zip
unzip ./drpcm-linux.zip
cd ./linux
sudo ./install.sh
cd ..
rm -rf ./drpcm-linux.zip
rm -rf ./linux/
