<template>
  <div class="input-wrap">
    <input
      class="input-text"
      type="text"
      placeholder="请输入内容"
      v-model.trim="currentValue"
      @focus="handleFocus"
      @input="handleInput"
    >
    <ul class="school-list" v-show="visible && schoolList.length">
      <li
        class="school-item"
        v-for="item in schoolList"
        :key="item.id"
        @click="handleSelect(item)"
      >{{ item.school }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array
    }
  },
  data() {
    return {
      visible: false,
      schoolList: [],
      currentValue: this.value[0],
      cancelToken: null // 丢弃之前请求，保证顺序
    }
  },
  watch: {
    value(newV) {
      this.currentValue = newV[0]
    },
    currentValue(newV) {
      this.$emit('input', [newV])
    }
  },
  methods: {
    fetchSchool(name) {
      const currentToken = ~~(Math.random() * 1000)
      this.cancelToken = currentToken

      // 发送搜索学校列表
      this.$axios
        .post('/ace/job_testing/getSchoolByName', { name })
        .then(data => {
          if (this.cancelToken === currentToken) {
            this.schoolList = data
          }
        })
        .catch(e => {})
    },
    handleInput(e) {
      const name = e.target.value.trim()

      // throttle 方法
      clearTimeout(this.timeID)
      this.timeID = setTimeout(() => {
        this.fetchSchool(name)
      }, 500)
    },
    handleFocus() {
      this.visible = true
      this.fetchSchool(this.currentValue || '')
    },
    handleSelect(item) {
      this.currentValue = item.school
      this.visible = false
    }
  }
}
</script>


<style lang="less" scoped>
@import '../../../lib.less';
.input-wrap {
  position: relative;
  margin-top: 20px;
  .input-text {
    width: 100%;
    line-height: 1.5;
    padding: 12px 8px;
    border: none;
    outline: none;
    border-radius: 5px;
    background: #eee;
  }
  .school-list {
    overflow-y: auto;
    z-index: 100;
    position: absolute;
    top: 48px;
    left: 0;
    right: 0;
    max-height: 200px;
    padding: 5px 0;
    border: 1px solid @borderColor;
    box-shadow: 0 0 5px #ddd;
    border-radius: 4px;
    background: white;
    .school-item {
      padding: 3px 10px;
    }
  }
}
</style>

