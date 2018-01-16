<template>
  <div class="matches">
    <div class="matches__paginate">
      <paginate
        :page-count="pageCount"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'list content-panel'"
        :page-class="'item'"
        :page-link-class="'item-link'"
        :active-class="'item item--active'"
        :disabled-class="'item item--disabled'"	>
      </paginate>
    </div>
    <div class="matches__list">
      <nuxt-link :to="getMatchURLPath(match)" v-bind:key="match.id" v-for="match in matches" append>
        <div class="match content-panel">
          <div class="match-game" v-bind:style="getGameBGColor(match.gameSlug)">
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
      </nuxt-link>
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
import mixins from '~/mixins/util'

export default Vue.extend({
  name: 'Matches',
  mixins: [mixins],
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
    getMatchURLPath ({homeTeam, awayTeam, date, id}) {
      return {
        path: `${id}/${this.buildMatchURLSegment(homeTeam, awayTeam)}`
      }
    },
    getGameBGColor (gameSlug) {
      const game = this.$store.state.games.list.find((game) => game.slug === gameSlug)
      const prop = 'background-color: '

      if (game) {
        return `${prop}${game.color}`
      }

      return `${prop}#1E824C`
    },
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
    await store.dispatch('games/fetchAll')
  }
})
</script>

<style lang="stylus">
.matches
  width 100%

  &__paginate
    display flex
    margin-bottom 50px

    .list
      display flex
      flex-direction row
      flex-wrap wrap
      border 1px solid #D1D2D7
      padding 5px
      list-style none
      color #000000

      .item
        display inline-flex
        justify-content center
        align-items center
        padding 5px
        color #000000

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


.match-game
  display flex
  flex-direction column
  justify-content center
  min-width 52px
  padding 10px

  .game-image
    max-width 44px


</style>
