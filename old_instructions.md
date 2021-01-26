### Part 1: Creating your presence application (same on all platforms)
*Options 4-7 are optional! This is if you want your status to have images.*
1. Go to https://discord.com/developers/applications/.
2. Hit the "New Application" button in the top right.
3. Give it a good name. This will be what the main text says!
4. Navigate to the "Rich Presence" tab in the left bar. It should be the 4th option down.
5. Go down to "Rich Presence Assets". You don't need a cover image, don't worry!
6. Upload either one or two images. One will be used for the large image, and the other will be used for the small image. Both are optional. In the example screenshots, I only uploaded one image (for a large image). Give them memorable names! (Note: sometimes they don't show up directly after being uploaded. This is normal.)
7. Go back to the "General Information" tab in the left bar. 
8. Copy your Client ID. It should be a big number, and is underneath the description on the left-hand. Hold on to this, it's important! (No, you do NOT need a Client Secret.)

### Part 2: Installing the program

1. On this page, hit the green <kbd>Code</kbd> button, and click "Download as ZIP". (Or `git clone` if you're savvy 😉)
2. Open the file and unzip it.
3. Inside the folder you unzipped, there will be ANOTHER folder called `DiscordRPCMaker-main`. **MOVE THIS FOLDER SOMEWHERE MEMORABLE!**
4. Download the NodeJS installer at https://nodejs.org/en/download/ (for Windows and macOS users). Linux users, install from your [package manager](https://nodejs.org/en/download/package-manager/).
5. (Windows/macOS) Install the program.

### Part 3: Generating your presence

1. Open a console. This will vary by operating system. 
- **Windows**: Open a program called `cmd`. 
- **macOS**: Open a program called `Terminal`.
- **Linux**: Open your terminal emulator of choice (Kitty, RXVT, GNOME Terminal, Konsole, etc).
2. Type in `cd ` (making sure there is a space after `cd`), and drag the `DiscordRPCMaker-main` (the one you moved into a memorable) folder into it, and hit enter.
3. Type `npm i` and hit enter. *Some people get stuck on this. Scroll to the bottom and click on the errors section for solutions if you get errors!*
4. Type `node maker.js` and hit enter.
5. Follow the prompts the program gives you.

### Part 4: Running your presence
1. Open Discord (optional, but you wanna see your cool presence, right?)
2. Just type the command below into the same cmd/Terminal window from before:
- **Windows**: `start /b node presence.js`
- **macOS/Linux**: `node presence.js & disown`

#### And close the window! Watch as your new presence springs to life!
---
### How to run your presence again later:
If you're not using your terminal for anything else, this should be fine. If you are, then you should know what you're doing.
There's different steps for doing it the first time after and every time after that. For the first time, you'll just need to open the folder and locate the `presence.js` file.

**First time:**
- Open cmd/Terminal.
- Windows: `start /b node` *drag in `presence.js`* and hit enter.
- macOS/Linux: `node` *drag in `presence.js`* `& disown` and hit enter.

**All times after:**
- Open cmd/Terminal.
- Hit the up key once (brings you to your last run command), and hit enter.

### How to edit your presence:
There's 2 options:
- Redo part 3 (*Recommended, just do this!*)
- Manually edit the options file. In Windows, this at `%APPDATA%\Roaming\drg-options.json`. In macOS/Linux, it's in `~/.config/drg-options.json`.
