module.exports = {//copied from wiki.vg

    readOffset: 0,

    read: function (buf, off, max = 5) {
        this.readOffset = off;
        var numRead = 0;
        var result = 0;
        var read;

        do {

            read = buf.readIntLE(this.readOffset++, 1);

            var value = (read & 0b01111111);
            result |= (value << (7 * numRead));

            numRead++;
            if (numRead > max) {
                throw new Error("VarInt is too big");
            }
        } while ((read & 0b10000000) !== 0);

        return result;

    },
    write: function (value) {//copied from wiki.vg
        var bytes = [];
        console.log(value)

        do {
            var temp = (value & 0b01111111);
            // Note: >>> means that the sign bit is shifted with the rest of the number rather than being left alone
            value >>>= 7;
            if (value != 0) {
                temp |= 0b10000000;
            }
            bytes.push(temp);
        } while (value !== 0);

        var buf = Buffer.alloc(bytes.length);
        console.log(bytes)
        console.log(buf)
        for (let i = 0; i < bytes.length; i++) buf.writeIntLE(bytes[i], i, 1,true);
        console.log(buf);
        return buf;
    },



}