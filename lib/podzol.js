

var net = require('net');
var fs = require("fs");
var logger = require("./logger");
logger.log("Starting server...")

var cfg = require("./config");
var parse = require("./parse");


fs.readFile("./server-icon.png", { encoding: "base64" }, function (err, data) {
  if (err) logger.warn("Could not find server-icon.png. Continue without sending it.");
  else logger.log("Loaded server-icon.png.");
  console.log(data)
  global.favicon = data;
});


var server = net.createServer();
server.on('connection', handleConnection);

server.listen(cfg.port, function () {

  logger.log('Server started. Listening to port ' + cfg.port + ".");
});

function handleConnection(conn) {

  logger.log("Incoming connection from " + conn.remoteAddress + ".");


  conn.status = 0;
  conn.protocol = 0;


  conn.on('data', parse);
 // conn.on("data",console.log);
  conn.once('close', onConnClose);
  conn.on('error', onConnError);
  
  conn.on("timeout",()=>logger.log('Connection' + conn.remoteAddress + " timed out."))

  function onConnClose() {
    logger.log('Connection' + conn.remoteAddress + " closed.");
  }

  function onConnError(err) {
    logger.warn("Connection " + conn.remoteAddress + " caused error " + err.message);
  }
}


process.on('SIGINT', () => {
  logger.log('Stopping server.\n');
  process.exit();
}); 