<template>
  <div class="exam-bd">
    <component
      :is="question.questionType | fmtOptionName"
      :choices="question | fmtChoices"
      :question="question"
      v-model="anArr"
    ></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import radio from './radio'
import checkbox from './checkbox'
import searchInput from './searchInput'
import multiRadio from './multiRadio'

export default {
  computed: {
    ...mapGetters(['question']),
    anArr: {
      get() {
        return this.$store.state.ans[this.question.id] || []
      },
      set(val) {
        var obj = {}
        obj[this.question.id] = val
        this.$store.commit('assignAns', obj)
      }
    }
  },
  components: {
    radio,
    checkbox,
    searchInput,
    multiRadio
  },
  filters: {
    fmtOptionName(val) {
      const map = {
        1: 'radio',
        2: 'checkbox',
        12: 'searchInput',
        10: 'multiRadio'
      }
      return map[val] || 'radio'
    }
  }
}
</script>

<style lang="less" scoped>
.exam-bd {
  min-height: 300px;
  margin: 20px 36px 60px;
}
</style>

