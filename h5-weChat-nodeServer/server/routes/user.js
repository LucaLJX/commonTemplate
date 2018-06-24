var express = require('express')
var router = express.Router()
var WechatService = require('../api/service/WechatService')

/**
 * 获取用户信息
 */
router.post('/info', function (req, res) {
  const user = req.session.user
  res.send({
    code: 200,
    data: {
      name: user.nickname,
      phoneNum: user.phoneNum,
      headimgurl: user.headimgurl
    }
  })
})

/**
 * 绑定手机号
 */
router.post('/bind', function (req, res) {
  var openid = req.session.openid
  var username = req.body.username
  var sex = req.body.sex
  var phoneNum = req.body.phoneNum
  var verificationCode = req.body.verificationCode

  ApiService('auth4Open_bindByTelephone', {
    openid,
    username,
    sex,
    phoneNum,
    verificationCode
  }, req).then(data => {
    if (data.code === 200) {
      req.session.user = null // 绑定成功清空 session.user
    }
    res.send(data)
  }).catch(e => {
    res.send(e)
  })
})

/**
 * 微信权限验证配置
 */
router.post('/jsApiTicket', function (req, res) {
  var url = req.body.url
  WechatService.getJsApiTicket(url, function (err, data) {
    if (!err) {
      return res.send({
        code: 200,
        data
      })
    }
    console.error(err)
    res.send({
      code: 500,
      message: JSON.stringify(err)
    })
  })
})

/**
 * 预支付签名信息
 */
router.post('/prepay', function (req, res) {
  var openid = req.session.openid  // 'oLedrxO7YXGL2fL8a7Q9S8kMrvrY' 测试支付用
  var orderId = req.body.orderId
  var courseId = req.body.courseId

  ApiService('ace_order_prePay4CourseOrder', {
    openid,
    orderId,
    courseId
  }, req).then(data => {
    res.send(data)
  }).catch(e => {
    res.send(e)
  })
})
module.exports = router
