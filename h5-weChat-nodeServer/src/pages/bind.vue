<template>
  <div>
    <div>
      <div class="logo-wrapper"><img src="../assets/logo.png" alt="Ace Edu"></div>
    </div>
    <div class="form">
      <div class="form-control">
        <span class="iconfont icon-people"></span>
        <div class="input"><input type="text" placeholder="姓　名" v-model.trim="info.username"></div>
        <div class="sex-radio">
          <label class="input-control">
            <input type="radio" value="1" v-model.number="info.sex">
            <span class="radio-core"></span>先生
          </label>
          <label class="input-control">
            <input type="radio" value="2" v-model.number="info.sex">
            <span class="radio-core"></span>女士
          </label>
        </div>
      </div>
      <div class="form-control">
        <span class="iconfont icon-phone"></span>
        <input class="input" type="number" placeholder="手机号" v-model.trim="info.phoneNum">
      </div>
      <div class="form-control">
        <span class="iconfont icon-shield"></span>
        <input class="input" type="number" placeholder="验证码" v-model.trim="info.verificationCode">
        <button class="btn btn-gray" v-if="remainTime > 0">{{ remainTime }}s</button>
        <button class="btn btn-primary" @click="getIdCode" v-else>获取验证码</button>
      </div>
      <div class="btn-wrapper">
        <button class="btn btn-primary btn-block" @click="bindPhone">立即绑定</button>
        <div class="tips" @click="popupVisible = true">收不到验证码？</div>
      </div>
      <div class="agreement">点击“立即绑定”按钮，即表示同意<router-link to="/agreement">《用户协议》</router-link></div>
    </div>
    <mt-popup class="modal-popup" v-model="popupVisible">
      <div>点击“立即绑定”按钮，即表示同意</div>
    </mt-popup>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
const phoneNumReg = /^1[3|4|5|7|8]\d{9}$|^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
var fromUrl = '/'  // 记录来自

export default {
  data () {
    return {
      info: { sex: 1 },
      remainTime: 0,
      popupVisible: false
    }
  },
  methods: {
    bindPhone () {
      if (!this.info.username) {
        MessageBox('缺少姓名', '请填写您的姓名')
        return
      }
      if (!this.validatePhoneNum()) {
        return
      }
      if (!this.info.verificationCode) {
        MessageBox('缺少验证码', '请填写验证码')
        return
      }

      // 绑定
      this.$axios.post('/bind', this.info, { baseURL: '/user' }).then(res => {
        MessageBox('绑定成功', '恭喜您绑定成功')

        // 绑定成功刷新页面，重新设置 session
        window.location.href = `/wechat/#${fromUrl}`
      }).catch(e => {})
    },
    getIdCode () {
      // 手机验证
      if (!this.validatePhoneNum()) {
        return
      }
      this.$axios.post('/authBySms/getVerificationCode', {
        phoneNum: this.info.phoneNum
      }).then(res => {
        MessageBox('发送成功', '请注意查收')
      }).catch(e => {})

      this.remainTime = 60
      var timeId = setInterval(() => {
        this.remainTime--
        if (this.remainTime <= 0) {
          clearInterval(timeId)
        }
      }, 1000)
    },
    validatePhoneNum () {
      if (this.info.phoneNum && phoneNumReg.test(this.info.phoneNum)) {
        return true
      }
      MessageBox('手机号错误', '请输入正确的手机号')
    }
  },
  beforeRouteEnter (to, from, next) {
    fromUrl = from.path
    next()
  }
}
</script>

<style lang="less" scoped>
@import './lib.less';
.logo-wrapper {
  margin-top: 64px;
  img {
    display: block;
    height: 50px;
    margin: 0 auto;
  }
}
.form {
  margin-top: 60px;
}
.form-control {
  position: relative;
  display: flex;
  align-items: center;
  height: 34px;
  margin: 15px 28px;
  .border-bottom;
  .iconfont {
    margin-right: 5px;
    color: #999;
  }
  .input {
    flex: 1;
    border: none;
    outline: none;
    input {
      width: 100%;
      border: none;
      outline: none;
    }
  }
  .btn {
    width: 90px;
    height: 30px;
    line-height: 30px;
    margin-top: -15px;
    border-radius: 5px;
    font-size: 14px;
  }
}
.sex-radio {
  .input-control {
    float: left;
    &:first-child {
      margin-right: 20px;
    }
  }
}
.btn-wrapper {
  margin: 45px 30px;
  text-align: center;
  .tips {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
    text-decoration: underline;
  }
}
.agreement {
  margin-top: 120px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 12px;
  color: #999;
  a {
    color: @base;
    text-decoration: underline;
  }
}
.modal-popup {
  overflow: hidden;
  border-radius: 5px;
  padding: 10px;
}
</style>
