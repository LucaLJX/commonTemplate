function fmtScoreColor(score) {
  if (score >= 90) return { color: '#5ac74e' }
  if (score >= 60) return { color: '#1ec3e1' }
  return { color: '#ff3c38' }
}

/**
 * 生成题目类型名字
 */

function fmtTypeName(val) {
  if (val === 1) return '【单选题】'
  if (val === 2) return '【多选题】'
  if (val === 3) return '【判断题】'
  if (val === 12) return '【填空题】'
  return ' '
}

/**
 * 生成答案选项
 */
export function fmtChoices(item) {
  if (item.questionType !== 3) {
    return item.choices
  }
  return [
    {
      id: 1,
      content: '正确',
      isRight: item.judgmentAnswer
    },
    {
      id: -1,
      content: '错误',
      isRight: !item.judgmentAnswer
    }
  ]
}

/**
 * 生成选项序号
 */

function fmtLetter(val) {
  if (val === undefined) return ''
  return String.fromCharCode(65 + val)
}

/**
 * 生成价格格式
 */

function fmtPrice(val = 0) {
  var yuan = val / 100
  return ~~yuan === yuan ? yuan : yuan.toFixed(2)
}

/**
 * 生成时长
 */

function fmtDuration(val) {
  val = val || 0
  var s = val % 60
  var min = ~~(val / 60)
  return `${min}分${s}秒`
}

function fmtDatetime(val, str = 'YYYY-MM-DD HH时mm分ss秒') {
  if (!val) return ''
  return window.moment(val).format(str)
}

export default {
  fmtScoreColor,
  fmtTypeName,
  fmtChoices,
  fmtLetter,
  fmtPrice,
  fmtDuration,
  fmtDatetime
}
