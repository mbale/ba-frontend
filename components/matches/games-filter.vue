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

export default {
  components: {
    Dropdown, DropdownButton
  },
  data () {
    return {
      games: [
        { slug: 'csgo', name: 'CSGO' },
        { slug: 'hs', name: 'Hearthstone' },
        { slug: 'dota2', name: 'Dota2' },
        { slug: 'lol', name: 'LoL' },
        { slug: 'ow', name: 'Overwatch' },
        { slug: 'sc2', name: 'Starcraft 2' },
        { slug: 'hots', name: 'HotS' }
      ]
    }
  },
  methods: {
    toggleGame (game) {
      this.$set(game, 'isActive', !game.isActive)
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
