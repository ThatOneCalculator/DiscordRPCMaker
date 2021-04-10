const electron = require('electron');

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href == "https://discord.com/developers/applications") {
        makeflyout("Go to your desired application, and the Client ID will be detected automatically! ", "drpcm-hint-flyout")
    }
    try { setTimeout(() => { modifiyText() }, 1000) } catch (e) { }
    try { setTimeout(() => { hideUnwanted() }, 1000) } catch (e) { }
    try { setTimeout(() => { killGenBlocks() }, 1000) } catch (e) { }
    try { setTimeout(() => { document.querySelector(".wrapper-3aJbIC").style.display = "none" }, 2000) } catch (e) { }
    setTimeout(() => { abortChildren() }, 2000)
})

document.addEventListener("click", () => {
    setTimeout(function () { }, 500);
    let prevflyout = document.querySelector("#drpcm-hint-flyout")
    let clientid = document.querySelector(".code-j7WzRK")
    let fly = document.querySelector("#drpcm-success-flyout")
    if (clientid !== null && fly == null) {
        let id = clientid.innerText
        if (prevflyout !== null) { prevflyout.style.display = "none" }
        makeflyout(`
        Detected Client ID!
        <code style = "font-family: monospace; background: #313131; padding: 5px; border-radius: 5px;">${id}</code>
    `, "drpcm-success-flyout")
    }
    abortChildren()
    modifiyText()
    //TODO: killGenBlocks() broken, but works in console 🤔
    killGenBlocks()
    try { setTimeout(() => { document.querySelector(".wrapper-3aJbIC").style.display = "none" }, 2000) } catch (e) { }
})

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

function modifiyText() {
    document.querySelector(".flush-zNaLgf").innerText = "Click 'New Application' to create a new presence, or select an already created one below"
    document.querySelector(".wordmark-1G98vs").innerText = "Discord RPC Developer Portal"
    let clientid = document.querySelector(".code-j7WzRK")
    document.querySelector(".button-38aScr").addEventListener("click", () => {
        let aaa = document.getElementsByClassName('medium-zmzTW- weightNormal-3CX1dN')
        aaa[0].innerText = "This is what your presence will be called."
    })
}

function abortChildren() {
    document.getElementsByClassName("wrapper-3S5Jvh backToLink-UqPo19")[0].style.display = "none"
    let optionsList = document.querySelector(".mainList-otExiM")
    optionsList.childNodes[1].style.display = "none"
    optionsList.childNodes[2].style.display = "none"
    optionsList.childNodes[4].style.display = "none"
    let subOptionsList = document.querySelector(".subList-3zlU-5")
    subOptionsList.childNodes[1].style.display = "none"
    document.querySelector(".marginBottomMedium-3rCQQt").style.display = "none"
    otherBlocks = [
        document.getElementsByClassName("flex-1xMQg5 flexHorizontal-1YWL8b flexJustifyStart-1R2n-N flexAlignStretch-1aueRm flexWrap-1K8nA-")[0],
        document.getElementsByClassName("headingContent-2bBpIC bottomMarginMedium-2YVTXf")[0],
        document.getElementsByClassName("heading-3MvkF0 marginBottom20-QW1wVs medium-zmzTW- size16-1__VVI height20-13xN5Z primary300-qtIOwv weightNormal-3CX1dN")[0]
    ]
    otherBlocks.forEach(elem => { try { setTimeout(() => { elem.style.display = "none" }, 500) } catch (e) { } })
    setTimeout(() => { document.querySelector("wrapper-3aJbIC") }, 2000)
}

function killGenBlocks() {
    geninfoBlocks = [
        document.getElementsByClassName("flex-1xMQg5 flexHorizontal-1YWL8b flexJustifyStart-1R2n-N flexAlignStretch-1aueRm flexWrap-1K8nA-")[3],
        document.getElementsByClassName("flex-1xMQg5 flexHorizontal-1YWL8b flexJustifyStart-1R2n-N flexAlignStretch-1aueRm flexWrap-1K8nA-")[4],
        document.getElementsByClassName("flex-1xMQg5 flexHorizontal-1YWL8b flexJustifyStart-1R2n-N flexAlignStretch-1aueRm flexWrap-1K8nA-")[5],
        document.getElementsByClassName("flexChild-faoVW3 child-3prNf2 columnSpread12-1b_w2a")[1]
    ]
    geninfoBlocks.forEach(elem => { try { setTimeout(() => { elem.style.display = "none" }, 500) } catch (e) { } })
}

function hideUnwanted() {
    let elems = [
        // document.querySelector(".marginBottomMedium-3rCQQt"),
        // document.querySelector(".marginBottomMedium-3rCQQt")
    ]
    elems.forEach(elem => {
        try { setTimeout(() => elem.style.display = "none", 1000) } catch (e) { }
    })
    try { setTimeout(() => { document.querySelector(".wrapper-3aJbIC").style.display = "none" }, 2000) } catch (e) { }
}