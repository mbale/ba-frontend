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
        <h3 class="header-text header-text--three">Selected team</h3>
      </div>
      <div class="row row-teams">
        <p-radio class="team-select p-default p-curve" :value="homeTeam" v-model="selectedTeam" name="select-team" color="primary-o"
        v-validate="{ rules: `required|in:${awayTeam},${homeTeam}`, arg: 'select-team' }">
          {{ homeTeam }}
        </p-radio>
        <span class="home-odds">[{{ homeOdds }}]</span>
        <p-radio class="team-select p-default p-curve" :value="awayTeam" v-model="selectedTeam" name="select-team" color="primary-o">
          {{ awayTeam }}
        </p-radio>
        <span class="away-odds">[{{ awayOdds }}]</span>
      </div>
      <div class="row row__error" v-show="errors.has('select-team')">
        <span>You need to select a team</span>
      </div>
      <div class="stake-container" v-show="selectedTeam">
        <div class="row">
          <h3 class="header-text header-text--three">Stake</h3>
        </div>
        <div class="row">
          <div class="row" v-bind:key="allowed.stake" v-for="allowed of allowedStakes">
            <p-radio class="p-default p-curve" :value="allowed.stake" v-model="stake"
            name="stake" color="primary-o" :disabled="isStakeDisabled(allowed)"
            v-validate="{ rules: `required|in:0.5,1,2,3`, arg: 'stake' }">
              {{ allowed.stake }}
            </p-radio>
          </div>
        </div>
      </div>
      <div class="row row__error" v-show="errors.has('stake')">
        <span>You need to select a stake</span>
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
    },
    allowedStakes () {
      const awayOdds = this.awayOdds
      const homeOdds = this.homeOdds

      let allowedMaxStakes = {
        home: 0.5,
        away: 0.5
      }

      // interval check
      if (homeOdds < 2.5) {
        allowedMaxStakes.home = 3
      }

      if (awayOdds < 2.5) {
        allowedMaxStakes.away = 3
      }

      //

      if (homeOdds >= 2.5 && homeOdds < 5) {
        allowedMaxStakes.home = 2
      }

      if (awayOdds >= 2.5 && awayOdds < 5) {
        allowedMaxStakes.away = 2
      }

      //

      if (homeOdds >= 5 && homeOdds < 7.5) {
        allowedMaxStakes.home = 1
      }

      if (awayOdds >= 5 && awayOdds < 7.5) {
        allowedMaxStakes.away = 1
      }

      const stakes = [0.5, 1, 2, 3]

      const rules = []

      stakes.forEach(stake => {
        rules.push({
          stake,
          home: allowedMaxStakes.home >= stake,
          away: allowedMaxStakes.away >= stake
        })
      })

      return rules
    }
  },
  methods: {
    isStakeDisabled (stakeObj) {
      const selectedTeam = this.selectedTeam
      let team = 'home'

      if (selectedTeam === this.awayTeam) {
        team = 'away'
      }

      return !stakeObj[team]
    },
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
        const urlId = this.$store.state.predictions.urlId
        await this.$store.dispatch('match/getByUrlId', { urlId })
      }
    }
  },
  components: {
    Icon
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
