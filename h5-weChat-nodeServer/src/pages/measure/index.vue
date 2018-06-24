<template>
  <div class="measure-index-page">
    <div class="measure-slogan"></div>
    <div class="row-wrapper">
      <div class="ace-logo"></div>
      <router-link class="intro-btn" to="measure/intro">测评介绍</router-link>
    </div>
    <div class="btn-wrapper">
      <router-link class="btn" to="/measure/form"><i class="iconfont icon-pen"></i>开始测试</router-link>
      <router-link class="btn" to="/measure/report"><i class="iconfont icon-search"></i>查看报告</router-link>
    </div>
  </div>
</template>

<script>
import updateShare from './updateShare'
export default {
  created() {
    updateShare()
  }
}
</script>


<style lang="less" scoped>
@import '../lib.less';
.measure-index-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/static/measure-bg.jpg') no-repeat center 100%;
  background-size: cover;
}
.measure-slogan {
  height: 240px;
  margin-top: 40px;
  background: url('/static/measure-slogan.png') no-repeat center;
  background-size: contain;
}
// logo 和 介绍
.row-wrapper {
  text-align: center;
  .ace-logo {
    display: inline-block;
    width: 80px;
    height: 37px;
    vertical-align: middle;
    background: url('../../assets/logo-white.png') no-repeat center;
    background-size: contain;
  }
  .intro-btn {
    display: inline-block;
    width: 115px;
    height: 38px;
    line-height: 36px;
    margin-left: 5px;
    border: 1px solid white;
    border-radius: 4px;
    vertical-align: middle;
    font-size: 20px;
    color: white;
  }
}
// 按钮
.btn-wrapper {
  .btn {
    display: block;
    margin: 36px auto;
    width: 280px;
    height: 45px;
    line-height: 45px;
    border-radius: 22.5px;
    box-shadow: 0 3px 4px rgba(153, 1, 0, 0.75);
    font-weight: bold;
    font-size: 24px;
    color: white;
    background: #f8c22e;
  }
  .iconfont {
    margin-right: 5px;
    font-weight: normal;
    font-size: 24px;
  }
}
</style>
