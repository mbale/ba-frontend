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
.matches-perday
  margin-bottom 20px

.matches-timestamp
  font-family $font-dinpro
  color $dgray
  font-size 16px
  font-weight 500
  margin-bottom 15px
</style>
