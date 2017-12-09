module.exports={
    log:function(msg) {
        var now =new Date();
        process.stdout.write("[INFO | " +now.getHours()+":"+now.getMinutes() +":"+now.getSeconds()+"] "+msg+"\n");
    },

    warn:function(msg) {
        var now =new Date();
        process.stdout.write("[WARN | " +now.getHours()+":"+now.getMinutes() +":"+now.getSeconds()+"] "+msg+"\n");
    },

    error:function(msg) {
        var now =new Date();
        process.stderr.write("[ERROR | " +now.getHours()+":"+now.getMinutes() +":"+now.getSeconds()+"] "+msg+"\n");
    }
}