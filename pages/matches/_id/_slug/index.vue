<template>
  <div class="match">
    <info></info>
    <match-odds :odds="odds" v-if="!isMatchFinished"></match-odds>
    <match-scores :scores="scores" v-else></match-scores>
    <prediction-box v-if="predictionBoxState"></prediction-box>
    <prediction-list v-if="predictionCount"></prediction-list>
  </div>
</template>

<script>
import Vue from 'vue'
import Info from '~/components/match/info'
import MatchScores from '~/components/match/scores.vue'
import MatchOdds from '~/components/match/odds.vue'
import PredictionBox from '~/components/match/prediction-box'
import PredictionList from '~/components/match/prediction-list'
import matchMixins from '~/mixins/match'
import distance from 'date-fns/distance_in_words'

export default Vue.extend({
  name: 'Match',
  components: {
    Info,
    MatchScores,
    MatchOdds,
    PredictionBox,
    PredictionList
  },
  head () {
    return {
      title: `Betacle - ${this.match.homeTeam} vs ${this.match.awayTeam}`
    }
  },
  mixins: [matchMixins],
  computed: {
    isMatchFinished () {
      return this.match.state.type === 'settled'
    },
    match () {
      return this.$store.state.match.data
    },
    odds () {
      return this.match.odds
    },
    scores () {
      return this.match.state.scores
    },
    predictionCount () {
      return this.match.predictionCount
    },
    predictionBoxState () {
      return this.$store.state.predictions.boxState
    }
  },
  methods: {
    formatDate (date) {
      return distance(new Date(), date, {
        includeSeconds: true,
        addSuffix: true
      })
    },
    togglePredictionBox (odds) {
      const boxState = this.predictionBoxState
      const {
        homeTeam,
        awayTeam,
        id: matchId
      } = this.match
      const {
        _id: oddsId,
        home: homeOdds,
        away: awayOdds
      } = odds

      if (!boxState) {
        this.$store.commit('predictions/set_box_state', {
          boxState: true
        })
      }

      this.$store.commit('predictions/set_odds', {
        oddsId,
        homeOdds,
        awayOdds
      })

      this.$store.commit('predictions/set_match_id', {
        matchId
      })

      this.$store.commit('predictions/set_teams', {
        homeTeam,
        awayTeam
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('predictions/reset_state')
    next()
  },
  async asyncData ({ store, params, error }) {
    try {
      const matchId = params.id
      await store.dispatch('match/getById', { matchId })
    } catch (e) {
      return error({ statusCode: 404 })
    }
  }
})
</script>

<style lang="stylus" scoped>
.row
  justify-content space-between

</style>
