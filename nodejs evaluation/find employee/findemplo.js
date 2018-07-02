var http=require("http");
var MongoClient=require("mongodb").MongoClient;
var fs=require("fs");
var qs=require("querystring");
var empid;




http.createServer(function(req,res){
console.log(req.method);
    if(req.method=="GET"){
        res.writeHead(200,{"content-type":"text/html"});
        fs.createReadStream("./femplo.html","UTF-8").pipe(res);
    }
    else if (req.method=="POST"){
        var body="";
        req.on("data",function(chunk){
            body+=chunk;
            console.log("data");
        });
        req.on("end",function(){
            var obj=qs.parse(body);
            console.log(obj);
            empid=parseInt(obj.empid);
            console.log(empid)

        MongoClient.connect("mongodb://127.0.0.1:27017/assign",function(err,db){
            if(err){
                console.log(err);
            }
            
            var query = {"Empid":empid};
            console.log("employee id " + empid)


db.collection("emplo").findOne({Empid:empid},function(err, result) {
            

                if(err) {
                    console.log(err)
                }
                else {
                    res.end(`
                    <!doctype html>
                    <html>
                    <head>
                    <title>form results</title>
                    </head>
                    <body>
                    <form action="/" method="POST">
                    <label>Employeedetails</label><br>
                    <label>Empid:</label>
                    <input type="text" id="empid" name="empid"  value=${result.Empid} /><br>
                    <label>Empname:</label>

                    <input type="text" id="name" name="ename" value=${result.Ename} required readonly/><br>
                    <label>Basicpay:</label>
                    <input type="text" id="sal" name="basicpay" value=${result.Basicpay} required readonly/><br>
                    <label>Netpay:</label>

                    <input type="text" id="netpay" name="netpay" value=${result.Netpay} required readonly/>
                    
                    </form>
                    
                       </body>
                       </html>
                       `);
                    console.log("document fetch successfully");
                }
                db.close();
             })
                        
         });
    
         });

    
    }
    }).listen(3000);
console.log("form server listening on port 3000");