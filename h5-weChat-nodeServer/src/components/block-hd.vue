<template>
  <router-link class="block-hd" :to="to" v-if="to">
    <span class="block-title">{{ title }}</span>
    <div class="right-btn">更多<span class="iconfont icon-right"></span></div>
  </router-link>
  <div class="block-hd" v-else>
    <span class="block-title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ['title', 'to']
}
</script>

<style lang="less" scoped>
@import '../pages/lib.less';
.block-hd {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  .block-title {
    flex: 1;
    display: inline-block;
    padding-left: 6px;
    line-height: 1;
    border-left: 2px solid @base;
    font-size: 16px;
  }
  .right-btn {
    font-size: 14px;
    color: #999;
  }
  .icon-right {
    font-size: 12px;
  }
}
</style>
