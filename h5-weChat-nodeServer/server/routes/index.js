var path = require('path')
var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.redirect('/wechat')
})
router.get('/index.html', function (req, res) {
  res.redirect('/wechat')
})
router.get('/wechat', function (req, res) {
  res.redirect('/wechat/dashboard?')
})
router.get('/wechat/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router
