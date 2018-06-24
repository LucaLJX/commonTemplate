<template>
  <div class="score">
    <span class="iconfont icon-star" :class="{ active: n <= star }" v-for="n in 5"></span>
  </div>
</template>

<script>
export default {
  props: ['score'],
  computed: {
    star () {
      if (!this.score) return 0
      return this.score / 10 - 5
    }
  }
}
</script>

<style lang="less" scoped>
.score {
  color: #cdcdd1;
  .active {
    color: #fecb00;
  }
}
</style>
