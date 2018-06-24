<template>
  <div class="exam-ft">
    <div class="info-wrapper"><span>{{ qno  + 1 }}/{{ qnum }}</span></div>
    <div class="btn-wrapper">
      <button class="btn btn-orange" v-if="qno > 0" @click="prevHandler">上一题</button>
      <button class="btn btn-primary" v-if="qno < qnum - 1" @click="nextHandler">下一题</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    qno: {
      type: Number
    },
    qnum: {
      type: Number
    }
  },
  methods: {
    prevHandler() {
      if (this.qno > 0) {
        this.$emit('update:qno', this.qno - 1)
      }
    },
    nextHandler() {
      if (this.qno < this.qnum - 1) {
        this.$emit('update:qno', this.qno + 1)
      }
    }
  }
}
</script>


<style lang="less" scoped>
@import '../../lib.less';
.exam-ft {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  background: white;
  .info-wrapper {
    float: left;
    display: flex;
    align-items: center;
    width: 55%;
    height: 100%;
    padding-left: 25px;
    font-size: 12px;
    color: #666;
    .border-top;
  }
  .btn-wrapper {
    float: left;
    display: flex;
    width: 45%;
    .btn {
      flex: 1;
      border-radius: 0;
      height: 49px;
    }
  }
}
</style>
