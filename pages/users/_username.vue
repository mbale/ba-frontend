<template>
  <div class="content profile-content">
    <header class="content-header profile-header">
      <div class="content-header__hero">
        <figure class="content-header__image">
          <img v-bind:src="avatarURL" />
        </figure>
        <div class="content-header__info">
          <h1 class="profile-name">
            {{ profile.username }} <img :src="SteamIcon" alt="">
          </h1>
          <div class="additional">
            <span class="location">
              <img :src="LocationIcon" alt=""> {{ convertCountryCode(profile.countryCode) }}
            </span>
            <span class="registered-on">
              <img :src="CalendarIcon" alt=""> Joined {{ formatDate(profile.registeredOn, 'DD MMMM YYYY') }}
            </span>
          </div>
          <div class="stats">
            <!-- <table class="content__table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>User</th>
                  <th>Tips</th>
                  <th>Profit</th>
                  <th>Yield</th>
                  <th>In</th>
                  <th>Out</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="rankings.length > 0" v-for="(ranking, position) in rankings" :key="position">
                  <td>{{ position + 1 }}</td>
                  <td class="user" @click="redirectToUser(ranking.user.username)">
                    <img class="user-avatar" :src="showUserAvatar(ranking.user.avatar)" alt="">
                    <span class="username">{{ ranking.user.username }}</span>
                  </td>
                  <td v-if="ranking.stats.betCount !== null">{{ ranking.stats.betCount }}</td>
                  <td v-if="ranking.stats.profit !== null">{{ ranking.stats.profit.toFixed(2) }}</td>
                  <td v-if="ranking.stats.yield !== null">{{ ranking.stats.yield }}%</td>
                  <td v-if="ranking.stats.in !== null">{{ ranking.stats.in }}</td>
                  <td v-if="ranking.stats.overall !== null">{{ ranking.stats.overall.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table> -->
          </div>
          <!-- <a href="" class="follow button--primary">Follow</a> -->
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
            <span v-if="index === 0">{{ tab }}</span>

            <!-- FOLLOWERS TAB -->
            <!-- <span v-if="index === 1">{{ predictionsLength }} {{ tab }}</span> -->

            <!-- FOLLOWING TAB -->
            <!-- <span v-if="index === 2">{{ predictionsLength }} {{ tab }}</span> -->
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
      profile: state => state.userToView.profile,
      username: state => state.userToView.profile.username,
      email: state => state.userToView.profile.email,
      registeredOn: state => state.userToView.profile.registeredOn,
      countryCode: state => state.userToView.profile.countryCode,
      avatarURL: state => state.userToView.profile.avatarURL || noAvatarImage,
      predictionsLength: state => state.userToView.predictions.length
      // predictions (state) { // <- this syntax also works
      //   return state.userToView.predictions
      // },
    }),
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

.content-header__hero
  background-color: #1c1e4e
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #000 100%)

.content-header__info
    display: flex
    flex-direction: column
    flex-wrap: wrap
    margin: 0 0 0 20px

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

.predictions-pagination .paginate .pagination
  width: fit-content
  margin-top: 15px
  padding-bottom: 0
</style>
