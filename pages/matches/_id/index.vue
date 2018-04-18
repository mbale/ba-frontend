<template>
  <div></div>
</template>

<script>
import Vue from 'vue'
import matchMixins from '~/mixins/match'

export default Vue.extend({
  name: 'MatchIdRedirect',
  async asyncData ({ app, store, params, redirect }) {
    await store.dispatch('matches/getById', { matchId: params.id })

    const { match } = store.state.matches

    if (match) {
      const { homeTeam, awayTeam } = match

      redirect({
        name: 'matches-id-slug',
        // passing correct params to route component
        params: {
          id: params.id,
          // we do not have access to vue instance now (ssr)
          slug: matchMixins.methods.buildMatchURLSegment(homeTeam, awayTeam)
        }
      })
    }
  }
})
</script>

<style lang="stylus">

</style>
