// Author: ThatOneCalculator ~ https://t1c.dev/

import prompt from 'syncprompt';
import fs from 'fs';

function validateurl(str) {
	const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
	return regexp.test(str);
}

const go = prompt("Did you create an application at https://discord.com/developers/applications ? If not, you probably should read the README on the GitHub repo before continuing. Enter 'y' or 'yes' to continue.\n").toLowerCase();

if (["yes","y"].indexOf(go) < 0){ 
	console.log(`You should go do that.`);
	process.exit();
}

console.log(`\n\nFor any of these, if you don't want one of them, just hit Enter/Return.\n\n`);

let isdone = false;

let clientid = 0;
let largeimage = "";
let smallimage = "";
let description = "";
let numbuttons = 0;
let buttononelabel = "";
let buttontwolabel = "";
let buttononeurl = "";
let buttontwourl = "";
let isnum = false;
let isurl = false;

while (!isnum){
	clientid = prompt("What is your app's client ID? This can be found on the main section of your app.\n");
	if (clientid == "" || isNaN(clientid)) { console.log(`Your Client ID has to be a number.\n`); }
	else { isnum = true; }	
}
	
largeimage = prompt("What's the name of the larger image?\n");
if (largeimage !== "") { smallimage = prompt("What's the name of the smaller image?\n"); }
description = prompt("What do you want the Rich Presence to say? You can make it as long as you want, but it might show up cut off if it's too long. I'd say around a sentence or two is good.\n");
numbuttons = Number(prompt("How many buttons do you want? Enter either 0, 1, or 2.\n"));

if (numbuttons == "" || isNaN(numbuttons) || numbuttons < 0) { 
	console.log(`I don't think that was 0, 1, or 2... So I made it 0.\n`);
	numbuttons = 0;
}
else if (numbuttons > 2) {
	console.log(`I appreciate the want for more buttons, but Discord only lets you add up to 2. So, I set it to 2.\n`);
	numbuttons = 2;
}
if (numbuttons >=1) {
	buttononelabel = prompt("What do you want button 1's label to be?\n");
	if (buttononelabel === "") { buttononelabel = " "; }
	while (!isurl) {
		buttononeurl = prompt("What do you want button 1's URL to be? (The website where you're taken when it's clicked.)\n");
		if (!validateurl(buttononeurl)) { console.log(`That's not a website!`); }
		else { isurl = true; }
	}
	if (!buttononeurl.startsWith("http")) { buttononeurl = "https://" + buttononeurl; }
}
if (numbuttons === 2) { 
	buttontwolabel = prompt("What do you want button 2's label to be?\n");
	if (buttontwolabel  === "") { buttontwolabel  = " "; }
	isurl = false;
	while (!isurl) {
		buttontwourl = prompt("What do you want button 2's URL to be? (The website where you're taken when it's clicked.)\n");
		if (!validateurl(buttontwourl)) { console.log(`That's not a website!`); }
		else { isurl = true; }
	}
	if (!buttontwourl.startsWith("http")) { buttontwourl = "https://" + buttontwourl; }
}
	
console.log(`
Here are your values (if a value is blank, it won't be used):
Client ID: ${clientid}
Large Image Asset: ${largeimage}
Small Image Asset: ${smallimage}
Description: ${description}
Number of buttons: ${numbuttons}
Button one's label: ${buttononelabel}
Button one's url: ${buttononeurl}
Button two's label: ${buttontwolabel}
Button two's url: ${buttontwourl}
`);

let buttonone = null;
let buttontwo = null;

switch (numbuttons) {
	case 0:
		break;
	case 1:
		buttonone = { label: buttononelabel, url: buttononeurl };
		break;
	case 2:
		buttonone = { label: buttononelabel, url: buttononeurl };
		buttontwo = { label: buttontwolabel, url: buttontwourl };
		break;
	default:
		console.error(`This wasn't supposed to happen! Try re-running the program, or file an issue in the GitHub repo if this persists.`);
		process.exit();
		break;
}

let buttons = [];
if (buttonone !== null) { buttons.push(buttonone) }
if (buttontwo !== null) { buttons.push(buttontwo) }

let content = {
	clientid: clientid,
	description: description,
	largeimage: largeimage,
	smallimage: smallimage,
	buttons: buttons
}

let data = JSON.stringify(content, null, 2);

fs.writeFile('options.json', data, (err) => {
	if (err) { throw err; }
	console.log(`\n\nDone! Time to run the presence.js file, instructions in the README.\nI really hope you enjoy using this! If you do, please consider starring this repository on GitHub: https://github.com/ThatOneCalculator/DiscordRPCGenerator`)
});

