<template>
  <div>
    <exam-hd :question="question" />
    <exam-bd :qno="qno" :question="question" />
    <exam-ft :qno.sync="qno" :qnum="qnum" />
  </div>
</template>

<script>
import examHd from './core/exam-hd'
import examBd from './core/exam-bd'
import examFt from './core/exam-ft'

export default {
  data() {
    return {
      questions: [],
      qno: 0,
      qnum: 0
    }
  },
  computed: {
    question() {
      return this.questions[this.qno] || {}
    }
  },
  methods: {
    requestResult() {
      this.$axios
        .post('/simpleExam/viewFullPaperWithMarkingInfo', {
          staffPaperInExamId: this.$route.query.staffPaperInExamId
        })
        .then(data => {
          this.questions = flattenQuestions(data.questions)
          this.qnum = this.questions.length
        })
    }
  },
  created() {
    this.requestResult()
  },
  components: { examHd, examBd, examFt }
}

/**
 * 整理返回的题目
 */
function flattenQuestions(obj) {
  return Object.keys(obj).reduce((a, b) => {
    return a.concat(obj[b].questions)
  }, [])
}
</script>
