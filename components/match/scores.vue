<template>
  <div class="scores panel">
    <h1 class="header-text header-text--one">
      Scores
    </h1>
    <h2 class="header-text header-text--two">
      of the match
    </h2>
    <div class="list col">
      <div class="row">{{ scores.homeTeam }}</div>
      <div class="row">{{ scores.awayTeam }}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import utils from '~/mixins/utils'

export default Vue.extend({
  name: 'MatchScores',
  mixins: [utils],
  props: ['scores']
})
</script>

<style lang="stylus">

</style>
