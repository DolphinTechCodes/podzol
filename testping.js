

var fs=require("fs")

var net = require('net');

var client = new net.Socket();
client.connect(25565, '128.65.210.21', function () {
    console.log('Connected');
    client.write(Buffer.from([0x10, 0x00, 0xcf, 0x02, 0x09, 0x6c, 0x6f, 0x63, 0x61, 0x6c, 0x68, 0x6f, 0x73, 0x74, 0x63, 0xdd, 0x01, 0x01, 0x00]));
    client.write(Buffer.from([1,0]))
});

client.on('data', function (data) {
    // kill client after server's response
    fs.appendFile("asdf.txt",data)
});

client.on('close', function () {
    console.log('Connection closed');
});

client.on('error', function (e) {
    console.log('Connection closed',e);
});