var logger = require("./logger");
var raw = JSON.parse(require("fs").readFileSync("./config.json", "utf-8"));



var conf = {
    port: 25565,
    "max-players": 0,
    "online-players": 0,
    description: "§6A Podzol server",
    version: "Podzol 0.5.0",
    protocol: -1,
    "login-message": {
        "text": "Podzol Server", "color": "aqua"
    },
};

var o = { port: 25565 }

for (let key in conf) {
    //console.log(conf[key])
    if (key in raw && typeof raw[key] === typeof conf[key]) conf[key] = raw[key];
    else if ((key === "description" || key === "login-message") && typeof raw[key] === "object") conf[key] = raw[key];
    else logger.warn("Missing or invalid value for '" + key + "' in config.json. Proceeding with default value.")
}
logger.log("Loaded config.json.")
module.exports = conf;