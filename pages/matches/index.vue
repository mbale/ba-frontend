<template>
  <div class='matches-container'>
    <div class="toolbar">
      <tabs>
        <tab :class="{'tab--active': upcomingTabActive }" ref="upcoming" @click.native="changeTab('upcoming')">Upcoming</tab>
        <tab :class="{'tab--active': !upcomingTabActive }" ref="completed" @click.native="changeTab('completed')">Completed</tab>
      </tabs>
      <div class="filters">
        <games-filter @selectedGamesChanged="filterByGames" />
      </div>
    </div>
    <div class='matches wrapper'>
      <upcoming-matches v-if="upcomingTabActive" />
      <completed-matches v-else />
      <div class="matches-pagination" v-if="matchCount > 0">
        <!-- PAGINATION -->
        <paginate ref="paginate" :force-page='page' :pageCount="pageCount" :changePage="changePage" />
      </div>
      <div class="blank-slate" v-else>
        <p>No matches were found related to your selected game. <img class="emoticon" src="~/assets/images/misc/sadface.png" alt="sadface emoji"></p>
      </div>
    </div>
  </div>
</template>

<script>
import matchMixins from '~/mixins/match'
import { format } from 'date-fns'
import Paginate from '~/components/common/paginate'
import { Tabs, Tab } from '~/components/common/tabs'
import UpcomingMatches from '~/components/matches/upcoming-matches'
import CompletedMatches from '~/components/matches/completed-matches'
import GamesFilter from '~/components/matches/games-filter'

export default {
  name: 'Matches',
  mixins: [matchMixins],
  data () {
    return {}
  },
  components: {
    Paginate,
    Tabs,
    Tab,
    GamesFilter,
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
    numberOfMatches () {
      return this.matchCount[this.$store.state.matches.active]
    },
    matchCount () {
      return this.$store.state.matches.matchCount
    },
    page () {
      // vue-paginate force-page prop requires index - 1
      return this.$store.state.matches.page > 1 ? this.$store.state.matches.page - 1 : 0
    },
    pageCount () {
      return Math.ceil(this.$store.state.matches.matchCount / 20)
    }
  },
  methods: {
    async changeTab (tab) {
      this.$router.push({
        query: {
          'status-type': tab
        }
      })
      await this.$store.commit('matches/set_active_list', {
        active: tab
      })
    },
    formatDate (date) {
      return format(new Date(date), 'dddd, MMMM D')
    },
      this.$store.commit('matches/update_page', { page: 0 })

      // get active game filter first
      const activeGames = this.$store.state.games.list.filter(g => g.isActive && g.id)

      // get back ids
      const gameIds = activeGames.map(g => {
        return g.id
      })
    async changePage (page) {
      this.$store.commit('matches/update_page', { page })

      await this.$store.dispatch('matches/fetch')
    },
    async filterByGames () {
      // get active game filter first
      const activeGames = this.$store.state.games.list.filter(g => g.isActive && g.id)

      // get back ids
      const gameIds = activeGames.map(g => {
        return g.id
      })

      // console.log(this.$store.getters['matches/groupUMatchesByDay'])

      await this.$store.dispatch('matches/fetch', {
        statusType: this.$store.state.matches.active,
        gameIds
      })

      // outputs number of matches to variable
      this.numberOfMatches = Object.keys(this.$store.getters['matches/groupUMatchesByDay']).length
    }
  },
  async asyncData ({ store, route }) {
    const queryParams = route.query

    // get game types
    // needs due to gamefilter
    // and get all matches
    await Promise.all([
      store.dispatch('games/fetchAll'),
      store.dispatch('matches/fetch', {
        statusType: 'upcoming'
      }),
      store.dispatch('matches/fetch', {
        statusType: 'completed'
      })
    ])

    // based on query params switch tab
    if (queryParams['status-type']) {
      if (queryParams['status-type'] === 'upcoming') {
        store.commit('matches/set_active_list', {
          active: 'upcoming'
        })
      } else {
        store.commit('matches/set_active_list', {
          active: 'completed'
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.blank-slate
  margin 40px 0
  text-align: center
  p
    font-size 18px
  .emoticon
    height 25px

.filters
  display flex
  justify-content center
  align-items center
  padding 0 30px

.matches-pagination
  display flex
  justify-content: center
  margin 0 0 20px 0
.filter__dropdown
  margin-left auto
</style>
