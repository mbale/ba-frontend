<template>

  <div class="content">
    <header class="content-header">
      <div class="content-header__hero">
        <figure class="content-header__image">
          <img v-bind:src="avatarURL" />
        </figure>
        <div class="content-header__info">
          <h1 class="content-header__title">{{ profile.username }}</h1>
          <div class="bookmaker-header__meta">
            <div class="trophy trophy--exclusive">
              <img src="~/assets/images/bookmaker/esports-exclusive.svg" alt="Esports Exclusive"> Esports exclusive
            </div>
          </div>
          <div class="content-header__actions">
          </div>

        </div>
      </div>
      <div class="toolbar toolbar--with-avatar">
        <tabs>
          <tab
            v-for="(tab, key, index) in tabs"
            :key="key"
            :class="{'tab--active': currentTab === index}"
            ref="upcoming"
            @click.native="currentTab = index"
          >
            <!-- PREDICTIONS TAB -->
            <span v-if="index === 0">{{ predictionsLength }} {{ tab }}</span>

            <!-- FOLLOWERS TAB -->
            <span v-if="index === 1">{{ predictionsLength }} {{ tab }}</span>

            <!-- FOLLOWING TAB -->
            <span v-if="index === 2">{{ predictionsLength }} {{ tab }}</span>
          </tab>
        </tabs>
      </div>
    </header>
  </div>





  <!-- <div class="profile-container">
    <header class="profile-head">
      <div class="profile-image">
        <img class="avatar img-responsive" v-bind:src="avatarURL">
      </div>
      <div class="information">
        <h1 class="profile-name">
          {{ profile.username }} <img :src="SteamIcon" alt="">
        </h1>
        <div class="additional">
          <span class="location">
            <img :src="LocationIcon" alt=""> United Kingdom
          </span>
          <span class="registered-on">
            <img :src="CalendarIcon" alt=""> Joined {{ profile.registeredOn.split('T')[0] }}
          </span>
        </div>
        <a href="" class="follow button--primary">Follow</a>
      </div>
    </header>
      <tabs>
        <tab
          v-for="(tab, key, index) in tabs"
          :key="key"
          :class="{'tab--active': currentTab === index}"
          ref="upcoming"
          @click.native="currentTab = index"
        >
          <!-- PREDICTIONS TAB
          <span v-if="index === 0">{{ predictionsLength }} {{ tab }}</span>

          <!-- FOLLOWERS TAB
          <span v-if="index === 1">{{ predictionsLength }} {{ tab }}</span>

          <!-- FOLLOWING TAB
          <span v-if="index === 2">{{ predictionsLength }} {{ tab }}</span>
        </tab>
      </tabs>
  </div> -->

</template>

<script>
import Vue from 'vue'
import dateMixin from '~/mixins/date'
import noAvatarImage from '~/assets/images/no_avatar.png'
import Flag from 'vue-flag-icon/components/icon/Flag.vue'
import 'vue-awesome/icons/wrench'
import 'vue-awesome/icons/upload'
import Icon from 'vue-awesome/components/Icon'

import LocationIcon from '~/assets/images/misc/location.svg'
import CalendarIcon from '~/assets/images/misc/calendar.svg'
import SteamIcon from '~/assets/images/misc/steam.svg'

// import noAvatarImage from '~/assets/images/no_avatar.png'
import { Tabs, Tab } from '~/components/common/tabs'

export default Vue.extend({
  name: 'Profile',
  mixins: [dateMixin],
  data () {
    return {
      currentTab: 0,
      tabs: {
        first: 'Predictions',
        second: 'Followers',
        third: 'Following'
      },
      noAvatarImage,
      LocationIcon,
      CalendarIcon,
      SteamIcon
    }
  },
  components: {
    Flag,
    Icon,
    Tabs,
    Tab
  },
  computed: {
    user () {
      console.log(this.$store.state.user)
      return this.$store.state.user
    },
    profile () {
      console.log(this.user.profile)
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
    },
    predictionsLength () {
      return this.user.predictions.length
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


.bookmaker__header
  flex 0 0 100%
  background-color #1c1e4e

.bookmaker-header__meta
  margin-top: 4px
  display: inline-flex
  vertical-align: middle
  align-items: center

.trophy
  text-transform uppercase
  color $white
  font-size 11px
  background-color #000
  display inline-block
  padding 5px 10px
  font-weight bold
  vertical-align middle
  user-select none
  margin 0 10px
  border-radius 40px
  background-image linear-gradient(to bottom, rgba(#000,0) 50%, rgba(#000,0.05) 50%);

.trophy--exclusive
  background-color #9C00C3






// Bookmaker content styles
.profile-container
    max-width: 1440px
    width: 100%
    background-color: transparent
    margin-bottom: 30px
    padding: 0 15px

    .tabs
        padding-left: 200px
        background-color: white

    .profile-head
        background-color: #131541
        box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5)
        max-height: 160px
        height: 160px
        padding-top: 30px
        padding-left: 180px
        position: relative

        .profile-image
            border-radius: 2px
            display: block
            position: absolute
            left: 20px
            bottom: -22px
            width: 160px
            height: 160px
            overflow: hidden

            img
                max-width: none
                width: 100%
                height: auto
                border-radius: 0
                position: relative
                top: 50%
                transform: translateY(-50%)

        .information
            display: flex
            flex-direction: column
            flex-wrap: wrap
            margin: 0 0 20px 20px

            .additional
                margin-top: 10px

                span
                    color: white
                    font-size: 14px
                    font-weight: 500

                    &:nth-child(2)
                        margin-left: 15px

            .profile-name
                font-size: 20px
                color: white
                font-weight: bold

                img
                    margin-left: 5px

            .follow
                background-color: $blue
                color: white
                padding: 10px 50px
                margin-top: 15px
                border-radius: 4px
                width: fit-content


</style>
