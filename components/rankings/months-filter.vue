<template>
  <dropdown class='filter-dropdown'>
    <dropdown-button class="filter-dropdown__button">Months</dropdown-button>
    <div slot="content" class="filter-dropdown__content">
      <div
        class="filter-game"
      	v-for="month in monthsFilters" v-bind:key="month.slug"
      	@click="toggleMonth(month)" :class="{'is-active': month.active }"
      >
        <span class="name">{{month.name}}</span>
      </div>
    </div>
  </dropdown>
</template>

<script>
import { Dropdown, DropdownButton } from '~/components/common/dropdown'
import { every } from 'lodash'

export default {
  components: {
    Dropdown, DropdownButton
  },
  computed: {
    monthsFilters () {
      return this.$store.getters['rankings/monthsFiltersToShow']
    }
  },
  methods: {
    toggleMonth (month) {
      // console.log(month)
      // If all months are active, set them all to inactive
      if (every(this.monthsFilters, 'active')) {
        this.monthsFilters.forEach(filter => {
          this.$store.commit('rankings/update_month_filter', {
            slug: filter.slug,
            value: !filter.active
          })
        })
      }
      this.$store.commit('rankings/update_month_filter', {
        slug: month.slug,
        value: !month.active
      })
      // If all months are inactive, set them all to active
      if (every(this.monthsFilters, ['active', false])) {
        this.monthsFilters.forEach(filter => {
          this.$store.commit('rankings/update_month_filter', {
            slug: filter.slug,
            value: true
          })
        })
      }
      this.$emit('selectedMonthsChanged')
    }
  }
}
</script>

<style lang="stylus" scoped>
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
