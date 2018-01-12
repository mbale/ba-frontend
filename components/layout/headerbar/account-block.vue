<template>
  <div class="account-block" @click="toggleMenu">
    <nuxt-link tag="div" class="account-block__avatar" :to="{ path: '/profile' }">
      <span class="text">{{ username }}</span>
      <icon name="user" scale="1.4"></icon>
    </nuxt-link>
    <div class="account-block__logout" @click="signout">
      <icon name="sign-out" scale="1.4"></icon>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Dropdown from '~/components/common/dropdown'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/chevron-down'
import 'vue-awesome/icons/cog'
import 'vue-awesome/icons/sign-out'
import 'vue-awesome/icons/user'

export default Vue.extend({
  name: 'AccountBlock',
  components: {
    Icon,
    Dropdown
  },
  data () {
    return {
      dropdownState: true
    }
  },
  computed: {
    username () {
      return this.$store.state.auth.user.profile.username
    }
  },
  methods: {
    toggleMenu () {
      this.dropdownState = !this.dropdownState
    },
    async signout () {
      await this.$store.dispatch('auth/logout', {})
    }
  }
})
</script>

<style lang="stylus">

.account-block
  user-select none
  display flex
  justify-content center
  align-items center
  color white
  font-family "DINPro", Helvetica, sans-serif
  font-size 16px

  &__avatar
    color rgba(255, 255, 255, .66)
    display flex
    margin-right 10px
    overflow hidden
    border-right 1px solid rgba(237, 237, 237, .5)
    padding-right 10px

    &:hover
      color white

    .text
      letter-spacing 1px
      font-weight 500
      margin-right 10px

    .image 
      max-width 100%
      height auto

  &__username
    color rgba(255, 255, 255, .66)
    display flex
    flex-direction column
    justify-content center
    margin 6px 6px 6px 8px
    line-height 30px
    font-weight 500

  &__settings
    display flex
    color rgba(255, 255, 255, .66)
    padding-right 20px
    margin-right 20px
    border-right 1px solid rgba(237, 237, 237, .5)

    &:hover
      color white

  &__logout
    display flex
    color rgba(255, 255, 255, .66)

    &:hover
      color white


</style>
