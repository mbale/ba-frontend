<template>
  <div class="matches"></div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Matches',
  async asyncData ({ store }) {
    await store.dispatch('matches/fetch')
  }
})
</script>

<style lang="stylus">

</style>
