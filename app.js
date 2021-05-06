const express = require('express');
var ejs = require('ejs');
var fs = require('fs');
const app = express();
const http = require("http");
const request = require('request');
const xml2json = require('xml-js');
var bodyParser = require("body-parser");
var hostinfo = fs.readFileSync("hostinfo.txt",'utf-8').split(','); // 호스트ip, 포트정보
var rp = require("request-promise-native");
const { response } = require('express');
const retus = require("retus");//신의 힘을 가짐
const hostname = hostinfo[0];
const port = hostinfo[1];

console.log(hostname);
const hospitalServiceKey = "1KOTY13zmzBNx9vXz6VT1RTGYVxz%2Bz0nw5hpHyiWbzobPE4EcCS2eiPHpqRc%2BtDNi6MwizzOVn4OYuVK6infDA%3D%3D";
const hospitalSearchEndPoint = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/";

//서비스키 
//console.log(hospitalSearch);

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
    var hospitalSearch = hospitalSearchEndPoint+'getHsptlMdcncListInfoInqire?serviceKey='+hospitalServiceKey+encodeURI("&Q0="+req.query.searchData);
    const dat = retus(hospitalSearch);
    var result = dat.body;
    var xmlToJson = xml2json.xml2json(result, {compact: true, spaces: 4});
    //console.log(xmlToJson);
    res.json(xmlToJson);
});

app.get('/test',function(req, res){
});

app.listen(port,() => console.log("port : " + port));
