<template>
  <div class="match">
    <div class="match__info panel">
      <div class="row">
        <div class="col">
          Hometeam
        </div>
        <div class="col">
          Awayteam
        </div>
      </div>
    </div>
    <div class="match__odds panel">
      <h1 class="header-text header-text--one">
        Odds
      </h1>
      <h2 class="header-text header-text--two">
        you may predict on
      </h2>
      <div class="odds__list col">
        <div class="row row-header">
          <div class="col odds-header">
            <h3 class="header-text header-text--three">
              Home
            </h3>
          </div>
          <div class="col odds-header">
            <h3 class="header-text header-text--three">
              Away
            </h3>
          </div>
          <div class="col odds-header">
            <h3 class="header-text header-text--three">
              When
            </h3>
          </div>
        </div>
        <div class="row row-odds" v-bind:key="o._id" v-for="o of odds">
          <span class="col col-odds" v-text="o.home"></span>
          <span class="col col-odds" v-text="o.away"></span>
          <span class="col col-date" v-text="formatDate(o.fetchedAt)"></span>
          <div class="button button--primary" @click="togglePredictionBox(o)">Bet</div>
        </div>
      </div>
    </div>
    <prediction-box v-show="predictionBoxActive"></prediction-box>
  </div>
</template>

<script>
import Vue from 'vue'
import PredictionBox from '~/components/matches//prediction-box'
import matchMixins from '~/mixins/match'
import distance from 'date-fns/distance_in_words'

export default Vue.extend({
  name: 'Match',
  components: {
    PredictionBox
  },
  mixins: [matchMixins],
  computed: {
    match () {
      return this.$store.state.matches.match
    },
    odds () {
      return this.match.odds
    },
    predictionBoxActive () {
      return this.$store.state.predictions.boxActive
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
      if (this.predictionBoxActive) {
        this.$store.commit('predictions/set_prediction', {
          predictions: {
            selectedTeam: 'home',
            oddsId: odds._id
          },
          teams: []
        })
      } else {
        this.$store.commit('predictions/toggle_box', {
          state: true
        })
      }
    }
  },
  async asyncData ({ store, params, error }) {
    try {
      const matchId = params.id
      await store.dispatch('matches/getById', { matchId })
    } catch (e) {
      return error({ statusCode: 404 })
    }
  }
})
</script>

<style lang="stylus" scoped>
.row
  justify-content space-between

.odds__list
  .row-header
    flex-direction row
    justify-content flex-start

    .odds-header
      margin-right 55px
      margin-bottom 5px

  .row-odds
    margin 0px

    > *
      margin-right 15px
      margin-bottom 10px
      justify-content center

      &:last-child
        margin-right 0px

  .col-date
    min-width 130px

  .col-odds
    display flex
    flex-direction column
    justify-content center
    align-items center
    border 1px solid #dbdbdb
    border-radius 2px
    padding 5px 10px
    width 80px
    text-align center
    font-size 13px
    font-weight 700
    color #62626f
    user-select none

</style>
