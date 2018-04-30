<template>
  <div class="content profile-content">
    <header class="content-header profile-header">
      <div class="content-header__hero">
        <figure class="content-header__image">
          <img v-bind:src="profile.avatar || avatarURL" />
        </figure>
        <div class="content-header__info">
          <div class="account-info">
            <h1 class="profile-name">
              {{ profile.username }}
              <a :href="`${userSteamProvider.profileURL}`" target="_blank">
                <img v-if="hasSteamProvider" :src="SteamIcon" alt="">
              </a>
            </h1>
            <div class="additional">
              <span class="location">
                <img :src="LocationIcon" alt=""> {{ convertCountryCode(profile.countryCode) }}
              </span>
              <span class="registered-on">
                <img :src="CalendarIcon" alt=""> Joined {{ formatDate(profile.registeredOn, 'DD MMMM YYYY') }}
              </span>
            </div>
          </div>
          <div class="stats">
            <table class="content__table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Tips</th>
                  <th>Hit Rate</th>
                  <th>Profit</th>
                  <th>Yield</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>4</td>
                  <td>50%</td>
                  <td>+115.5</td>
                  <td>33%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="toolbar toolbar--with-avatar username-tabs">
        <tabs>
          <tab
            v-for="(tab, key, index) in tabs"
            :key="key"
            :class="[currentTab === index ? 'tab--active' : '', index === 0 ? 'tab--show': '']"
            ref="upcoming"
            @click.native="currentTab = index"
          >
            <!-- PREDICTIONS TAB -->
            <span v-if="index === 0">{{ tab }}</span>

            <!-- FOLLOWERS TAB DISPLAYING NONE -->
            <!-- <span v-if="index === 1" :style="{ 'display': 'none' }">{{ predictionsLength }} {{ tab }}</span> -->

            <!-- FOLLOWING TAB DSIPLAYING NONE -->
            <!-- <span v-if="index === 2" :style="{ 'display': 'none' }">{{ predictionsLength }} {{ tab }}</span> -->
          </tab>
        </tabs>
      </div>
    </header>

    <div class="content-body profile-body">
      <div v-show="currentTab === 0" class="predictions">
        <predictions :predictions="predictionsToShow" />
        <div class="predictions-pagination" v-if="predictionsLength > 0">
          <!-- PAGINATION -->
          <paginate ref="paginate" :force-page='page' :pageCount="pageCount" :changePage="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import { createNamespacedHelpers } from 'vuex'
import dateMixin from '~/mixins/date'
import noAvatarImage from '~/assets/images/no_avatar.png'
import Flag from 'vue-flag-icon/components/icon/Flag.vue'
import 'vue-awesome/icons/wrench'
import 'vue-awesome/icons/upload'

import Icon from 'vue-awesome/components/Icon'
import LocationIcon from '~/assets/images/misc/location.svg'
import CalendarIcon from '~/assets/images/misc/calendar.svg'
import SteamIcon from '~/assets/images/misc/steam.svg'

import Paginate from '~/components/common/paginate'
import { Tabs, Tab } from '~/components/common/tabs'
import Box from '~/components/common/box'
import Predictions from '~/components/profile/predictions/predictions'
import countryMixin from '~/mixins/country'
const { mapState, mapMutations } = createNamespacedHelpers('users')

export default Vue.extend({
  name: 'PublicProfile',
  mixins: [dateMixin, countryMixin],
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
    Tab,
    Box,
    Predictions,
    Paginate
  },
  computed: {
    ...mapState({
      user: 'userToView',
      // profile: state => state.userToView.profile,
      username: state => state.userToView.profile.username,
      email: state => state.userToView.profile.email,
      registeredOn: state => state.userToView.profile.registeredOn,
      countryCode: state => state.userToView.profile.countryCode,
      avatarURL: state => state.userToView.profile.avatarURL || noAvatarImage,
      predictionsLength: state => state.userToView.predictions.length,
      profile (state) { // <- this syntax also works (great for debugging!)
        console.log(state.userToView.profile)
        return state.userToView.profile
      }
    }),
    userSteamProvider () {
      console.log(this.$store.getters['user/userSteamProvider'])
      return this.$store.getters['user/userSteamProvider']
    },
    hasSteamProvider () {
      return this.$store.getters['user/hasSteamProvider']
    },
    predictionsPerPage () {
      return this.$store.state.users.predictionsPerPage
    },
    page () {
      // vue-paginate force-page prop requires index - 1
      return this.$store.state.users.page > 1 ? this.$store.state.users.page - 1 : 0
    },
    pageCount () {
      return Math.ceil(this.predictionsLength / this.predictionsPerPage)
    },
    predictionsToShow () {
      console.log(this.$store.getters['users/predictionsToShow'])
      return this.$store.getters['users/predictionsToShow']
    }
  },
  methods: {
    ...mapMutations([
      'update_page'
    ]),
    async changePage (page) {
      this.update_page({ page: page })
    }
  },
  async fetch ({ store, params, error }) {
    const { username } = params
    await store.dispatch('users/fetchByUsername', { username })
  }
})
</script>

<style lang="stylus" scoped>

.username-tabs .tabs
  +below(3)
    margin-left auto

  .tab:not(.tab--show)
    display none

.content-header__hero
  background-color: #1c1e4e
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #000 100%)
  +below(970px)
    height: 170px
  +below(3)
    align-items: center
    flex-direction: column
    height: 355px

.content-header__info
  display: flex
  flex-direction: row
  flex-wrap: wrap
  margin: 0 0 0 20px
  +below(970px)
    flex-direction: column-reverse
  +below(3)
    margin: 0 0 15px 0
    justify-content: flex-end
    text-align: center
    flex-direction: row
    margin-top: 45px

  .account-info
    margin-top: 10px
    +below(3)
      margin: 10px auto 0 auto

  .stats
    margin-bottom: -10px
    margin-left: 35px
    margin-top: 1px
    color: white
    +below(970px)
      margin-left: 0
      margin-bottom: -5px
    +below(3)
      margin: 10px auto -5px auto

    table
      width auto

      tr
        background transparent

      th, td
        text-align center
        padding 8px 20px
        +below(3)
          padding 8px 15px
        +below(385px)
          padding 8px 10px
        +below(330px)
          padding 8px

        &:first-child
          +below(970px)
            padding-left 0
          +below(3)
            padding-left 15px
          +below(385px)
            padding-left 10px
          +below(330px)
            padding-left 10px

      td
        font-size 16px

  .additional
    margin-top: 10px
    +below(3)
      margin-top: 15px

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

.predictions-pagination .paginate .pagination
  width: fit-content
  margin-top: 15px
  padding-bottom: 0
</style>
