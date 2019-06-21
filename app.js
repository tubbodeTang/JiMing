var express = require('express');
const exStatic = require("express-static");

var app = express();


app.use(exStatic('./'));

// app.get('/', function (request, response, next) {


// }

app.listen(process.env.PORT || 3000, function () {
    console.log("app is running at port 3000");
})