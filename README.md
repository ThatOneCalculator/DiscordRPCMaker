![Logo](https://cdn.discordapp.com/attachments/802218008574820393/803422081105526804/image3.png)
# Discord Rich Presence Maker, WITH BUTTONS!
###### Version 1.6.3, [on npm!](https://www.npmjs.com/rpcmaker)

[![Discord](https://discordapp.com/api/guilds/733856096963526667/embed.png?style=shield)](https://discord.gg/mG94DqX) 


![Large](https://cdn.discordapp.com/attachments/671117418189422594/803419758287519754/scrot.png)
![Small](https://cdn.discordapp.com/attachments/671117418189422594/803419819293540385/scrot.png)

## This is meant to be ultra noob-friendly, as long as you follow the instructions!

### The whole setup takes only a couple minutes! There's even an example GIF at the bottom of this page!
---

### Part 1: Creating your presence application (same on all platforms)
*Options 4-7 are optional! They're if you want images.*
1. Go to https://discord.com/developers/applications/.
2. Hit the "New Application" button in the top right.
3. Give it a good name. This will be what the main text says!
4. Navigate to the "Rich Presence" tab in the left bar. It should be the 4th option down.
5. Go down to "Rich Presence Assets". You don't need a cover image, don't worry!
6. Upload either one or two images. One will be used for the large image, and the other will be used for the small image. Both are optional. In the example screenshots, I only uploaded one image (for a large image). Give them memorable names! (Note: sometimes they don't show up directly after being uploaded. This is normal.)
7. Go back to the "General Information" tab in the left bar. 
8. Copy your Client ID. It should be a big number, and is underneath the description on the left-hand. Hold on to this, it's important! (No, you do NOT need a Client Secret.)

### Part 2: Installing Node

1. Download the NodeJS installer at https://nodejs.org/en/download/ (for Windows and macOS users). Linux users, install from your [package manager](https://nodejs.org/en/download/package-manager/).
2. Install.
- (Windows/macOS) Install the program. If prompted, make sure to check the box for "Automatically install the necessary tools."
- (Linux) Make sure `npm` and `node-gyp` is installed.

### Part 3: Generating your presence

1. Open a console. This will vary by operating system. 
- **Windows**: Open a program called `cmd`. 
- **macOS**: Open a program called `Terminal`.
- **Linux**: Open your terminal emulator of choice (Kitty, RXVT, GNOME Terminal, Konsole, etc).
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
---
### How to run your presence again later:
- Open cmd/Terminal.
- Do part 4 again. 

*Pro tip: instead of typing the command every time, you can hit the ↑ (up) key and hit enter!*

### How to update the program:
- Open cmd/Terminal.
- `npm i -g rpcmaker`

### How to edit your presence:
There's 2 options:
- Open cmd and run `rpcmaker` (*Recommended, just do this!*)
- Manually edit the options file. In Windows, this at `%APPDATA%\Roaming\drpcm-options.json`. In macOS/Linux, it's in `~/.config/drpcm-options.json`.

## Common issues

<details>
    <summary markdown="span">Click me for the  list of issues!</summary>

### My buttons aren't working!
Discord doesn't let you click your own buttons. However, everyone else can. This is a limitation with Discord.

### I can't install the npm packages!
- Make sure you're using the LTS release of Node.js
- Try reinstalling node, making sure npm is included.
- Try `npm r -g rpcmaker`, then `npm i -g node-gyp`, then `npm i -g rpcmaker`.
- macOS specific: If you upgraded your macOS from any version below 10.15 to 10.15 or 11, this will fix it:
  - `sudo rm -rf /Library/Developer/CommandLineTools`
  - [Download and install this](https://download.developer.apple.com/Developer_Tools/Command_Line_Tools_for_Xcode_11.5/Command_Line_Tools_for_Xcode_11.5.dmg) (you will need an Apple ID)
  - `npm r -g rpcmaker`, then `npm i -g node-gyp`, then `npm i -g rpcmaker`.
- Windows specific:
  - If you are getting "System cannot find the specified path", you need to add `C:\Users\`Your name here`\AppData\Roaming\npm` to PATH, [here's how to do that](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/
).
  - Otherwise, follow these instructions.
    - Make sure that with your Node install, you checked "Automatically install the necessary tools." If you didn't reinstall Node.
    - If you are STILL having problems, refer to this. Note that it will restart your PC.
      - `npm r -g rpcmaker`, `npm i -g --production windows-build-tools --vs2015` 
      - After restart, open up cmd again and type `npm i -g rpcmaker`
  
  
**If none of this works, refer to old_instructions.md!!**

### I can't see the presence!
Make sure you are not invisible/offline. If you ARE online/idle/dnd...
- Make sure you don't have another program taking up a presence slot.
- Try running the last command again

### The image(s) aren't showing!
If you just put them in, *sometimes* Discord takes a minute or so to cache them properly.

### I'm on mobile, what do I do?
As of right now, there's no way to do this through a mobile device. Sorry!

</details>

### Here is an example GIF!
###### This took place after I installed Node
⚠️ This is outdated! Don't refer to this GIF for help! ⚠️
![Example](https://cdn.discordapp.com/attachments/671117418189422594/803356843577049148/demo.gif)

### Planned features:
- [ ] v1.7: Storing and accessing multiple presences
- [ ] v2.0: Electron based GUI, collab with [@AlekEagle](https://github.com/alekeagle) ❤️ (not abandoning CLI, just adding an easier option)
- [ ] v?: Binary releases

### Still need help?
[Open a new issue here](https://github.com/ThatOneCalculator/DiscordRPCMaker/issues), [ask in the community discussion forum](https://github.com/ThatOneCalculator/DiscordRPCMaker/discussions), or [join the Discord!](https://discord.com/invite/mG94DqX)

The program has been tested on Arch Linux, Windows 10, macOS 10.14, and macOS 10.15. 
