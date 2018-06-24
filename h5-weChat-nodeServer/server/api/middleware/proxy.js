/**
 * 代理中间件
 */

var proxy = require('http-proxy-middleware')
var target = require('../config').host

module.exports = proxy('/api', {
  target,
  logLevel: 'debug',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
  onProxyReq (proxyReq, req, res) {
    // 修改 header，使其包含用户信息
    var user = req.session.user || { id: null }
    proxyReq.setHeader('staff_id', user.id)
  }
})
