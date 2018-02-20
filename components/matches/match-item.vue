<template>
  <div class='match' :class="gameSlug">
    <div class='date'>
      {{ formattedDate(date) }}
    </div>
    <div class='teams'>
      <div class='team team--home'>
        <div class='team-name'>{{ homeTeam }}</div>
        <nuxt-link
          v-if="isSettled()"
          class='team-score'
          :to="getMatchURLPath()"
          append
        >
          {{ getMatchScore(state).home }}
        </nuxt-link>
        <nuxt-link
          v-else
          class='team-odds'
          :to="getMatchURLPath()"
          append
        >
          {{ getLatestOdds(odds).home }}
        </nuxt-link>
      </div>
      <div class='team team--away'>
        <div class='team-name'>{{ awayTeam }}</div>
        <nuxt-link
          v-if="isSettled()"
          class='team-score'
          :to="getMatchURLPath()"
          append
        >
          {{ getMatchScore(state).away }}
        </nuxt-link>
        <nuxt-link
          v-else
          class='team-odds'
          :to="getMatchURLPath()"
          append
        >
          {{ getLatestOdds(odds).away }}
        </nuxt-link>
      </div>
    </div>
    <div class='league'>
      {{ league }}
    </div>
    <div class='misc'>
      <nuxt-link class="tips-btn" :to="getMatchURLPath()" append>0 Tips</nuxt-link>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  name: 'MatchItem',
  props: ['gameSlug', 'homeTeam', 'awayTeam', 'date', 'id', 'odds', 'state', 'league'],
  methods: {
    getMatchURLPath () {
      return {
        path: `${this.id}/${this.buildMatchURLSegment(this.homeTeam, this.awayTeam)}`
      }
    },
    buildMatchURLSegment (homeTeam, awayTeam) {
      return `${homeTeam.split(' ').join('_')}-${awayTeam.split(' ').join('_')}`
    },
    formattedDate (date) {
      return format(new Date(date), 'HH:mm')
    },
    getLatestOdds (odds) {
      const oddsRanked = Object.assign([], odds).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      if (oddsRanked.length === 0) {
        return false
      }
      return oddsRanked[0]
    },
    getMatchScore (state) {
      if (state.scores) {
        return {
          home: state.scores.homeTeam,
          away: state.scores.awayTeam
        }
      }
      return {
        home: null,
        away: null
      }
    },
    isSettled () {
      return this.state.type === 'settled'
    }
  }
}
</script>

<style lang="stylus" scoped>
.match
  background #fff
  border-left-width 10px
  border-left-style solid
  margin-bottom 1px
  padding 15px
  display flex
  flex-wrap wrap
  +below(650px)
    flex-direction: column
  &.csgo
    border-left-color $color-csgo
  &.dota2
    border-left-color $color-dota2
  &.lol
    border-left-color $color-lol
  &.overwatch
    border-left-color $color-ow

.date
  padding 0 20px

.teams
  display flex
  +below(650px)
    flex-direction column

.team
  display flex
  align-items: center
  margin-right 10px
  +below(650px)
    justify-content space-between

.team--home
  text-align right
  +below(650px)
    text-align left

.team--away
  +above(650px)
    .team-name
      order 2
    .team-odds
      order 1

.team-name
  width 200px
  padding 0 20px
  +below(650px)
    width auto

.team-odds
  border 1px solid #dbdbdb
  border-radius 2px
  padding 5px 10px
  width 80px
  text-align center
  font-size 13px
  font-weight 700
  color $color-font

.team-score
  background-color $blue
  border 1px solid transparent
  border-radius 2px
  padding 5px 10px
  width 80px
  text-align center
  font-size 13px
  font-weight 700
  color #fff

.league
  padding 0 20px
  white-space nowrap

.misc
  text-align right
  margin 0 0 0 20px
  flex 1
  +below(650px)
    text-align left

.tips-btn
  display inline-block
  border 1px solid #dbdbdb
  border-radius 2px
  padding 5px 10px
  text-align center
  font-weight 700
  font-size 13px
  white-space: nowrap
  color $color-font


</style>
