/**
 * ApiService 方法全局可用
 */
var rest = require('restler')
var host = require('../config').host
var ApiConstants = require('../ApiConstants')

/**
 * 从 req 中获取要配置的 header
 */
function getHeaders (req) {
  var user = req.session.user || { id: null }
  return { staff_id: user.id }
}

function parseUrl (url, data) {
  var arr = url.split('/')
  for (var i in arr) {
    var it = arr[i]
    if (it.indexOf(':') === 0) {
      arr[i] = data['_' + it.slice(1)]
    }
  }
  return arr.join('/')
}

// 注册全局方法
global.ApiService = module.exports = function (apiName, data, req = {}, cb = function () {}) {
  var api = ApiConstants[apiName]
  var url = host + parseUrl(api.url, data)
  console.log(api.method, url)

  var options = {
    data,
    headers: getHeaders(req),
    method: api.method,
    parser: rest.parsers.auto
  }

  return new Promise(function (resolve, reject) {
    rest.request(url, options).on('complete', function (data, res) {
      var error
      if (!data) {
        error = { code: 500 }
      }
      if (data instanceof Error || data.status == 500) {
        error = { code: 500, message: data.message }
      }
      if (data.status == 400) {
        error = { code: 400, message: data.message }
      }
      if (error) {
        reject(error) && cb(error)
      }
      resolve(data) && cb(data, res)
    })
  })
}
