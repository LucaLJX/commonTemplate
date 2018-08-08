<template>
	<!-- container -->
	<div class="ljx-container">
		<!-- islider-wrapper -->
		<div id="islider-wrapper"></div>

    <div id="item-1">
      <p>this is the item 1</p>
    </div>
    <div id="item-2">
      <p>this is the item 1</p>
    </div>
    <div id="item-3">
      <p>this is the item 1</p>
    </div>


    <div class="share-test" style="width: 100%;height: 200px;margin-top: 20px;">
      <div @click="shareTest" style="width: 100px; height: 100px; background: red;">分享</div>
    </div>
	</div>
</template>

<script>
import iSlider from 'islider.js'
import { MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      isliderList: [
        // {
        //   content: document.querySelector('#item-1')
        // },
        // {
        //   content: document.querySelector('#item-2')
        // },
        // {
        //   content: document.querySelector('#item-3')
        // }
        {
          content: 'http://image3.92bizhi.com/sport_basketball--01_02-1680x1050.jpg'
        },
        {
          content: 'http://image3.92bizhi.com/sport_basketball--01_07-1680x1050.jpg'
        }
      ],
      isliderDom: null
    }
  },
  mounted: function () {
    console.log(iSlider);
    this.initIslider();
  },
  methods: {
    initIslider () {
      let _this = this;
      _this.isliderDom = new iSlider(document.getElementById('islider-wrapper'), _this.isliderList, {
        isAutoplay: 1,
        isLooping: 1,
        isOverspread: 1,
        animateTime: 800
      });
    },
    shareTest () {
      alert('分享');
      // let _this = this;
      function shareInfo () {
        alert('进入shareinfo');
        let shareLink = 'http://www.baidu.com';
        var shareObj = {
          title: 'shareTitle',
          desc: '这是描述desc，测试分享',
          link: shareLink,
          imgUrl: location.origin + '/static/logo-small.png',
          success: function () { MessageBox.alert('分享成功') }
        }
        alert('shareObj');
        window.wx.onMenuShareTimeline(shareObj)
        alert('timeline');
        window.wx.onMenuShareAppMessage(shareObj)
      }
      window.wx.ready(() => {
        alert('fenxiang');
        shareInfo()
      })
    }
  }
}
</script>

<style lang="less" scoped>
#islider-wrapper {
  width: 100%;
  height: 400px;
}
</style>

