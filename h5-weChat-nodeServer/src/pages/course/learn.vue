<template>
  <div class="learn-info">
    <section class="course-intro">
      <h1>{{ course.title }}</h1>
      <p>{{ course.courseDescription }}</p>
      <div class="course-meta">
        <span>访问量：{{ course.visitNum }}</span>
        <span>已购买：{{ data.totalPurchasedCount }}</span>
      </div>
      <div class="course-ft">
        <div class="real-price">￥<span>{{ course.currentPrice | fmtPrice}}</span></div>
        <div class="original-price">原价: ￥<span>{{ course.originalPrice | fmtPrice}}</span></div>
        <div @click="collectHandler(course.id)"><span class="iconfont icon-heart" :class="{ active: collected }"></span></div>
      </div>
    </section>
    <div class="division-row"></div>
    <section class="lecturer-intro">
      <div class="intro-hd">
        <div class="avatar" v-bg="course.teacherAvatar"></div>
        <div class="intro-right-wrapper">
          <h1>主讲人：{{ course.teacherName }}</h1>
          <ul class="achievement-list">
            <li v-for="item in course.teacherIntroduce && course.teacherIntroduce.split(';')">
              <span class="iconfont icon-jiantou" ></span>{{ item }}
            </li>
          </ul>
        </div>
      </div>
      <div class="intro-body">{{ course.teacherDescription }}</div>
    </section>
    <div class="division-row"></div>
    <blockHd title="课表" />
    <ul class="course-list">
      <li :class="{ 'has-read': item.alreadyVisited }"
        :key="index"
        v-for="(item, index) in data.videos"
        @click="clickVideo(item)"
      >
        <div class="thumbnail" v-bg="item.thumbnail"></div>
        <div class="course-right-wrapper">
          <div class="title">{{ item.title }}
            <span class="status" v-if="item.sortNum === 131415">免费</span>
            <span class="status" v-else-if="!data.alreadyPurchased">未购买</span>
            <span class="status" v-else-if="data.wantToLearn && data.wantToLearn.id === item.id">正在学习</span>
            <span class="status" v-else-if="item.alreadyVisited">已学习</span>
            <span class="status" v-else>未学习</span>
          </div>
          <div class="desc">{{ item.description }}</div>
          <div class="course-meta">
            <span class="readed-count"><span class="iconfont icon-eye"></span>{{ item.visitNum }}</span>
            <span><span class="iconfont icon-clock"></span>{{ item.videoDuration | fmtDuration }}</span>
          </div>
        </div>
      </li>
    </ul>
    <router-link class="btn btn-primary btn-left" :to="'/'" >前往首页</router-link>
    <router-link class="btn btn-primary btn-right" :to="$route.path + '/order'" v-if="!data.alreadyPurchased">立即购买</router-link>
    <router-link class="btn btn-primary btn-right" :to="$route.path + '/evaluate'" v-else-if="!data.isCommentedByStaff">立即评价</router-link>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'

export default {
  props: ['data'],
  computed: {
    course () { return this.data.course || {} },
    collected: {
      get () {
        return this.data.isCourseCollected
      },
      set (val) {
        this.data.isCourseCollected = val
      }
    }
  },
  methods: {
    collectHandler (courseId) {
      this.$axios.post('/ace/course/collectCourse', {
        courseId,
        cancel: this.collected
      }).then(data => {
        this.collected = !this.collected
      }).catch(e => {})
    },
    clickVideo (item) {
      if (!this.data.alreadyPurchased && !item.sortNum !== 131415) {
        MessageBox.alert('请先购买此课程')
      } else {
        this.$emit('play-video', item.aceCourseHasDocumentationId)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../lib.less';
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
.lecturer-intro {
  margin: 0 12px;
}
.intro-hd {
  display: flex;
  align-items: center;
  height: 99px;
  .border-bottom;
  .avatar {
    align-self: flex-start;
    width: 45px;
    height: 45px;
    margin-top: 15px;
    border-radius: 3px;
    background: no-repeat center;
    background-size: cover;
  }
}
.intro-right-wrapper {
  flex: 1;
  padding-left: 10px;
  h1 {
    font-size: 16px;
    font-weight: normal;
  }
  .achievement-list {
    margin-top: 3px;
    font-size: 12px;
    color: #666;
  }
  .iconfont {
    margin-right: 5px;
    color: #999;
    font-size: 10px;
  }
}
.intro-body {
  margin: 7px 0;
  text-align: justify;
  font-size: 12px;
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

