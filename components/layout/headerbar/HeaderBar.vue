<template>
  <header class="page-header">
    <nuxt-link to="/" exact>
      <logo class="page-header__logo"></logo>
    </nuxt-link>
    <navigation></navigation>
  </header>  
</template>

<script>
import Vue from 'vue'
import Navigation from '~/components/layout/headerbar/Navigation.vue'
import Logo from '~/components/common/Logo.vue'

export default Vue.extend({
  name: 'Header',
  components: {
    Navigation,
    Logo
  }
})
</script>

<style lang="stylus" scoped>

$link-color = rgba(#fff,.66)
$link-color--hover =  #fff
$link-color--active = #fff

.page-header
  background $purple linear-gradient(to right, $purple, #3D86E0)
  display flex
  align-items center
  height 60px

.page-header__logo
  margin-left 15px
  +below(3)
    margin-left 0
    position: relative
    z-index: 999

// Account Nav Logged Out
.acc-nav
  padding 15px
  margin-left auto
  position relative
  z-index: 999

.acc-nav__btn
  display inline-block
  background transparent
  border 0
  padding 0 15px
  line-height 30px
  font-family $font-dinpro
  font-weight 500
  font-size 14px
  text-transform uppercase
  color $link-color
  cursor pointer
  user-select none
  &:hover
    color $link-color--hover
  &:active
    color $link-color--active
  &:focus
    outline none

.acc-nav__btn--primary
  background #fff
  color $blue
  border-radius 2px
  box-shadow 0 2px 6px 2px rgba(darken($blue, 30%), 0.5)
  &:hover, &:active
    color $blue
  &:active
    transform scale(.98)

// Account Nav Logged In
.acc-loggedin--toggled
  .acc-profile:after
    transform rotate(180deg)
  .acc-dropdown
    opacity 1
    visibility: visible

.acc-profile
  display inline-block
  display flex
  align-items center
  cursor pointer
  &:after
    content ''
    width 0
    height 0
    border 6px solid transparent
    border-top-width 6px
    border-bottom-width 0
    border-top-color #fff
    transition all .25s
    margin-left 10px

.acc-profile__avatar
  height 30px
  width 30px
  user-select none

.acc-dropdown
  position: absolute
  top: 100%
  right: 0
  min-width: 150px
  background: $purple
  transition: opacity .1s
  opacity 0
  visibility: hidden
  z-index: 1
  will-change opacity, visibility
  nav
    padding 20px

.acc-dropdown__link
  font-family: $font-dinpro
  font-size: 13px
  text-transform: uppercase
  color $link-color
  font-weight: 500
  user-select none
  display: block
  white-space: nowrap
  cursor: pointer
  &:hover
    color $link-color--hover
  &:active
    color $link-color--active
  & ~ .acc-dropdown__link
    margin-top 15px

.acc-dropdown__seperator
  border: 0
  height 1px
  background: rgba(237,237,237,0.1)
  display: block
  margin: 15px 0


</style>
