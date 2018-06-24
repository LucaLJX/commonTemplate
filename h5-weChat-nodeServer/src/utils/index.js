// var fileBase = process.env.NODE_ENV === 'production' ? 'http://nfs-src.aceoffer.cn' : 'http://nfs-src.aceoffer.cn'
var fileBase = 'http://nfs-src.aceoffer.cn'

export const phoneNumReg = /^1[3|4|5|7|8]\d{9}$|^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/

export const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/

export function calcUrl(token) {
  if (!token) {
    return 'about:blank'
  }
  if (token && token.indexOf('EZ-NFS') === 0) {
    return `${fileBase}/receive/${token}`
  }
  return token
}

export function formatAnswers(choices) {
  var answers = {}
  for (var key in choices) {
    if (choices.hasOwnProperty(key)) {
      answers[key] = choices[key].join(',')
    }
  }
  return answers
}

export default {
  fileBase,
  calcUrl,
  formatAnswers
}
