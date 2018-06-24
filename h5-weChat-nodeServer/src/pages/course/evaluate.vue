<template>
  <div>
    <div class="header-wrapper">
      <blockHd title="综合评价"></blockHd>
      <score :score="data.avg_score" />
    </div>
    <div class="count-list">
      <div class="count-item" :class="{ active: active === 1 }" @click="active = 1">
        <div>全部评价</div>
        <div>{{ allCount }}</div>
      </div>
      <div class="count-item" :class="{ active: active === 2 }" @click="active = 2">
        <div>好评</div>
        <div>{{ data.good_cnt || 0 }}</div>
      </div>
      <div class="count-item" :class="{ active: active === 3 }" @click="active = 3">
        <div>中评</div>
        <div>{{ data.middle_cnt || 0 }}</div>
      </div>
      <div class="count-item" :class="{ active: active === 4 }" @click="active = 4">
        <div>差评</div>
        <div>{{ data.bad_cnt || 0 }}</div>
      </div>
    </div>
    <div class="division-row"></div>
    <ul class="evaluate-list" v-infinite-scroll="requestData" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li class="evaluate-item" v-for="item in list">
        <div class="left-wrapper">
          <div class="avatar" v-bg="item.staffAvatar"></div>
        </div>
        <div class="right-wrapper">
          <div class="user-name">{{ item.staffName }}</div>
          <score :score="item.scoreAvg" />
          <div class="content">{{ item.content }}</div>
          <div class="date-time">{{ item.createTime | fmtDatetime('YYYY/MM/DD HH:mm:ss') }}</div>
        </div>
      </li>
    </ul>
    <p class="none-tip" v-if="!list.length">目前还没有人评论</p>
    <p v-show="loading && list.length" class="infinite-loading">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 1,
      loading: false,
      msg: '加载中...',
      pageNo: 1,
      list: [],
      data: {}
    }
  },
  computed: {
    allCount () {
      var count = this.data.good_cnt + this.data.middle_cnt + this.data.bad_cnt
      return count || 0
    }
  },
  methods: {
    requestData () {
      this.loading = true
      this.$axios.post('/ace/course/flipComments4Course', {
        courseId: this.$route.params.id,
        type: this.active,
        pageNo: this.pageNo
      }).then(data => {
        this.data = data
        var listInfo = data.commentPageInfo && data.commentPageInfo.listInfo
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
  watch: {
    active (val) {
      this.loading = false
      this.msg = '加载中...'
      this.pageNo = 1
      this.list = []
      this.requestData()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../lib.less';
.header-wrapper {
  position: relative;
  .score {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
  }
}
.count-list {
  display: flex;
  align-items: center;
  height: 53px;
  text-align: center;
  .border-top;
  .count-item {
    flex: 1;
  }
  .active {
    color: @base;
  }
}
.evaluate-item {
  display: flex;
  align-items: center;
  height: 108px;
  padding: 0 12px;
  .border-bottom;
  .left-wrapper {
    align-self: flex-start;
    width: 54px;
    margin-top: 12px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: no-repeat center;
    background-size: cover;
  }
}
.right-wrapper {
  flex: 1;
  .user-name {
    .textrow;
  }
  .score {
    font-size: 10px;
  }
  .content {
    font-size: 12px;
    color: #666;
    .textrow;
  }
  .date-time {
    font-size: 10px;
    color: #999;
  }
}
</style>
