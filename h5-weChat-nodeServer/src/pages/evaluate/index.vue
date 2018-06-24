<template>
  <div>
    <course-card :course="course"></course-card>
    <div class="division-row"></div>
    <block-hd title="课程评价"></block-hd>
    <div class="main">
      <div class="score-wrapper">
        <div class="name">综合评价</div>
        <div class="score">
          <template v-for="n in 5" @click="level = n">
            <span class="iconfont icon-star" v-if="n <= level" @click="level = n"></span>
            <span class="iconfont icon-star-0" v-else @click="level = n"></span>
          </template>
        </div>
      </div>
      <div class="level">评价结果：{{ levelName }}</div>
      <div class="content">
        <textarea class="textarea" placeholder="点击“此处”输入评论内容，点击“提交”即可" v-model.trim="content"></textarea>
      </div>
      <div class="btn-wrapper">
        <button class="btn btn-primary btn-block" @click="submit">提交</button>
      </div>
      <div class="label-wrapper">
        <div class="title">
          <span class="iconfont icon-heart"></span> 印象标签
        </div>
        <ul class="label-list">
          <li 
            class="label-item" 
            :class="{ active: content.indexOf(item) >= 0 }"
            v-for="item in evaluates"
            @click="toggleLabel(item)"
          >{{ item }} <span class="iconfont icon-zan"></span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { levelDict, evaluates } from '@/utils/dict'

export default {
  data () {
    return {
      course: {},
      evaluates,
      level: 5,
      content: ''
    }
  },
  computed: {
    levelName () {
      return levelDict[this.level - 1]
    }
  },
  methods: {
    submit () {
      if (!this.content) {
        MessageBox.alert('请输入评价内容')
        return
      }
      this.$axios.post('/ace/course/comment4PurchasedCourse', {
        courseId: this.$route.params.id,
        score: 50 + this.level * 10,
        content: this.content
      }).then(res => {
        this.content = ''
        this.level = 5
        MessageBox.alert('提交成功')
      }).catch(e => {})
    },
    toggleLabel (key) {
      var tag = key + '，'
      if (this.content.indexOf(tag) === -1) {
        this.content += tag
        return
      }
      this.content = this.content.replace(new RegExp(tag, 'g'), '')
    }
  },
  created () {
    this.$axios.post('/ace/course/detail', {
      courseId: this.$route.params.id
    }).then(res => {
      this.course = res.course
    }).catch(e => {})
  }
}
</script>

<style lang="less" scoped>
@import '../lib.less';
.main {
  padding: 0 12px 30px;
  .border-top;
}
.score-wrapper {
  display: flex;
  align-items: center;
  padding-top: 5px;
  .name {
    color: #666;
  }
  .score {
    margin-left: 15px;
  }
  .iconfont {
    margin: 0 6px;
    font-size: 24px;
  }
  .icon-star {
    color: @yellow;
  }
  .icon-star-0 {
    color: #cdcdd1;
  }
}
.level {
  color: #666;
}
.content {
  margin-top: 16px;
  .textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    resize: none;
    background: #eee;
  }
}
.btn-wrapper {
  margin-top: 18px;
  .btn {
    width: 250px;
    margin: 0 auto;
  }
}
.label-wrapper {
  margin-top: 30px;
  .title {
    color: #999;
    .iconfont {
      font-size: 12px;
      color: #ff7373;
    }
  }
}
.label-list {
  margin-left: 18px;
  text-align: center;
  color: #7d7d7d;
  .iconfont {
    color: #cdcdd1;
  }
  .label-item {
    display: inline-block;
    height: 25px;
    line-height: 23px;
    margin-top: 15px;
    margin-right: 18px;
    padding: 0 1em;
    border-radius: 12px;
    border: 1px solid @borderColor;
  }
  .active {
    color: @base;
    border-color: @base;
    .iconfont {
      color: @base;
    }
  }
}
</style>
