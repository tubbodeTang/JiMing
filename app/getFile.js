var fs = require("fs");


var getTxtFile = function (req, res) {
    var filename = req;

    fs.readFile('call-roll/UploadFiles/names.txt', function (err, data) {
        if (err) {
            console.log("bad");
            res.send("error");
        } else {
            console.log("ok");
            //console.log(data.toString());
            debugger;
            var str = data.toString();
            res.send(str);
        }
    })
}


var getExcelFile = function (req, res) {
    var filename = req;

    fs.readFile('call-roll/UploadFiles/nameList.txt', function (err, data) {
        if (err) {
            console.log("bad");
            res.send("error");
        } else {
            console.log("ok");
            console.log(data.toString());

            debugger;

            var str = data.toString();
            res.send(str);
        }
    })
}

var getFile = {
    getTxtFile: getTxtFile,
    getExcelFile: getExcelFile
}

module.exports = getFile;