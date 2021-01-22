var sync_prompt = require("bindings")("sync_prompt.node");

module.exports = function(prompt, options) {
    if (prompt) process.stdout.write(prompt);

    options = options || {};
    
    var setEcho = !options.secure;
    sync_prompt.set_echo(setEcho);

    var res = sync_prompt.sync_prompt();
    sync_prompt.set_echo(true);

    return res;
}
