<template>
  <div class="matches">
    <div class="matches__paginate">
      <paginate
        :page-count="pageCount"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'list'">
      </paginate>
    </div>
    <div class="matches__list">
      <div class="match content-panel" v-bind:key="match.id" v-for="match in matches">
        <div class="game-icon" v-bind:class="`game-icon--${match.gameSlug}`">
          <img class="game-image" v-bind:src="getIconURL(match.gameSlug)" alt="">
        </div>
        <div class="match-date">
          {{ transformDate(match.date) }}
        </div>
        <div class="match-main">
          <div class="match-versus">
            <span class="home-team">
              {{ match.homeTeam}}
            </span>
            <span class="versus"> vs </span>
            <span class="away-team">
              {{ match.awayTeam}}
            </span>
          </div>
          <div class="match-league">
            <span class="league">
              {{ match.league }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Paginate from 'vuejs-paginate/src/components/Paginate.vue'
import csgoIconURL from '~/assets/images/games/icons/csgo.svg'
import dota2IconURL from '~/assets/images/games/icons/dota-2.svg'
import hearthStoneIconURL from '~/assets/images/games/icons/hearthstone.svg'
import hotsIConURL from '~/assets/images/games/icons/heroes-of-the-storm.svg'
import lolIconURL from '~/assets/images/games/icons/lol.svg'
import owIconURL from '~/assets/images/games/icons/ow.svg'
import rlIconURL from '~/assets/images/games/icons/rocket-league.svg'
import sc2IconURL from '~/assets/images/games/icons/starcraft-2.svg'

export default Vue.extend({
  name: 'Matches',
  data () {
    return {
      iconURLs: {
        csgo: csgoIconURL,
        'dota-2': dota2IconURL,
        'hearthstone': hearthStoneIconURL,
        'heroes-of-the-storm': hotsIConURL,
        lol: lolIconURL,
        ow: owIconURL,
        'rocket-league': rlIconURL,
        'starcraft-2': sc2IconURL
      }
    }
  },
  components: {
    Paginate
  },
  head () {
    return {
      title: 'Betacle - Matches'
    }
  },
  computed: {
    matches () {
      return this.$store.state.matches.list
    },
    matchCount () {
      return this.$store.state.matches.count
    },
    pageCount () {
      return Math.round(this.matchCount / 20)
    }
  },
  methods: {
    transformDate (date) {
      return new Date(date)
    },
    getIconURL (gameSlug) {
      return this.iconURLs[gameSlug]
    },
    async changePage (pageNumber) {
      await this.$store.dispatch('matches/fetchByPage', {
        pageNumber
      })
    }
  },
  async asyncData ({ store }) {
    await store.dispatch('matches/fetch')
  }
})
</script>

<style lang="stylus">
.matches
  width 100%

  &__paginate
    display flex

    .list
      display flex
      flex-direction row
      flex-wrap wrap

      li
        display inline-flex
        margin 5px

  &__list
    display flex
    flex-direction column

    .match
      display flex

      &-main
        display flex
        flex-direction column
        padding 20px

        .versus
          margin 20px


.game-icon
  display flex
  flex-direction column
  justify-content center
  min-width 64px
  padding 20px

  &--lol
    background-color rgb(57, 66, 157)
  &--starcraft-2
    background-color rgb(14, 54, 95)
  &--csgo
    background-color rgb(246, 137, 52)
  &--dota-2
    background-color rgb(180, 67, 53)
  &--ow
    background-color rgb(250, 194, 61)

  .game-image
    max-width 32px


</style>
