<template>
  <div class="prediction-box panel">
    <div class="row">
      <div class="col col-header">
        <h1 class="header-text header-text--one">Placing a bet</h1>
        <h2 class="header-text header-text--two">on your team</h2>
      </div>
      <div class="col col-icon">
        <icon @click.native="toggleBox" name="times" scale="1.6"></icon>
      </div>
    </div>
    <div class="write-prediction col">
      <div class="row">
        <h3 class="header-text header-text--three">Stake</h3>
      </div>
      <div class="row">
        <vue-numeric class="stake" currency="$" separator="," v-model="stake" :minus="false" :max="3" placeholder="your stake"></vue-numeric>
      </div>
      <div class="row">
        <h3 class="header-text header-text--three">Selected team</h3>
      </div>
      <div class="row">
        <h3 class="header-text header-text--three">Your opinion (optional)</h3>
      </div>
      <div class="row">
        <textarea class="textbox"></textarea>
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
      selectedTeam: null,
      stake: 0
    }
  },
  methods: {
    toggleBox () {
      this.$store.commit('predictions/toggle_box', {})
    }
  },
  components: {
    Icon,
    VueNumeric
  }
})
</script>

<style lang="stylus" scoped>

.write-prediction
  .row
    margin 8px 0px

    .stake
      flex 1
      max-width 70%
      border 1px solid #ceced9
      padding 8px
      border-radius 2px
      color #494949
      font-size 100%
      background-color #fff

    .textbox
      min-width 100%

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
