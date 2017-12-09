var varint = require("./var-int");
var logger = require("./logger");
var cfg = require("./config");

var handshakePKG = require("./packages/handshake");
var pingResponsePKG = require("./packages/ping-response");


module.exports = function (data) {
    console.log(data)
    //try {
    var offset = 0;
    var pkgLen = varint.read(data, 0);

    offset = varint.readOffset;

    var pkgID = varint.read(data, offset);
    //offset = varint.readOffset;





    var payload = data.slice(varint.readOffset);
    console.log("Package ID:", pkgID, "   Connection status:", this.status)


    if (this.status === 0) {
        if (data[0] === 0xFE) {//if the ping request is pre 1.6
            logger.log("Recieved pre-1.6 ping request from " + this.remoteAddress);
            //todo later

        }

        else {
            var pkg = handshakePKG(payload);
            console.log(varint.readOffset, data.byteLength);
            console.log(pkg);
            if (pkg.nextState > 2 || pkg.nextState < 1) throw new Error("invalid next state field: " + pkg.nextState + data.toString("hex"));
            this.status = pkg.nextState;

            this.protocol = pkg.protocolVersion;
            logger.log("Recieved handshake package from " + this.remoteAddress + ".");

        }


    }

    else if (this.status === 1) {

        if (pkgID === 0) {
            
            var response = {
                version: {
                    name: cfg.protocol,
                    protocol: cfg.protocol < 0 ? this.protocol : cfg.protocol
                },
                players: {
                    max: cfg["max-players"],
                    online: cfg["online-players"]
                },
                description: cfg.description,
                favicon: favicon ? "data:image/png;base64," + favicon : undefined //if favicon is not loaded, JSON will not stringify it
            }

            this.write(pingResponsePKG({ response }))
        }
        else if (pkgID === 1) {
            this.write(data);
        }
    }
    //}
    /*catch(e) {
        
        logger.warn("Recieved invalid package from "+this.remoteAddress);
    }*/
    if (pkgLen < data.byteLength) this.emit("data", data.slice(pkgLen + offset)); //if the packages stick together, parse them;
}