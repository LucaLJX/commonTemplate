<template>
  <div>
    <div class="banner">
      <div class="user-info">
        <div class="avatar" v-bg="user.headimgurl"></div>
        <div class="nickname">{{ user.name }}</div>
        <div class="tel" v-if="user.phoneNum">{{ user.phoneNum | hoverPhoneNum }}</div>
        <router-link class="link" to="/bind" v-else>去绑定</router-link>
      </div>
    </div>
    <div class="entry-list">
      <router-link class="entry-item border-item" to="/collection">
        <div class="item-name"><span class="icon m-icon-collect"></span>我的收藏</div>
        <span class="iconfont icon-right"></span>
      </router-link>
      <!-- <router-link class="entry-item border-item" to="/orders">
        <div class="item-name"><span class="icon m-icon-order"></span>订单记录</div>
        <span class="iconfont icon-right"></span>
      </router-link> -->
      <router-link class="entry-item" to="/own">
        <div class="item-name"><span class="icon m-icon-own"></span>已购买的课程</div>
        <span class="iconfont icon-right"></span>
      </router-link>
      <div class="division-row"></div>
      <router-link class="entry-item" to="aboutus">
        <div class="item-name"><span class="icon m-icon-us"></span>关于我们</div>
        <span class="iconfont icon-right"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: mapActions(['getUser']),
  created () {
    this.getUser().then(user => {
      this.user = user
    })
  },
  mounted () {
    document.body.className = 'gray-body'
  },
  beforeDestroy () {
    document.body.className = ''
  },
  filters: {
    hoverPhoneNum (val) {
      return `${val.slice(0, 3)}****${val.slice(7)}`
    }
  }
}
</script>

<style lang="less" scoped>
@import '../lib.less';
.banner {
  position: relative;
  height: 165px;
  color: white;
  background: url('/static/personal.jpg');
}
.user-info {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  .avatar {
    overflow: hidden;
    width: 75px;
    height: 75px;
    margin: 0 auto;
    border: 1px solid white;
    border-radius: 50%;
    background: no-repeat center;
    background-size: cover;
  }
  .nickname {
    margin-top: 3px;
  }
  .tel, .link {
    font-size: 12px;
  }
  .link {
    text-decoration: underline;
  }
}
.entry-list {
  background-color: white;
  .border-item {
    .border-bottom;
  }
  .entry-item {
    display: flex;
    align-items: center;
    height: 46px;
    margin: 0 12px;
  }
  .icon {
    margin-right: 10px;
  }
  .item-name {
    flex: 1;
  }
  .icon-right {
    font-size: 12px;
    color: #9a9a9a;
  }
}
.m-icon-collect {
  background-image: url('../../assets/icon/collect.png');
}
.m-icon-order {
  background-image: url('../../assets/icon/order.png');
}
.m-icon-own {
  background-image: url('../../assets/icon/own.png');
}
.m-icon-us {
  background-image: url('../../assets/icon/us.png');
}
</style>
