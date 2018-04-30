<template>
  <div class="match-container">
    <header class="content-header">
      <div class="content-header__hero">
        <div class="match-info-container">
          <h4 class="team team--home">{{ match.homeTeam }}</h4>
          <div class="match-info">
            <p class="date">{{ formatMatchDate(match.date, 'dddd, MMMM D - HH:mm') }}</p>
            <p class="league">[{{ match.game }}] {{ match.league }}</p>
            <div class="results">
              <span class="home-team">{{ scores.homeTeam || 0 }}</span>
              <span class="away-team">{{ scores.awayTeam || 0 }}</span>
            </div>
          </div>
          <h4 class="team team--away">{{ match.awayTeam }}</h4>
        </div>

        <!-- <div class="content-header__info">
        </div> -->
      </div>
      <div class="toolbar">
        <tabs>
          <tab
            v-for="(tab, key, index) in tabs"
            :key="key"
            :class="{'tab--active': currentTab === index}"
            ref="upcoming"
            @click.native="currentTab = index"
          > {{ tab }} </tab>
        </tabs>
      </div>
    </header>

    <div class="match">
      <div v-show="currentTab === 0" class="odds"> <!-- ODDS -->
        <match-odds @openPredictionBox="togglePredictionBox" :odds="odds" v-if="!isMatchFinished"></match-odds>
        <prediction-box v-if="predictionBoxState"></prediction-box>
      </div>
      <div v-show="currentTab === 1" class="predictions"> <!-- PREDICTIONS -->
        <prediction-list v-if="predictionCount"></prediction-list>
      </div>
      <div v-show="currentTab === 2" class="stats"> <!-- STATS -->
        <match-scores :scores="scores"></match-scores>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabs, Tab } from '~/components/common/tabs'
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
    PredictionList,
    Tabs,
    Tab
  },
  data () {
    return {
      tabs: {
        first: 'Odds',
        second: 'Predictions',
        third: 'Stats'
      },
      currentTab: 0
    }
  },
  head () {
    return {
      title: `${this.match.homeTeam} vs ${this.match.awayTeam} - Matches | Betacle`
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
        id: matchId,
        urlId
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
        matchId,
        urlId
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
      // /matches/vici-gaming-vs-jd-gaming/2hbMvsAD
      // console.log(params)
      const {
        // gameslug,
        // teams,
        urlid
      } = params
      await store.dispatch('match/getByUrlId', { urlId: urlid })
    } catch (e) {
      return error({ statusCode: 404 })
    }
  }
})
</script>

<style lang="stylus" scoped>
.row
  justify-content space-between

.match-container
  width 100%

  .tab
    padding 15px 25px

  .panel
    margin 35px 0
    +below(3)
      margin 25px 0

  .match
    padding 0 25px
    +below(3)
      padding 0 15px

  .content-header__hero
    background-color: #1c1e4e
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #000 100%)
    align-items: center
    flex-direction: column
    +below(3)
      align-items: center
      flex-direction: column
      height: 260px

    .match-info-container
      display: flex
      justify-content: space-between
      height: 100%
      align-items: center
      margin-top: -10px
      +below(3)
        flex-direction: column
        margin-top: 0
        justify-content: space-evenly

      .team
        font-size: 22px
        font-weight: 700
        color: white
        text-shadow: 0 0 3px rgba(0, 0, 0, .5)
        margin-bottom: 12px
        align-self: flex-end
        +below(3)
          align-self: unset

        &:first-child
          margin-right: 50px
          +below(3)
            margin-right: 0

        &:last-child
          margin-left: 50px
          +below(3)
            margin-left: 0

      .match-info
        +below(3)
          order: 1

        p
          font-size: 14px
          color: white
          text-align: center

        .results
          margin-top: 20px

          span
            padding: 6px 40px
            background-color: black
            color: white
            font-weight: bold
            font-size: 20px
            border-radius: 4px

            &:first-child
              margin-right: 20px

            &.home-team
              background-color: $blue
</style>
