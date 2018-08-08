// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI, { Indicator } from 'mint-ui'
import 'mint-ui/lib/style.css'
import './install'
import './assets/font/iconfont.css'

Vue.use(MintUI)

Vue.config.productionTip = false

router.beforeEach(function(to, from, next) {
  Indicator.open()

  console.log('to.meta');
  console.log(to);
  // 修改页面 title
  document.title = to.meta.title || 'test title'

  // 不需要绑定手机号
  if (!to.meta.requireBind) {
    return next()
  }

  // 需要绑定手机号
  store.dispatch('getUser').then(user => {
    if (user && user.phoneNum) {
      return next()
    }
    next('/bind')
  })
})
router.afterEach(function(to, from) {
  setTimeout(() => {
    Indicator.close()
  }, 300)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

document.addEventListener(
  'DOMContentLoaded',
  () => {
    window.FastClick.attach(document.body)
  },
  false
)
