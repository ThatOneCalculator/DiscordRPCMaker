#/bin/sh

rm -rf ./dist/
electron-builder -l AppImage tar.gz deb rpm -c.productName "Discord RPC Maker" 
cd ./dist/
chmod +x *.AppImage
mv *.AppImage discordrpcmaker-linux.appimage
mv *.deb discordrpcmaker-linux.deb
mv *.rpm discordrpcmaker-linux.rpm
mv *.tar.gz discordrpcmaker-linux.tar.gz