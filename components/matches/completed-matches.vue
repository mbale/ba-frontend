<template>
  <div class="matches-list">
    <section class="matches-perday" v-bind:key="date" v-for="[date, matches] in Object.entries(groupedMatches)">
      <!-- TIMESTAMP -->
      <h3 class='matches-timestamp'>{{ formatGroupTimeStamp(date) }}</h3>
      <!-- ROW -->
      <match-item v-bind:key="match.id" v-for="match of matches" :match="match" />
    </section>
  </div>
</template>

<script>
import MatchItem from './match-item'
import matchMixins from '~/mixins/match'

export default {
  name: 'CompletedMatches',
  mixins: [matchMixins],
  components: {
    MatchItem
  },
  computed: {
    groupedMatches () {
      return this.$store.getters['matches/groupCMatchesByDay']
    }
  }
}
</script>

<style lang="stylus">

</style>
