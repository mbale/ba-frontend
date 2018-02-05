<template>
  <div class='matches-con'>
    <div class='page-filter'>
      <ul class="tabs">
        <li class="tab" v-bind:class="{'tab--active': upcomingTabActive }" ref="upcoming" @click="changeTab('upcoming', $event)">
          <span class="text">upcoming</span>
          <span class="counter">{{ matchCount.upcoming }}</span>
        </li>
        <li class="tab" v-bind:class="{'tab--active': !upcomingTabActive }" ref="completed" @click="changeTab('completed', $event)">
          <span class="text">completed</span>
          <span class="counter">{{ matchCount.completed }}</span>
        </li>
      </ul>
    </div>
    <div class='matches'>
      <upcoming-matches v-if="upcomingTabActive" />
      <completed-matches v-else />
      <div class="matches-pagination">
        <!-- PAGINATION -->
        <paginate
          :pageCount="pageCount"
          :changePage="changePage"
          />
      </div>
    </div>
  </div>
</template>

<script>
import Paginate from '~/components/common/paginate'

import matchMixins from '~/mixins/match'

import { format } from 'date-fns'
import UpcomingMatches from '~/components/matches/upcoming-matches'
import CompletedMatches from '~/components/matches/completed-matches'

export default {
  name: 'Matches',
  mixins: [matchMixins],
  components: {
    Paginate,
    UpcomingMatches,
    CompletedMatches
  },
  head () {
    return {
      title: 'Betacle - Matches'
    }
  },
  computed: {
    upcomingTabActive () {
      return this.$store.state.matches.active === 'upcoming'
    },
    cMatchesGroupedByDay () {
      return this.$store.getters['matches/groupCMatchesByDay']
    },
    matchCount () {
      return {
        upcoming: this.$store.state.matches.upcoming.count,
        completed: this.$store.state.matches.completed.count
      }
    },
    pageCount () {
      return Math.ceil(this.matchCount[this.$store.state.matches.active] / 20)
    }
  },
  methods: {
    async changeTab (id) {
      const {
        upcoming,
        completed
      } = this.$refs

      if (!this.$refs[id].classList.contains('tab--active')) {
        upcoming.classList.toggle('tab--active')
        completed.classList.toggle('tab--active')

        await this.$store.commit('matches/set_active_list', {
          active: id
        })
      }
    },
    formatDate (date) {
      return format(new Date(date), 'dddd, MMMM D')
    },
    getMatchURLPath ({homeTeam, awayTeam, date, id}) {
      return {
        path: `${id}/${this.buildMatchURLSegment(homeTeam, awayTeam)}`
      }
    },
    async changePage (page) {
      const activeTab = this.$store.state.matches.active
      await this.$store.dispatch('matches/fetch', {
        page,
        statusType: activeTab
      })
    }
  },
  async asyncData ({ store, route }) {
    await Promise.all([
      store.dispatch('matches/fetch', {
        statusType: 'upcoming'
      }),
      store.dispatch('matches/fetch', {
        statusType: 'completed'
      }),
      store.dispatch('games/fetchAll', {})
    ])
  }
}
</script>

<style lang="stylus">
.matches-con
  display flex
  flex-direction column
  width 100%

.matches
  padding: 20px 40px

.page-filter
  background #fff

.tabs
  display flex
  margin-right auto
  list-style none
  user-select none
  text-transform uppercase
  margin-bottom 20px

  .tab
    font-size 1em
    font-weight 700
    // padding 12px 0px
    margin-right 20px
    .text
      margin-right 5px
      padding 5px
    .counter
      padding 5px
      background-color #F3F4F3
      border 1px solid #F3F4F3
      color #95A0AD
    &--active
      .text
        color #E84449
      .counter
        background-color #E84449
        border 1px solid #E84449
        color white

  &__list
    display flex
    flex-direction column

    .timestamp
      font-size 1em
      font-weight 700
      margin 20px 0px

    .row
      color #6C7A89
      // border-bottom 2px solid #EDF0F1
      +below(800px)
        margin 6px 0px

    .match
      display flex
      align-items center
      justify-content space-between
      max-height 62px
      min-height 62px
      margin 5px

      .game
        display flex
        flex-direction column
        justify-content center
        min-width 52px
        padding 10px

        .image
          max-width 44px

      .date
        padding 10px
        flex-grow 0

      .league
        // padding 20px
        flex-grow 1
        display flex
        justify-content flex-start

      .teams
        display flex
        flex-direction row
        flex-grow 1
        justify-content center
        min-width 30%
        max-width 30%

        +below(1100px)
          flex-direction column
          justify-content center
          align-items center

        .team
          display flex
          flex-direction row
          flex-wrap wrap
          justify-content center
          align-items center
          margin 0px 5px
          font-weight 500

.matches-pagination
  display flex
  justify-content: center
  margin 20px 0

</style>
