<template>
  <ul class="nav-list">
    <li @click="clickHandler(1)"><span class="title" :class="{ active: active == 1 }">{{ tabs[0] }}</span></li>
    <li v-if="showTesting" @click="clickHandler(2)"><span class="title" :class="{ active: active == 2 }">{{ tabs[1] }}</span></li>
    <li @click="clickHandler(3)"><span class="title" :class="{ active: active == 3 }">{{ tabs[2] }}</span></li>
  </ul>
</template>

<script>
import { MessageBox } from 'mint-ui'

export default {
  props: ['tabs', 'active', 'disable', 'showTesting'],
  methods: {
    clickHandler (tab) {
      if (tab === 2 && this.disable) {
        return MessageBox.alert('请先购买此课程')
      }
      this.$emit('update:active', tab)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../pages/lib.less';
.nav-list {
  display: flex;
  height: 49px;
  text-align: center;
  font-size: 16px;
  .border-top;
  li {
    position: relative;
    float: left;
    flex: 1;
    height: 100%;
    &:after {
      position: absolute;
      top: 50%;
      right: 0;
      display: block;
      content: '';
      width: 1px;
      height: 24px;
      background: #c9c9c9;
      transform: translateY(-50%);
    }
    &:last-child:after {
      display: none;
    }
  }
  .title {
    display: inline-block;
    height: 49px;
    line-height: 49px;
  }
  .active {
    color: @base;
    border-bottom: 1px solid @base;
  }
}
</style>
