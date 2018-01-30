<template>
  <div class="">
    {{ match.homeTeam }}
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Match',
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

<style lang="stylus">

</style>
