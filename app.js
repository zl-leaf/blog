var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var security = require('./src/common/security');

var index = require('./routes/index');
var users = require('./routes/users');
var archives = require('./routes/archives');
var article = require('./routes/article');
var editor = require('./routes/editor');

var app = express();

// webpak
if (process.env.NODE_ENV == 'development') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  // var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpackConf = require('./webpack.config.js');
  var compiler = webpack(webpackConf);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConf.output.publicPath,
    // noInfo: true,
    stats: {
        chunks: false,
        colors: true
    }
  }));
  // app.use(webpackHotMiddleware(compiler));
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session配置
app.use(session({
    cookie: { maxAge: 600000 },
    secret: 'yipzale.com#2018',
}));

app.use(security);

app.use('/', index);
app.use('/users', users);
app.use('/archives', archives);
app.use('/article', article);
app.use('/editor', editor);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
