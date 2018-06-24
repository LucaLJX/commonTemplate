/**
 * 微信授权
 */

var co = require('co')
var WechatService = require('../service/WechatService')
var prod = require('../config').prod

module.exports = function(req, res, next) {
  if (req.session.user) {
    return next()
  }

  if (!prod) {
    req.session.openid = 'oLedrxO7YXGL2fL8a7Q9S8kMrvrY' // 测试用
  }
  var code = req.query.code

  const subPage = req.query.sub
  console.log('get subPage from query: ' + subPage)
  if (subPage) {
    req.session.subPage = subPage
  }

  co(function*() {
    if (!req.session.openid) {
      // 获取 openid
      if (!code) {
        return res.redirect(WechatService.getURL_base('/wechat'))
      }
      req.session.openid = yield WechatService.getOpenid(code)
      code = null
    }

    // 用 openid 从后台请求用户信息
    // 保存到 req.session.user
    var data = yield ApiService(
      'auth4Open_getStaffInfoByOpenId',
      { openid: req.session.openid },
      req
    )
    if (data.code !== 200) {
      throw new Error(data.message)
    }
    var user = Object.assign({}, data.data.staffWeChat, data.data.staff)
    if (user.openid) {
      req.session.user = {
        id: user.id,
        openid: user.openid,
        nickname: user.name || user.nickname,
        sex: user.sex,
        phoneNum: user.phoneNum,
        headimgurl: user.headimgurl
      }

      // 跳子页面
      console.log('get subPage from session: ' + req.session.subPage)
      if (req.session.subPage) {
        const subPage = req.session.subPage
        req.session.subPage = undefined
        return res.redirect(`/wechat/dashboard?sub=${subPage}#/${subPage}`)
      }
      return res.redirect('/')
    }

    if (!code) {
      // 从微信获取用户信息
      return res.redirect(WechatService.getURL_userinfo('/wechat'))
    }
    var wechat = yield WechatService.getUserByCode(code)
    wechat.privilege = wechat.privilege ? wechat.privilege.join(',') : ''
    req.session.wechat = wechat
    console.dir(req.session.wechat)

    // 保存用户微信信息
    var result = yield ApiService('auth4Open_registerByWeChat', wechat, req)
    if (result.code !== 200) {
      throw new Error(result.message)
    }

    // 跳子页面
    console.log('get subPage from session: ' + req.session.subPage)
    if (req.session.subPage) {
      const subPage = req.session.subPage
      req.session.subPage = undefined
      return res.redirect(`/wechat/dashboard?sub=${subPage}#/${subPage}`)
    }
    return res.redirect('/')
  }).catch(e => {
    console.error(e)
    res.send(e.message)
  })
}
