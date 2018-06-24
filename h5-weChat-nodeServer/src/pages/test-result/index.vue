<template>
  <div class="result-page">
    <blockHd title="测试结果" />
    <div class="result-list">
      <div class="result-item grade-item">
        <div class="title">考试成绩</div>
        <div class="pull-right">
          <span :style="data.totalScore | fmtScoreColor">{{ data.totalScore }}</span>分
        </div>
    </div>
      <div class="result-item case-item">
        <div class="title">答题情况</div>
        <div class="pull-right">
          <span class="iconfont icon-gou-o"></span><span>{{ data.rightCnt }}</span>
          <span class="vertical-line"></span>
          <span class="iconfont icon-wrong-o"></span><span>{{ data.errorCnt }}</span>
        </div>
    </div>
      <div class="result-item cost-item">
        <div class="title">答题用时</div>
        <div class="pull-right">
          <span class="iconfont icon-clock-o"></span>{{ data.costTime | fmtDuration }}
        </div>
      </div>
    </div>
    <div class="division-row"></div>
    <blockHd title="试题解析" />
    <div class="answer-list">
      <div class="answer-item" v-for="(item, index) in questions">
        <span class="question-number">{{ `${index + 1}/${questions.length}` }}</span>
        <answer :question="item"></answer>
      </div>
    </div>
  </div>
</template>

<script>
import answer from './answer'

export default {
  data () {
    return {
      data: {}
    }
  },
  computed: {
    questions () {
      var arr = []
      var obj = this.data.questions || {}
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          arr = [...arr, ...(obj[key].questions || [])]
        }
      }
      return arr
    }
  },
  created () {
    this.$axios.post('/simpleExam/viewFullPaperWithMarkingInfo', {
      staffPaperInExamId: this.$route.query.staffPaperInExamId
    }).then(data => {
      this.data = data
    })
  },
  components: { answer }
}
</script>


<style lang="less" scoped>
@import '../lib.less';
.result-page {
  padding-bottom: 20px;
  .block-hd {
    .border-bottom;
  }
}
.result-list {
  padding: 0 12px;
  .result-item {
    display: flex;
    align-items: center;
    height: 50px;
    .border-bottom;
    &:last-child:after {
      display: none;
    }
  }
  .title {
    flex: 1;
  }
}
.grade-item {
  span {
    font-size: 30px;
    font-weight: bold;
  }
}
.case-item {
  .iconfont {
    margin-right: 6px;
    vertical-align: middle;
    font-size: 18px;
  }
  .vertical-line {
    position: relative;
    top: 5px;
    display: inline-block;
    width: 1px;
    height: 21px;
    margin: 0 10px;
    background-color: @borderColor;
  }
  .icon-gou-o {
    color: @green;
  }
  .icon-wrong-o {
    color: @base;
  }
}
.cost-item {
  .iconfont {
    margin-right: 6px;
    vertical-align: middle;
    font-size: 18px;
    color: #999;
  }
}
.answer-list {
  margin: 0 18px 0 25px;
  .answer-item {
    position: relative;
    margin-top: 15px;
    .question-number {
      position: absolute;
      top: 0;
      left: 0;
      line-height: 1.8;
    }
    .answer {
      margin-left: 32px;
    }
  }
}
</style>
