<template>
  <div class="exam-hd">
    <timer />
    <div class="stem">
      <div v-show="question.parentStem" style="margin-bottom: 5px;">
        <span>【Case】</span>{{ question.parentStem }}
      </div>
      <div class="image-wrap" v-if="question.parentStemImage">
        <img
          alt="case 图片"
          v-src="question.parentStemImage"
          @click="preview(question.parentStemImage)">
      </div>
      <div style="margin-top: 5px;">
        <span>{{ question.questionType | fmtTypeName }}</span>{{ question.stem }}
      </div>
      <div class="image-wrap" v-if="question.stemImage">
        <img
          alt="case 图片"
          v-src="question.stemImage"
          @click="preview(question.stemImage)">
      </div>
    </div>
  </div>
</template>

<script>
import { calcUrl } from '@/utils'
import timer from './timer'

export default {
  props: {
    question: {
      type: Object
    }
  },
  components: {
    timer
  },
  methods: {
    preview(url) {
      url = calcUrl(url)
      window.wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../lib.less';
.exam-hd {
  overflow: hidden;
  border-bottom: 8px solid green;
  border-image: url('../../../assets/border.png') 30 30;
}
.timer-block {
  margin: 20px 0;
}
.exam-hd {
  background-color: @base;
  .stem {
    margin: 0 25px 30px;
    line-height: 1.8;
    // text-align: justify;
    color: white;
    span {
      margin-left: -0.5em;
    }
  }
  .image-wrap {
    text-align: center;
    img {
      max-width: 80%;
      max-height: 256px;
    }
  }
}
</style>

