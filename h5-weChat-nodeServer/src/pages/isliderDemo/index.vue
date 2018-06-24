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
	</div>
</template>

<script>
import iSlider from 'islider.js'

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

