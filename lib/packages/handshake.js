var varint=require("../var-int");

module.exports = function (buf) {
    var pkg = {
        protocolVersion:null,
        serverAddress:null,
        serverPort:null,
        nextState:null
    }

    var off = 0;

    pkg.protocolVersion=varint.read(buf,0);
    off=varint.readOffset;

    var len=varint.read(buf,off);
    off=varint.readOffset;
    pkg.serverAddress=buf.toString("utf-8",off,off+len);
    off+=len

    pkg.serverPort=buf.readUInt16BE(off);
    off+=2;

    pkg.nextState=varint.read(buf,off);
    

    return pkg;
}