var logger=require("./logger");
var raw=JSON.parse(require("fs").readFileSync("./config.json", "utf-8"));



var conf={
    port:25525
};

var o ={port:25565}

for(let key in conf) {
    //console.log(conf[key])
    if(key in raw) conf[key]=raw[key];
    else logger.warn("Missing value for '"+key+"' in config.json. Proceeding with default value.")
}
logger.log("Loaded config.json.")
module.exports=conf;