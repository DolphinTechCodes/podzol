module.exports = {
    log: function (msg) {

        process.stdout.write("[INFO | " + now() + "] " + msg + "\n");
    },

    warn: function (msg) {

        process.stdout.write("[WARN | " + now() + "] " + msg + "\n");
    },

    error: function (msg) {

        process.stderr.write("[ERROR | " + now() + "] " + msg + "\n");
    }
}

function now() {
    var n = new Date();
    return ("0" + n.getHours()).slice(-2) + ":" + ("0" + n.getMinutes()).slice(-2) + ":" + ("0" + n.getSeconds()).slice(-2);
}