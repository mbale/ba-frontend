<template>
  <div class="layout">
    <header-bar></header-bar>
    <main class="page-body">
      <nuxt />
    </main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderBar from '~/components/layout/headerbar/header-bar'
import FooterBar from '~/components/layout/footer-bar'

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
  justify-content center
  flex 1

.page-body__main
  flex 1
  position relative

.main-container
  display flex
  flex-direction: column

.main-body
  flex-grow 1
  height 100%

.main-sidebar
  width 340px
  flex 0 0 340px
  padding 20px
  background #fff
  +below(4)
    display none

.sidebar-wrapper
  display: flex
  flex-direction row
  +below(3)
    flex-direction: column
  .content
    flex 0 1 100%


.content-aside
  flex 0 1 300px
  padding 30px 0 30px 30px
  +below(3)
    flex 0 0 100%
    padding 20px 20px 0 20px



</style>
