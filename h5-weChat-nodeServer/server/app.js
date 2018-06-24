var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var bodyParser = require('body-parser')
require('./api/service/ApiService')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
app.use(logger('dev'))
app.use(cookieParser())
// session
app.use(session({
  resave: false,
  secret: 'keyboard cat',
  saveUninitialized: true,
  cookie: { originalMaxAge: 4 * 3600000 }
}))
// 添加代理 /api 开头的
app.use(require('./api/middleware/proxy'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 微信用户授权
app.use('/wechat', require('./api/middleware/wechat'))

app.use('/', require('./routes/index'))
app.use('/user', require('./routes/user'))

app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  if (err.status !== 404) {
    console.error(err.stack)
  }
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
