const fs = require('fs');
const rl = require("readline");
const { spawn } = require('child_process');
const log = fs.openSync('./log.txt', "a");



var oldPid = fs.readFileSync("./server.pid", "utf-8");

var running = require("is-running")(oldPid);

var args = require('minimist')(process.argv.slice(process.argv[0] === "podzol" ? 1 : 2));


if (args.v) process.stdout.write("1.0.0\n");


switch (args._[0]) {

  case "start":
    if (running) {
      process.stderr.write("Error: Server already running\n");
      process.exit();
    }
    else {
      const subprocess = spawn('node', [__dirname + "/podzol.js"], {
        detached: true,
        stdio: ['ignore', log, log]
      });
      console.log(subprocess)

      fs.writeFileSync("./server.pid", subprocess.pid);
      subprocess.unref();
      process.stdout.write("Podzol server started\n");
    }
    break;

  case "stop":
    try {
      process.kill(oldPid, "SIGINT");
      process.stdout.write("Podzol server stopped\n");
    }
    catch (e) {
      process.stderr.write("Error: Server already stopped\n");
      process.exit()
    }
}




