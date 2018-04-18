<template>
  <nav class="site-nav" role="navigation">
    <ul class="site-nav__list">
      <li class="site-nav__item">
        <nuxt-link class="site-nav__link" active-class="site-nav__link--active" to="/matches">Matches</nuxt-link>
      </li>
      <li class="site-nav__item">
        <nuxt-link class="site-nav__link" active-class="site-nav__link--active" to="/rankings">Rankings</nuxt-link>
      </li>
      <li class="site-nav__item">
        <nuxt-link class="site-nav__link" active-class="site-nav__link--active" to="/bookmakers">Bookmakers</nuxt-link>
      </li>
      <li class="site-nav__item">
        <nuxt-link class="site-nav__link" active-class="site-nav__link--active" to="/games">Games</nuxt-link>
      </li>
      <li class="site-nav__item">
        <nuxt-link class="site-nav__link" active-class="site-nav__link--active" to="/guides">Guides</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
$link-color = rgba(#fff,.66)
$link-color--hover = $link-color
$link-color--active = #fff

.site-nav
  display flex
  height 30px
  margin 15px 0
  +below(3)
    display none

.site-nav__list
  display flex
  clear-list()
  overflow visible

.site-nav__item
  float left
  border-right 1px solid rgba(237,237,237,.1)
  &:last-child
    border 0

.site-nav__link
  display block
  padding 0 15px
  line-height 30px
  font-family $font-dinpro
  font-weight 500
  font-size 14px
  text-transform uppercase
  color $link-color
  user-select none
  &:hover
    color $link-color--hover
  &:active
    color $link-color--active

.site-nav__link--active
  color $link-color--active
  &:hover
    color $link-color--active
</style>
