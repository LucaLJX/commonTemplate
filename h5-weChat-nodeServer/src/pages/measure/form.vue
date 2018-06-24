<template>
  <div class="measure-form-page">
    <div class="form-intro">以下信息将用于测评报告的发送以及针对测试者本人的专业报告解读。</div>
    <form class="user-info" @submit.prevent>
      <div class="form-item">
        <i class="iconfont icon-people-2"></i>
        <input type="text" class="input-text" v-model.trim="formItem.name" placeholder="请输入你的姓名（必填）">
      </div>
      <div class="form-item">
        <i class="iconfont icon-email"></i>
        <input type="text" class="input-text" v-model.trim="formItem.email" placeholder="请输入你的邮箱（必填）">
      </div>
      <div class="form-item">
        <i class="iconfont icon-wechat"></i>
        <input type="text" class="input-text" v-model.trim="formItem.wechat" placeholder="请输入你的微信号（选填）">
      </div>
      <div class="form-item">
        <i class="iconfont icon-mobile"></i>
        <input type="text" class="input-text" v-model.trim="formItem.phone" placeholder="请输入你的手机号（选填）">
      </div>
      <div class="btn-wrapper">
        <Button type="button" class="btn btn-block" @click="handleSubmit">开始测试</Button>
        <ul class="tips-list">
          <li class="list-item">1、测试题一共13道题，请在10分钟内完成测评</li>
          <li class="list-item">2、您的信息将得到严格保密，请测试者根据自己的真实情况进行作答。</li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { emailReg } from '@/utils'
import updateShare from './updateShare'

export default {
  data() {
    return {
      formItem: {}
    }
  },
  methods: {
    validateForm(formItem) {
      if (!formItem.name) {
        return '请输入姓名'
      }
      if (!emailReg.test(formItem.email)) {
        return '请输入正确的邮箱'
      }
      return 'ok'
    },
    handleSubmit() {
      const result = this.validateForm(this.formItem)
      if (result !== 'ok') {
        return MessageBox(result)
      }
      const formItem = {
        testingUsername: this.formItem.name,
        testingPhoneNum: this.formItem.phone,
        testingWeChat: this.formItem.wechat,
        testingEmail: this.formItem.email
      }

      // 发送请求
      this.$axios
        .post('/auth4Open/submitJobTestingUserInfo', formItem)
        .then(data => {
          this.$router.push('/measure/test')
        })
        .catch(e => {})
    }
  },
  created() {
    updateShare()
  }
}
</script>


<style lang="less" scoped>
@import '../lib.less';
.measure-form-page {
  margin: 24px;
  .form-intro {
    font-size: 12px;
  }
}
// 表单
.form-item {
  position: relative;
  margin-top: 16px;
  .iconfont {
    position: absolute;
    top: 50%;
    left: 10px;
    margin-top: -14px;
    font-size: 20px;
  }
  .input-text {
    width: 100%;
    line-height: 1.5;
    padding: 12px 12px 12px 31px;
    border: none;
    outline: none;
    border-radius: 5px;
    background: #eee;
  }
}
// 按钮
.btn-wrapper {
  margin-top: 37px;
  .btn {
    height: 44px;
    line-height: 44px;
    color: white;
    background: #dc4d4c;
  }
  .tips-list {
    margin-top: 15px;
    padding-left: 1.5em;
    font-size: 12px;
    color: #999;
  }
  .list-item {
    text-indent: -1.5em;
  }
}
</style>
