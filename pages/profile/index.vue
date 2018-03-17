<template>
  <div class="profile">
    <div class="profile__details panel">
      <!-- DETAILS -->
      <div class="basic">
        <!-- DATA -->
        <div class="avatar">
          <img class="image" v-bind:src="avatarURL" alt="">
        </div>
        <div class="info">
          <span class="username">{{ username }}</span>
          <!-- <span class="registered-on">{{ sinceDate(registeredOn) }}</span> -->
          <span class="country">
            <flag class="flag" :size="2" :iso="countryCode" />
          </span>
        </div>
        <!-- SETTINGS -->
        <div class="settings">
          <div class="change-avatar">
            <icon name="upload" :scale="1"></icon>
          </div>
          <div class="change-basic">
            <icon name="wrench"></icon>
          </div>
        </div>
      </div>
      <!-- STATISTICS -->
      <!-- <div class="stat">
      </div> -->
    </div>
    <div class="profile__predictions panel">
      <div v-bind:key="p.id" v-for="p of predictions">
        {{ p.text }}
        {{ p.stake }}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import dateMixin from '~/mixins/date'
import noAvatarImage from '~/assets/images/no_avatar.png'
import Flag from 'vue-flag-icon/components/icon/Flag.vue'
import 'vue-awesome/icons/wrench'
import 'vue-awesome/icons/upload'
import Icon from 'vue-awesome/components/Icon'

export default Vue.extend({
  name: 'Profile',
  mixins: [dateMixin],
  components: {
    Flag,
    Icon
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
    },
    predictions () {
      return this.user.predictions
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
    flex-direction column

    .basic
      display flex
      align-items center
      padding 5px

      .avatar
        display flex
        align-items flex-start
        justify-content flex-start
        flex-basis 15%

        .image
          min-width 100px
          max-width 100%
          border-radius 50%

      .info
        display flex
        flex-direction column
        align-items flex-start
        justify-content center
        flex-basis 75%
        padding-left 25px

        > *
          margin-bottom 4px

        .username
          display flex
          justify-content flex-start
          font-size 2em
          color #1F1F26
          // margin-bottom 12px

        .country
          font-size 1.2em

      .settings
        display flex
        flex-direction column
        justify-content flex-end
        align-items flex-end
        flex-basis 10%

        > *
          margin 8px 0px

</style>
