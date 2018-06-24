<template>
  <div>
    <div class="block-order" v-for="(item, index) in [1,2,3]">
      <div class="division-row" v-if="index"></div>
      <div class="block-title">商品信息<span class="order-status success">交易成功</span></div>
      <courseCard></courseCard>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    document.body.className = 'gray-body'
  },
  beforeDestroy () {
    document.body.className = ''
  }
}
</script>

<style lang="less" scoped>
@import './lib.less';
.block-order {
  background-color: white;
}
.block-title {
  height: 39px;
  line-height: 39px;
  padding: 0 12px;
  font-size: 16px;
}
.course-card {
  .border-top
}
.order-status {
  float: right;
  font-size: 12px;
}
.success {
  color: @base;
}
.fail {
  color: #999;
}
</style>

