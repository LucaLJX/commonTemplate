<template>
  <div class="filter-bar">
    <div class="filter-list">
      <div class="filter-item">
        <div class="filter-name right-border" @click="dropDown('select')">{{ subject.text }} <span class="iconfont icon-down"></span></div>
        <mySelect ref="select" :options="subjects" left="13%" @on-name="subject.text = $event" v-model="subject.id" />
      </div>
      <div class="filter-item">
        <div class="filter-name right-border" @click="dropDown('cascader')">分类 <span class="iconfont icon-down"></span></div>
        <cascader ref="cascader" :subjectid="subject.id" @change-code="code=$event" />
      </div>
      <div class="filter-item">
        <div class="filter-name" @click="dropDown('sort')">{{ sort.text }} <span class="iconfont icon-down"></span></div>
        <mySelect ref="sort" :options="sorts" left="79.5%" @on-name="sort.text = $event" v-model="sort.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { subjects, sorts } from '@/utils/dict'
import mySelect from './select'
import cascader from './cascader'

export default {
  props: ['type'],
  data () {
    return {
      subjects,
      sorts,
      subject: { ...subjects.find(item => item.id === this.type) },
      code: null,
      sort: { ...sorts[0] }
    }
  },
  methods: {
    dropDown (name) {  // 切换下拉菜单
      var state = this.$refs[name].visible
      this.$refs.select.visible = false
      this.$refs.cascader.visible = false
      this.$refs.sort.visible = false
      this.$refs[name].visible = !state
    }
  },
  watch: {
    'subject.id' (val) {
      this.sort = { ...sorts[0] }
      this.code = null
      this.$emit('change-filter', val, null, null)
    },
    code (val) {
      this.sort = { ...sorts[0] }
      this.$emit('change-filter', this.subject.id, val, null)
    },
    'sort.id' (val) {
      this.$emit('change-filter', this.subject.id, this.code, val)
    }
  },
  components: { mySelect, cascader }
}
</script>


<style lang="less" scoped>
@import '../lib.less';
.filter-list {
  z-index: 99;
  position: fixed!important;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  background-color: white;
  .border-bottom;
  .icon-down {
    vertical-align: middle;
  }
  .filter-item {
    float: left;
    width: 33.333%;
    line-height: 44px;
  }
  .filter-name {
    text-align: center;
  }
}
.right-border {
  position: relative;
  &:after {
    position: absolute;
    top: 8px;
    bottom: 8px;
    right: 0;
    width: 1px;
    display: block;
    content: '';
    background-color: #c9c9c9;
    transform: scaleX(.5);
  }
}

</style>
