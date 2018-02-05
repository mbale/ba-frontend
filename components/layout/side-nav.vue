<template>
  <section class="side-nav">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'SideNav'
}
</script>

<style lang="stylus" scoped>
$link-color = $mgray
$link-color--active = $purple

.side-nav
  background #fff

.side-nav__list
  clear-list()
  overflow visible

.side-nav__item
  display block

.side-nav__link
  display block
  text-transform uppercase
  line-height 30px
  padding 8px 15px
  font-weight bold
  font-size 13px
  user-select none
  color $link-color
  border-left: 3px solid transparent
  &:active
    color $link-color--active

.side-nav__link--active
  color $link-color--active
  border-left-color $link-color--active
  &:hover
    color currentColor
</style>
