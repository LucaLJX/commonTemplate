<template>
  <div class="exam-result">
    <div class="result-board">
      <div class="answer-count">
        答对<span class="answer-count-right">{{ data.rightCnt }}</span>题
        <span class="answer-count-division">|</span>
        答错<span class="answer-count-false">{{ data.errorCnt }}</span>题
      </div>
      <div class="answer-time">
        <i class="icon icon-myclock"></i>{{ data.costTime | fmtDuration }}
      </div>
    </div>

    <div class="btn-wrap">
      <router-link class="btn btn-block btn-red" :to="$route.fullPath.replace('result', 'answer')">查看答案</router-link>
    </div>

    <div class="warm-box">
      <div class="warm-hd"></div>
      <ol class="warm-list">
        <li>模拟考试，总分100分；</li>
        <li>模拟考试下，必须一次性完成所有题目，才能得到成绩和分数。</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        rightCnt: 0,
        errorCnt: 0
      }
    }
  },
  methods: {
    requestResult() {
      this.$axios
        .post('/simpleExam/viewFullPaperWithMarkingInfo', {
          staffPaperInExamId: this.$route.query.staffPaperInExamId
        })
        .then(data => {
          this.data = data
        })
    }
  },
  created() {
    this.requestResult()
  }
}
</script>

<style lang="less" scoped>
.result-board {
  overflow: hidden;
  width: 281px;
  height: 206px;
  margin: 62px auto 0;
  text-align: center;
  font-size: 16px;
  color: white;
  background: url('../../assets/blackboard.png') no-repeat center;
  background-size: contain;
}

.answer-count {
  margin-top: 33px;
  vertical-align: middle;
  &-right,
  &-false {
    vertical-align: middle;
    margin: 0 6px;
    font-size: 24px;
    font-weight: bold;
  }
  &-right {
    color: #5ac84f;
  }
  &-false {
    color: #ff5f63;
  }
  &-division {
    margin: 0 12px;
  }
}

.answer-time {
  margin-top: 10px;
  .icon-myclock {
    margin-top: -4px;
    width: 23px;
    height: 23px;
    margin-right: 8px;
    background-image: url('../../assets/icon/clock.png');
  }
}

.btn-wrap {
  margin-top: 36px;
  .btn {
    width: 250px;
    margin: 0 auto;
  }
}

.warm-hd {
  width: 324px;
  height: 14px;
  margin: 40px auto 0;
  background: url('../../assets/warm-hd.png') no-repeat center;
  background-size: contain;
}

.warm-list {
  margin: 10px 25px;
  padding-left: 15px;
  line-height: 2;
  font-size: 12px;
  li {
    padding-left: 5px;
    list-style: decimal;
  }
}
</style>
