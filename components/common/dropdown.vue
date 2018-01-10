<template>
  <div class="dropdown">
    <slot class="dropdown__item" name="item"></slot>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Dropdown'
})
</script>

<style lang="stylus">

.dropdown
  display flex
  flex-direction column
  position absolute
  background #1F3A93
  border 1px solid #446CB3
  top 65px
  right 0px
  padding 10px

  &__item
    display flex
    justify-content row
    justify-content space-between

</style>
