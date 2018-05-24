<template>
  <div class='matches-container'>
    <div class="toolbar">
      <tabs>
        <tab :class="{'tab--active': tabActive === 'upcoming' }" @click.native="changeTab('upcoming')">Upcoming</tab>
        <tab :class="{'tab--active': tabActive === 'completed' }" @click.native="changeTab('completed')">Completed</tab>
      </tabs>
      <div class="filters">
        <games-filter @selectedGamesChanged="filterByGames" />
      </div>
    </div>
    <div class='matches wrapper'>
      <upcoming-matches v-if="tabActive === 'upcoming'" />
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
import Paginate from '~/components/common/paginate'
import { Tabs, Tab } from '~/components/common/tabs'
import UpcomingMatches from '~/components/matches/upcoming-matches'
import CompletedMatches from '~/components/matches/completed-matches'
import GamesFilter from '~/components/matches/games-filter'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations, mapActions } = createNamespacedHelpers('matches')

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
      title: 'Matches | Betacle'
    }
  },
  computed: {
    ...mapState({
      'tabActive': 'stateFilter',
      'matchCount': 'matchCount',
      'matchPerPage': 'matchPerPage'
    }),
    page () {
      // vue-paginate force-page prop requires index - 1
      return this.$store.state.matches.page > 1 ? this.$store.state.matches.page - 1 : 0
    },
    pageCount () {
      return Math.ceil(this.matchCount / this.matchPerPage)
    }
  },
  methods: {
    ...mapMutations([
      'update_state_filter',
      'update_page'
    ]),
    ...mapActions([
      'fetch',
      'fetchGameIds'
    ]),
    async changeTab (toTab) {
      this.$router.push({
        query: {
          'status-type': toTab
        }
      })

      this.update_state_filter({ filter: toTab })
      this.update_page({ page: 0 })

      await this.fetch()
    },
    async changePage (page) {
      this.update_page({ page })
      this.fetch()
    },
    async filterByGames () {
      this.fetch()
    }
  },
  async asyncData ({ store, route, redirect }) {
    const queryParams = route.query

    await store.dispatch('matches/fetchGameIds')

    // based on query params switch tab
    if (queryParams['status-type']) {
      switch (queryParams['status-type']) {
        case 'upcoming':
          store.commit('matches/update_state_filter', { filter: 'upcoming' })
          break
        case 'completed':
          store.commit('matches/update_state_filter', { filter: 'completed' })
          break
        default:
          redirect('/matches')
          break
      }
    }
    await store.dispatch('matches/fetch')
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

.matches-pagination
  display flex
  justify-content: center
  margin 0 0 20px 0
.filter__dropdown
  margin-left auto
</style>
