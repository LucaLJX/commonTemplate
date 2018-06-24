<template>
  <div class="answer">
    <div class="exam-hd">
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
            alt="question 图片"
            v-src="question.stemImage"
            @click="preview(question.stemImage)">
        </div>
      </div>
    </div>
    <div class="exam-bd">
      <ul class="option-list">
        <myOption
          :key="item.id"
          :order="index"
          :content="item.content"
          :state="calcState(item)"
          v-for="(item, index) in choices"
        ></myOption>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { calcUrl } from '@/utils'
import myOption from '../test/core/exam-bd/option'

export default {
  props: ['question'],
  computed: {
    choices() {
      return Vue.filter('fmtChoices')(this.question)
    },
    choosedArr() {
      // 选了的答案数组
      if (!this.question.ansByStu) return []
      return this.question.ansByStu
        .split(',')
        .map(question => parseInt(question, 10))
    }
  },
  methods: {
    calcState(question) {
      if (question.isRight && this.choosedArr.indexOf(question.id) !== -1) {
        return 1 // 对
      }
      if (question.isRight && this.choosedArr.indexOf(question.id) === -1) {
        return 2 // 漏选
      }
      if (!question.isRight && this.choosedArr.indexOf(question.id) !== -1) {
        return -1 // 错
      }
      return 0 // 其他没选
    },
    preview(url) {
      url = calcUrl(url)
      window.wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    }
  },
  components: { myOption }
}
</script>

<style lang="less" scoped>
@import '../lib.less';
.exam-hd {
  .stem {
    line-height: 1.8;
    text-align: justify;
    span {
      margin-left: -0.5em;
      color: @base;
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
.exam-bd {
  margin-top: 10px;
}
</style>

