<template>
  <div class="result-page">
    <div class="face-wrapper">
      <img src="../assets/face.png" alt="face">
    </div>
    <div class="result-desc">恭喜您下单成功</div>
    <div class="btn-wrapper">
      <router-link class="btn btn-primary" :to="`/package/${ $route.params.id }`" v-if="$route.query.isPkg">立即学习</router-link>
      <router-link class="btn btn-primary" :to="`/course/${ $route.params.id }`" v-else>立即学习</router-link>
      <router-link class="btn btn-primary-reverse" :to="{ path: `/course/${ $route.params.id }/order/detail`, query: { orderId: $route.query.orderId } }">查看订单详情</router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './lib.less';
.result-page {
  font-size: 18px;
  text-align: center;
}
.result-desc {
  margin: 30px 0 35px;
}
.face-wrapper {
  height: 95px;
  margin-top: 120px;
  font-size: 0;
  img {
    height: 100%;
  }
}
.btn-wrapper {
  width: 250px;
  margin: 0 auto;
  .btn {
    margin-bottom: 27px;
    display: block;
    height: 39px;
    line-height: 39px;
  }
  .btn-primary-reverse {
    border: 1px solid @base;
    color: @base;
  }
}
</style>
