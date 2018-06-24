<template>
  <div>
    <div class="arrow-up" :style="{ left }" v-if="visible"></div>
    <transition @enter="enter" @leave="leave" :css="false">
      <ul class="select-list" v-if="visible">
        <li
          :key="item.id"
          :class="{ active: selected === item.id }"
          v-for="item in options"
          @click="selectHandler(item)"
        >{{ item.text }}<span class="iconfont icon-gou"></span></li>
      </ul>
    </transition>
    <transition name="fade">
      <div class="select-mask" v-if="visible"></div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['value', 'options', 'left'],
  data () {
    return {
      visible: false,
      selected: this.value
    }
  },
  methods: {
    selectHandler (item) {
      this.selected = item.id
      this.visible = false
      this.$emit('input', item.id)
      this.$emit('on-name', item.text)
    },
    enter (el, done) {
      window.Velocity(el, 'slideDown', { duration: 300 }, { complete: done })
    },
    leave (el, done) {
      window.Velocity(el, 'slideUp', { duration: 300 }, { complete: done })
    }
  },
  watch: {
    value (val) {
      this.selected = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '../lib.less';
.arrow-up {
  z-index: 101;
  position: absolute;
  top: 38px;
  left: 50%;
}
.select-list {
  z-index: 100;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  padding: 0 12px;
  color: #999;
  background-color: white;
  li {
    height: 39px;
    line-height: 39px;
    .border-bottom;
  }
  .active {
    color: #cc151c;
  }
  .icon-gou {
    float: right;
  }
}
.select-mask {
  z-index: 99;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.5);
}
</style>

