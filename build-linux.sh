#/bin/sh

yay -S rpm-tools
cp ./PKGBUILD ../aur/discordrpcmaker/
rm -rf ./dist/
yarn install
electron-builder -l AppImage tar.gz deb rpm -c.productName "Discord RPC Maker"
electron-builder -w -c.productName "Discord RPC Maker"
cd ./dist/
chmod +x *.AppImage
mv *.AppImage discordrpcmaker-linux.appimage
mv *.deb discordrpcmaker-linux.deb
mv *.rpm discordrpcmaker-linux.rpm
mv *.tar.gz discordrpcmaker-linux.tar.gz
mv *.exe discordrpcmaker-windows.exe
mv *mac.zip discordrpcmaker-macos-pre.zip
rm *.blockmap
yay -Rnscd rpm-tools
nemo . & disown
# cd ../../aur/discordrpcmaker
# rm ./.SRCINFO
# cp ../../DiscordRPCMaker/PKGBUILD ./
# makepkg --printsrcinfo > .SRCINFO
# git add .SRCINFO PKGBUILD
# git commit -m "automatic script commit message"
# git push