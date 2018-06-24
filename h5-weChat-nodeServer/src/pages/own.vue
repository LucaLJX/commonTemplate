<template>
  <div v-infinite-scroll="requestData" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <div v-for="item in list">
      <div class="division-row"></div>
      <courseCard :key="item.id" :course="item">
        <div style="flex: 1;"></div>
        <button class="btn btn-gray-reverse" slot="btn" @click.stop v-if="item.commented">已评价</button>
        <button class="btn btn-primary-reverse" slot="btn" @click.stop="$router.push(`/course/${item.id}/evaluate`)" v-else>去评价</button>
      </courseCard>
    </div>
    <p class="none-tip" v-if="!list.length">您还没有购买过课程</p>
    <p v-show="loading && list.length" class="infinite-loading">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      msg: '加载中...',
      pageNo: 1,
      list: []
    }
  },
  methods: {
    requestData () {
      this.loading = true
      this.$axios.post('/personal/flipAlreadyPurchasedCourse', {
        pageNo: this.pageNo
      }).then(data => {
        if (!data.listInfo || !data.listInfo.length) {
          this.msg = '没有更多了'
          return
        }
        this.pageNo++
        this.loading = false
        this.list = [...this.list, ...data.listInfo]
      }).catch(e => {})
    }
  },
  mounted () {
    document.body.className = 'gray-body'
  },
  beforeDestroy () {
    document.body.className = ''
  }
}
</script>

<style lang="less" scoped>
.btn {
  width: 75px;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
}
</style>
