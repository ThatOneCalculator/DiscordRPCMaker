#⚠ THIS BRANCH ISN'T READY! GO BACK, GO BACK!! ⚠ 

[![Logo](https://cdn.discordapp.com/attachments/802218008574820393/803422081105526804/image3.png)](https://drpcm.t1c.dev/)
# Discord Rich Presence Maker, WITH BUTTONS!
### ⬇️ Scroll down for instructions! ⬇️
###### Version 2.0, [![on npm!](https://img.shields.io/badge/on-npm!-CF1212.svg?style=flat&logo=npm)](https://www.npmjs.com/rpcmaker)

[![Discord](https://discordapp.com/api/guilds/716364441658327120/embed.png?style=shield)](https://discord.gg/Z7UZPR3bbW)
[![Liberapay](https://img.shields.io/badge/support_with-liberapay-F6C915?style=shield&logo=liberapay)](https://liberapay.com/thatonecalculator)
[![Github](https://img.shields.io/badge/star_it_on-github-black?style=shield&logo=github)](https://github.com/thatonecalculator/discordrpcmaker)
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
- [Pre-install](https://github.com/ThatOneCalculator/DiscordRPCMaker#pre-install)
- [Regular install](https://github.com/ThatOneCalculator/DiscordRPCMaker#regular-install)
- [Run from source](https://github.com/ThatOneCalculator/DiscordRPCMaker#runningbuilding-from-source)
- [Common issues](https://github.com/ThatOneCalculator/DiscordRPCMaker#common-issues)
- [Planned features](https://github.com/ThatOneCalculator/DiscordRPCMaker#planned-features)
- [Contact](https://github.com/ThatOneCalculator/DiscordRPCMaker#still-need-help-or-just-want-to-chat)

---

# Pre-install
*Steps 4-7 are optional! They're if you want images.*

1. Go to https://discord.com/developers/applications/.
2. Hit the "New Application" button in the top right.
3. Give it a good name. This will be what the main text says!
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
4. Open Discord
###### macOS users: You may not be able to open it at first. If it doesn't let you run it, the Applications folder, find the app, right click and hit open (the first option).
5. Open Discord.
6. Open Discord RPC Maker.
7. Fill out the prompts.
8. Click save, then click run.
9. watch your presence spring to life!

#### If you want to edit your presence, re-run rpcmaker.

🎉 ***Congrats, you're done!*** 🎉 *Scroll down to the bottom for common issues, planned features, and ways to contact me!*

--- 

# Running/building from source
## ⚠️ Only if you know what you're doing! Go back to [Regular Install](https://github.com/ThatOneCalculator/DiscordRPCMaker#regular-install) if you're lost. ⚠️


<details>
    <summary markdown="span">Click me for the  list of running/building instructions!</summary>

#### This is assuming you have basic CLI knowledge!

1. Install both nodejs and Electron.
2. `git clone https://github.com/thatonecalculator/discordrpcmaker`
3. `cd discordrpcmaker`
4. `electron .`

</details>

# Common issues

### Help, I'm confused and followed the run from source instructions!
There was a big warning there for a reason. Go back and read the regular install instructions, ya goober.

### My buttons aren't working!
Discord doesn't let you click your own buttons. However, everyone else can. This is a limitation with Discord.

### I can't see the presence!
Make sure you are not invisible/offline. If you ARE online/idle/dnd...
- Make sure you don't have another program taking up a presence slot.
- Go to Settings > Game Activity > Make sure "Display currently running game as a status message" is ON.
- Try running DRPC again.

### The image(s) aren't showing!
If you just put them in, *sometimes* Discord takes a minute or so to cache them properly.

### I'm on mobile, what do I do?
As of right now, there's no way to do this through a mobile device. Sorry!

</details>


# [Planned features](https://github.com/ThatOneCalculator/DiscordRPCMaker/projects/1):
- [x] v1.7+: Binary releases
- [x] v2.0: Electron based GUI, multiple presences

# Still need help, or just want to chat?
[Open a new issue here](https://github.com/ThatOneCalculator/DiscordRPCMaker/issues), [ask in the community discussion forum](https://github.com/ThatOneCalculator/DiscordRPCMaker/discussions), or [join the Discord!](https://discord.gg/Z7UZPR3bbW)

The program has been tested on Windows 10, macOS 10.14, macOS 10.15, Arch Linux, and Ubuntu 20.04 LTS. 
