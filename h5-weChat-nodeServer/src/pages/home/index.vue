<template>
  <div class="main-page">
    <router-view></router-view>
    <footer class="footer-wrapper">
      <ul class="footer-list">
        <li :class="{ active: $route.path === '/' }"><router-link to="/">
          <div><span class="t-icon t-icon-video"></span></div>
          <div class="name">视频</div>
        </router-link></li>
        <li :class="{ active: $route.path === '/testbank' }"><router-link to="/testbank">
          <div><span class="t-icon t-icon-pen"></span></div>
          <div class="name">题库</div>
        </router-link></li>
        <li :class="{ active: $route.path === '/personal' }"><router-link to="/personal">
          <div><span class="t-icon t-icon-me"></span></div>
          <div class="name">我的</div>
        </router-link></li>
      </ul>
    </footer>
  </div>
</template>

<style lang="less" scoped>
@import '../lib.less';
.main-page {
  padding-bottom: 47px;
}
.footer-wrapper {
  z-index: 99;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.footer-list {
  height: 48px;
  text-align: center;
  background-color: white;
  .border-top(#d2d2d2);
  li {
    float: left;
    width: 33.333%;
    height: 100%;
    padding-top: 0.4rem;
    line-height: 1;
    a {
      display: block;
    }
    .name {
      margin-top: 2px;
      font-size: 10px;
    }
  }
  .active {
    color: @base;
  }
}
.t-icon {
  display: inline-block;
  width: 30px;
  height: 20px;
  background: no-repeat center;
  background-size: contain;
}

.t-icon(video);
.t-icon(pen);
.t-icon(me);

.active {
  .t-icon-active(video);
  .t-icon-active(pen);
  .t-icon-active(me);
}

// less 方法
.t-icon(@name) {
  .t-icon-@{name} {
    background-image: url('../../assets/icon/@{name}.png');
  }
}
.t-icon-active(@name) {
  .t-icon-@{name} {
    background-image: url('../../assets/icon/@{name}-active.png');
  }
}
</style>

