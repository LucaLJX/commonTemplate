<template>
  <div>
    <div class="arrow-up" v-if="visible"></div>
    <transition @enter="enter" @leave="leave" :css="false">
      <div class="select-wrapper" v-if="visible">
        <ul class="select-list list-level-1">
          <li
            :key="item.id"
            :class="{ active: level_1 === item.id }"
            v-for="item in typeOptions"
            @click="level_1 = item.id"
          >{{ item.title }}</li>
        </ul>
        <ul class="select-list list-level-2">
          <li
            :key="item.id"
            :class="{ active: level_2 === item.id }"
            v-for="item in subOptions"
            @click="selectHandler(item)"
          >{{ item.title }}</li>
        </ul>
      </div>
    </transition>
    <transition name="fade">
      <div class="select-mask" v-if="visible"></div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['subjectid'],
  data () {
    return {
      visible: false,
      typeOptions: [],  // 一级菜单
      level_1: null,
      level_2: null
    }
  },
  computed: {
    subOptions () {   // 二级菜单
      if (!this.typeOptions) {
        return null
      }
      for (let i = 0; i < this.typeOptions.length; i++) {
        if (this.typeOptions[i].id === this.level_1) {
          return [
            { id: this.level_1, title: '全部', code: this.typeOptions[i].code },
            ...(this.typeOptions[i].children || [])
          ]
        }
      }
    }
  },
  methods: {
    selectHandler (item) {
      this.level_2 = item.id
      this.visible = false
      this.$emit('change-code', item.code)
    },
    enter (el, done) {
      window.Velocity(el, 'slideDown', { duration: 300 }, { complete: done })
    },
    leave (el, done) {
      window.Velocity(el, 'slideUp', { duration: 300 }, { complete: done })
    },
    getTypeOptions (type) {
      this.$axios.post('/ace/course/getFilterInfoByType', { type }).then(data => {
        this.typeOptions = data[0].children
        if (this.typeOptions && this.typeOptions.length) {
          this.level_1 = this.typeOptions[0].id
        }
      })
    }
  },
  watch: {
    subjectid (val) {
      this.level_1 = null
      this.level_2 = null
      this.getTypeOptions(val)
    }
  },
  created () {
    this.getTypeOptions(this.subjectid)
  }
}
</script>

<style lang="less" scoped>
@import '../lib.less';
.arrow-up {
  z-index: 101;
  position: absolute;
  top: 38px;
  left: 46%;
}
.select-wrapper {
  z-index: 100;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
}
.list-level-1 {
  float: left;
  width: 33.333%;
  color: #999;
  background-color: white;
  .border-right;
  li {
    height: 39px;
    padding: 0 12px;
    line-height: 39px;
    background-color: #e5e5e5;
    .textrow;
  }
  .active {
    color: #cc151c;
    background-color: white;
  }
}
.list-level-2 {
  float: left;
  width: 66.667%;
  padding: 0 12px;
  color: #999;
  background-color: white;
  li {
    height: 39px;
    line-height: 39px;
    .border-bottom;
    .textrow;
  }
  .active {
    color: #cc151c;
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

