<template>
  <header class="page-header">
    <nuxt-link to="/" exact>
      <logo class="page-header__logo"></logo>
    </nuxt-link>
    <navigation class="page-header__nav"></navigation>
    <div class="page-header__button page-header__button--login" v-if="!loggedIn" @click="redirectToAuth">Login</div>
    <account-block class="page-header__account" v-if="loggedIn"></account-block>
  </header>
</template>

<script>
import Vue from 'vue'
import Navigation from '~/components/layout/headerbar/navigation'
import Logo from '~/components/common/logo'
import AccountBlock from '~/components/layout/headerbar/account-block'

export default Vue.extend({
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
  },
  methods: {
    redirectToAuth () {
      this.$router.push('/auth')
    }
  }
})
</script>

<style lang="stylus" scoped>

$link-color = rgba(#fff,.66)
$link-color--hover =  #fff
$link-color--active = #fff

.page-header
  // background $purple linear-gradient(to right, $purple, #3D86E0)
  background #3A539B
  display flex
  align-items center
  height 60px
  padding 32px 15px

  &__logo
    +below(3)
      margin-left 0
      position: relative
      z-index: 999

  &__button
    display flex
    background transparent
    border 0
    padding 0 15px
    line-height 30px
    font-family DINPro,Helvetica,sans-serif
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

</style>
