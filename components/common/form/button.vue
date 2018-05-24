<template>
  <div class="btn" v-bind:class="[`btn--${type}`]" @click="clickOnButton">{{ text }}</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Button',
  props: {
    type: {
      type: String,
      required: false,
      default: 'primary'
    },
    text: {
      type: String,
      required: false,
      default: 'Send'
    }
  },
  methods: {
    clickOnButton (e) {
      this.$emit('click', e)
    }
  }
})
</script>

<style lang="stylus" scoped>
.btn
  padding 10px 20px
  text-align center
  border-radius 2px
  font-size 14px
  user-select none
  font-weight bold
  color #fff
  border: 1px solid transparent
  padding 10px 30px

  &--disabled
    background-color #d8d8d8
    cursor inherit

  &--primary
    background-color #408fec
    cursor pointer
</style>
