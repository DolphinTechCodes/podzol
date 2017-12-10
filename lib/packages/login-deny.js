var varint=require("../var-int");
var pack=require("./pack");

module.exports=function(pkg) {
    
    var strbuf=Buffer.from(JSON.stringify(pkg.reason),"utf8");
    
    var lenbuf=varint.write(strbuf.byteLength); 

    return pack(Buffer.concat([lenbuf,strbuf,]),[0]);


}