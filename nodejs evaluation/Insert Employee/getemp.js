var http=require("http");
var MongoClient=require("mongodb").MongoClient;
var fs=require("fs");
var qs=require("querystring");
var empbal=require("./empbal.js");
var basicpay;
var empid;
var ename;
var netpay;
http.createServer(function(req,res){
console.log(req.method);
    if(req.method=="GET"){
        res.writeHead(200,{"content-type":"text/html"});
        fs.createReadStream("./emp.html","UTF-8").pipe(res);
    }
    else if (req.method=="POST"){
        var body="";
        req.on("data",function(chunk){
            body+=chunk;
            console.log("data");
        });
        req.on("end",function(){
         var obj=qs.parse(body);
        basicpay=parseFloat(obj.basicpay);
        console.log(obj.basicpay);
        empid=parseInt(obj.empid);
        console.log(obj.empid);
        ename=(obj.ename);
        console.log(obj.ename);
         netpay=empbal.calculateNetPay(basicpay);
        console.log("netpay =" + netpay);
        
         var objstring=JSON.stringify(obj);
         res.writeHead(200,{"content-type":"text/html"});
         res.end(`
         <!doctype html>
         <html>
         <head>
         <title>form results</title>
         </head>
         <body>
          <h1>Form results</h1>
         <p>${objstring}</p>
            </body>
            </html>
            `);
        
       
        var insert={Empid:empid,Ename:ename,Basicpay:basicpay,Netpay:netpay};
        MongoClient.connect('mongodb://127.0.0.1:27017/assign',function(err,db){
            if(err){
                console.log(err);

            }
            var result=db.collection('emplo').insert(insert,function(err,result){
                if(err) throw err;
                else{
                    console.log("document insert successfully");
                }
                db.close();
            })
        });
    });


    
    }
}).listen(3000);
console.log("form server listening on port 3000");