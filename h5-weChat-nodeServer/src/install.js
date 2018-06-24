import Vue from 'vue'
import { MessageBox } from 'mint-ui'
import filters from './filters'
import directives from './directives'
import './components/ajax'
import blockHd from './components/block-hd.vue'
import courseCard from './components/course-card.vue'
import navBar from './components/nav-bar.vue'
import score from './components/score.vue'

const components = {
  blockHd,
  courseCard,
  navBar,
  score
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

if (process.env.NODE_ENV !== 'production') {
  window.axios.get('/wechat').then(res => console.log('开发模式获取用户信息'))
}

Vue.prototype.$axios.post('/jsApiTicket', {
  url: location.href.split('#')[0]
}, { baseURL: '/user' }).then(config => {
  // config.debug = true
  config.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
  window.wx.config(config)
}).catch(e => {})

window.wx.ready(function () {
  var currentLocation = location.href
  var homeLocation = location.origin
  var shareLink = homeLocation
  if (currentLocation.indexOf('#/course/') >= 0 || currentLocation.indexOf('#/package/') >= 0) {
    return
  }
  var shareObj = {
    title: 'ACE 在线学堂',
    desc: '超过200门在线课程，涵盖求职技能、行业知识、综合素质提升等方方面面',
    link: shareLink,
    imgUrl: location.origin + '/static/logo-small.png',
    success: function () { MessageBox.alert('分享成功') }
  }
  window.wx.onMenuShareTimeline(shareObj)
  window.wx.onMenuShareAppMessage(shareObj)
})
