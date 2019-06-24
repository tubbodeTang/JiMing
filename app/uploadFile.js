var multer = require("multer");

/**
 * process.cwd()获取项目根目录地址，可以将上传的文件指定到静态文件目录下，然后再返回地址给前端页面，如：
 * var uploadPath = process.cwd()+'/public/uploads' 前端访问地址 http://localhost:3000/uploads/文件名
 **/
var uploadPath = process.cwd() + '/uploads'; //直接存放在根目录下uploads
var storage = multer.diskStorage({ //multer存储引擎  存储引擎自定义引用 https://github.com/expressjs/multer/blob/master/StorageEngine.md
    destination: uploadPath, //指定上传文件的路径
    filename: function (req, file, cb) {
        var surffix=file.originalname.split('.')[1];
        cb(null, file.fieldname + '-' + Date.now()+"."+surffix) //命名上传文件 
    }
})
var multer = multer({
    storage: storage,
    //limits：''//Limits of the uploaded data
}).single('files1'); //single 单文件上传，files1为form表单中 接受文件的name字段名称




var uploadFile = function (req, res) {
    multer(req, res, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(req.body.username); //获取通过formData中表单的字段 name="username"的数据
        //req.body ajax提交的非文件数据
        //req.body.username //提交参数 username
        //req.file.fieldname 上传文件 input file  name字段名称
        //req.file.filename 上传文件 文件名
        //req.file.originalname 上传文件 文件名
        //req.file.mimetype 上传文件类型
        //req.file.size 上传文件大小
        //req.file.destination 上传文件存在的路径
        //req.file.path 上传文件的 路径
        console.log(req.file.path);
        /**

         * 可以通过req.file中的参数，做一个文件上传的过滤，例如req.file.size 限制文件上传大小，req.file.mimetype 限制文件上传的类型

         **/

        res.send({
            msg: '上传成功',
            img: req.file.path
        }); //返回数据到前端页面，可以将上传的图片，在前端预览。
    })
}


var uploadFile = {
    uploadFile: uploadFile,
}

module.exports = uploadFile;