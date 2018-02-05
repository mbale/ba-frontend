<template>
  <div class="dropdown">
    <slot class="dropdown__item" name="item"></slot>
  </div>
</template>

<script>
export default {
  name: 'Dropdown'
}
</script>

<style lang="stylus" scoped>

.dropdown
  display flex
  flex-direction column
  width 128px
  position absolute
  background #1F3A93
  border 1px solid #446CB3
  top 65px
  right 0px

.dropdown__item
  display flex
  justify-content row
  justify-content center
  padding 12px
  &:first-child
    padding-bottom 0px
    padding-top 12px
  &:last-child
    padding-top 0px
    padding-bottom 12px

</style>
