<template>
  <div class='filter__dropdown' v-on-clickaway="closeMenu">
    <div class='filter__dropdown__label' @click="toggleMenu()">Games</div>
    <div class="filter__dropdown__content" v-if="showDropdown">
      <div class="filter-game" @click="toggleGame('csgo')" :class="{'is-active': selectedGames['csgo'] }">
        <span class="icon csgo" /><span class="name">CSGO</span>
      </div>
      <div class="filter-game" @click="toggleGame('hs')" :class="{'is-active': selectedGames['hs'] }">
        <span class="icon hs" /><span class="name">Hearthstone</span>
      </div>
      <div class="filter-game" @click="toggleGame('dota2')" :class="{'is-active': selectedGames['dota2'] }">
        <span class="icon dota2" /><span class="name">Dota2</span>
      </div>
      <div class="filter-game" @click="toggleGame('lol')" :class="{'is-active': selectedGames['lol'] }">
        <span class="icon lol" /><span class="name">LoL</span>
      </div>
      <div class="filter-game" @click="toggleGame('ow')" :class="{'is-active': selectedGames['ow'] }">
        <span class="icon ow" /><span class="name">Overwatch</span>
      </div>
      <div class="filter-game" @click="toggleGame('sc2')" :class="{'is-active': selectedGames['sc2'] }">
        <span class="icon sc2" /><span class="name">Starcraft 2</span>
      </div>
      <div class="filter-game" @click="toggleGame('hots')" :class="{'is-active': selectedGames['hots'] }">
        <span class="icon hots" /><span class="name">HotS</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [ clickaway ],
  data () {
    return {
      showDropdown: false,
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
    toggleMenu () {
      this.showDropdown = !this.showDropdown
    },
    closeMenu () {
      this.showDropdown = false
    },
    toggleGame (game) {
      this.selectedGames[game] = !this.selectedGames[game]
    }
  }
}
</script>

<style lang="stylus">
  .filter__dropdown__label
    user-select none
    font-weight 700
    text-transform uppercase
    padding 15px
    font-size 14px
    cursor pointer
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

  .filter__dropdown
    position relative
  .filter__dropdown__content
    position absolute
    top 100%
    right 0
    width auto
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
