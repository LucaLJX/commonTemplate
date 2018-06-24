<template>
  <div class="learn-info">
    <div class="banner" v-bg="course.bannerImg"></div>
    <div class="division-row"></div>
    <section class="course-intro">
      <h1>{{ course.title }}</h1>
      <p>{{ course.description }}</p>
      <div class="course-meta">
        <span>访问量：{{ course.visitNum }}</span>
      </div>
      <div class="course-ft">
        <div class="real-price">￥<span>{{ course.currentPrice | fmtPrice}}</span></div>
        <div class="original-price" v-if="course.originalPrice">原价: ￥<span>{{ course.originalPrice | fmtPrice}}</span></div>
      </div>
    </section>
    <div class="division-row"></div>
    <blockHd title="包含课程" />
    <ul class="course-list">
      <li
        :key="index"
        v-for="(item, index) in courseList"
        @click="$router.push({ path: `/course/${item.id}` })"
      >
        <div class="thumbnail" v-bg="item.coverImg"></div>
        <div class="course-right-wrapper">
          <div class="title">{{ item.title }}
            <span class="status" v-if="item.purchased">已购买</span>
            <span class="status" v-else>未购买</span>
          </div>
          <div class="desc">{{ item.description }}</div>
          <div class="course-meta">
            <span class="readed-count"><span class="iconfont icon-eye"></span>{{ item.visitNum || 0 }}</span>
            <span><span class="iconfont icon-clock"></span>{{ item.classHour }}课时</span>
          </div>
        </div>
      </li>
    </ul>
    <router-link class="btn btn-primary btn-left" :to="'/'" >前往首页</router-link>
    <router-link class="btn btn-primary btn-right" :to="{ path: `/course/${$route.params.id}/order`, query: { isPkg: true} }" v-if="!alreadyPurchased">立即购买</router-link>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'

  export default {
    data () {
      return {
        course: {},
        courseList: null,
        alreadyPurchased: false
      }
    },
    methods: {
      requestData () {
        var coursePkgId = this.$route.params.id
        this.$axios.post('/ace/coursePkg/detail', {
          coursePkgId: this.$route.params.id
        }).then(res => {
          this.course = res.coursePkg || {}
          this.courseList = res.courseListInPkg
          this.alreadyPurchased = res.alreadyPurchased

          function updateShareInfo (detailTitle, id) {
            console.log('share package, title: ' + detailTitle)
            var shareLink = 'http://app.aceoffer.cn/wechat/dashboard?sub=package/' + id + '#/package/' + id
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

          updateShareInfo(this.course.title, coursePkgId)
          window.wx.ready(() => {
            updateShareInfo(this.course.title, coursePkgId)
          })
        })
      }
    },
    created () {
      this.requestData()
    }
  }
</script>

<style lang="less" scoped>
@import '../lib.less';
.banner {
  height: 0;
  padding-top: 44%;
}
.learn-info {
  padding-bottom: 50px;
}
.course-intro {
  margin: 0 12px;
  h1 {
    margin-top: 8px;
    font-size: 16px;
    font-weight: normal;
    .textrow;
  }
  p {
    margin-top: 6px;
    text-align: justify;
    font-size: 12px;
    color: #666;
  }
}
.course-meta {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
  span {
    margin-right: 20px;
  }
}
.course-ft {
  display: flex;
  align-items: center;
  margin: 12px 0;
  font-size: 10px;
  .real-price {
    width: 20%;
    color: @base;
    span {
      font-size: 16px;
    }
  }
  .original-price {
    flex: 1;
    text-decoration: line-through;
    color: #999;
    span {
    vertical-align: middle;
      font-size: 12px;
    }
  }
  .iconfont {
    color: #999;
  }
  .active {
    color: @base;
  }
}
.course-list {
  .border-bottom;
  li {
    display: flex;
    align-items: center;
    height: 95px;
    padding: 12px;
    .border-top;
  }
  .has-read {
    color: #999;
    .desc {
      color: #999;
    }
  }
  .thumbnail {
    width: 110px;
    height: 75px;
    border-radius: 3px;
    background: no-repeat center;
    background-size: cover;
  }
}
.course-right-wrapper {
  flex: 1;
  padding-left: 15px;
  .title {
    position: relative;
    padding-right: 3.5em;
    .textrow;
  }
  .status {
    position: absolute;
    top: 0;
    right: 0;
  }
  .desc {
    font-size: 12px;
    color: #666;
    .textrow;
  }
  .course-meta {
    margin-top: 7px;
    font-size: 12px;
    color: #999;
    .readed-count {
      display: inline-block;
      min-width: 6em;
    }
    .iconfont {
      margin-right: .5em;
      font-size: 12px;
      color: #bbb;
    }
    .icon-clock {
      font-size: 10px;
    }
  }
}
.btn-long {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.btn-left {
  position: fixed;
  color: #fff;
  background-color: #ffd744;
  width: 120px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  line-height: 49px;
  border-radius: 0;
}
.btn-right {
  position: fixed;
  left: 120px;
  right: 0;
  bottom: 0;
  height: 49px;
  line-height: 49px;
  border-radius: 0;
}
</style>
