<template>
  <div class="layout">
    <header-bar />
    <main class="page-body">
      <nuxt />
    </main>
    <footer-bar />
  </div>
</template>

<script>
import HeaderBar from '~/components/layout/headerbar/header-bar'
import FooterBar from '~/components/layout/footer-bar'

export default {
  name: 'MainLayout',
  components: {
    HeaderBar,
    FooterBar
  }
}
</script>


<style lang="stylus">
// main.styl
@import '~vuetify/src/stylus/main' 

html
  box-sizing border-box
  min-height 100%
  background-color $color-bg

body
  font-weight 300
  font-family $font-opensans
  font-size 15px
  word-spacing 1px
  color $color-font
  text-size-adjust 100%
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

.layout
  display flex
  min-height 100vh
  flex-direction column
  background-color #F1F3F8

.wrapper
  max-width 1180px
  margin 0 auto
  padding 0 15px


</style>
