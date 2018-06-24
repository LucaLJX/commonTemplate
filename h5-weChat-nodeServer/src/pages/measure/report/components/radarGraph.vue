<template>
  <div class="radar-graph">
    <div ref="myChart" class="my-chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
// 无完美优势
const optionSingle = {
  legend: {
    orient: 'vertical',
    x: 'right',
    data: ['我的优势']
  },
  polar: [
    {
      indicator: [
        { text: '学校优势', max: 1 },
        { text: '性格优势', max: 1 },
        { text: '经验优势', max: 1 },
        { text: '英语优势', max: 1 },
        { text: 'GPA优势', max: 1 },
        { text: '个人职业优势', max: 1 },
        { text: '时间优势', max: 1 },
        { text: '学历优势', max: 1 }
      ],
      radius: 80
    }
  ],
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [],
          name: '完美优势'
        }
      ]
    }
  ]
}
// 有完美优势
const optionAll = {
  legend: {
    orient: 'vertical',
    x: 'right',
    data: ['完美优势', '我的优势']
  },
  polar: [
    {
      indicator: [
        { text: '学校优势', max: 1 },
        { text: '性格优势', max: 1 },
        { text: '经验优势', max: 1 },
        { text: '英语优势', max: 1 },
        { text: 'GPA优势', max: 1 },
        { text: '个人职业优势', max: 1 },
        { text: '时间优势', max: 1 },
        { text: '学历优势', max: 1 }
      ],
      radius: 80
    }
  ],
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [],
          name: '完美优势'
        },
        {
          value: [],
          name: '我的优势'
        }
      ]
    }
  ]
}

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    single: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  watch: {
    data(newV) {
      let option
      if (this.single) {
        option = optionSingle
        option.series[0].data = [newV[1]]
      } else {
        option = optionAll
        option.series[0].data = newV
      }
      const max = 1.05 * Math.max(...[...newV[0].value, ...newV[1].value])

      option.polar[0].indicator.forEach(item => {
        item.max = max
      })
      this.myChart.setOption(option)
    }
  },
  methods: {
    initEchats() {
      this.myChart = echarts.init(this.$refs.myChart)
      this.myChart.setOption(optionAll)
    }
  },
  mounted() {
    this.initEchats()
  },
  beforeDestroy() {
    this.myChart.dispose()
  }
}
</script>


<style lang="less" scoped>
@import '../../../lib.less';
.radar-graph {
  overflow: hidden;
  padding-top: 10px;
  .my-chart {
    height: 300px;
  }
}
</style>
