<template>
  <div class="muti-radio">
    <div class="radio-row" v-for="item in question.choices" :key="item.id">
      <div class="radio-list-title">{{ item.content }}</div>
      <ul class="radio-list">
        <li v-for="n in scoreArr" :key="n" @click="handleClick(item.id, n)">
          <span class="radio-box" :class="{ 'active-radio': multi[item.id] === n }"></span>{{ n }}分
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object
    },
    value: {
      type: Array
    }
  },
  data() {
    return {
      multi: this.value
    }
  },
  computed: {
    scoreArr() {
      const arr = []
      for (let i = 0; i <= this.question.maxScore; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  methods: {
    handleClick(id, n) {
      if (!this.multi.length) {
        this.multi = new Array(this.question.choices.length)
      }
      this.$set(this.multi, id, n)
    }
  },
  watch: {
    value(newV) {
      this.multi = newV
    },
    multi(newV) {
      this.$emit('input', newV)
    }
  }
}
</script>

<style lang="less" scoped>
@green: #5ac74e;
.radio-row {
  margin-bottom: 10px;
  .radio-list {
    display: flex;
    justify-content: space-between;
    li {
      display: inline-block;
    }
    .radio-box {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 2px;
      border: 1px solid #e1e1e1;
      border-radius: 50%;
      vertical-align: middle;
    }
    .active-radio {
      position: relative;
      border-color: @green;
      &:before {
        content: ' ';
        width: 8px;
        height: 8px;
        position: absolute;
        top: 2px;
        left: 2px;
        border-radius: 50%;
        background: @green;
      }
    }
  }
}
</style>
