<template>
  <header class="page-header">
    <nuxt-link to="/" exact>
      <logo class="page-header__logo"></logo>
    </nuxt-link>
    <navigation class="page-header__nav"></navigation>
    <div class="acc-nav" v-if="!loggedIn">
      <nuxt-link class="acc-nav__btn" to="/login">Login</nuxt-link>
      <nuxt-link class="acc-nav__btn acc-nav__btn--primary" to="/signup">Signup</nuxt-link>
    </div>
    <account-block class="page-header__account" v-if="loggedIn"></account-block>
  </header>
</template>

<script>
import Navigation from '~/components/layout/headerbar/navigation'
import Logo from '~/components/common/logo'
import AccountBlock from '~/components/layout/headerbar/account-block'

export default {
  name: 'Header',
  components: {
    Navigation,
    Logo,
    AccountBlock
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style lang="stylus" scoped>
$link-color = rgba(#fff,.66)
$link-color--hover =  #fff
$link-color--active = #fff

.page-header
  background $purple linear-gradient(to right, $purple, $blue)
  display flex
  align-items center
  height 60px
  padding 0 15px

.page-header__logo
  +below(3)
    margin-left 0
    position: relative
    z-index: 999

.page-header__button
  display flex
  background transparent
  border 0
  padding 0 15px
  line-height 30px
  font-family $font-dinpro
  font-weight 500
  font-size 14px
  text-transform uppercase
  color hsla(0,0%,100%,.66)
  cursor pointer
  user-select none
  margin-left auto
  &--login
    background #fff
    color #408fec
    border-radius 2px
    box-shadow 0 2px 6px 2px rgba(19,98,191,.5)

.page-header__account
  margin-left auto

.acc-nav
  margin 15px 0
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
</style>
