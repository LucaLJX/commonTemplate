<template>
  <div class="course-card" @click="clickHandler">
    <div class="thumbnail" v-bg="course.coverImg"></div>
    <div class="course-info">
      <h3 class="title">{{ course.title }}</h3>
      <div class="lecturer" v-if="course.teacherName"><span class="icon icon-person"></span>{{ course.teacherName }}</div>
      <div class="description" v-if="course.description"><span class="icon icon-info"></span>{{ course.description }}</div>
      <div class="duration" v-if="course.classHour"><span class="icon icon-chat"></span>{{ course.classHour }}个课时</div>
      <div class="course-ft">
        <slot>
          <div class="real-price">￥<span>{{ course.currentPrice | fmtPrice }}</span></div>
          <div class="original-price">
            <template v-if="course.originalPrice">
              原价: ￥<span>{{ course.originalPrice | fmtPrice }}</span>
            </template>
          </div>
        </slot>
        <slot name="btn"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: { default: '/course/' },
    course: {
      default () { return {} }
    }
  },
  methods: {
    clickHandler () {
      if (this.link) {
        this.$router.push(`${this.link + this.course.id}`)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../pages/lib.less';
.course-card {
  display: flex;
  align-items: center;
  height: 135px;
  padding: 0 12px;
  background-color: white;
  .thumbnail {
    width: 90px;
    height: 105px;
    margin-right: 12px;
    background: no-repeat center;
    background-size: cover;
  }
}
.course-info {
  flex: 1;
  font-size: 10px;
  color: #999;
  .title {
    font-size: 14px;
    color: #333;
    .textrow;
  }
  .description {
    .textrow;
  }
  .icon {
    margin-right: 6px;
  }
  .icon-person {
    background-image: url('../assets/icon/person.png');
  }
  .icon-info {
    background-image: url('../assets/icon/info.png');
  }
  .icon-chat {
    background-image: url('../assets/icon/chat.png');
  }
}
.course-ft {
  display: flex;
  align-items: center;
  font-size: 10px;
  .real-price {
    width: 25%;
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
}
</style>
