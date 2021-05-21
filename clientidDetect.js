const electron = require('electron')
const copy = require('copy-to-clipboard')
var firstFlyout = false

document.addEventListener("DOMContentLoaded", () => {
    newflyout()
    addStyle(`
    .wrapper-3aJbIC,
    [href="/developers/teams"],
    [href="/developers/servers"],
    [href="/developers/docs"],
    [href*="oauth2"],
    [href*="visualizer"],
    [href*="bot"],
    [href*="whitelist"],
    .flex-1xMQg5.flexHorizontal-1YWL8b.flexJustifyStart-1R2n-N.flexAlignStretch-1aueRm.flexWrap-1K8nA-:nth-child(4),
    .flex-1xMQg5.flexHorizontal-1YWL8b.flexJustifyStart-1R2n-N.flexAlignStretch-1aueRm.flexWrap-1K8nA-:nth-child(5) {
        display: none !important;
        position: absolute !important;
        top: -999px !important;
        left: -999px !important;
        z-index: 0 !important;
        visibility: hidden !important;
        width: 0px !important;
        height: 0px !important;
    }
    .wrapper-36iaZw {
       flex: 0 0 250px !important;
    }
  `);
    const targetNode = document.body;

    // Options for the observer (which mutations to observe)
    let config = { characterData: false, attributes: false, childList: true, subtree: true };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

})

document.addEventListener("click", () => {
    callback()
})

const callback = function (mutationsList) {
    console.log("change")

    let prevflyout = document.querySelector("#drpcm-hint-flyout")
    if (prevflyout == null && firstFlyout == false) {
        try {
            setTimeout(newflyout, 2000)
            firstFlyout = true
        } catch (e) {
            //firstFlyout = false
        }
    }
    try {
        /*if (window.location.href == "https://discord.com/developers/applications") {*/
        setTimeout(acuallyEndPoorElements, 2000)
        setTimeout(modifyText, 2000)
        /*} else {*/
        //acuallyEndPoorElements()
        //modifyText()
        /*}*/

    } catch (e) { }
    setTimeout(() => {
        let prevflyout = document.querySelector("#drpcm-hint-flyout")
        let clientid = document.querySelector(".code-j7WzRK")
        let fly = document.querySelector("#drpcm-success-flyout")
        if (clientid !== null && fly == null) {
            console.log("detected clientid")
            let id = clientid.innerText
            if (prevflyout !== null) { prevflyout.remove() }
            makeflyout(`
            Detected Client ID, copied to clipboard!
            <code style = "font-family: monospace; background: #313131; padding: 5px; border-radius: 5px;">${id}</code>
        `, "drpcm-success-flyout")
            copy(id)
            setTimeout(() => {document.querySelector("#drpcm-success-flyout").remove()}, "10000")
            document.querySelector(".backToLink-UqPo19").addEventListener("click", () => {
                console.log("back")
                firstFlyout = false
                document.querySelector("#drpcm-success-flyout").remove()
            })
        }
        document.querySelector(".alert-2Ffs8r.warning-2eRcFb").innerHTML = `<span style="color: white !important;">Uploading/deleting can sometimes take 1-2 minutes depending on Discord's servers. After uploading an image, you cannot change its name.</span>`
    }, 500)


};

function newflyout() {
    let prevflyout = document.querySelector("#drpcm-hint-flyout")
    if (prevflyout !== null) { prevflyout.remove() }
    if (window.location.href == "https://discord.com/developers/applications") {
        makeflyout("Go to your desired application, and the Client ID will be detected automatically! ", "drpcm-hint-flyout")
    }
}

function makeflyout(html, id) {
    let flyout = document.createElement("div")
    flyout.id = id
    flyout.innerHTML = html + `<button style = "color: white; cursor: pointer; font-weight: bold;" onclick="this.parentElement.style.display = 'none'">&times;</button>`
    flyout.style.position = "absolute"
    flyout.style.zIndex = "999"
    flyout.style.bottom = "0"
    flyout.style.right = "0"
    flyout.style.margin = "1rem"
    flyout.style.background = "#202225"
    flyout.style.borderRadius = "5px"
    flyout.style.padding = "1rem"
    document.body.appendChild(flyout)
}

function modifyText() {
    if (document.querySelector(".flush-zNaLgf") !== null && document.querySelector(".wordmark-1G98vs").innerText != "Discord RPC Developer Portal") {
        document.querySelector(".flush-zNaLgf").innerText = "Click 'New Application' to create a new presence, or select an already created one below"
        document.querySelector(".wordmark-1G98vs").innerText = "Discord RPC Developer Portal"
        let clientid = document.querySelector(".code-j7WzRK")
        document.querySelector(".button-38aScr").addEventListener("click", () => {
            let aaa = document.getElementsByClassName('medium-zmzTW- weightNormal-3CX1dN')
            aaa[0].innerText = "This is what your presence will be called."
        })

    }
}

function acuallyEndPoorElements() {
    if (window.location.href.includes("rich-presence/assets") && document.querySelectorAll(".marginBottomMedium-3rCQQt").length > 2) {
        document.querySelectorAll(".marginBottomMedium-3rCQQt")[1].remove()
        document.querySelectorAll(".marginBottomMedium-3rCQQt")[0].remove()
    }
}
function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}