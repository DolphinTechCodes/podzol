var varint=require("../var-int");

module.exports = function (buf) {
    var pkg = {
        name:null
    }

    var off = 0;

    var len=varint.read(buf,off);
    off=varint.readOffset;
    pkg.name=buf.toString("utf-8",off,off+len);
       

    return pkg;
}