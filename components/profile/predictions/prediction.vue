<template>
  <article class="prediction">
    <header class="prediction-header">
      <div class="prediction-header__info">
        <div class="leftCorner" :class="prediction.gameSlug">
          <img :src="gameLogo(prediction.gameSlug)" alt="">
        </div>
        <div class="content-prediction">
          <div class="teams">
            <h3 class="content-title">{{ gameName(prediction.gameSlug) }}</h3>
            <nuxt-link :to="getMatchURLPath()">
              <span class="away">{{ prediction.match.awayTeam }}</span> - VS - <span class="home">{{ prediction.match.homeTeam }}</span>
            </nuxt-link>
          </div>
          <div class="stake">
            <span class="text-span">Stake:</span>
            <span class="odds">
              $<span class="stake-value">{{ prediction.stake }}</span> (odds: {{ prediction.odds }})
            </span>
          </div>
          <div class="profit">
            <span class="text-span">Profit:</span>
            <span class="user-profit" :class="betStatus()">{{ predictionProfit }}</span>
          </div>
        </div>
      </div>
    </header>
  </article>
</template>

<script>
import noAvatarImage from '~/assets/images/no_avatar.png'
import dateMixin from '~/mixins/date'

import csgoLogo from '~/assets/images/games/icons/csgo.svg'
import dota2Logo from '~/assets/images/games/icons/dota2.svg'
import hotsLogo from '~/assets/images/games/icons/hots.svg'
import hsLogo from '~/assets/images/games/icons/hs.svg'
import lolLogo from '~/assets/images/games/icons/lol.svg'
import owLogo from '~/assets/images/games/icons/ow.svg'
import rocketLeagueLogo from '~/assets/images/games/icons/rocket-league.svg'
import sc2Logo from '~/assets/images/games/icons/sc2.svg'

export default {
  mixins: [dateMixin],
  components: {
  },
  data () {
    return {
      noAvatarImage
    }
  },
  props: {
    prediction: Object
  },
  computed: {
    predictionProfit () {
      const { status, stake, odds } = this.prediction

      switch (status) {
        case 'loss': return `-$${stake}`
        case 'win': return `$${(stake * odds).toFixed(3)}`
        case 'undecided': return 'unknown'
      }
    }
  },
  methods: {
    betStatus () {
      const { status } = this.prediction

      switch (status) {
        case 'win': return 'win'
        case 'loss': return 'loss'
        case 'undecided': return 'undecided'
      }
    },
    getMatchURLPath () {
      const { gameSlug, match } = this.prediction
      const { homeTeam, awayTeam, urlId } = match

      return {
        path: `/matches/${gameSlug}/${this.buildMatchURLSegment(homeTeam, awayTeam)}/${urlId}`
      }
    },
    buildMatchURLSegment (homeTeam, awayTeam) {
      return `${homeTeam.toLowerCase().split(' ').join('_')}-vs-${awayTeam.toLowerCase().split(' ').join('_')}`
    },
    gameLogo (gameSlug) {
      switch (gameSlug) {
        case 'csgo': return csgoLogo
        case 'dota-2': return dota2Logo
        case 'heroes-of-the-storm': return hotsLogo
        case 'hearthstone': return hsLogo
        case 'lol': return lolLogo
        case 'overwatch': return owLogo
        case 'rocket-league': return rocketLeagueLogo
        case 'starcraft-2': return sc2Logo
      }
    },
    gameName (gameSlug) {
      switch (gameSlug) {
        case 'csgo': return 'Counter Strike: Global Offensive'
        case 'dota-2': return 'Dota 2'
        case 'heroes-of-the-storm': return 'Heroes of the Storm'
        case 'hearthstone': return 'Hearthstone'
        case 'lol': return 'League of Legends'
        case 'overwatch': return 'Overwatch'
        case 'rocket-league': return 'Rocket League'
        case 'starcraft-2': return 'Starcraft 2'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .stake
    margin-top 15px

  .prediction
    border-bottom 1px solid $color-border
    margin 0 -20px

  .prediction-header
    display: flex

  .prediction-header__avatar
    background-color #D8D8D8
    height: 50px
    width: 50px
    border-radius 2px
    overflow: hidden
    margin-right 15px

  .prediction-header__info
    flex 1
    display flex
    align-items flex-start
    flex-direction row
    flex-wrap: wrap

    .leftCorner
      display flex
      width 25px
      height 100%
      align-items center
      justify-content center

      &.win
        background-color: #338830

      &.loss
        background-color: #c72424

      img
        padding: 2px

      &.csgo
        background-color $color-csgo
      &.hearthstone
        background-color: $color-hs
      &.lol
        background-color: $color-lol
      &.dota-2
        background-color: $color-dota2
      &.overwatch
        background-color: $color-ow
      &.starcraft-2
        background-color: $color-sc2
      &.heroes-of-the-storm
        background-color: $color-hots

    .content-prediction
      margin-left: 35px

      .content-title
        font-size: 16px
        margin-top: 20px
        margin-bottom: 5px
        color: $lgray

      .teams
        font-size: 14px

        a
          color: inherit

          &:hover span
            color: initial

          span
            font-size: 18px

      .text-span
        text-transform: uppercase
        font-size: 14px

      .stake
        margin: 7px 0

        .odds
          margin-left: 15px
          font-size: 14px

        .stake-value
          font-size: 16px

      .profit
        margin-bottom: 20px

        .user-profit

          &.win
            margin-left: 13px
            color: $green

          &.loss
            margin-left: 8px
            color: $red

          &.undecided
            margin-left: 10px

</style>
