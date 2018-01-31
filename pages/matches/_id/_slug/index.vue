<template>
  <div class="match">
    <div class="row">
      <div class="match__team-details panel">
        <div class="row">
          <div class="col">
            <h1 class="header-text header-text--one">
              {{ match.homeTeam }}
            </h1>
            <h2 class="header-text header-text--two">
              {{ match.date }}
            </h2>
          </div>
        </div>
      </div>
      <div class="match__team-details panel">
        <div class="row">
          <div class="col">
            <h1 class="header-text header-text--one">
              {{ match.awayTeam }}
            </h1>
            <h2 class="header-text header-text--two">
              {{ match.date }}
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="match__team-history panel">
        <div class="col"></div>
      </div>
    </div>
    <div class="row">
      <div class="predictions panel"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import matchMixins from '~/mixins/match'

export default Vue.extend({
  name: 'Match',
  mixins: [matchMixins],
  computed: {
    match () {
      return this.$store.state.matches.match
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
@import '~assets/style/components.styl'


</style>
