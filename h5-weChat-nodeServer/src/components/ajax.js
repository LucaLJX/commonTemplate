import Vue from 'vue'
import Qs from 'qs'
import { Indicator, MessageBox } from 'mint-ui'

export var form = window.axios.create({
  timeout: 10000,
  baseURL: '/api',
  transformRequest: [data => {
    return Qs.stringify(data)
  }]
})
export var json = window.axios.create({
  timeout: 10000,
  baseURL: '/api'
})

// 添加请求拦截
function addIntercept (instance) {
  // 请求拦截
  instance.interceptors.request.use(config => {
    Indicator.open('请求中...')
    // alert()
    return config
  }, err => Promise.reject(err))

  // 响应拦截
  instance.interceptors.response.use(({ data }) => {
    Indicator.close()
    if (data.code === 200) {
      return data.data
    }

    // session 过期刷新页面
    if (data.message === 'ThreadContext中未存储该数据') {
      MessageBox.alert('请重新登录,即将前往首页').then(action => {
        location.href = '/wechat'
      })
      return
    }

    const message = data.message || `错误码：${data.code}`
    MessageBox.alert(message)
    return Promise.reject(message)
  }, err => {
    Indicator.close()
    MessageBox('请求错误', err.message)
    return Promise.reject(err.message)
  })
}

addIntercept(form)
addIntercept(json)
Vue.prototype.$axios = form

export default {
  form,
  json
}
