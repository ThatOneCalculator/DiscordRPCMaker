[![Logo](https://cdn.discordapp.com/attachments/802218008574820393/803422081105526804/image3.png)](https://drpcm.t1c.dev/)
# Discord Rich Presence Maker, WITH BUTTONS!
### ⬇️ Scroll down for instructions! ⬇️
###### Version 1.7.6, [![on npm!](https://img.shields.io/badge/on-npm!-CF1212.svg?style=flat&logo=npm)](https://www.npmjs.com/rpcmaker)

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
- [Run/build from source](https://github.com/ThatOneCalculator/DiscordRPCMaker#runningbuilding-from-source)
  - [Running](https://github.com/ThatOneCalculator/DiscordRPCMaker#running)
  - [Building](https://github.com/ThatOneCalculator/DiscordRPCMaker#building)
- [Common issues](https://github.com/ThatOneCalculator/DiscordRPCMaker#common-issues)
- [Planned features](https://github.com/ThatOneCalculator/DiscordRPCMaker#planned-features)
- [Contact](https://github.com/ThatOneCalculator/DiscordRPCMaker#still-need-help-or-just-want-to-chat)

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
## ⚠️ Only if you know what you're doing! Go back to [Regular Install](https://github.com/ThatOneCalculator/DiscordRPCMaker#regular-install) if you're lost. ⚠️

## Running

### Installing Node

1. Download the NodeJS installer at https://nodejs.org/en/download/ (for Windows and macOS users). Linux users, install from your [package manager](https://nodejs.org/en/download/package-manager/).
2. Install.
- (Windows/macOS) Install the program. If prompted, make sure to check the box for "Automatically install the necessary tools."
- (Linux) Make sure `npm` and `node-gyp` are installed.

### Generating your presence

1. Open a console. This will vary by operating system. 
- **Windows**: Open a program called `cmd`. 
- **macOS**: Open a program called `Terminal`.
- **Linux**: Open your terminal emulator of choice.
2. Type `npm i -g rpcmaker` and hit enter. 
<!-- (Arch Linux users can also `yay -S rpcmaker`) -->
3. Type `rpcmaker` and hit enter.
4. Follow the prompts the program gives you.

### Part 4: Running your presence
1. Open Discord (it's fine in the background, but you wanna see your cool presence, right?)
2. Just type the command below into the same cmd/Terminal window from before:
- **Windows**: `start /b drpc`
- **macOS/Linux**: `drpc & disown`

#### And close the window! Watch as your new presence springs to life!

## Building

**This will only work on Linux/macOS.** Windows users can follow the steps and manually run the contents of `build.sh`, I guess.
1. `npm i -g pkg`
2. `cd` into the project directory.
3. `mkdir ./bin/`
4. `cd ./bin/`
5. `mkdir windows; mkdir macos; mkdir alpine; mkdir linux`
6. `cd ../scripts`
7. `./build.sh`

*Pro tip: instead of typing the command every time, you can hit the ↑ (up) key and hit enter!*

### How to update the program:
- Open cmd/Terminal.
- `npm i -g rpcmaker`

### How to edit your presence:
There's 2 options:
- Open cmd and run `rpcmaker` (*Recommended, just do this!*)
- Manually edit the options file. In Windows, this at `%APPDATA%\Roaming\drpcm-options.json`. In macOS/Linux, it's in `~/.config/drpcm-options.json`.

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

### Running/building from source specific issues below

<details>
    <summary markdown="span">Click me for the  list of running/building issues!</summary>
  
### I can't install the npm package(s)!
- Make sure you're using the LTS release of Node.js
- Try reinstalling node, making sure npm is included.
- Try `npm r -g rpcmaker`, then `npm i -g node-gyp`, then `npm i -g rpcmaker`.
- macOS specific: If you upgraded your macOS from any version below 10.15 to 10.15 or 11, this will fix it:
  - `sudo rm -rf /Library/Developer/CommandLineTools`
  - [Download and install this](https://download.developer.apple.com/Developer_Tools/Command_Line_Tools_for_Xcode_11.5/Command_Line_Tools_for_Xcode_11.5.dmg) (you will need an Apple ID)
  - `npm r -g rpcmaker`, then `npm i -g node-gyp`, then `npm i -g rpcmaker`.
- Windows specific:
  - Make sure that with your Node install, you checked "Automatically install the necessary tools." If you didn't reinstall Node.
  - If you are STILL having problems, refer to this. Note that it will restart your PC.
    - `npm r -g rpcmaker`, `npm i -g --production windows-build-tools --vs2015` 
    - After restart, open up cmd again and type `npm i -g rpcmaker`
  
**If none of this works, refer to old_instructions.md!!**

### Windows: System cannot find the specified path
- Try adding `C:\Users\`Your name here`\AppData\Roaming\npm` to PATH, [here's how to do that](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/
), then restart.
- If you still get this error after adding to PATH and restarting, try directly running `C:\Users\`Your name here`\AppData\Roaming\npm\rpcmaker.cmd` and `_____\maker.js`
- You can also do the instructions in old_instructions.md.


</details>


# [Planned features](https://github.com/ThatOneCalculator/DiscordRPCMaker/projects/1):
- [x] v1.7+: Binary releases
- [ ] v1.8: Storing and accessing multiple presences
- [ ] v2.0: Electron based GUI

# Still need help, or just want to chat?
[Open a new issue here](https://github.com/ThatOneCalculator/DiscordRPCMaker/issues), [ask in the community discussion forum](https://github.com/ThatOneCalculator/DiscordRPCMaker/discussions), or [join the Discord!](https://discord.gg/Z7UZPR3bbW)

The program has been tested on Windows 10, macOS 10.14, macOS 10.15, Arch Linux, and Ubuntu 20.04 LTS. 
