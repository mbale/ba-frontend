<template>
  <div class="completed-matches">
    <div class="matches__list" v-bind:key="date" v-for="[date, matches] in Object.entries(groupedMatches)">
      <span class="timestamp">{{ formatGroupTimeStamp(date) }}</span>
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
          <div class="scores">
            <span class="home-team">
              {{ getMatchScore(match).home }}
            </span>
            <span class="away-team">
              {{ getMatchScore(match).away }}
            </span>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import matchMixins from '~/mixins/match'

export default Vue.extend({
  name: 'CompletedMatches',
  mixins: [matchMixins],
  computed: {
    groupedMatches () {
      return this.$store.getters['matches/groupCMatchesByDay']
    }
  },
  methods: {
    getMatchScore (match) {
      if (match.state.scores) {
        return {
          home: match.state.scores.homeTeam,
          away: match.state.scores.awayTeam
        }
      }

      return {
        home: null,
        away: null
      }
    }
  }
})
</script>

<style lang="stylus">

</style>
