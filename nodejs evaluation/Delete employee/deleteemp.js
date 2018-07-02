
var MongoClient=require('mongodb').MongoClient;
const http=require('http');
const qs=require('querystring');
var fs= require("fs")
var empid;
http.createServer(function(req,res){
    if(req.method=="GET")
    {
          res.writeHead(200,{"Content-Type":"text/html"})
          fs.createReadStream("./deleteemplo.html").pipe(res);
    }
    
    else if(req.method=="POST")
    {
        var body="";
        req.on("data",function(chunk)
        {
           body+=chunk;
     
        });
        req.on("end",function()
        {
            var obj=qs.parse(body);
            console.log(obj);
            empid=parseInt(obj.empid);
            console.log(empid)

           
        
            MongoClient.connect("mongodb://localhost:27017/assign", function(err, db) {
              if (err) {
                console.log("error has occured or the employee is not available") 
               }
            

            var ins = {Empid:empid};

            db.collection("emplo").deleteOne(ins, function(err, result){
              if (err) {
             console.log("error has occured or the employee is not available") 
            }
            res.write("1 document deleted");
            console.log("1 document deleted");
            db.close();
            });
          });

        })

}}).listen(3000);
console.log("form server listening on port 3000");

