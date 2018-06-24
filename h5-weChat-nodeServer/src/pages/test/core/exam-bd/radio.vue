<template>
  <ul class="option-list">
    <myOption
      :key="item.id"
      :order="index"
      :content="item.content"
      :state="item.id === anArr[0] ? 1: 0"
      v-for="(item, index) in choices"
      @click.native="selectHandler(item.id)"
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
    selectHandler (id) {
      this.anArr = [id]
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
