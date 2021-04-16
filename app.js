const express = require('express');
var ejs = require('ejs');
var fs = require('fs');
const app = express();
const http = require("http");

var hostinfo = fs.readFileSync("hostinfo.txt",'utf-8').split(','); // 호스트ip, 포트정보

const hostname = hostinfo[0];
const port = hostinfo[1];

console.log(hostname);
var serviceKey = "1KOTY13zmzBNx9vXz6VT1RTGYVxz%2Bz0nw5hpHyiWbzobPE4EcCS2eiPHpqRc%2BtDNi6MwizzOVn4OYuVK6infDA%3D%3D"
//서비스키 

app.set('views',__dirname+'/public');
app.set('view engine','ejs');
app.engine('html', ejs.renderFile);

app.use(express.static('public'));

//main.html
app.get('/',function(req, res, next) {
    res.render('main.html');
    next();
})

app.post('/search', function(req,res){
    console.log("search");
    res.send("search good");
});


app.listen(port,() => console.log("port : " + port));