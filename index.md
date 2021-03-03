<link rel="shortcut icon" type="image/x-icon" href="favicon.ico"/>
<meta name="theme-color" content="#7289DA"/>
<meta property="og:image" content="https://cdn.discordapp.com/attachments/733857078388457502/810788933947621376/emote.png"/>

[![Logo](https://cdn.discordapp.com/attachments/802218008574820393/803422081105526804/image3.png)](https://drpcm.t1c.dev/)
# Discord Rich Presence Maker, WITH BUTTONS!
 ### ⬇️ Scroll down for instructions! ⬇️
 
[![Discord](https://discordapp.com/api/guilds/716364441658327120/embed.png?style=shield)](https://discord.gg/Z7UZPR3bbW)
[![Liberapay](https://img.shields.io/badge/support_with-liberapay-F6C915?style=shield&logo=liberapay)](https://liberapay.com/thatonecalculator)
[![Github](https://img.shields.io/badge/star_it_on-github-black?style=shield&logo=github)](https://github.com/thatonecalculator/discordrpcmaker)
[![NPM](https://img.shields.io/badge/v1.7.6-on_npm-CF1212.svg?style=flat&logo=npm)](https://www.npmjs.com/rpcmaker)
[![StandardJS](https://img.shields.io/badge/code_style-standard-green.svg?style=flat&logo=node.js)](https://standardjs.com/)
[![pkg](https://img.shields.io/badge/built_with-pkg-8B8B8B.svg?style=flat)](https://github.com/vercel/pkg)

![Large](https://cdn.discordapp.com/attachments/671117418189422594/803419758287519754/scrot.png)
![Small](https://cdn.discordapp.com/attachments/671117418189422594/803419819293540385/scrot.png)

[![Discord](https://discordapp.com/api/guilds/716364441658327120/embed.png?style=banner2)](https://discord.gg/Z7UZPR3bbW)

## This is meant to be noob-friendly, as long as you follow the instructions!

---

[![Windows](https://cdn.discordapp.com/attachments/671117418189422594/810784142442496010/image19.png)](https://github.com/ThatOneCalculator/DiscordRPCMaker/releases/download/v1.7.4/drpcm-windows.msi) 
[![macOS](https://cdn.discordapp.com/attachments/671117418189422594/810798665232809984/image23.png)](https://github.com/ThatOneCalculator/DiscordRPCMaker/releases/download/v1.7.4/drpcm-macos.pkg) 
[![Linux](https://cdn.discordapp.com/attachments/671117418189422594/810784878043856926/image21.png)](https://github.com/ThatOneCalculator/DiscordRPCMaker/releases/download/v1.7.4/drpcm-linux.zip) 
[![Alpine](https://cdn.discordapp.com/attachments/671117418189422594/810785094418956288/image22.png)](https://github.com/ThatOneCalculator/DiscordRPCMaker/releases/download/v1.7.4/drpcm-alpine.zip)  

---

# Table of Contents:
- [Pre-install](https://drpcm.t1c.dev/#pre-install)
- [Regular install](https://drpcm.t1c.dev/#regular-install)
- [Run/build from source](https://drpcm.t1c.dev/#runningbuilding-from-source)
- [Common issues](https://drpcm.t1c.dev/#common-issues)
- [Planned features](https://drpcm.t1c.dev/#planned-features)
- [Contact](https://drpcm.t1c.dev/#still-need-help-or-just-want-to-chat)

---

# Pre-install

1. Go to https://discord.com/developers/applications/.
2. Hit the "New Application" button in the top right.
3. Give it a good name. This will be what the main text says!

*Options 4-7 are optional! They're if you want images.*

4. Navigate to the "Rich Presence" tab in the left bar. It should be the 4th option down.
5. Go down to "Rich Presence Assets". You don't need a cover/invite image, don't worry!
6. Upload either one or two images. One will be used for the large image, and the other will be used for the small image. Both are optional. In the example screenshots, I only uploaded one image (for a large image). Give them memorable names! (Note: sometimes they don't show up directly after being uploaded. This is normal.)
7. Go back to the "General Information" tab in the left bar. 
8. Copy your Client ID. It should be a big number, and is underneath the description on the left-hand. Hold on to this, it's important! (No, you do NOT need a Client Secret.)

# Regular install
### If you're a regular user, this is what you want!

0. **Linux users,** you skip steps 1-3 by opening a terminal emulator and running `sh -c "$(wget https://raw.githubusercontent.com/ThatOneCalculator/DiscordRPCMaker/main/scripts/linux-install-wget.sh -O -)"`
1. Go to the top and click on your OS (Windows, macOS, Linux, Alpine) or go to the [releases tab](https://github.com/ThatOneCalculator/DiscordRPCMaker/releases).
2. Choose the latest version, and download the zip file for your given system. 
3. Install.
- Windows: 
  - Download the msi.
  - Run the installer.
  - Note: on Windows 10, you may have to hit More Info > Run Anyway.
- macOS:
  - Download the pkg.
  - Run the installer.
- Linux:
  - Download and extract the Linux zip. (Alpine users, download the Alpine zip!)
  - Open your terminal emulator of choice.
  - `cd` into the extracted folder.
  - `sudo ./install.sh`.
4. Run rpcmaker, and follow the instructions there.
  - macOS users: You may not be able to open it at first. If it doesn't let you run it, the Applications folder, find the app, right click and hit open (the first option).
5. Open Discord.
6. Run drpc, and watch your presence spring to life!
  - macOS instructions from step 4 apply here as well.

If you want to edit your presence, re-run rpcmaker.

🎉 ***Congrats, you're done!*** 🎉 *Scroll down to the bottom for common issues, planned features, and ways to contact me!*

--- 

# Running/building from source
## ⚠️ Only if you know what you're doing! ⚠️
[Instructions here.]((https://github.com/ThatOneCalculator/DiscordRPCMaker#runningbuilding-from-source)

# [Click for a list of common issues!](https://github.com/ThatOneCalculator/DiscordRPCMaker#common-issues)


# [Planned features](https://github.com/ThatOneCalculator/DiscordRPCMaker/projects/1):
- [x] v1.7+: Binary releases
- [ ] v2.0: Electron based GUI

# Still need help, or just want to chat?
[Open a new issue here](https://github.com/ThatOneCalculator/DiscordRPCMaker/issues), [ask in the community discussion forum](https://github.com/ThatOneCalculator/DiscordRPCMaker/discussions), or [join the Discord!](https://discord.gg/Z7UZPR3bbW)

The program has been tested on Windows 10, macOS 10.14, macOS 10.15, Arch Linux, and Ubuntu 20.04 LTS. 

