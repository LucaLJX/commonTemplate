<template>
  <li class="option-item" :class="optionClasses">
    <div class="option-title"><span class="letter">{{ order | fmtLetter }}</span></div>
    <div class="option-content">{{ content }}</div>
  </li>
</template>

<script>
export default {
  props: ['order', 'content', 'state'],
  computed: {
    optionClasses() {
      switch (this.state) {
        case -1:
          return 'item-false'
        case 1:
          return 'item-true'
        case 2:
          return 'item-lack'
      }
      return null
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../lib.less';

.option-item {
  position: relative;
  min-height: 35px;
  padding: 7px 0 7px 25px;
  .option-title {
    position: absolute;
    top: 7px;
    left: 0;
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 50%;
    line-height: 19px;
    text-align: center;
  }
}
.item-lack {
  .option-title {
    border-color: @base;
    background: @base;
    .letter {
      color: white;
    }
  }
}
.item-true,
.item-false {
  .option-title {
    border: none;
    background: no-repeat center;
    background-size: contain;
    .letter {
      opacity: 0;
    }
  }
}
.item-true {
  .option-title {
    background-image: url('../../../../assets/icon/ok.png');
  }
}
.item-false {
  .option-title {
    background-image: url('../../../../assets/icon/no.png');
  }
}
</style>

