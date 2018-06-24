<template>
  <div>
    <div v-if="showImages">
      <ul>
        <li v-for="(item, index) in perloadArr" :key="index">
          <img :src="item.src" :alt="item.id">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showImages: false,
      perloadArr: [
        {
          src: 'http://image3.92bizhi.com/sport_basketball--01_02-1680x1050.jpg',
          id: 'img01'
        },
        {
          src: 'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1209/03/c1/13564685_1346648840925.jpg',
          id: 'img02'
        },
        {
          src: 'http://image3.92bizhi.com/sport_basketball--01_07-1680x1050.jpg',
          id: 'img03'
        },
        {
          src: 'http://img.bbs.wisenjoy.com/forum/201409/06/205628til073dn1ld1z3i3.jpg',
          id: 'img04'
        },
        {
          src: 'http://pic14.photophoto.cn/20100309/0010023337206015_b.jpg',
          id: 'img05'
        },
        {
          src: 'http://i2.hdslb.com/bfs/archive/ba9ab0d5501405ba326864543381a7701158f024.jpg',
          id: 'img06'
        },
        {
          src: 'http://img.52jbj.com/uploads/allimg/150612/2-1506121RK2.jpg',
          id: 'img07'
        },
        {
          src: 'http://pic11.photophoto.cn/20090630/0036036310369781_b.jpg',
          id: 'img08'
        },
        {
          src: 'http://img.52jbj.com/uploads/allimg/150612/2-1506121RP3.jpg',
          id: 'img09'
        }
      ],
      loader: null
    }
  },
  mounted: function () {
    console.log(window.wx)
    console.log(window.createjs)
    console.log(window.WxMoment)
    let _this = this
    // _this.loadImagesWidthWX()
    _this.loadImagesWidthPreload();
  },
  methods: {
    // 微信的资源预加载方案
    // 地址：http://ad.weixin.qq.com/learn/n13
    loadImagesWidthWX () {
      // let _this = this
      var basePath = 'https://wximg.qq.com/some/path/';
      var loader = new window.WxMoment.Loader()
      // 声明资源文件列表
      var fileList = ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png']
      for (var i = 0; i < fileList.length; i++) {
        loader.addImage(basePath + fileList[i])
      }
      // 进度监听
      loader.addProgressListener(function (e) {
        var percent = Math.round((e.completedCount / e.totalCount) * 100)
        console.log('当前加载了', percent, '%')
        console.log(e.completedCount);
        // 在这里做 Loading 页面中百分比的显示
      })
      // 加载完成
      loader.addCompletionListener(function () {
        // 可以在这里隐藏 Loading 页面开始进入主内容页面
      })
      // 启动加载
      loader.start()
    },
    // preload.js预加载解决方案
    loadImagesWidthPreload () {
      let _this = this;
      _this.loader = new window.createjs.LoadQueue(false);
      _this.loader.on('progress', _this.handleFileLoad);
      _this.loader.on('complete', _this.handleComplete);
      _this.loader.loadManifest(_this.perloadArr);
    },
    handleFileLoad (e) {
      let _this = this;
      var bnum = parseInt(_this.loader.progress * 100);
      // document.querySelector('.process span').innerText = bnum+'%';
      console.log('finished + ' + bnum);
    },
    handleComplete () {
      this.showImages = true;
    }

  }
}
</script>
