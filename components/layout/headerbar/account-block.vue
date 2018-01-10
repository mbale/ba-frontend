<template>
  <div class="account-block" @click="toggleMenu">
    <div class="account-block__avatar">
      <img class="image" v-bind:src="user.profile.avatar">
    </div>
    <span class="account-block__username">{{ user.profile.username }}</span>
    <div class="account-block__icon">
      <icon name="chevron-down" scale="0.8"></icon>
    </div>
    <dropdown v-show="dropdown">
      <div slot="item">
        <span class="text">Profile</span>
      </div>
      <div slot="item">
        <span class="text">Settings</span>
      </div>
      <div slot="item">
        <span class="text">Sign out</span>
      </div>
    </dropdown>
  </div>
</template>

<script>
import Vue from 'vue'
import Dropdown from '~/components/common/dropdown'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/chevron-down'

export default Vue.extend({
  name: 'AccountBlock',
  components: {
    Icon,
    Dropdown
  },
  data () {
    return {
      dropdown: false
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    toggleMenu () {
      this.dropdown = !this.dropdown
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
    display flex
    max-height 42px
    max-width 42px
    margin-right 5px
    border-radius 50%
    overflow hidden

    .image 
      max-width 100%
      height auto

  &__username
    display inline-flex
    flex-direction column
    justify-content center
    margin 6px 6px 6px 8px

  &__icon
    display inline-flex
    flex-direction column
    justify-content center
    margin 8px 10px 6px 5px


</style>
