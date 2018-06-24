<template>
  <div>
    <exam-hd />
    <exam-bd />
    <exam-ft />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import examHd from './core/exam-hd'
import examBd from './core/exam-bd'
import examFt from './core/exam-ft'

const api = '/ace/course/exam/getPaper'

export default {
  data() {
    return {
      staffPaperInExamId: null,
      questions: []
    }
  },
  computed: {
    ...mapGetters(['pos'])
  },
  methods: {
    ...mapActions(['initQuestion']),
    getQuestion(route) {
      this.initQuestion({
        api,
        courseId: route.params.id
      })
    }
  },
  watch: {
    $route(route) {
      this.getQuestion(route)
    }
  },
  created() {
    this.getQuestion(this.$route)
  },
  components: { examHd, examBd, examFt }
}
</script>
