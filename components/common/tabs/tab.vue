<template>
  <div class="tab">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus">
  .tab
    user-select none
    padding 15px
    font-weight 700
    text-transform uppercase
    font-size 14px
    cursor pointer
    color $dgray
    display block

  .tab--active
    color $purple
    border-bottom 3px solid $purple
</style>
