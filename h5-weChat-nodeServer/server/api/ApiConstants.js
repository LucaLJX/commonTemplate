module.exports = {
  'auth4Open_registerByWeChat': {
    url: '/auth4Open/registerByWeChat',
    method: 'post',
    desc: '用微信信息直接注册'
  },
  'auth4Open_getStaffInfoByOpenId': {
    url: '/auth4Open/getStaffInfoByOpenId',
    method: 'post',
    desc: '根据openid获取用户详情'
  },
  'auth4Open_bindByTelephone': {
    url: '/auth4Open/bindByTelephone',
    method: 'post',
    desc: '绑定手机号'
  },
  'ace_order_prePay4CourseOrder': {
    url: '/ace/order/prePay4CourseOrder',
    method: 'post',
    desc: '对订单进行预支付,获取签名信息'
  }
}
