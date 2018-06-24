<template>
  <div class="test-info">
    <blockHd title="测试统计" />
    <div class="test-stats">
      <div class="stats-row">
        <div><span class="orange">{{ totalCount }}</span>次</div>
        <div class="stats-name">累计测评次数</div>
      </div>
      <div class="stats-row">
        <div><span :style="bestScore | fmtScoreColor">{{ bestScore }}</span>分</div>
        <div class="stats-name">历史最佳成绩</div>
      </div>
    </div>
    <div class="division-row"></div>
    <blockHd title="历史记录" />
    <ul class="record-list" v-infinite-scroll="requestData" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="(item, index) in list" :key="item.id"
        @click="$router.push({ path: `/course/${$route.params.id}/test/result?staffPaperInExamId=${item.paperId}` })"
      >
        <div class="record-left-wrapper">
          <div>{{ index + 1 }}. 用时：{{ item | getDuration | fmtDuration }}</div>
          <div class="record-datetime">　 {{ item.createTime | fmtDatetime }}</div>
        </div>
        <div class="score"><span :style="item.totalScore | fmtScoreColor">{{ item.totalScore }}</span>分</div>
        <div><span class="iconfont icon-right"></span></div>
      </li>
    </ul>
    <p class="none-tip" v-if="!list.length">您目前还没有测评过</p>
    <p v-show="loading && list.length" class="infinite-loading">{{ msg }}</p>
    <router-link class="btn btn-primary btn-long" :to="$route.path + '/test'">开始测评</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      msg: '加载中...',
      pageNo: 1,
      bestScore: 0,
      totalCount: 0,
      list: []
    }
  },
  methods: {
    requestData () {
      this.loading = true
      this.$axios.post('/ace/course/exam/flipTestingLog', {
        courseId: this.$route.params.id,
        pageNo: this.pageNo
      }).then(data => {
        this.bestScore = data.bestScore
        this.totalCount = data.totalCount
        var listInfo = data.pageInfo && data.pageInfo.listInfo
        if (!listInfo || !listInfo.length) {
          this.msg = '没有更多了'
          return
        }
        this.pageNo++
        this.loading = false
        this.list = [...this.list, ...listInfo]
      }).catch(e => {})
    }
  },
  filters: {
    getDuration (item) {
      return ~~((item.submitTime - item.startTime) / 1000)
    }
  }
}
</script>


<style lang="less" scoped>
@import '../lib.less';
.test-info {
  padding-bottom: 50px;
}
.test-stats {
  display: flex;
  align-items: center;
  height: 110px;
  text-align: center;
  line-height: 1;
  font-size: 12px;
  .border-top;
}
.stats-row {
  flex: 1;
  span {
    font-size: 30px;
    font-weight: bold;
  }
  .orange {
    color: @orange;
  }
  .stats-name {
    margin-top: 10px;
    color: #999;
  }
}
.record-list {
  .border-bottom;
  li {
    display: flex;
    align-items: center;
    height: 62px;
    padding: 12px;
    .border-top;
  }
  .score {
    padding-right: 25px;
    font-size: 12px;
    span {
      font-size: 30px;
      font-weight: bold;
    }
  }
  .icon-right {
    color: #a1a1a1;
  }
}
.record-left-wrapper {
  flex: 1;
  .record-datetime {
    font-size: 10px;
    color: #999;
  }
}
.btn-long {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
