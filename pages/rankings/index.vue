<template>
  <div class="rankings">
    <div class="toolbar">
      <div class="filters">
        <div class="month"></div>
        <dropdown class="filter-dropdown">
          <dropdown-button class="filter-dropdown__button">Month</dropdown-button>
          <div slot="content" class="filter-dropdown__content">
            <!-- <div class="filter-option" v-for="date of differenceInMonths())">
              <span class="icon" :class="game.slug" /><span class="name">{{game.name}}</span>
            </div> -->
          </div>
        </dropdown>
      </div>
    </div>
    <div class="list">
      <div class="list-header">
        <div class="list-header-row position">Position</div>
        <div class="list-header-row user">User</div>
        <div class="list-header-row tips">Tips</div>
        <div class="list-header-row profit">Profit</div>
        <div class="list-header-row yield">Yield</div>
        <div class="list-header-row in">In</div>
        <div class="list-header-row out">Out</div>
      </div>
      <div class="list-item" v-for="( ranking, position ) in rankings" v-bind:key="position">
        <div class="list-item-row position">{{ position + 1 }}</div>
        <div class="list-item-row user">{{ ranking.user.username }}</div>
        <div class="list-item-row tips">{{ ranking.stats.betCount }}</div>
        <div class="list-item-row profit">{{ ranking.stats.profit.toFixed(2) }}</div>
        <div class="list-item-row yield">{{ ranking.stats.yield }}%</div>
        <div class="list-item-row in">{{ ranking.stats.in }}</div>
        <div class="list-item-row out">{{ ranking.stats.overall.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { Dropdown, DropdownButton } from '~/components/common/dropdown'
import dateMixins from '~/mixins/date'

const { mapGetters } = createNamespacedHelpers('rankings')

export default {
  name: 'Ranking',
  mixins: [dateMixins],
  components: {
    Dropdown, DropdownButton
  },
  head () {
    return {
      title: 'Betacle - Rankings'
    }
  },
  computed: {
    ...mapGetters({
      rankings: 'sortedRankings'
    })
  },
  async asyncData ({ store }) {
    await store.dispatch('rankings/fetch')
  }
}
</script>

<style lang="stylus" scoped>

.rankings
  display flex
  flex-direction column

  .list
    display flex
    flex-direction column

    .list-header
      display flex
      justify-content space-between
      padding 15px 8px
      font-family: "DINPro", Helvetica, sans-serif;
      color #383e40
      font-size 16px
      font-weight 500

      .list-header-row
        flex 1
        padding 0 35px

        &:first-child
          padding-left 0px

        &:last-child
          margin-right 5px

    .list-item
      display flex
      justify-content space-between
      background #fff
      margin-bottom 1px
      padding 15px

      .list-item-row
        flex 1
        margin 0 25px

        &:first-child
          margin-left 0px

        &:last-child
          margin-right 0px

</style>
