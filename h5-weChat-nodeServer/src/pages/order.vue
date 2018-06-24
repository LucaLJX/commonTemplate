<template>
  <div>
    <div class="course-info">
      <h1 class="title">商品信息</h1>
      <courseCard :link="false" :course="course"><span></span></courseCard>
    </div>
    <div class="division-row"></div>
    <ul class="price-list">
      <li>原　价：<span class="pull-right"><span class="yuan">￥</span>{{ order.totalOriginalPrice | fmtPrice }}</span></li>
      <li>已优惠：<span class="pull-right">-<span class="yuan">￥</span>{{ (order.totalOriginalPrice - order.totalPrice) | fmtPrice }}</span></li>
      <li>现　价：<span class="pull-right"><span class="yuan">￥</span>{{ order.totalPrice | fmtPrice }}</span></li>
      <li>合　计：<span class="pull-right stress"><span class="yuan">￥</span>{{ order.totalPrice | fmtPrice }}</span></li>
    </ul>
    <div class="btn-wrapper">
      <button class="btn btn-primary btn-block" @click="payOrder">立即支付</button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      order: {},
      course: {}
    }
  },
  methods: {
    payOrder () {
      var params = { orderId: this.order.id }
      params[this.$route.query.isPkg ? 'coursePkgId' : 'courseId'] = this.$route.params.id
      this.$axios.post('/prepay', params, { baseURL: '/user' }).then(data => {
        var options = {
          appId: data.appId,
          timeStamp: data.timeStamp + '',
          nonceStr: data.nonceStr,
          package: data.package,
          signType: data.signType,
          paySign: data.paySign
        }
        startWechatPay(options, () => {
          this.$router.push({
            path: `${this.$route.path}/result`,
            query: { orderId: this.order.id, isPkg: this.$route.query.isPkg }
          })
        })
      }).catch(e => {})
    }
  },
  created () {
    var params = {}
    params[this.$route.query.isPkg ? 'coursePkgId' : 'courseId'] = this.$route.params.id
    this.$axios.post('/ace/order/buyCourse', params).then(data => {
      this.order = data || {}
      this.course = data.orderItems[0].goodsTransientInfo || {}
    }).catch(e => {})
  },
  mounted () {
    document.body.className = 'gray-body'
  },
  beforeDestroy () {
    document.body.className = ''
  }
}

function startWechatPay (options, success) {
  function onBridgeReady () {
    window.WeixinJSBridge.invoke('getBrandWCPayRequest', options, res => {
      if (res.err_msg === 'get_brand_wcpay_request:ok' || res.err_msg === 'get_brand_wcpay_request: ok') {
        success() // 支付成功
      } else {
        MessageBox.alert('支付失败')
      }
    })
  }
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}
</script>

<style lang="less" scoped>
@import './lib.less';
.course-info {
  background-color: white;
  .title {
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    font-weight: normal;
    font-size: 16px;
  }
}
.course-card {
  .border-top;
}
.price-list {
  padding: 0 12px;
  background-color: white;
  li {
    height: 45px;
    line-height: 45px;
    .border-bottom;
    &:last-child:after {
      display: none;
    }
  }
  .pull-right {
    float: right;
    font-size: 16px;
  }
  .stress {
    color: @base;
  }
}
.btn-wrapper {
  margin: 48px 25px 0;
}
</style>
