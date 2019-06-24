var express = require('express');
var path = require('path');
// const exStatic = require("express-static");

var ejs = require('ejs');


var app = express();

app.set('views', path.join(__dirname, './'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// app.use(exStatic('./'));

app.get('/', function (request, response, next) {
    response.type('html');
    response.render('jiming');
})

//app.

app.listen(process.env.PORT || 3000, function () {
    console.log("app is running at port 3000");
})