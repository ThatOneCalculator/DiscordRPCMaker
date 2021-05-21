const electron = require('electron')
// const keytar = require('keytar')

document.addEventListener("DOMContentLoaded", () => {
    const targetNode = document.body;

    // Options for the observer (which mutations to observe)
    let config = { characterData: true, attributes: true, childList: true, subtree: true };

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
    if (document.getElementById("display_result").value !== "") {
        console.log()
    }
}