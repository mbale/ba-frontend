<template>
  <dropdown class='filter-dropdown'>
    <dropdown-button class="filter-dropdown__button">Games</dropdown-button>
    <div slot="content" class="filter-dropdown__content">
      <div class="filter-game" v-for="(game, key) in games" @click="toggleGame(key)" :class="{'is-active': selectedGames[key] }">
        <span class="icon" :class="key" /><span class="name">{{game}}</span>
      </div>
    </div>
  </dropdown>
</template>

<script>
import { Dropdown, DropdownButton } from '~/components/common/dropdown'

export default {
  components: {
    Dropdown, DropdownButton
  },
  data () {
    return {
      games: {
        csgo: 'CSGO',
        hs: 'Hearthstone',
        dota2: 'Dota2',
        lol: 'LoL',
        ow: 'Overwatch',
        sc2: 'Starcraft 2',
        hots: 'HotS'
      },
      selectedGames: {
        csgo: true,
        hs: true,
        dota2: true,
        lol: true,
        ow: true,
        sc2: true,
        hots: true
      }
    }
  },
  methods: {
    toggleGame (game) {
      this.selectedGames[game] = !this.selectedGames[game]
    }
  }
}
</script>

<style lang="stylus">
  .filter-dropdown__button
    font-weight 700
    text-transform uppercase
    padding 15px
    font-size 14px
    color $dgray
    display flex
    align-items center
    &:after
      content ''
      width 0
      height 0
      border 6px solid transparent
      border-top-width 6px
      border-bottom-width 0
      border-top-color $dgray
      transition all .25s
      margin-left 10px
  .filter-dropdown__content
    background-color: #fff
    border 1px solid $color-border
    padding 10px
  .filter-game
    padding 5px 10px
    cursor pointer
    white-space nowrap
    .icon
      display inline-block
      height 35px
      width 35px
      margin-right 15px
      border-radius 2px
      background-size 80%
      background-position center center
      background-repeat no-repeat
      vertical-align middle
      background-color #afafaf
      &.csgo
        background-image url('~assets/images/games/icons/csgo.svg')
      &.hs
        background-image url('~assets/images/games/icons/hs.svg')
      &.lol
        background-image url('~assets/images/games/icons/lol.svg')
      &.dota2
        background-image url('~assets/images/games/icons/dota2.svg')
      &.ow
        background-image url('~assets/images/games/icons/ow.svg')
      &.sc2
        background-image url('~assets/images/games/icons/sc2.svg')
      &.hots
        background-image url('~assets/images/games/icons/hots.svg')
    .name
      font-weight bold
      font-size 14px
      user-select none
      color #aaa
    &.is-active
      .icon
        &.csgo
          background-color $color-csgo
        &.hs
          background-color: $color-hs
        &.lol
          background-color: $color-lol
        &.dota2
          background-color: $color-dota2
        &.ow
          background-color: $color-ow
        &.sc2
          background-color: $color-sc2
        &.hots
          background-color: $color-hots
      .name
        color $dgray
</style>
