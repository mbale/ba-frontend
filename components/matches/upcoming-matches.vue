<template>
  <div class="upcoming-matches">
    <div class="matches__list" v-bind:key="date" v-for="[date, matches] in Object.entries(uMatchesGroupedByDay)">
      <!-- TIMESTAMP -->
      <span class="timestamp">{{ formatDate(date) }}</span>
      <!-- ROW -->
      <nuxt-link class="row" :to="getMatchURLPath(match)" v-bind:key="match.id" v-for="match of matches" append>
        <div class="match">
          <div class="game" v-bind:style="getGameBGColor(match.gameSlug)">
            <img class="image" v-bind:src="getIconURL(match.gameSlug)" alt="">
          </div>
          <div class="date">
            {{ formatMatchDate(match.date) }}
          </div>
          <div class="teams">
            <span class="team">
              {{ match.homeTeam}}
            </span>
            <span class="separator"> vs </span>
            <span class="team">
              {{ match.awayTeam}}
            </span>
          </div>
          <div class="league">
              <span class="text">
                {{ match.league }}
              </span>
            </div>
          <div class="odds">
            <span class="odds--available" v-if="getLatestOdds(match.odds)">
              {{ getLatestOdds(match.odds).home }}
              {{ getLatestOdds(match.odds).away }}
            </span>
            <span class="odds--unavailable" v-if="!getLatestOdds(match.odds)">
              
            </span>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import format from 'date-fns/format'
import matchMixins from '~/mixins/match'

export default Vue.extend({
  name: 'UpcomingMatches',
  mixins: [matchMixins],
  computed: {
    uMatchesGroupedByDay () {
      return this.$store.getters['matches/groupUMatchesByDay']
    },
    activeTab () {
      return this.$store.state.matches.active
    }
  },
  methods: {
    formatDate (date) {
      return format(new Date(date), 'dddd, MMMM D')
    },
    getMatchURLPath ({homeTeam, awayTeam, date, id}) {
      return {
        path: `${id}/${this.buildMatchURLSegment(homeTeam, awayTeam)}`
      }
    },
    getGameBGColor (gameSlug) {
      const game = this.$store.state.games.list.find((game) => game.slug === gameSlug)
      const prop = 'background-color: '

      if (game) {
        return `${prop}${game.color}`
      }

      return `${prop}#1E824C`
    },
    formatMatchDate (date) {
      return format(new Date(date), 'HH:mm')
    },
    getIconURL (gameSlug) {
      return this.iconURLs[gameSlug]
    }
  }
})
</script>

<style lang="stylus">

</style>
