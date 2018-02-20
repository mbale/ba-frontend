<template>
  <dropdown class='filter-dropdown'>
    <dropdown-button class="filter-dropdown__button">Games</dropdown-button>
    <div slot="content" class="filter-dropdown__content">
      <div class="filter-game" v-for="game in games" @click="toggleGame(game)" :class="{'is-active': game.isActive }">
        <span class="icon" :class="game.slug" /><span class="name">{{game.name}}</span>
      </div>
    </div>
  </dropdown>
</template>

<script>
import { Dropdown, DropdownButton } from '~/components/common/dropdown'
import { every, map } from 'lodash'

export default {
  components: {
    Dropdown, DropdownButton
  },
  data () {
    return {
      games: [
        { slug: 'csgo', name: 'CSGO', isActive: true },
        { slug: 'hs', name: 'Hearthstone', isActive: true },
        { slug: 'dota2', name: 'Dota2', isActive: true },
        { slug: 'lol', name: 'LoL', isActive: true },
        { slug: 'ow', name: 'Overwatch', isActive: true },
        { slug: 'sc2', name: 'Starcraft 2', isActive: true },
        { slug: 'hots', name: 'HotS', isActive: true }
      ]
    }
  },
  methods: {
    toggleGame (game) {
      // If all games are active, set them all to inactive
      if (every(this.games, 'isActive')) {
        map(this.games, function (game) {
          game.isActive = false
        })
      }
      this.$set(game, 'isActive', !game.isActive)
      // If all games are inactive, set them all to active
      if (every(this.games, ['isActive', false])) {
        map(this.games, function (game) {
          game.isActive = true
        })
      }
    }
  }
}
</script>

<style lang="stylus">
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
