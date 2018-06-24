/**
 * 开发环境配置
 * swagger 地址: http://dev.sf8cloud.com:8088/swagger-ui.html#!
 * swagger 地址: http://tmp.roomm.cn:8088/swagger-ui.html
 */

module.exports = {
  prod: false,
  host: 'http://tmp.roomm.cn:8088', // 后台服务器地址
  port: '1337', // node 启动端口
  wechat: {
    // 微信公众号配置
    appid: 'wxf2010e3b57ab91fd',
    secret: '01abe4404b4fefabcf41741efb7ece0b',
    baseUrl: 'http://wdev.sf8cloud.com'
  }
}
