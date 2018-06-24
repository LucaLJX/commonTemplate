<template>
  <ul class="option-list">
    <myOption
      :key="item.id"
      :order="index"
      :content="item.content"
      :state="anArr.indexOf(item.id) !== -1 ? 1 : 0"
      v-for="(item, index) in choices"
      @click.native="toggle(item.id)"
    ></myOption>
  </ul>
</template>

<script>
import myOption from './option.vue'

export default {
  props: ['choices', 'value'],
  data () {
    return { anArr: this.value || [] }
  },
  methods: {
    toggle (id) {
      var pos = this.anArr.indexOf(id)
      if (pos === -1) {
        this.anArr.push(id)
      } else {
        this.anArr.splice(pos, 1)
      }
      this.$emit('input', this.anArr)
    }
  },
  watch: {
    value (val) {
      this.anArr = val
    }
  },
  components: { myOption }
}
</script>
