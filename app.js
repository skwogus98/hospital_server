const express = require('express');
var ejs = require('ejs');
var fs = require('fs');
const app = express();
const http = require("http");
const request = require('request');
const xml2json = require('xml-js');
var bodyParser = require("body-parser");
var hostinfo = fs.readFileSync("hostinfo.txt",'utf-8').split(','); // 호스트ip, 포트정보

const hostname = hostinfo[0];
const port = hostinfo[1];

console.log(hostname);
const hospitalServiceKey = "1KOTY13zmzBNx9vXz6VT1RTGYVxz%2Bz0nw5hpHyiWbzobPE4EcCS2eiPHpqRc%2BtDNi6MwizzOVn4OYuVK6infDA%3D%3D";
const hospitalSearchEndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/";
var hospitalSearch = hospitalSearchEndPoint+'getHsptlMdcncListInfoInqire?serviceKey='+hospitalServiceKey+encodeURI("&Q0=대구");

//서비스키 

console.log(hospitalSearch);

app.set('views',__dirname+'/public');
app.set('view engine','ejs');
app.engine('html', ejs.renderFile);

app.use(express.static('public'));

//main.html
app.get('/',function(req, res, next) {
    res.render('main.html');
    next();
})
//search part
app.get('/search',function(req, res){
    console.log(req.query.sendData)
    res.send(req.query.sendData);
});


app.listen(port,() => console.log("port : " + port));
/*
request.get(hospitalSearch, (err,res,body)=>{
    if(err){
        console.log(err);
    }
    else{
        if(res.statusCode==200){
            var result = body
            console.log(result);
            console.log("\n\n\n");
            var bodyJson = xml2json.xml2json(result,{compact: true,spaces:4});
            console.log(bodyJson);
        }
    }
})​*/


request.get(hospitalSearch, (err, res, body)=> {

   if(err) {

         console.log(`err => ${err}`)

   }

  else {

      if(res.statusCode == 200) {

                var result = body

                console.log(`body data => ${result}`)

                var xmlToJson = xml2json.xml2json(result, {compact: true, spaces: 4});

                console.log(`xml to json => ${xmlToJson}`)

       }

   }

})