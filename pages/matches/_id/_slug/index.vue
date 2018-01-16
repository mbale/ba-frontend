<template>
  <div class="">
    {{ match.homeTeam }}
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'MatchDetail',
  computed: {
    match () {
      return this.$store.state.matches.match
    }
  },
  async asyncData ({ store, params }) {
    await store.dispatch('matches/getById', { matchId: params.id })

    console.log(store.state.matches)
  }
})
</script>

<style lang="stylus">

</style>
