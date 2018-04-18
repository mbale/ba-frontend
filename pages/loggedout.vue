<template>
  <div class='loggedout-page'>
    <h1 class='loggedout-page__text'>You are now logged out. We hope to see you again soon!</h1>
    <nuxt-link to='/login' class='loggedout-page__login-btn'>Want to log in again?</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'LoggedoutPage'
}
</script>

<style lang="stylus" scoped>
  .loggedout-page
    margin 40px
    text-align center

  .loggedout-page__text
    font-size 16px

  .loggedout-page__login-btn
    text-align center
    border-radius 2px
    font-size 14px
    user-select none
    font-weight bold
    cursor pointer
    background-color transparent
    border 1px solid $purple
    color $purple
    display inline-block
    margin-top 15px
    padding 10px 15px
    &:hover
      color $purple
    &:active
      transform scale(.98)
</style>
