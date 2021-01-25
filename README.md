# Discord Rich Presence Generator, WITH BUTTONS!
Version 1.4.0
![Big](https://linus-tech.tips/4HoRiWyCBp.png)
![Small](https://linus-tech.tips/AJNL3JCOyi.png)

## This is meant to be ultra noob-friendly, as long as you follow the instructions!

### The whole setup takes only a couple minutes!
There's even an example gif at the bottom of this page!

### Part 1: Creating your presence application (same on all platforms)

1. Go to https://discord.com/developers/applications/.
2. Hit the "New Application" button in the top right.
3. Give it a good name. This will be what the main text says!

*Options 4-7 are optional! This is if you want your status to have images.*

4. Navigate to the "Rich Presence" tab in the left bar. It should be the 4th option down.
5. Go down to "Rich Presence Assets". You don't need a cover image, don't worry!
6. Upload either one or two images. One will be used for the large image, and the other will be used for the small image. Both are optional. In the example screenshots, I only uploaded one image (for a large image). Give them memorable names! (Note: sometimes they don't show up directly after being uploaded. This is normal.)
7. Go back to the "General Information" tab in the left bar. 

*Back to the important stuff!*

8. Copy your Client ID. It should be a big number, and is underneath the description on the left-hand. Hold on to this, it's important! (No, you do NOT need a Client Secret.)

### Part 2: Installing the program

1. On this page, hit the green <kbd>Code</kbd> button, and click "Download as ZIP". (Or `git clone` if you're savvy 😉)
2. Open the file and unzip it.
3. Inside the folder you unzipped, there will be ANOTHER folder called `DiscordRPCGenerator-main`. **MOVE THIS FOLDER SOMEWHERE MEMORABLE!**
4. Download the NodeJS installer at https://nodejs.org/en/download/ (for Windows and macOS users). Linux users, install from your [package manager](https://nodejs.org/en/download/package-manager/).
5. (Windows/macOS) Install the program.

### Part 3: Generating your presence

1. Open a console. This will vary by operating system. 
- **Windows**: Open a program called `cmd`. 
- **macOS**: Open a program called `Terminal`.
- **Linux**: Open your terminal emulator of choice (Kitty, Alacritty, URXVT, Termite, GNOME Terminal, Konsole, etc).
2. Type in `cd ` (making sure there is a space after `cd`), and drag the `DiscordRPCGenerator-main` (the one you moved into a memorable) folder into it, and hit enter.
3. Type `npm i` and hit enter. *Some people get stuck on this. Scroll to the bottom and click on the errors section for solutions if you get errors!*
4. Type `node maker.js` and hit enter.
5. Follow the prompts the program gives you.

### Part 4: Running your presence
1. Open Discord (optional, but you wanna see your cool presence, right?)
2. Just type the command below into the same cmd/Terminal window from before:
- **Windows**: `start /b node presence.js`
- **macOS/Linux**: `node presence.js & disown`

And close the window! Watch as your new presence springs to life!

#### How to run your presence again later:
1. Open cmd/Terminal.
2. `cd` and drop in the folder.
3. Repeat part 4.

### Part 5: Editing your presence
Want to edit your presence later? There's 2 options:
- Redo part 3 (*Recommended, just do this!*)
- Manually edit the options file. In Windows, this at `%APPDATA%\Roaming\drg-options.json`. In macOS/Linux, it's in `~/.config/drg-options.json`.

## Common issues

<details>
    <summary markdown="span">Click me for the  list of issues!</summary>

### My buttons aren't working!
Discord doesn't let you click your own buttons. However, everyone else can. This is a limitation with Discord.

### I can't install the npm packages!
- Make sure you're using the LTS release of Node.js
- Try reinstalling node, making sure npm is included.
- Try deleting the `node_modules` folder, run `npm i -g node-gyp`, and then `npm i` (in the project directory).
- macOS specific: If you upgraded your macOS from any version below 10.15 to 10.15 or 11, this will fix it:
  - `sudo rm -rf /Library/Developer/CommandLineTools`
  - [Download and install this](https://download.developer.apple.com/Developer_Tools/Command_Line_Tools_for_Xcode_11.5/Command_Line_Tools_for_Xcode_11.5.dmg) (you will need an Apple ID)
  - Go into the project directory, and `sudo npm i -g node-gyp; npm i`
- Windows specific: `npm i -g --production windows-build-tools --vs2015` (Note: this may take a while and will restart your PC. Only do this as a last resort.)

### I can't see the presence!
Make sure you are not invisible/offline. If you ARE online/idle/dnd...
- Make sure you don't have another program taking up a presence slot.
- Try running the last command again

### The image(s) aren't showing!
If you just put them in, *sometimes* Discord takes a minute or so to cache them properly.

### I'm on mobile, what do I do?
As of right now, there's no way to do this through a mobile device. Sorry!

</details>

### Here is an example gif!
###### This took place after I installed Node and downloaded/extracted the zip.
![Example](https://cdn.discordapp.com/attachments/802218008574820393/802349525343797258/demo.gif)

### Still need help?
[Open a new issue here](https://github.com/ThatOneCalculator/DiscordRPCGenerator/issues), or [join my Discord!](https://discord.com/invite/mG94DqX)

The program has been tested on Arch Linux, Windows 10, macOS 10.14, and macOS 10.15. 
