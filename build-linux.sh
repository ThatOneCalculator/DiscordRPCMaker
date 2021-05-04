#/bin/sh

yay -S rpm-tools
rm -rf ./dist/
npm i
electron-builder -l AppImage tar.gz deb rpm -c.productName "Discord RPC Maker" 
cd ./dist/
chmod +x *.AppImage
mv *.AppImage discordrpcmaker-linux.appimage
mv *.deb discordrpcmaker-linux.deb
mv *.rpm discordrpcmaker-linux.rpm
mv *.tar.gz discordrpcmaker-linux.tar.gz
yay -Rnscd rpm-tools
nemo . & disown
cd ../../discordrpcmaker-aur
rm ./.SRCINFO
cp ../DiscordRPCMaker/PKGBUILD ./
git add .SRCINFO PKGBUILD
git commit -m "automatic script commit message"
git push