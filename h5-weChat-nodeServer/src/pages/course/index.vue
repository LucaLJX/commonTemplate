<template>
  <div>
    <div class="video-container">
      <video id="courseDetailVideoContainer" controls="controls" v-poster="wantToLearn.thumbnail || '/static/poster.png'" v-if="wantToLearn.path">
        <source v-src="wantToLearn.path" type="video/mp4"></source>
      </video>
      <img class="default-img" src="/static/poster.png" alt="default" v-else>
    </div>
    <navBar
      :tabs="['学习', '测评', '评价']"
      :disable="!data.alreadyPurchased"
      :active.sync="active"
      :showTesting="data.showTesting"
    />
    <div class="division-row"></div>
    <component :is="curView" :data="data" @play-video="playHandler"></component>
  </div>
</template>

<script>
import navBar from '@/components/nav-bar'
import learn from './learn'
import test from './test'
import evaluate from './evaluate'
import { MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      active: 1,
      data: {}
    }
  },
  computed: {
    curView () {
      if (this.active === 1) return 'learn'
      if (this.active === 2) return 'test'
      return 'evaluate'
    },
    wantToLearn () { return this.data.wantToLearn || {} }
  },
  methods: {
    requestDetail (aceCourseHasDocumentationId) {
      var courseId = this.$route.params.id
      this.$axios.post('/ace/course/detail', {
        aceCourseHasDocumentationId,
        courseId: this.$route.params.id
      }).then(data => {
        this.data = data
        setTimeout(() => { this.resetVideo() })

        function updateShareInfo2 (detailTitle, id) {
          console.log('share course, title: ' + detailTitle)
          var shareLink = 'http://app.aceoffer.cn/wechat/dashboard?sub=course/' + id + '#/course/' + id
          var shareTitle = 'ACE 在线学堂'
          if (detailTitle) {
            shareTitle = shareTitle + '--' + detailTitle
          }
          var shareObj = {
            title: shareTitle,
            desc: '超过200门在线课程，涵盖求职技能、行业知识、综合素质提升等方方面面',
            link: shareLink,
            imgUrl: location.origin + '/static/logo-small.png',
            success: function () { MessageBox.alert('分享成功') }
          }
          window.wx.onMenuShareTimeline(shareObj)
          window.wx.onMenuShareAppMessage(shareObj)
        }
        updateShareInfo2(data.course.title, courseId)
        window.wx.ready(() => {
          updateShareInfo2(data.course.title, courseId)
        })
      }).catch(e => {})
    },
    playHandler (aceCourseHasDocumentationId) {
      this.requestDetail(aceCourseHasDocumentationId)
      window.Velocity(document.body, 'scroll', { duration: 300 })
    },
    resetVideo () {
      var video = document.getElementById('courseDetailVideoContainer')
      video.pause()
      video.currentTime = 0
      video.load()
    }
  },
  watch: {
    $route () {
      this.requestDetail(null)
    }
  },
  created () {
    this.requestDetail(null)
  },
  components: { navBar, learn, test, evaluate }
}
</script>

<style lang="less" scoped>
.video-container {
  position: relative;
  height: 0;
  padding-top: 44%;
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .default-img {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
  }
}
</style>
