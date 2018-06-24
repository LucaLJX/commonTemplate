<template>
  <div>
    <exam-hd />
    <exam-bd />
    <exam-ft />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { measureObj } from './questions'
import examBd from '@/pages/test/core/exam-bd'
import examHd from './exam-hd'
import examFt from './exam-ft'
import updateShare from '../updateShare'

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
    ...mapActions(['putLocalQuestion']),
    getQuestion(route) {
      this.putLocalQuestion(measureObj)
    }
  },
  watch: {
    $route(route) {
      this.getQuestion(route)
    }
  },
  created() {
    this.getQuestion(this.$route)
    updateShare()
  },
  components: { examHd, examBd, examFt }
}
</script>

