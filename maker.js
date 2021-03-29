#!/usr/bin/env node

// Author: ThatOneCalculator ~ https://t1c.dev/

//const prompt = require('syncprompt')
const chalk = require('chalk')
const fs = require('fs')
const os = require('os')
const prompt = require('prompt-sync')();
const notifier = require('node-notifier');

function validateurl (str) {
	const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
	return regexp.test(str)
}

console.log(chalk`{yellow Did you create an application at} {blue https://discord.com/developers/applications}{yellow ? If not, you probably should read the} {green README} {yellow on the GitHub repo before continuing. Enter} {green 'y'} {yellow or} {green 'yes'} {yellow to continue.\n}`)
const go = prompt().toLowerCase()

if (['yes', 'y'].indexOf(go) < 0) {
	console.log(chalk`{bgRed You should go do that.}`)
	process.exit()
}

console.log(chalk`\n\n{cyan.bold For any of these, if you don't want one of them, just hit} {magenta.underline.bold Enter/Return.}\n\n`)

let clientid = 0
let largeimage = ''
let smallimage = ''
let description = ''
let state = ''
let numbuttons = 0
let buttononelabel = ''
let buttontwolabel = ''
let buttononeurl = ''
let buttontwourl = ''
let isnum = false
let isurl = false

while (!isnum) {
	console.log(chalk`{underline What is your app's {bold.green Client ID?} This can be found on the main section of your app.}\n`)
	clientid = prompt()
	if (clientid === '' || isNaN(clientid)) { console.log(chalk`{red Your Client ID has to be a number.\n}`) } else { isnum = true }
}
console.log(chalk`{underline \nWhat's the name of the {bold.green larger image}?}\n`)
largeimage = prompt()
if (largeimage !== '') {
	console.log(chalk`\n{underline What's the name of the {bold.green smaller image}?}\n`)
	smallimage = prompt()
}
console.log(chalk`\n{underline What do you want the {bold.green first line} of the Rich Presence to say?}\n`)
description = prompt()
console.log(chalk`\n{underline What do you want the {bold.green second line} of the Rich Presence to say?}\n`)
state = prompt()
console.log(chalk`\n{underline How many {bold.green buttons} do you want? Enter either {bold.blue 0}, {bold.blue 1}, or {bold.blue 2}.}\n`)
numbuttons = Math.floor(prompt())
if (numbuttons === '' || isNaN(numbuttons) || numbuttons < 0) {
	console.log(chalk`{red \nI don't think that was 0, 1, or 2... So I made it 0.\n}`)
	numbuttons = 0
} else if (numbuttons > 2) {
	console.log(chalk`{red \nI appreciate the want for more buttons, but Discord only lets you add up to 2. So, I set it to 2.\n}`)
	numbuttons = 2
}
if (numbuttons >= 1) {
	console.log(chalk`\n{underline What do you want {blue button 1's} {bold.green label} to be?}\n`)
	buttononelabel = prompt()
	if (buttononelabel === '') { buttononelabel = ' ' }
	while (!isurl) {
		console.log(chalk`\n{underline What do you want {blue button 1's} {bold.green URL} to be? (The website where you're taken when it's clicked.)}\n`)
		buttononeurl = prompt()
		if (!validateurl(buttononeurl)) { console.log(chalk`{red That's not a website!}`) } else { isurl = true }
	}
	if (!buttononeurl.startsWith('http')) { buttononeurl = 'https://' + buttononeurl }
}
if (numbuttons === 2) {
	console.log(chalk`\n{underline What do you want {blue button 2's} {bold.green label} to be?}\n`)
	buttontwolabel = prompt()
	if (buttontwolabel === '') { buttontwolabel = ' ' }
	isurl = false
	while (!isurl) {
		console.log(chalk`\n{underline What do you want {blue button 2's} {bold.green URL} to be? (The website where you're taken when it's clicked.)}\n`)
		buttontwourl = prompt()
		if (!validateurl(buttontwourl)) { console.log(chalk`{red That's not a website!}`) } else { isurl = true }
	}
	if (!buttontwourl.startsWith('http')) { buttontwourl = 'https://' + buttontwourl }
}

console.log(chalk`
{blue.underline Here are your values (if a value is blank, it won't be used):}
Client ID: {green.bold ${clientid}}
Large Image Asset: {green.bold ${largeimage}}
Small Image Asset: {green.bold ${smallimage}}
Description: {green.bold ${description}}
State: {green.bold ${state}}
Number of buttons: {green.bold ${numbuttons}}
Button one's label: {green.bold ${buttononelabel}}
Button one's url: {green.bold ${buttononeurl}}
Button two's label: {green.bold ${buttontwolabel}}
Button two's url: {green.bold ${buttontwourl}}
`)

let buttonone = null
let buttontwo = null

switch (numbuttons) {
	case 0:
		break
	case 1:
		buttonone = { label: buttononelabel, url: buttononeurl }
		break
	case 2:
		buttonone = { label: buttononelabel, url: buttononeurl }
		buttontwo = { label: buttontwolabel, url: buttontwourl }
		break
	default:
		console.error(chalk`{bgRed \n\nThis wasn't supposed to happen! Try re-running the program, or file an issue in the GitHub repo if this persists.}`)
		process.exit()
}

const buttons = []
if (buttonone !== null) { buttons.push(buttonone) }
if (buttontwo !== null) { buttons.push(buttontwo) }

const content = {
	clientid: clientid,
	description: description,
	state: state,
	largeimage: largeimage,
	smallimage: smallimage,
	buttons: buttons
}

const data = JSON.stringify(content, null, 2)
const dir = `${os.userInfo().homedir}/${process.platform === 'win32' ? '/AppData/Roaming' : '/.config'}`

fs.writeFile(`${dir}/drpcm-options.json`, data, (err) => {
	if (err) { throw err }
	console.log(chalk`\n{bold.magenta Done!} Time to run {bold.cyan drpc}!\nI really hope you enjoy using this! If you do, please consider {bold.yellow starring this repository on GitHub}: {blue https://github.com/ThatOneCalculator/DiscordRPCMaker}\nPress enter to exit.`)
	prompt()
        notifier.notify(
         {
         title: 'Discord RPC Maker',
         message: 'Your Rich Presence has been made!',
         icon: path.join(__dirname, 'rpcmaker.png'),
         sound: true,
         wait: true,
         open: "https://github.com/ThatOneCalculator/DiscordRPCMaker",
  },
  function (error, response, metadata) {
    console.log(response, metadata);
  }
);
})
