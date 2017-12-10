var varint = require("./var-int");
var logger = require("./logger");
var cfg = require("./config");

var handshakePKG = require("./packages/handshake");
var pingResponsePKG = require("./packages/ping-response");
var loginStartPKG = require("./packages/login-start");
var loginDenyPKG = require("./packages/login-deny");

module.exports = function (data) {

    try {
        var offset = 0;
        var pkgLen = varint.read(data, 0);

        offset = varint.readOffset;

        var pkgID = varint.read(data, offset);
        //offset = varint.readOffset;





        var payload = data.slice(varint.readOffset);



        if (this.status === 0) {
            if (data[0] === 0xFE) {//if the ping request is pre 1.6
                logger.log("Recieved pre-1.6 ping request from " + this.remoteAddress);
                //todo later

            }

            else {
                var pkg = handshakePKG(payload);

                if (pkg.nextState === 1) logger.log("Recieved handshake package from " + this.remoteAddress + " who is attempting to ping");
                else if (pkg.nextState === 2) logger.log("Recieved handshake package from " + this.remoteAddress + " who is attempting to login");
                else throw new Error("invalid next state field: " + pkg.nextState);

                this.status = pkg.nextState;

                this.protocol = pkg.protocolVersion;


            }


        }

        else if (this.status === 1) {

            if (pkgID === 0) {

                var response = {
                    version: {
                        name: cfg.version,
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
                logger.log("Responded with latency pong.")
            }
        }

        else if (this.status === 2) {
            if (pkgID === 0) {
                var pkg = loginStartPKG(payload);
                this.write(loginDenyPKG({ reason: cfg["login-message"] }))
                logger.log("Recieved login request from " + this.remoteAddress + ' who identified as"' + pkg.name + '". Responded.')
            }
        }
    }
    catch (e) {

        logger.warn("Recieved invalid package from " + this.remoteAddress);
    }

    if (pkgLen + offset < data.byteLength) this.emit("data", data.slice(pkgLen + offset)); //if the packages stick together, parse them;
} 