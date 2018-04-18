<template>
  <nav class="mobile-site-nav" role="navigation">
    <a
      class="hamburger-icon"
      :class="{'hamburger-icon--isOpen': isActive}"
      @click="myFilter"
    >
      <span></span>
      <span></span>
      <span></span>
    </a>
    <div
      class="mobile-nav-container"
      :class="{'mobile-nav-container--isOpen': isActive}"
    >
      <ul class="mobile-site-nav__list">
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
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    myFilter: function () {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="stylus" scoped>
$link-color = rgba(#fff,.66)
$link-color--hover = $link-color
$link-color--active = #fff

.mobile-site-nav
  height 30px
  margin 15px 0
  display none
  +below(3)
    display flex

.mobile-site-nav__list
  display flex
  clear-list()
  overflow visible
  flex-direction: column

.mobile-nav-container
  background linear-gradient(to bottom right, $purple, #3D86E0)
  height 100vh
  position fixed
  left 0
  right 0
  top 0
  z-index 998
  padding-top 60px
  transition: .2s
  transform translateX(-100%)
  will-change transform

  &--isOpen
    transform translateX(0)

.site-nav__item
  float left
  border-top 1px solid rgba(237,237,237,.1)
  padding 20px

.hamburger-icon
  position: relative
  height 50px
  width 50px
  margin-top -10px
  margin-right 10px
  display block
  margin-left auto
  cursor pointer
  transition transform .4s
  z-index: 999

  span
    display block
    height 2px
    left 14px
    width 20px
    background-color #fff
    position: absolute
    left 14px
    top 50%
    transition .4s

    &:first-child
      transform translate(0,-6px)

    &:last-child
      transform translate(0,6px)

.hamburger-icon--isOpen
  transform rotate(90deg)

  span
    &:first-child
      transform rotate(45deg) translate(0,0)
    &:nth-child(2)
      transform scaleX(0)
    &:last-child
      transform rotate(-45deg) translate(0,0)


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
