<template>
  <div class="notfound">
    <h1 class='notfound__title'>{{ statusCode }}</h1>
    <p class='notfound__p'>{{ message }}</p>
    <div class='notfound_links'>
      <a class='notfound__link' href='mailto:hello@betacle.com'>Report This</a>
      <nuxt-link class='notfound__link notfound__link--cta' to='/'>Return Home</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head () {
    return {
      title: 'Not Found - Betacle'
    }
  },
  computed: {
    statusCode () {
      return this.error.statusCode || 500
    },
    message () {
      return this.error.message || `Something terrible happened`
    }
  }
}
</script>

<style lang="stylus" scoped>
.notfound
  background-image linear-gradient(rgba($purple, .9),rgba($purple, .9)), url("~/assets/images/crying-dawson.gif")
  background-repeat no-repeat
  background-size 100% 100%
  color $white
  flex-grow 1
  justify-content center
  align-items center
  display flex
  flex-direction column

.notfound__title
  font-weight 700
  font-size 80px
  color $white

.notfound__p
  font-size 18px
  margin 0 0 40px 0

.notfound__link
  color $white
  display inline-block
  user-select none
  padding 10px 25px
  &:hover
    text-decoration underline
    color inherit

.notfound__link--cta
  color $purple
  background $white
  &:hover
    text-decoration none
    color $purple
  &:active
    transform scale(.98)
</style>
