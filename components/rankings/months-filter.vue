<template>
  <dropdown class='filter-dropdown'>
    <dropdown-button class="filter-dropdown__button">Months</dropdown-button>
    <div slot="content" class="filter-dropdown__content">
      <div
        class="filter-month"
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
  .filter-month
    padding 5px 10px
    cursor pointer
    white-space nowrap
    .name
      font-weight bold
      font-size 14px
      user-select none
      color #aaa
    &.is-active
      .name
        color $dgray
</style>
