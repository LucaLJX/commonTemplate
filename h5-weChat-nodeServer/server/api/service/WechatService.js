var https = require('https')
var co = require('co')
var JsSHA = require('jssha')
var OAuth = require('wechat-oauth')
var config = require('../config').wechat

var cachedTokens = {}  // 缓存 access_token
var cachedSignatures = {}  // 缓存页面 js_apiticket

// 2小时后过期，需要重新获取数据后计算签名
var expireTime = 7200 - 100

var client = new OAuth(config.appid, config.secret)

/**
 * 对接微信网页授权
 */
module.exports = {
  /**
   * 获取 openid 的 code 地址
   */
  getURL_base (url = '') {
    return client.getAuthorizeURL(config.baseUrl + url, 0, 'snsapi_base')
  },

  /**
   * 获取 userinfo 的 code 地址
   */
  getURL_userinfo (url = '') {
    return client.getAuthorizeURL(config.baseUrl + url, 0, 'snsapi_userinfo')
  },

  /**
   * 获取 openid
   */
  getOpenid (code) {
    return new Promise((resolve, reject) => {
      client.getAccessToken(code, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result.data.openid)
      })
    })
  },

  /**
   * 根据 code 获取用户信息
   */
  getUserByCode (code) {
    return new Promise((resolve, reject) => {
      client.getUserByCode(code, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  },

  /**
   * 微信接口数据
   */
  getJsApiTicket (url, cb) {
    var signatureObj = cachedSignatures[url]
    // js_apiticket 没过期
    if (signatureObj && signatureObj.timestamp && createTimeStamp() - signatureObj.timestamp < expireTime) {
      return cb(null, signatureObj)
    }
    cachedSignatures[url] = undefined

    co(function* () {
      try {
        var token = yield getTokenPromise()
        var jsapi_ticket = yield getTicketPromise(url, token)

        cb(null, jsapi_ticket)
      } catch (e) { cb(e) }
    })
  }
}

/**
 * 生成时间戳
 */
function createTimeStamp () {
  return ~~(+new Date() / 1000) + ''
}

/**
 * 生成随机字符串
 */
function createNonceStr () {
  return Math.random().toString(36).slice(2, 15)
}

/**
 * 获得 access_token
 */
function getTokenPromise () {
  return new Promise((resolve, reject) => {
    // access_token 没过期
    if (cachedTokens.info && (createTimeStamp() - cachedTokens.timestamp < expireTime)) {
      return resolve(cachedTokens.info)
    }
    https.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${ config.appid }&secret=${ config.secret }`, res => {
      var str = ''
      res.on('data', data => { str += data})
      res.on('end', () => {
        try {
          var resp = JSON.parse(str)
          cachedTokens = { resp, timestamp: createTimeStamp() }
          return resolve(resp.access_token)
        }
        catch (e) {
          reject('解析access_token返回的JSON数据错误' + str)
        }
      })
    })
  })
}

/**
 * 获取微信签名所需的ticket
 */
function getTicketPromise (url, token) {
  return new Promise((resolve, reject) => {
    https.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${ token }&type=jsapi`, res => {
      var str = ''
      res.on('data', data => { str += data })
      res.on('end', () => {
        try {
          var resp = JSON.parse(str)
          resolve(createJsApiTick(url, resp.ticket))
        } catch (e) {
          reject('解析远程JSON数据错误' + str)
        }
      })
    })
  })
}

/**
 * 生成签名
 */
function createJsApiTick(url, jsapi_ticket) {
  var appId = config.appid
  var timestamp = createTimeStamp()
  var nonceStr = createNonceStr()

  // jsapi_ticket = 'kgt8ON7yVITDhtdwci0qeRp98V3ybo-MB3QaVpJEiXam5U_qMcQyOkQzWaPkictYU5cQhnM9lELWWpeaR1fM5w'
  // nonceStr = 'bfezjq5sz9qyk'
  // timestamp = '1502878783'
  // url = 'http://wdev.sf8cloud.com/weChat/mall'
  // 结果应该为 2a9dfecd2961bee800f81cc7fc54f9a04d4055d1

  var signature = calSignature({ url, jsapi_ticket, timestamp, nonceStr })
  var signatureObj = { appId, url, timestamp, nonceStr, signature }
  cachedSignatures[url] = signatureObj
  // console.log(jsapi_ticket)
  // console.log(signatureObj)
  return signatureObj
}

/**
 * 计算 signature 使用 SHA-1 加密
 */
function calSignature (map) {
  var str = ''
  var keys = Object.keys(map).sort()

  // 排序和小写 key
  keys.forEach(key => {
    str += `&${key.toLowerCase()}=${map[key]}`
  })
  str = str.slice(1)

  var shaObj = new JsSHA('SHA-1', 'TEXT')
  shaObj.update(str)
  return shaObj.getHash('HEX')
}
