<template>
  <div class="matches-list">
    <section class="matches-perday" :key="date" v-for="[date, matches] in Object.entries(groupedMatches)">
      <!-- TIMESTAMP -->
      <h3 class='matches-timestamp'>{{ formatGroupTimeStamp(date) }}</h3>
      <!-- ROW -->
      <match-item :key="match.id" v-for="match in matches" v-bind="match" />
    </section>
  </div>
</template>

<script>
import matchMixins from '~/mixins/match'
import MatchItem from './match-item'

export default {
  name: 'UpcomingMatches',
  mixins: [matchMixins],
  components: {
    MatchItem
  },
  computed: {
    groupedMatches () {
      return this.$store.getters['matches/groupUMatchesByDay']
    }
  }
}
</script>

<style lang="stylus">

</style>
