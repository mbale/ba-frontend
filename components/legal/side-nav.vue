<template>
  <section class="side-nav">
    <ul className='side-nav__list'>
      <li className='side-nav__item'>
        <nuxt-link to='/legal/terms' class="side-nav__link" active-class="side-nav__link--active">Terms of Use</nuxt-link>
      </li>
      <li className='side-nav__item'>
        <nuxt-link to='/legal/privacy' class="side-nav__link" active-class="side-nav__link--active">Privacy Policy</nuxt-link>
      </li>
      <li className='side-nav__item'>
        <nuxt-link to='/legal/cookies' class="side-nav__link" active-class="side-nav__link--active">Cookies</nuxt-link>
      </li>
    </ul>
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
