import { MessageBox } from 'mint-ui'

function updateShareInfo2() {
  var shareObj = {
    title: '大学生行业匹配度测评',
    desc: '大学生行业匹配度测评',
    link: 'http://app.aceoffer.cn/wechat/dashboard?sub=measure#/measure',
    imgUrl: location.origin + '/static/logo-small.png',
    success: function() {
      MessageBox.alert('分享成功')
    }
  }
  window.wx.onMenuShareTimeline(shareObj)
  window.wx.onMenuShareAppMessage(shareObj)
}

export default function updateShare() {
  updateShareInfo2()
  window.wx.ready(() => {
    updateShareInfo2()
  })
}
