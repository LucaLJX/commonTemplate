<template>
  <div class="measure-report-page">
    <div class="report-overview">
      <div class="overview-score">我的综合求职竞争力达到 <span>{{ compositeScore }}</span> 分</div>
      <div class="overview-percent" :style="{ visibility: !beatPct ? 'hidden': false }">击败了{{ beatPct }}%小伙伴</div>
      <radarGraph :data="topData" single />
      <ul class="standard-list">
        <li class="list-item"><span class="item-title">40分以下：</span>求职竞争力偏低</li>
        <li class="list-item"><span class="item-title">40分-50分：</span>求职竞争力一般</li>
        <li class="list-item"><span class="item-title">50分-60分：</span>求职竞争力良好</li>
        <li class="list-item"><span class="item-title">60分-70分：</span>求职竞争力优秀</li>
        <li class="list-item"><span class="item-title">70分以上：</span>求职竞争力极高</li>
      </ul>
    </div>
    <div class="division-row"></div>
    <!-- 提升建议 -->
    <div class="report-block">
      <div class="block-title">提升建议</div>
      <div class="block-content">
        <ul class="advise-list">
          <li>
            <div class="list-title">1. 学校优势:</div>
            <div class="list-desc">你的学校属于<span>{{ reportJson[1] }}，{{ reportJson[2] }}</span>，若保持当下求职目标，<span>{{ reportJson[3] }}</span>；</div>
          </li>
          <li>
            <div class="list-title">2. 求职时间上:</div>
            <div class="list-desc">你<span>{{ reportJson[4] }}</span> ，需要你基于目标行业和可支配的时间，落实一份可执行的求职计划；</div>
          </li>
          <li>
            <div class="list-title">3. 个人职业优势：</div>
            <div class="list-desc">在个人职业优势上，你<span>{{ reportJson[5] }}</span> ，建议你<span>{{ reportJson[6] }}</span>；</div>
          </li>
          <li>
            <div class="list-title">4. GPA优势：</div>
            <div class="list-desc"><span>{{ reportJson[7] }}</span>；</div>
          </li>
          <li>
            <div class="list-title">5. 英语优势</div>
            <div class="list-desc">现阶段你的英语水平<span>{{ reportJson[8] }}</span>，你需要<span>{{ reportJson[9] }}</span>；</div>
          </li>
          <li>
            <div class="list-title">6. 经验优势</div>
            <div class="list-desc">你的经验优势<span>{{ reportJson[10] }}</span>，这样有助于你斩获顶级公司的Offer；</div>
          </li>
        </ul>
        <!--<div class="other-tip">注：获取新的经验的同时，挖掘过往经验与目标求职岗位匹配的点，转化为关键字和具体内容，体现在简历中。通过提升简历和面试水平，弥补经验相关性上的不足，同时最大程度增加Offer概率。</div>-->
      </div>
    </div>
    <div class="division-row"></div>
    <!-- 主流行业求职竞争力, 此处的job是用于展示的行业名称 -->
    <div class="report-block">
      <div class="block-title">主流行业求职竞争力</div>
      <div class="block-content">
        <ul class="tag-list">
          <li
            v-for="(item, index) in bottomJsonArr"
            class="tag-item"
            :class="{'item-active': industryIndex === index}"
            :key="item.id"
            @click="handleSelect(index)"
          >
            {{ item.job }}
          </li>
        </ul>
      </div>
      <div class="overview-score">当前行业求职竞争力为 <span>{{ Math.round(bottomCompositeScore * 100) }}</span> 分</div>
      <radarGraph :data="bottomData" />
      <div class="analysis-wrap">
        <div class="analysis-list-title">竞争力与匹配度解析：</div>
        <ul class="analysis-list">
          <li class="list-item">55分以下表示你的综合竞争力在该行业处于偏低的水平，因此与该行业的匹配度偏低，求职成功率偏低；</li>
          <li class="list-item">55-65分表示你的综合竞争力在该行业处于中等水平，因此与该行业的匹配度适中，代表你可以通过求职能力的培训和实习经历的提升来冲刺该行业中知名公司的全职Offer；</li>
          <li class="list-item">65-75分表示你的综合竞争力高于该行业平均水平，因此与该行业的匹配度较高，代表你可以通过求职能力的培训和实习经历的提升来冲刺该行业中顶尖公司的全职Offer；</li>
          <li class="list-item">75分以上表示你的综合竞争力远高于该行业平均水平，因此与该行业的匹配度较低，不建议选择求职该行业。</li>
        </ul>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="btn-wrapper">
      <button class="btn btn-block" @click="qrCodeVisible = true">获取完整测评报告&解读</button>
      <a class="btn btn-block" href="https://mp.weixin.qq.com/s/5XSgWnLlkVmKfaC3FX3gfg">专属求职提升方案</a>
      <!-- <a class="btn btn-block" href="http://p.qiao.baidu.com/cps/chat?siteId=11998738&userId=25579927">领取免费求职资料</a> -->
    </div>
    <div class="qr-code-modal" v-if="qrCodeVisible">
      <div class="qr-code-wrap">
        <div class="modal-close" @click="qrCodeVisible = false"></div>
        <img class="qr-code" src="../../../assets/qr-code.png" alt="qr-code">
        <div class="qr-code-tip">私戳小助手获得评估报告</div>
      </div>
    </div>
  </div>
</template>

<script>
import radarGraph from './components/radarGraph'
import updateShare from '../updateShare'

export default {
  data() {
    return {
      qrCodeVisible: false,
      compositeScore: 0,
      beatPct: 0,
      reportJson: {},
      topData: [],
      industryIndex: 0,
      bottomData: [],
      bottomCompositeScore: 0,
      bottomJsonArr: [] // 底部数据列表
    }
  },
  components: {
    radarGraph
  },
  methods: {
    /**
     * 选择行业雷达图
     */
    handleSelect(index) {
      this.industryIndex = index
      const bottomJson = this.bottomJsonArr[index]
      this.bottomData = buildData(bottomJson)
      this.bottomCompositeScore = bottomJson.comprehensiveScore
    },
    /**
     * 获取数据
     */
    fetchReport() {
      this.$axios
        .post('/ace/job_testing/getLatestTestingResult')
        .then(data => {
          this.compositeScore = data.compositeScore
          this.beatPct = data.beatPct
          this.reportJson = parseJson(data.reportJson) || {}

          // 顶部雷达图
          const topJson = parseJson(data.testingResultCompositeJson) || {}
          this.topData = buildData(topJson)

          // 底部雷达图
          this.bottomJsonArr = parseJson(data.testingResultIndustryJson) || []
          const bottomJson = this.bottomJsonArr[0]
          this.bottomData = buildData(bottomJson)
          this.bottomCompositeScore = bottomJson.comprehensiveScore
        })
        .catch(e => {})
    }
  },
  created() {
    this.fetchReport()
    updateShare()
  }
}

/**
 * 解析 JSON 字符串
 */
function parseJson(str) {
  try {
    return JSON.parse(str)
  } catch (e) {
    console.log(e)
    // return eval('(' + str + ')')
  }
}

/**
 * 构建雷达图数据
 */
function buildData(json) {
  const advantage = []
  const standard = []
  // array 数据到雷达图的映射关系
  const map = {
    1: 1,
    2: 7,
    3: 6,
    4: 5,
    5: 8,
    6: 4,
    7: 3,
    8: 2
  }
  // 只有雷达图的 8 个数据
  for (let i = 1; i <= 8; i++) {
    let standardItem = json.standardMap[map[i]] || 0
    let advantageItem = json.advantageMap[map[i]] || 0
    // 要求“我的竞争力”超过完美优势，取完美优势 80%
    if (advantageItem > standardItem) {
      advantageItem = standardItem * 0.8
    }
    standard.push(standardItem)
    advantage.push(advantageItem)
  }
  return [
    {
      name: '完美优势',
      value: standard
    },
    {
      name: '我的优势',
      value: advantage
    }
  ]
}
</script>


<style lang="less" scoped>
@import '../../lib.less';
@red: #dc4d4c;
// 概览
.report-overview {
  text-align: center;
  .overview-score {
    margin-top: 25px;
    font-size: 17px;
    span {
      font-size: 24px;
      color: @red;
    }
  }
  .overview-percent {
    width: 150px;
    height: 25px;
    line-height: 24px;
    margin: 8px auto 0;
    border: 1px solid @red;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    color: @red;
  }
  .standard-list {
    margin: 0 12px 30px;
    padding-left: 20px;
    font-size: 12px;
    color: #999;
    // .item-title {
    // }
  }
}
// block
.report-block {
  .block-title {
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    font-size: 16px;
    .border-bottom;
  }
  .block-content {
    margin: 0 12px;
  }
  .overview-score {
    margin-top: 25px;
    font-size: 17px;
    text-align: center;
    span {
      font-size: 24px;
      color: @red;
    }
  }
}
// 提升建议
.advise-list {
  li {
    padding: 11px 0;
    .border-bottom;
  }
  .list-desc {
    margin-top: 3px;
    padding-left: 16px;
    color: #666;
  }
}
.block-content {
  .other-tip {
    padding: 10px 0 12px 2em;
    text-indent: -2em;
    line-height: 21px;
    font-size: 12px;
    color: #999;
  }
}
// 主流行业求职竞争力
.tag-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 5px;
  .tag-item {
    height: 25px;
    line-height: 25px;
    margin: 15px 5px 0;
    padding: 0 1em;
    border-radius: 13px;
    background: #f0f0f0;
  }
  .item-active {
    background: @red;
    color: white;
  }
}
// 竞争力与匹配度解析
.analysis-wrap {
  margin: 0 12px 15px;
  .analysis-list {
    margin-left: 1.5em;
    list-style: decimal;
    color: #666;
  }
  .list-item {
    margin-top: 10px;
  }
}
// 按钮
.btn-wrapper {
  padding: 15px 25px 45px;
  background: #f0f0f0;
  .btn {
    height: 44px;
    line-height: 44px;
    margin-top: 25px;
    color: white;
    background: #dc4d4c;
  }
}
// qr-code 弹窗
.qr-code-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  .qr-code-wrap {
    position: relative;
    overflow: hidden;
    height: 333px;
    width: 183px;
    margin: 70px auto 0;
    background: url('../../../assets/qr-code-wrap.png') no-repeat center;
    background-size: contain;
  }
  .modal-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 25px;
    height: 25px;
  }
  .qr-code {
    display: block;
    height: 152px;
    margin: 96px auto 0;
  }
  .qr-code-tip {
    margin-top: 5px;
    font-weight: bold;
    color: white;
  }
}
</style>
