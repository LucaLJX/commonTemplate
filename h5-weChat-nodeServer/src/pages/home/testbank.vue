<template>
  <div class="testbank-page">
    <ul class="bank-menu">
      <li
        class="bank-submenu"
        v-for="sub in tree"
        :key="sub.id"
      >
        <div class="bank-submenu-title" @click="handleToggle(sub)">
          {{ sub.title }}
          <span class="iconfont icon-down" :class="{ 'to-up': active.indexOf(sub.id) >= 0 }"></span>
        </div>

        <transition @enter="enter" @leave="leave" :css="false">
        <ul class="bank-menu" v-if="active.indexOf(sub.id) >= 0">
          <li
            class="bank-menu-title"
            v-for="item in childrenMap[sub.id]"
            :key="item.id"
            @click="handleClick(item.id)"
          >{{ item.title }}</li>
        </ul>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: [],
      tree: [],
      childrenMap: {}
    }
  },
  methods: {
    /**
     * 请求一级目录
     */
    requestCourseFilter() {
      this.$axios
        .post('/ace/course/getFilterInfoByType', { type: 55 })
        .then(data => {
          this.tree = data[0].children
          // 默认展开第一个节点 （暂时隐藏该功能）
          var openFirst = false
          if (this.tree.length && openFirst) {
            const item = this.tree[0]
            this.active = [item.id]
            this.requestCourseList(item)
          }
        })
    },
    /**
     * 请求二级（课程）列表
     */
    requestCourseList({ id, code }) {
      if (this.childrenMap[id]) {
        return
      }
      this.loading = true
      this.$axios
        .post('/ace/course/listAll', {
          moduleCode: code
        })
        .then(data => {
          this.loading = false
          this.$set(this.childrenMap, id, data)
        })
        .catch(e => {})
    },
    /**
     * 切换菜单
     */
    handleToggle(item) {
      const pos = this.active.indexOf(item.id)
      if (pos === -1) {
        this.active.push(item.id)
        this.requestCourseList(item)
      } else {
        this.active.splice(pos, 1)
      }
    },
    /**
     * 点击二级进入考试
     */
    handleClick(id) {
      this.$router.push(`/exam/${id}`)
    },
    /**
     * js 动画
     */
    enter(el, done) {
      window.Velocity(el, 'slideDown', { duration: 300 }, { complete: done })
    },
    /**
     * js 动画
     */
    leave(el, done) {
      window.Velocity(el, 'slideUp', { duration: 300 }, { complete: done })
    }
  },
  created() {
    this.requestCourseFilter()
  },
  mounted() {
    document.body.className = 'gray-body'
  },
  beforeDestroy() {
    document.body.className = ''
  }
}
</script>

<style lang="less" scoped>
@import '../lib.less';
.testbank-page {
  margin-bottom: 10px;
}
.bank-menu {
  background: white;
  .bank-submenu-title,
  .bank-menu-title {
    height: 48px;
    line-height: 48px;
    .textrow;
    &:not(:last-child) {
      .border-bottom;
    }
  }
}
.bank-submenu-title {
  position: relative;
  padding: 0 40px 0 12px;
  font-size: 16px;
  font-weight: bold;
  .textrow;
  .iconfont {
    position: absolute;
    top: 0;
    right: 20px;
    transition: transform 0.3s;
  }
  .to-up {
    transform: rotate(-180deg);
  }
}
.bank-submenu {
  .border-bottom;
  .bank-menu {
    margin: 0 12px;
  }
}
</style>

