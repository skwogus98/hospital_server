const express = require('express');
const app = express();
const http = require("http");
const hostname = '192.168.55.223';
const port = 3000;
var ejs = require('ejs');

var serviceKey = "1KOTY13zmzBNx9vXz6VT1RTGYVxz%2Bz0nw5hpHyiWbzobPE4EcCS2eiPHpqRc%2BtDNi6MwizzOVn4OYuVK6infDA%3D%3D"

app.set('views',__dirname+'/public');
app.set('view engine','ejs');
app.engine('html', ejs.renderFile);

app.use(express.static('public'));

app.get('/',function(req, res, next) {
    console.log("hello world");
    res.render('main.html');
    next();
})

app.listen(3000,() => console.log("port : 3000"));