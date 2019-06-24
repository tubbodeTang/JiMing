// 加载依赖库，原来这个类库都封装在connect中，现在需单独加载
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 加载路由控制实例
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api/api');


//var api = require('./public/javascripts/api/api');

// 创建项目实例
var app = express();



// view engine setup
//定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

//添加html引擎
app.engine('.html', require('ejs').__express);
//设置视图引擎为html
app.set('view engine', 'html');

// 匹配路径和路由
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', apiRouter);


// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 定义cookie解析器
app.use(cookieParser());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));


// 404错误处理
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// 开发/生产环境，500错误处理和错误堆栈跟踪
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
});

app.all('*', (req, res, next) => {
    const { origin, Origin, referer, Referer } = req.headers;
    const allowOrigin = origin || Origin || referer || Referer || '*';
    res.header("Access-Control-Allow-Origin", allowOrigin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", 'Express');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// 输出模型app
module.exports = app;
