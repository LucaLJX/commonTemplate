<template>
  <div class="exam-bd">
    <ul class="option-list">
      <myOption
        :key="item.id"
        :order="index"
        :content="item.content"
        :state="calcState(item)"
        v-for="(item, index) in choices"
      ></myOption>
    </ul>
  </div>
</template>

<script>
import { fmtChoices } from '@/filters'
import myOption from './option.vue'

export default {
  props: {
    question: Object
  },
  computed: {
    choices() {
      return fmtChoices(this.question)
    },
    choosedArr() {
      // 选了的答案数组
      if (!this.question.ansByStu) return []
      return this.question.ansByStu
        .split(',')
        .map(question => parseInt(question, 10))
    }
  },
  methods: {
    calcState(question) {
      if (question.isRight && this.choosedArr.indexOf(question.id) !== -1) {
        return 1 // 对
      }
      if (question.isRight && this.choosedArr.indexOf(question.id) === -1) {
        return 2 // 漏选
      }
      if (!question.isRight && this.choosedArr.indexOf(question.id) !== -1) {
        return -1 // 错
      }
      return 0 // 其他没选
    }
  },
  components: { myOption }
}
</script>

<style lang="less" scoped>
.exam-bd {
  margin: 20px 36px 49px;
}
</style>

