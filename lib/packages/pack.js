var varint = require("../var-int");

module.exports = function (payload, id) {
    
    return Buffer.concat([varint.write(id.length + payload.byteLength), Buffer.from(id), payload]);
}