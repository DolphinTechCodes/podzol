var varint=require("../var-int");
var pack=require("./pack");

module.exports=function(pkg) {
    
    var strbuf=Buffer.from(JSON.stringify(pkg.response),"utf8");
   
    var lenbuf=varint.write(strbuf.byteLength); //set the package ID

    return pack(Buffer.concat([strbuf,lenbuf]),[0]);


}