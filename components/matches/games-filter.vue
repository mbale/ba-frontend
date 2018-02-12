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
  computed: {
    games () {
      return this.$store.state.games.list
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
      this.$emit('selectedGamesChanged')
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
      &.hearthstone
        background-image url('~assets/images/games/icons/hs.svg')
      &.lol
        background-image url('~assets/images/games/icons/lol.svg')
      &.dota-2
        background-image url('~assets/images/games/icons/dota2.svg')
      &.overwatch
        background-image url('~assets/images/games/icons/ow.svg')
      &.starcraft-2
        background-image url('~assets/images/games/icons/sc2.svg')
      &.heroes-of-the-storm
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
      .name
        color $dgray
</style>
