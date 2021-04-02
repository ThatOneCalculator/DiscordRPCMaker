const fs = require('fs');
const os = require('os');
const RPC = require('discord-rpc')
const shell = require('electron').shell

const dir = `${os.userInfo().homedir}/${process.platform === 'win32' ? '/AppData/Roaming/drpcm/' : '/.config/drpcm/'}`

let clientID = 0
let options = {}


//url validation regex
function validateurl (str) {
	const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
	return regexp.test(str)
}

//get the image id from options provided the name
function getImageIdFromName(imgName) {
  let matchedid = ""
  options.forEach((image, i, arr) => {
    if (image.name == imgName) {
      matchedid = image.id
    }
  })
  return matchedid
}

//check for appdata / linux config dir and make it if it doesen't exist
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

//make the border red if url validation fails
function updateValidButton(button, event) {
  url = event.target.value
  isValid = validateurl(url)

  if (isValid) {
    button.classList.remove("danger")
    event.target.classList.add("input-success")
  } else { 
    event.target.classList.remove("input-success")
    button.classList.add("danger")
  }
}

function saveAsJson() {
  presencename = document.getElementById("presence-name-input").toString()
  description = document.getElementById("description-input-1").value.toString()
  state = document.getElementById("description-input-2").value.toString()
  largeimage = document.getElementById("large-image-input").value.toString()
  smallimage = document.getElementById("small-image-input").value.toString()
  

  const content = {
    name: presencename,
    clientid: clientID,
    description: description,
    state: state,
    largeimage: largeimage,
    smallimage: smallimage,
    buttons: buttons
  }
}

//what to do when dom loads
document.addEventListener("DOMContentLoaded", () => {
  //launch presence
  document.getElementById("test").addEventListener("click", () => {
    //dummy notification
    const myNotification = new Notification("Discord RPC Maker", {
      body: "Your presence has started.",
      icon: "assets/icon.png",
      timeoutType: "default",
    });
    //TODO: start presence
  });

  //save presence
  document.getElementById("test").addEventListener("click", () => {
    saveAsJson()
  });
  
  //enable inputs 
  document.querySelector(".client-id-enabler").addEventListener("keyup", async (e) => {
    //checks what is in clientid input
    let inp = document.querySelector(".client-id-enabler")
    let enableOnClientid = document.querySelectorAll(".enable-on-clientid")
    enableOnClientid.forEach((item, i, arr) => {
      item.disabled = true;
    })

    //checks if clientid input has a valid clientid (long enough, only numbers)
    if (inp.value !== "" && inp.value.toString().length > 17 && isNaN(parseInt(inp.value)) == false) {
      //call discord api to make sure clientid is valid
      let response = await fetch(`https://discord.com/api/oauth2/applications/${inp.value.toString()}/assets`)
      if (response.ok) {
        //client id is valid, enable inputs
        options = await fetch(`https://discord.com/api/oauth2/applications/${inp.value.toString()}/assets`).then(options => options.json())
        clientID = inp.value//get clientid and store it

        console.log(options)

        //enable everything on valid clientid
        enableOnClientid.forEach((item, i, arr) => {
          item.removeAttribute("disabled")
        })

        //populate the image input datalists with fetched names of images from the discord api
        imageinputs = document.querySelectorAll("#small-image-list, #large-image-list")
        imageinputs.forEach((item, i, arr) => {
          htmll = `` //i'll feed this to the innerHTML of the datalist
          options.forEach((opt, index, array) => {
            htmll += `<option image-id="${opt.id}">${opt.name}</option>` //i'll add a dummy attribute
          })
          item.innerHTML = htmll
        })
      }
    }
  })


  //button enabling
  document.getElementById("button1-enable").addEventListener("change", () => {
    if (document.getElementById("button1-enable").checked) {
      //enable all buttons
      inps = document.querySelector(".button1")
      inps.querySelectorAll('input[disabled]').forEach((item, i, arr) => {
        item.removeAttribute("disabled");
      });

      document.getElementById('button2-enable').removeAttribute('disabled')
      document.getElementById("preview-button-1").classList.remove("initially-hidden")
      document.getElementById("button1-input-name").addEventListener("keyup", (event) => {document.getElementById("preview-button-1").innerHTML = event.target.value})
      document.getElementById("button1-input-url").addEventListener("keyup", (event) => {updateValidButton(document.getElementById("preview-button-1"), event)})
    } else {
      //disable buttons
      inps = document.querySelector(".button1")
      inps.querySelectorAll('input[type="text"]').forEach((item, i, arr) => {
        item.setAttribute("disabled", "");
      });

      button2enable = document.getElementById('button2-enable')
      document.getElementById("preview-button-1").classList.add("initially-hidden")
      if (button2enable.checked == true){button2enable.click()}
      button2enable.disabled = true;

      try {
        //remove preview updating listeners
        document.getElementById("button1-input-name").removeEventListener("keyup", (event) => {document.getElementById("preview-button-1").innerHTML = event.target.value})
        document.getElementById("button2-input-name").removeEventListener("keyup", (event) => {document.getElementById("preview-button-2").innerHTML = event.target.value})
        //remove url validation listeners
        document.getElementById("button1-input-url").removeEventListener("keyup", (event) => {updateValidButton(document.getElementById("preview-button-1"), event)})
        document.getElementById("button2-input-url").removeEventListener("keyup", (event) => {updateValidButton(document.getElementById("preview-button-2"), event)})
      } catch(e) {}
    }
  });
  document.getElementById("button2-enable").addEventListener("change", () => {
    if (document.getElementById("button2-enable").checked) {
      //enable second button
      inps = document.querySelector(".button2")
      inps.querySelectorAll('input[disabled]').forEach((item, i, arr) => {
        item.removeAttribute("disabled");
      });
      document.getElementById("preview-button-2").classList.remove("initially-hidden")
      document.getElementById("button2-input-name").addEventListener("keyup", (event) => {document.getElementById("preview-button-2").innerHTML = event.target.value})
      document.getElementById("button2-input-url").addEventListener("keyup", (event) => {updateValidButton(document.getElementById("preview-button-2"), event)})
    } else {
      inps = document.querySelector(".button2")
      //disable second button
      inps.querySelectorAll('input[type="text"]').forEach((item, i, arr) => {
        item.setAttribute("disabled", "");
      });
      document.getElementById("preview-button-2").classList.add("initially-hidden")
      document.getElementById("button2-input-name").removeEventListener("keyup", (event) => {document.getElementById("preview-button-2").innerHTML = event.target.value})
      document.getElementById("button2-input-url").removeEventListener("keyup", (event) => {updateValidButton(document.getElementById("preview-button-2"), event)})
    }
  });

  //description line 1 updating
  document.getElementById("description-input-1").addEventListener("keyup", () => {
    document.getElementById("description-input-1").addEventListener("keyup", (event) => {document.getElementById("preview-description-1").innerHTML = event.target.value})    
  });

  //description line 2 updating
  document.getElementById("description-input-2").addEventListener("keyup", () => {
    document.getElementById("description-input-2").addEventListener("keyup", (event) => {document.getElementById("preview-description-2").innerHTML = event.target.value})    
  });

  //updating of the large image
  document.getElementById("large-image-input").addEventListener("keyup", () => {
    let input = document.getElementById("large-image-input")
    let imgname = input.value
    let largeimage = document.getElementById("large-image")

    let imgid = getImageIdFromName(imgname)

    //if said image doesen't exist, show placeholder
    if (imgid == "") {
      largeimage.setAttribute("src", "assets/placeholder.png")
      document.getElementById("small-image-input").setAttribute("disabled", "");
    } else {
      largeimage.setAttribute("src", `https://cdn.discordapp.com/app-assets/${clientID}/${imgid}.png`)
      document.getElementById("small-image-input").removeAttribute("disabled");
    }
  })

  document.getElementById("small-image-input").addEventListener("keyup", () => {
    let input = document.getElementById("small-image-input")
    let imgname = input.value
    let smallimage = document.getElementById("small-image")

    let imgid = getImageIdFromName(imgname)

    //if said image doesen't exist, show placeholder
    if (imgid == "") {
      smallimage.setAttribute("src", "assets/placeholder.png")
    } else {
      smallimage.setAttribute("src", `https://cdn.discordapp.com/app-assets/${clientID}/${imgid}.png`)
    }
  })

  //fix win outline
  if (process.platform === "win32") {
    document.querySelector(".zoom").setAttribute("style", "-webkit-text-stroke-width: 0.01em")
  }

  //make links open in new tab
  registerLinkToOpenInBrowser("github-button", "https://github.com/ThatOneCalculator/DiscordRPCMaker")

});
/**
 * register a button to open in the native browser
 * @param {String} elemid element id
 * @param {String} link the link to go to
 */
function registerLinkToOpenInBrowser(elemid, link) {
  let elem = document.querySelector(`#${elemid}`)

  elem.addEventListener("click", () => {
    shell.openExternal(link)
  })
}
