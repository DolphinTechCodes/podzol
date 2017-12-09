const fs = require('fs');
const { spawn } = require('child_process');
const out = fs.openSync('./log.txt', 'a');
const err = fs.openSync('./log.txt', 'a');


var oldPid = fs.readFileSync("./server.pid", "utf-8");

var running = require("is-running")(oldPid);

var args = require('minimist')(process.argv.slice(process.argv[0] === "podzol" ? 1 : 2));



switch (args._[0]) {

  case "start":
    if (running) {
      process.stderr.write("Error: Server already running");
    }
    else {
      const subprocess = spawn('node', [__dirname+"/podzol.js"], {
        detached: true,
        stdio: ['ignore', out, err]
      });
      fs.writeFileSync("./server.pid", subprocess.pid);
      subprocess.unref();
      process.stdout.write("Podzol server started");
    }
    break;

  case "stop":
    try {
      process.kill(oldPid, "SIGINT");
      process.stdout.write("Podzol server stopped");
    }
    catch (e) {
      process.stderr.write("Error: Server already stopped");
    }
}




