<template>
  <div>
    <div class="course-info">
      <h1 class="title">商品信息</h1>
      <courseCard :link="false" :course="data.goodsInfoList[0]"><span></span></courseCard>
    </div>
    <div class="division-row"></div>
    <ul class="price-list">
      <li>订单编号：{{ data.orderNum }}</li>
      <li>原　价：￥{{ data.totalOriginalPrice | fmtPrice }}</li>
      <li>已优惠：-￥{{ (data.totalOriginalPrice - data.totalPrice) | fmtPrice }}</li>
      <li>现　价：￥{{ data.totalPrice | fmtPrice }}</li>
      <li>实际付款金额：<span class="stress">￥{{ data.totalPrice | fmtPrice }}</span></li>
    </ul>
    <div class="btn-wrapper">
      <router-link class="btn btn-primary btn-block" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return { data: {} }
  },
  created () {
    this.$axios.post('/ace/order/getOrderDetail', {
      orderId: this.$route.query.orderId
    }).then(data => {
      this.data = data
    }).catch(e => {})
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
@import './lib.less';
.course-info {
  background-color: white;
  .title {
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    font-weight: normal;
    font-size: 16px;
  }
}
.price-list {
  padding: 8px 12px;
  font-size: 12px;
  background-color: white;
  li {
    height: 26px;
    line-height: 26px;
  }
  .stress {
    color: @base;
  }
}
.btn-wrapper {
  margin: 69px 25px 0;
}
</style>
