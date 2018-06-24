import Vue from 'vue'
import Vuex from 'vuex'
import ajax from '@/components/ajax'
import { formatAnswers } from '@/utils'

Vue.use(Vuex)

const state = {
  user: null, // 保存用户信息 （带权限控制）
  questions: [], // 试题集
  index: 0, // 第几题
  ans: {}, // 已做试题答案
  leftTime: 0, // 剩余时间
  staffPaperInExamId: null // 考试 id
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setQuestions(state, questions) {
    state.questions = questions
  },
  setAns(state, ans) {
    state.ans = ans
  },
  assignAns(state, obj) {
    state.ans = Object.assign(state.ans, obj)
  },
  setLeftTime(state, leftTime) {
    state.leftTime = leftTime
  },
  setExamId(state, examId) {
    state.staffPaperInExamId = examId
  },
  resetIndex(state) {
    state.index = 0
  },
  next(state) {
    if (state.index < state.questions.length - 1) {
      state.index++
    }
  },
  prev(state) {
    if (state.index > 0) {
      state.index--
    }
  },
  // 职业测评用，选择学历后特殊处理
  nextMeasure(state) {
    if (state.index < state.questions.length - 1) {
      state.index++
      if (state.ans[2][0] === 1 && state.index === 3) {
        state.index++
      }
      if (state.ans[2][0] === 2 && state.index === 2) {
        state.index++
      }
    }
  },
  // 职业测评用，选择学历后特殊处理
  prevMeasure(state) {
    if (state.index > 0) {
      state.index--
      if (state.ans[2][0] === 1 && state.index === 3) {
        state.index--
      }
      if (state.ans[2][0] === 2 && state.index === 2) {
        state.index--
      }
    }
  }
}

const actions = {
  /**
   * 获取用户信息
   */

  getUser({ commit, state }) {
    return new Promise(resolve => {
      if (state.user) {
        return resolve(state.user)
      }
      ajax.json
        .post('/user/info', {}, { baseURL: '' })
        .then(user => {
          commit('setUser', user)
          resolve(user)
        })
        .catch(e => {})
    })
  },

  /**
   * 获取试题
   */

  async initQuestion({ commit }, { api, courseId }) {
    var obj
    try {
      obj = await ajax.form.post(api, { courseId })
    } catch (e) {
      obj = { questions: {} }
    }

    var questions = []
    var questionsObj = obj.questions || {}
    for (var key in questionsObj) {
      if (questionsObj.hasOwnProperty(key)) {
        questions = [...questions, ...questionsObj[key]]
      }
    }
    commit('setQuestions', questions)
    commit('setAns', obj.ans || {})
    commit('setLeftTime', obj.leftTime || 0)
    commit('setExamId', obj.staffPaperInExamId)
  },

  /**
   * 获取试题
   */

  putLocalQuestion({ commit }, obj) {
    const defaultAns = {}
    obj.questions.forEach(item => {
      defaultAns[item.id] = []
    })

    commit('setQuestions', obj.questions)
    commit('setAns', defaultAns)
    setTimeout(() => {
      commit('setLeftTime', obj.leftTime || 0)
    }, 100)
    commit('setExamId', obj.staffPaperInExamId)
  },

  /**
   * 清空试题
   */

  emptyQuestion({ commit }) {
    commit('resetIndex')
    commit('setQuestions', [])
    commit('setAns', {})
    commit('setLeftTime', 0)
    commit('setExamId', null)
  },

  /**
   * 提交答案
   */

  submitAns({ state }) {
    // json 参数的 axios
    return ajax.json.post('/simpleExam/submitAnswer4Testing', {
      staffPaperInExamId: state.staffPaperInExamId,
      ans: formatAnswers(state.ans)
    })
  },

  /**
   * 提交职业测评
   */
  submitMeasure({ state }) {
    const ans = dealAnswers(state.ans)
    const answerJson = formatAnswers(ans)
    // json 参数的 axios
    return ajax.json.post(
      '/ace/job_testing/submitTestingAnswerByJson',
      answerJson
    )
  }
}

/**
 * 处理 ans
 * 将职业测评中没有选择的选项处理为 0
 */
function dealAnswers(ans) {
  const map = {}
  for (let key in ans) {
    const arr = []
    for (let i = 0; i < ans[key].length; i++) {
      arr.push(ans[key][i] || 0)
    }
    map[key] = arr
  }
  return map
}

const getters = {
  question: state => {
    return state.questions[state.index] || {}
  },
  pos: state => state.index + 1,
  ans: state => state.ans
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
