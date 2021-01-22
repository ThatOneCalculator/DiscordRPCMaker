# Discord RPC Generator
### Discord Rich Presence Generator, WITH BUTTONS!

![Big](https://linus-tech.tips/T7VQq5w27N.png)
![Small](https://linus-tech.tips/XqJ6wDtW6H.png)

## This is meant to be ultra noob-friendly, as long as you follow the instructions!

### The whole setup takes only a couple minutes!

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

1. On this page, hit the green "Code" button, and click "Download as ZIP". (Or `git clone` if you're savvy 😉)
2. Open the file and unzip it.
3. Inside the folder you unzipped, there will be ANOTHER folder called `DiscordRPCGenerator-main`. **MOVE THIS FOLDER SOMEWHERE MEMORABLE!**
4. Download the NodeJS installer at https://nodejs.org/en/downloadhttps://nodejs.org/en/download// (for Windows and macOS users). Linux users, install from your [package manager](https://nodejs.org/en/download/package-manager/).
5. (Windows/macOS) Install the program.

### Part 3: Generating your presence

1. This will vary by operating system. 
- **Windows**: Open a program called `cmd`. 
- **macOS**: Open a program called `Terminal`.
- **Linux**: Open your terminal emulator of choice (Kitty, Alacritty, URXVT, Termite, GNOME Terminal, Konsole, etc).
2. Type in `cd ` (making sure there is a space after `cd`), and drag the `DiscordRPCGenerator-main` (the one you moved into a memorable) folder into it, and hit enter.
3. Type `npm i` and hit enter.
<details>
    <summary markdown="span">Are you having trouble with this step? Click me!</summary>
    
On macOS, you may be prompted to install a seperate package. Install it.

If that still doesn't work (or you're on Windows or Linux), type all of these lines seperately:
  ```sh
  npm i -g discord-rpc
  npm i -g syncprompt
  npm i -g fs
  ```
</details>

4. Type `node maker.js` and hit enter.
5. Follow the prompts the program gives you.

### Part 4: Running your presence
1. Open Discord
2. Just type the command below into your terminal/cmd:
- **Windows**: `start /b node presence.js`
- **macOS/Linux**: `node presence.js & disown`

And close the window! Watch as your new presence springs to life!

### Part 5: Editing your presence
Want to edit your presence later? You can either
- Redo part 3 (reccomended).
- Manually edit the `options.json` file.

## Common issues

### My buttons aren't working!
Discord doesn't let you click your own buttons. However, everyone else can. This is a limitation with Discord.

### I can't see the presence!
Make sure you are not invisible/offline. If you ARE online/idle/dnd...
- Make sure you don't have another program taking up a presence slot.
- Try running the last command again

### I can't install the npm packages!
- Follow the troubleshooting steps under step 3 of part 3.
- Try running `cmd` as Administrator if you're on Windows.
- Try reinstalling node, making sure npm is included.

### Still need help?
[Open a new issue here](https://github.com/ThatOneCalculator/DiscordRPCGenerator/issues), or [join my Discord!](https://discord.com/invite/mG94DqX)

The program has been tested on Arch Linux and Windows 10. 
