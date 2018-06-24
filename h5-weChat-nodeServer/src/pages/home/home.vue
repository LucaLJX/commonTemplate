<template>
  <div class="my-home-page">
    <div class="banner">
      <mt-swipe :auto="40000">
        <mt-swipe-item :key="item.id" v-bg="item.thumbnail" v-for="item in data.banner">
          <a :href="item.path" class="swipe-link"></a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <template v-if="data.hotPkg && data.hotPkg.length">
      <div class="division-row"></div>
      <blockHd title="热门套餐" :to="{ path: '/package' }"></blockHd>
      <div class="course-list">
        <courseCard link="/package/" :key="item.id" :course="item" v-for="item in data.hotPkg">
          <router-link class="btn btn-primary" slot="btn" :to="`/package/${item.id}`">查看</router-link>
        </courseCard>
      </div>
    </template>
    <div class="division-row"></div>
    <blockHd title="通识类" :to="{ path: '/course', query: { id: 53 }}"></blockHd>
    <div class="course-list">
      <courseCard :key="item.id" :course="item" v-for="item in data.generalKnowledge">
        <router-link class="btn btn-primary" slot="btn" :to="`/course/${item.id}`">试听</router-link>
      </courseCard>
    </div>
    <template v-if="done">  <!-- 显示优化控制 -->
    <div class="division-row"></div>
    <blockHd title="专业能力类" :to="{ path: '/course', query: { id: 52 }}"></blockHd>
    <div class="course-list">
      <courseCard :key="item.id" :course="item" v-for="item in data.professionalAbility">
        <router-link class="btn btn-primary" slot="btn" :to="`/course/${item.id}`">试听</router-link>
      </courseCard>
    </div>
    <div class="division-row"></div>
    <blockHd title="核心素质类(含纸质素材)" :to="{ path: '/course', query: { id: 51 }}"></blockHd>
    <div class="course-list">
      <courseCard :key="item.id" :course="item" v-for="item in data.ucm">
        <router-link class="btn btn-primary" slot="btn" :to="`/course/${item.id}`">试听</router-link>
      </courseCard>
    </div>
    <div class="division-row"></div>
      <blockHd title="V计划" :to="{ path: '/course', query: { id: 54 }}"></blockHd>
      <div class="course-list">
        <courseCard :key="item.id" :course="item" v-for="item in data.vPlan">
          <router-link class="btn btn-primary" slot="btn" :to="`/course/${item.id}`">试听</router-link>
        </courseCard>
      </div>
      <div class="division-row"></div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {},
      done: false
    }
  },
  created () {
    this.$axios.post('/ace/home').then(data => {
      this.data = data
      this.done = true  // 请求完成显示下面模块
    }).catch(e => {})
  }
}
</script>


<style lang="less" scoped>
@import '../lib.less';
.banner {
  position: relative;
  height: 0;
  padding-top: 44%;
}
.mint-swipe {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.mint-swipe-item {
  background: url('/static/banner.png') no-repeat center;
  background-size: cover;
}
.swipe-link {
  display: block;
  width: 100%;
  height: 100%;
}
.course-card {
  .border-top;
  .btn {
    width: 60px;
    height: 25px;
    line-height: 25px;
  }
}
</style>

<style lang="less">
@import '../lib.less';
.my-home-page {
  .mint-swipe-indicators {
    bottom: 1px;
  }
  .mint-swipe-indicator {
    width: 6px;
    height: 6px;
    opacity: 1;
    background-color: #d2d2d2;
  }
  .mint-swipe-indicator.is-active {
    background-color: @base;
  }
}
</style>
