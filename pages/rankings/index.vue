<template>
  <div class="rankings">
    <div class="toolbar">
      <div class="filters">
        <months-filter @selectedMonthsChanged="filterByMonths" />
      </div>
    </div>
    <div class="list">
      <table class="content__table">
        <thead>
          <tr>
            <th>Position</th>
            <th>User</th>
            <th>Tips</th>
            <th>Profit</th>
            <th>Yield</th>
            <th>In</th>
            <th>Out</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rankings.length > 0" v-for="(ranking, position) in rankings" :key="position">
            <td>{{ position + 1 }}</td>
            <td class="user">
              <nuxt-link :to="`/users/${ranking.user.username}`">
                <img class="user-avatar" :src="showUserAvatar(ranking.user.avatar)" alt="">
                <span class="username">{{ ranking.user.username }}</span>
              </nuxt-link>
            </td>
            <td v-if="ranking.stats.betCount !== null">{{ ranking.stats.betCount }}</td>
            <td v-if="ranking.stats.profit !== null">{{ ranking.stats.profit.toFixed(2) }}</td>
            <td v-if="ranking.stats.yield !== null">{{ ranking.stats.yield }}%</td>
            <td v-if="ranking.stats.in !== null">{{ ranking.stats.in }}</td>
            <td v-if="ranking.stats.overall !== null">{{ ranking.stats.overall.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import MonthsFilter from '~/components/rankings/months-filter'
import dateMixins from '~/mixins/date'
import noAvatarImage from '~/assets/images/no_avatar.png'

const { mapGetters, mapActions } = createNamespacedHelpers('rankings')

export default {
  name: 'Ranking',
  mixins: [dateMixins],
  components: {
    MonthsFilter
  },
  head () {
    return {
      title: 'Rankings | Betacle'
    }
  },
  computed: {
    ...mapGetters({
      rankings: 'sortedRankings'
    })
  },
  methods: {
    ...mapActions([
      'fetch'
    ]),
    showUserAvatar (avatar) {
      if (avatar === '') {
        return noAvatarImage
      } else {
        return avatar
      }
    },
    async filterByMonths () {
      this.fetch()
    }
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
  max-width 800px
  margin 0 auto

  .list
    display flex
    flex-direction column

    // table won't stick out of its content & the page
    table
      table-layout fixed
      word-break break-word
      background white
      border-spacing 0

      tr:nth-child(odd)
        background white

      td.user
        display flex
        flex-direction row
        align-items center
        padding 8px 5px

        a
          display flex
          align-items center
          color inherit

          &:hover
            color initial

          .user-avatar
            width 25px

          span.username
            margin-left 10px
</style>
