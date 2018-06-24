<template>
  <div class="test-info-page">
    <div class="exam-box">
      <div class="exam-box-hd">
        <h3 class="hd-title">考试说明</h3>
        <div class="hd-content">模拟考试模式下，必须一次性完成所有题目，才能得到成绩和分数。</div>
      </div>
      <div class="exam-box-bd">
        <div class="test-detail" v-if="info.questionCnt >= 0">
          题数：{{ info.questionCnt }}题　|　时间：{{ Math.floor(info.examDuration / 60) }}分钟
        </div>
        <div class="test-detail" v-else>
          时间：{{ Math.floor(info.examDuration / 60) }}分钟
        </div>
        <div class="test-warm">祝您顺利 !</div>
        <div class="btn-wrap">
          <router-link class="test-start-btn" :to="`/exam/${$route.params.id}/test`">开始测试</router-link>
        </div>
        <div class="test-other" v-if="info.totalPeople >= 0">已有<span>{{ info.totalPeople }}</span>人参与</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.$axios
      .post('/ace/course/detail4CourseOfType55', {
        courseId: this.$route.params.id
      })
      .then(data => {
        this.info = data
      })
  }
}
</script>

<style lang="less" scoped>
@import '../lib.less';
.exam-box {
  overflow: hidden;
  margin: 62px 32px 40px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  &-hd {
    overflow: hidden;
    height: 208px;
    color: white;
    background: #2a3a4a;
  }
  &-bd {
    overflow: hidden;
    height: 240px;
    text-align: center;
  }
}
.hd-title {
  margin-top: 28px;
  text-align: center;
  font-size: 24px;
}
.hd-content {
  margin: 12px 38px 0;
  line-height: 1.8;
  text-align: justify;
  font-size: 18px;
}
.test-detail {
  margin-top: 30px;
  font-size: 16px;
}
.test-warm {
  margin-top: 10px;
  color: #6a6a6a;
}
.btn-wrap {
  margin-top: 58px;
  text-align: center;
  .test-start-btn {
    display: inline-block;
    width: 130px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    font-size: 16px;
    color: white;
    background: @base;
  }
}
.test-other {
  margin-top: 18px;
  color: #6a6a6a;
  span {
    color: @base;
  }
}
</style>
