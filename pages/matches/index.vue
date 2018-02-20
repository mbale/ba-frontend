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
      <div class="matches-pagination">
        <!-- PAGINATION -->
        <no-ssr>
          <paginate
            :pageCount="pageCount"
            :changePage="changePage"
            />
        </no-ssr>
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
    async changePage (page) {
      const activeTab = this.$store.state.matches.active

      // get active game filter first
      const activeGames = this.$store.state.games.list.filter(g => g.isActive && g.id)

      // get back ids
      const gameIds = activeGames.map(g => {
        return g.id
      })

      await this.$store.dispatch('matches/fetch', {
        page,
        gameIds,
        statusType: activeTab
      })
    },
    async filterByGames () {
      // get active game filter first
      const activeGames = this.$store.state.games.list.filter(g => g.isActive && g.id)

      // get back ids
      const gameIds = activeGames.map(g => {
        return g.id
      })

      await this.$store.dispatch('matches/fetch', {
        statusType: this.$store.state.matches.active,
        gameIds
      })
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
.filters
  display flex
  justify-content center
  align-items center

.matches-pagination
  display flex
  justify-content: center
  margin 0 0 20px 0
.filter__dropdown
  margin-left auto
</style>
