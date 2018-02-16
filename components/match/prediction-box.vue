<template>
  <div class="prediction-box panel">
    <div class="row prediction-header">
      <div class="col col-header">
        <h1 class="header-text header-text--one">Placing a bet</h1>
        <h2 class="header-text header-text--two">on {{ selectedTeam }}</h2>
      </div>
      <div class="col col-icon">
        <icon @click.native="closeBox" name="times" scale="1.6"></icon>
      </div>
    </div>
    <div class="write-prediction col">
      <div class="row">
        <h3 class="header-text header-text--three">Stake</h3>
      </div>
      <div class="row">
        <vue-numeric
          class="stake" currency="$" separator=","
          v-model="stake" :minus="false" :max="3"
          placeholder="your stake">
        </vue-numeric>
      </div>
      <div class="row">
        <h3 class="header-text header-text--three">Selected team</h3>
      </div>
      <div class="row row-teams">
        <label for="home-team">{{ homeTeam }}</label>
        <span class="home-odds">[{{ homeOdds }}]</span>
        <input
          type="radio" class="team-select" name="select-team"
          :value="homeTeam" v-model="selectedTeam"
          v-validate="{ rules: `required|in:${awayTeam},${homeTeam}`, arg: 'select-team' }">
        <label for="home-team">{{ awayTeam }}</label>
        <span class="away-odds">[{{ awayOdds }}]</span>
        <input type="radio" class="team-select" name="select-team" :value="awayTeam" v-model="selectedTeam">
      </div>
      <div class="row row__error" v-show="errors.has('select-team')">
        <span>You need to select a team</span>
      </div>
      <div class="row">
        <h3 class="header-text header-text--three">Your opinion (optional)</h3>
      </div>
      <div class="row">
        <textarea class="textbox" v-model="text"></textarea>
      </div>
      <div class="row">
        <button class="button button--primary" type="submit" @click="sendPrediction">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import 'vue-awesome/icons/times'
import Icon from 'vue-awesome/components/Icon'
import VueNumeric from 'vue-numeric'

export default Vue.extend({
  name: 'PredictionBox',
  data () {
    return {
      stake: 0,
      text: null,
      selectedTeam: null
    }
  },
  computed: {
    homeOdds () {
      return this.$store.state.predictions.homeOdds
    },
    awayOdds () {
      return this.$store.state.predictions.awayOdds
    },
    homeTeam () {
      return this.$store.state.predictions.homeTeam
    },
    awayTeam () {
      return this.$store.state.predictions.awayTeam
    }
  },
  methods: {
    closeBox () {
      this.$store.commit('predictions/set_box_state', {
        boxState: false
      })
    },
    async sendPrediction () {
      const isValid = await this.$validator.validateAll()

      if (isValid) {
        const {
          stake,
          text,
          selectedTeam
        } = this

        // set model for prediction box
        this.$store.commit('predictions/set_prediction', {
          prediction: {
            stake,
            text,
            selectedTeam
          }
        })

        // sending http request
        await this.$store.dispatch('predictions/postPrediction')

        // requery model
        const matchId = this.$store.state.predictions.matchId
        await this.$store.dispatch('match/getById', { matchId })
      }
    }
  },
  components: {
    Icon,
    VueNumeric
  }
})
</script>

<style lang="stylus" scoped>
.prediction-header
  margin-bottom 0px

.write-prediction
  .row
    margin 8px 0px

    &__error
      margin 4px 0px
      width 100%
      color #ec4040
      font-size 0.9em

    .stake
      flex 1
      max-width 70%
      border 1px solid #ceced9
      padding 8px
      border-radius 2px
      color #494949
      font-size 100%
      background-color #fff

    .team-select
      margin-right 8px
      margin-left 2px

    .textbox
      min-width 100%

  .row-teams
    display flex
    justify-content flex-start
    align-items center

    > *
      margin-right 5px

.col-header
  flex-basis 85%

.col-icon
  justify-content flex-start
  align-items flex-end
  flex-basis 15%
  border-bottom 1px solid #d2d7d3
  margin-bottom 25px
  padding-bottom 10px

  > *
    cursor pointer

</style>
