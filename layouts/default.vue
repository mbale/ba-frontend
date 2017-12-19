<template>
  <div class="layout">
    <header-bar></header-bar>
    <nuxt class="page-body"/>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderBar from '~/components/layout/headerbar/HeaderBar.vue'
import FooterBar from '~/components/layout/FooterBar.vue'

export default Vue.extend({
  name: 'MainLayout',
  components: {
    HeaderBar,
    FooterBar
  },
  data () {
    return {

    }
  }
})
</script>


<style lang="stylus">
*, *:before, *:after
  box-sizing inherit

body, h1, h2, h3, h4, h5, h6, p, blockquote, pre, dl, dd, ol, ul, form, fieldset, legend, figure, table, th, td, caption, hr
  margin 0
  padding 0

html
  box-sizing border-box
  min-height 100%
  background-color $color-bg

body
  font-weight 300
  font-family $font-opensans
  font-size 15px
  color $color-font
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

.layout
  display flex
  min-height 100vh
  flex-direction column

.wrapper
  max-width 1180px
  margin 0 auto

a
  transition all .15s ease-in-out
  color $blue
  text-decoration none
  &:hover
    color darken($blue, 15%)

figure img
  display block

*:focus
  outline none

.page-body
  display flex
  flex 1

.page-body__main
  flex 1
  position relative


</style>
