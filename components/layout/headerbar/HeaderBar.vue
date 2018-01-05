<template>
  <header class="page-header">
    <nuxt-link to="/" exact>
      <logo class="page-header__logo"></logo>
    </nuxt-link>
    <navigation class="page-header__nav"></navigation>
    <auth-block class="page-header__auth"></auth-block>
  </header>
</template>

<script>
import Vue from 'vue'
import Navigation from '~/components/layout/headerbar/Navigation.vue'
import Logo from '~/components/common/Logo.vue'
import AuthBlock from '~/components/layout/headerbar/auth-block'

export default Vue.extend({
  name: 'Header',
  components: {
    Navigation,
    Logo,
    AuthBlock
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
  padding 5px 10px 5px 10px

  .page-header__logo
    margin-left 15px
    +below(3)
      margin-left 0
      position: relative
      z-index: 999

</style>
