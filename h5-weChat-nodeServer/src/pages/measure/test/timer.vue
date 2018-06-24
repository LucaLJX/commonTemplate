<template>
  <div class="timer-block">
    <div class="timer-board">倒计时
      <span class="val"><span>{{ ~~(min / 10) }}</span><span>{{ min % 10 }}</span></span>
      分
      <span class="val"><span>{{ ~~(s / 10) }}</span><span>{{ s % 10 }}</span></span>
      秒
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
// import { MessageBox } from 'mint-ui'

export default {
  data() {
    return {
      min: 0,
      s: 0
    }
  },
  computed: {
    ...mapState(['leftTime', 'staffPaperInExamId'])
  },
  methods: {
    ...mapMutations(['setLeftTime']),
    ...mapActions(['submitMeasure', 'emptyQuestion']),
    start() {
      this.timeId = setInterval(() => {
        this.setLeftTime(this.leftTime - 1)

        // 时间到
        if (this.leftTime <= 0) {
          clearInterval(this.timeId)
          // MessageBox.alert('测评时间到，请提交答案')
          // this.submitMeasure().then(() => {
          //   this.$router.replace('/measure/report')
          // })
        }
      }, 1000)
    }
  },
  watch: {
    leftTime(val, old) {
      if (!old) {
        // 从无到有开始计时
        this.start()
      }

      this.s = val % 60
      this.min = ~~(val / 60)
    }
  },
  beforeDestroy() {
    clearInterval(this.timeId)
    this.emptyQuestion()
  }
}
</script>

<style lang="less" scoped>
.timer-board {
  width: 160px;
  height: 44px;
  line-height: 44px;
  margin: auto;
  text-align: center;
  font-size: 10px;
  background: url('../../../assets/board.png');
  background-size: contain;
  .val {
    vertical-align: middle;
    color: #383838;
    span {
      display: inline-block;
      width: 12px;
      height: 20px;
      line-height: 20px;
      margin-left: 1px;
      border-radius: 2px;
      vertical-align: middle;
      font-size: 12px;
      color: white;
      background-color: #373737;
    }
  }
}
</style>
