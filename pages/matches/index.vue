<template>
  <div class="matches">
    <div class="matches__paginate">
      <paginate
        :page-count="pageCount"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'list content-panel'"
        :prev-class="'previous'"
        :next-class="'next'"
        :page-class="'item'"
        :page-link-class="'item-link'"
        :active-class="'active'"
        :disabled-class="'disabled'">
          <span slot="prevContent">
            <icon name="angle-left" scale="1.5"></icon>
          </span>
          <span slot="nextContent">
            <icon name="angle-right" scale="1.5"></icon>
          </span>
      </paginate>
    </div>
    <div class="matches__list" v-bind:key="date" v-for="[date, matches] in Object.entries(matchesGrouped)">
      <span class="date">{{ formatDate(date) }}</span>
      <nuxt-link :to="'home'" v-bind:key="match.id" v-for="match of matches" append>
        <div class="match content-panel">
          <div class="match-game" v-bind:style="getGameBGColor(match.gameSlug)">
            <img class="game-image" v-bind:src="getIconURL(match.gameSlug)" alt="">
          </div>
          <div class="match-date">
            {{ formatMatchDate(match.date) }}
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
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/angle-left'
import 'vue-awesome/icons/angle-right'
import format from 'date-fns/format'

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
    Paginate,
    Icon
  },
  head () {
    return {
      title: 'Betacle - Matches'
    }
  },
  computed: {
    matchesGrouped () {
      return this.$store.getters['matches/groupByDay']
    },
    matchCount () {
      return this.$store.state.matches.count
    },
    pageCount () {
      return Math.round(this.matchCount / 10)
    }
  },
  methods: {
    formatDate (date) {
      return format(new Date(date), 'dddd, MMMM D')
    },
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
    formatMatchDate (date) {
      return format(new Date(date), 'HH:mm')
    },
    getIconURL (gameSlug) {
      return this.iconURLs[gameSlug]
    },
    async changePage (page) {
      await this.$store.dispatch('matches/fetch', {
        page
      })
    }
  },
  async asyncData ({ store }) {
    await Promise.all([
      store.dispatch('matches/fetch', {}),
      store.dispatch('games/fetchAll', {})
    ])
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
      padding 2px
      list-style none
      user-select none

      .item
        display inline-flex
        justify-content center
        align-items center
        margin 2px 6px
        padding 6px

        .item-link
          color black

      .item.active
        background-color #E8444A
        color white
        font-weight 600
        border-radius 4px
        padding 0px 12px

        a
          color white

      // all item as links
      a
        display inline-flex
        justify-content center
        align-items center

      .previous
        display inline-flex
        justify-content center
        padding 6px 16px
        border-right 1px solid #DADEE2
        margin-right 3px

        a
          color #E8444A

      .next
        display inline-flex
        justify-content center
        padding 6px 16px
        border-left 1px solid #DADEE2
        margin-left 3px

        a
          color #E8444A

      // .item
      //   padding 5px
      //   color black

      //   a
      //     color black

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
