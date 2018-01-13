<template>
  <div class="profile content-panel">
    <div class="profile__header">
      <h1 class="welcome">
        <span class="text">Hello, </span>
        <span class="username">{{ username }}</span>
      </h1>
    </div>
    <div class="avatar">
      <img v-bind:src="avatar">
    </div>
    <div class="bio"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import noAvatarImage from '~/assets/images/no_avatar.png'

export default Vue.extend({
  name: 'Profile',
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    username () {
      return this.user.profile.username
    },
    avatar () {
      return this.user.avatar || noAvatarImage
    }
  },
  async asyncData (context) {
    if (!context.store.state.auth.user) {
      context.redirect('/')
    }
  }
})
</script>

<style lang="stylus">

.profile
  padding 50px
  &__header
    display flex

</style>
