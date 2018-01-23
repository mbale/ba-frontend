<template>
  <div class="upcoming-matches">
    <div class="matches__list" v-bind:key="date" v-for="[date, matches] in Object.entries(groupedMatches)">
      <!-- TIMESTAMP -->
      <span class="timestamp">{{ formatGroupTimeStamp(date) }}</span>
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
            <div class="available" v-if="getLatestOdds(match.odds)">
              <span class="team" v-bind:class="{'odds-higher': oddsHigher(match.odds) === 'home'}">
                {{ getLatestOdds(match.odds).home }}
              </span>
              <span class="team" v-bind:class="{'odds-higher': oddsHigher(match.odds) === 'away'}">
                {{ getLatestOdds(match.odds).away }}
              </span>
            </div>
            <div class="unavailable" v-if="!getLatestOdds(match.odds)">
              <span class="placeholder"></span>
            </div>
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
  name: 'UpcomingMatches',
  mixins: [matchMixins],
  computed: {
    groupedMatches () {
      return this.$store.getters['matches/groupUMatchesByDay']
    }
  },
  methods: {
    oddsHigher (odds) {
      const homeHigher = parseInt(odds.home) >= parseInt(odds.away)

      if (homeHigher) {
        return 'home'
      }

      return 'away'
    }
  }
})
</script>

<style lang="stylus" scoped>

.odds
  .available
    display flex
    flex-direction row

    +below(650px)
      flex-direction column

    .team
      margin 5px

    .odds-higher
      font-weight 800

</style>
