/**
 * 生产环境配置
 */

module.exports = {
  prod: true,
  host: 'http://localhost:8088',  // 后台服务器地址
  port: '1388',                        // node 启动端口
  wechat: {                          // 微信公众号配置
    appid: 'wx7457a8d569608697',
    secret: 'ac9c55ccea21690846304d1cb40aa5bf',
    baseUrl: 'http://app.aceoffer.cn'
  }
}
