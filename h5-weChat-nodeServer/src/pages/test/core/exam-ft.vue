<template>
  <div class="exam-ft">
    <div class="info-wrapper"><span>{{ pos }}/{{ total }}</span></div>
    <div class="btn-wrapper">
      <button class="btn btn-orange" v-if="pos !== 1" @click="prevHandler">上一题</button>
      <button class="btn btn-primary" v-if="pos < total || !total" @click="nextHandler">下一题</button>
      <button class="btn btn-primary" v-else @click="submitHandler">提交答案</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { MessageBox } from 'mint-ui'

export default {
  computed: {
    ...mapGetters(['pos']),
    ...mapState({
      total: state => state.questions.length,
      staffPaperInExamId: state => state.staffPaperInExamId
    })
  },
  methods: {
    ...mapMutations(['next', 'prev']),
    ...mapActions(['submitAns']),
    prevHandler() {
      this.prev()
    },
    nextHandler() {
      this.next()
    },
    submitHandler() {
      MessageBox.confirm('确定提交答案?').then(action => {
        this.submitAns()
          .then(() => {
            this.$router.replace({
              path: `${this.$route.path}/result`,
              query: { staffPaperInExamId: this.staffPaperInExamId }
            })
          })
          .catch(e => {})
      })
    }
  }
}
</script>


<style lang="less" scoped>
@import '../../lib.less';
.exam-ft {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  background: white;
  .info-wrapper {
    float: left;
    display: flex;
    align-items: center;
    width: 55%;
    height: 100%;
    padding-left: 25px;
    font-size: 12px;
    color: #666;
    .border-top;
  }
  .btn-wrapper {
    float: left;
    display: flex;
    width: 45%;
    .btn {
      flex: 1;
      border-radius: 0;
      height: 49px;
    }
  }
}
</style>
