<template>
  <div v-infinite-scroll="requestData" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <div v-for="item in list">
      <div class="division-row"></div>
      <courseCard :key="item.id" :course="item">
        <router-link class="btn btn-primary-reverse" slot="btn" :to="`/course/${item.aceCourseId}`">查看课程</router-link>
      </courseCard>
    </div>
        <p class="none-tip" v-if="!list.length">您还没有收藏过课程</p>
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
      this.$axios.post('personal/flipCollectedCourse', {
        pageNo: this.pageNo
      }).then(data => {
        if (!data.listInfo || !data.listInfo.length) {
          this.msg = '没有更多了'
          return
        }
        this.pageNo++
        this.loading = false
        // 用 aceCourseId 替换 id
        data.listInfo = data.listInfo.map(item => ({ ...item, ...{ id: item.aceCourseId } }))
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
