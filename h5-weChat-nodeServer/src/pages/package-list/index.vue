<template>
  <div>
    <ul class="course-list" v-infinite-scroll="requestData" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <courseCard link="/package/" :key="item.id" :course="item" v-for="item in list">
        <router-link class="btn btn-primary" slot="btn" :to="`/package/${item.id}`">查看</router-link>
      </courseCard>
    </ul>
    <p v-show="loading" class="infinite-loading">{{ msg }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      msg: '加载中...',
      sort: 1,
      pageNo: 1,
      list: []
    }
  },
  methods: {
    requestData () {
      this.loading = true
      this.$axios.post('/ace/coursePkg/flip', {
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
  }
}
</script>

<style lang="less" scoped>
@import '../lib.less';
.course-card {
  .border-bottom;
  .btn {
    width: 60px;
    height: 25px;
    line-height: 25px;
  }
}
</style>
