<template>
  <div class="matches content-panel">
    <ul class="matches__tabs">
      <li class="tab" v-bind:class="{'tab--active': upcomingTabActive }" ref="upcoming" @click="changeTab('upcoming', $event)">
        <span class="text">upcoming</span>
        <span class="counter">{{ matchCount.upcoming }}</span>
      </li>
      <li class="tab" v-bind:class="{'tab--active': !upcomingTabActive }" ref="completed" @click="changeTab('completed', $event)">
        <span class="text">completed</span>
        <span class="counter">{{ matchCount.completed }}</span>
      </li>
    </ul>
    <div class="matches__separator"></div>
    <no-ssr>
      <upcoming-matches v-if="upcomingTabActive"></upcoming-matches>
      <completed-matches v-else></completed-matches>
    </no-ssr>
    <div class="matches__pagination">
      <!-- PAGINATION -->
      <paginate
        ref="pagination"
        :page-count="pageCount"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'list'"
        :prev-class="'previous'"
        :next-class="'next'"
        :page-class="'item'"
        :page-link-class="'item-link'"
        :active-class="'active'"
        :disabled-class="'disabled'">
          <span slot="prevContent">
            <icon name="angle-left" scale="1.5"></icon>
          </span>
          <span slot="nextContent">
            <icon name="angle-right" scale="1.5"></icon>
          </span>
      </paginate>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Paginate from 'vuejs-paginate/src/components/Paginate.vue'
import csgoIconURL from '~/assets/images/games/icons/csgo.svg'
import dota2IconURL from '~/assets/images/games/icons/dota-2.svg'
import hearthStoneIconURL from '~/assets/images/games/icons/hearthstone.svg'
import hotsIConURL from '~/assets/images/games/icons/heroes-of-the-storm.svg'
import lolIconURL from '~/assets/images/games/icons/lol.svg'
import owIconURL from '~/assets/images/games/icons/ow.svg'
import rlIconURL from '~/assets/images/games/icons/rocket-league.svg'
import sc2IconURL from '~/assets/images/games/icons/starcraft-2.svg'
import matchMixins from '~/mixins/match'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/angle-left'
import 'vue-awesome/icons/angle-right'
import format from 'date-fns/format'
import UpcomingMatches from '~/components/matches/upcoming-matches'
import CompletedMatches from '~/components/matches/completed-matches'

export default Vue.extend({
  name: 'Matches',
  mixins: [matchMixins],
  data () {
    return {
      iconURLs: {
        csgo: csgoIconURL,
        'dota-2': dota2IconURL,
        'hearthstone': hearthStoneIconURL,
        'heroes-of-the-storm': hotsIConURL,
        lol: lolIconURL,
        ow: owIconURL,
        'rocket-league': rlIconURL,
        'starcraft-2': sc2IconURL
      }
    }
  },
  components: {
    Paginate,
    Icon,
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
      return Math.round(this.matchCount[this.$store.state.matches.active] / 20)
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
  watch: {
    upcomingTabActive () {
      this.$refs.pagination.selected = 0
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
})
</script>

<style lang="stylus">
.matches
  display flex
  flex-direction column
  width 100%
  padding 30px

  &__separator
    width 65%
    height 2px
    background #D2D7D3

  &__tabs
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


  &__pagination
    display flex
    margin-top 20px

    .list
      display flex
      display flex
      flex-direction row
      flex-wrap wrap
      border 1px solid #D1D2D7
      list-style none
      user-select none

      .item
        display inline-flex
        justify-content center
        align-items center
        margin 2px 6px
        padding 6px

        .item-link
          color black

      .item.active
        background-color #E8444A
        color white
        font-weight 600
        border-radius 4px
        padding 0px 12px

        a
          color white

      // all item as links
      a
        display inline-flex
        justify-content center
        align-items center

      .previous
        display inline-flex
        justify-content center
        padding 6px 16px
        border-right 1px solid #DADEE2
        margin-right 3px

        a
          color #E8444A

      .next
        display inline-flex
        justify-content center
        padding 6px 16px
        border-left 1px solid #DADEE2
        margin-left 3px

        a
          color #E8444A

      // .item
      //   padding 5px
      //   color black

      //   a
      //     color black

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



</style>
