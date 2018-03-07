<template>
  <div class="profile panel">
    <div class="profile__details col">
      <!-- DETAILS -->
      <div class="basic">
        <!-- DATA -->
        <div class="avatar">
          <img class="image" v-bind:src="avatarURL" alt="">
        </div>
        <div class="info">
          <span class="username">{{ username }}</span>
          <span class="registered-on">{{ registeredOn }}</span>
          <span class="registered-on">
            <flag :iso="countryCode" />
          </span>
        </div>
        <!-- SETTINGS -->
        <div class="settings col">
          <div class="row">
            <span class="change-avatar"></span>
            <span class="change-basic"></span>
          </div>
        </div>
      </div>
      <!-- STATISTICS -->
      <div class="row">

      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import noAvatarImage from '~/assets/images/no_avatar.png'
import Flag from 'vue-flag-icon/components/icon/Flag.vue'

export default Vue.extend({
  name: 'Profile',
  components: {
    Flag
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    profile () {
      return this.user.profile
    },
    username () {
      return this.profile.username
    },
    email () {
      return this.profile.email
    },
    registeredOn () {
      return this.profile.registeredOn
    },
    countryCode () {
      return this.profile.countryCode
    },
    avatarURL () {
      return this.profile.avatar || noAvatarImage
    }
  },
  async asyncData (context) {
    if (!context.store.state.user.profile) {
      context.redirect('/')
    }
  }
})
</script>

<style lang="stylus">

.profile
  padding 40px
  min-width 60%

  &__details
    display flex

    .basic
      display flex
      align-items flex-start

      .avatar
        display flex
        align-items flex-start
        justify-content flex-start
        flex-basis 20%

        .image
          max-width 100%
          border-radius 50%

      .info
        display flex
        flex-direction column
        align-items flex-start
        justify-content center
        flex-basis 75%
        padding 20px 25px

        .username
          display flex
          justify-content flex-start
          font-size 2em
          color #1F1F26
          // margin-bottom 12px

</style>
