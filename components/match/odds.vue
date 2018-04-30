<template>
  <div class="odds panel">
    <h1 class="header-text header-text--one">
      Latest odds
    </h1>
    <h2 class="header-text header-text--two">
      you may bet on
    </h2>

    <div class="odds-list col">
      <div class="odds-row" v-bind:key="o._id" v-for="o of odds">
        <span class="row-item odds-team" v-text="o.home"></span>
        <span class="row-item odds-team" v-text="o.away"></span>
        <span class="row-item odds-date" v-text="sinceInWords(o.fetchedAt)"></span>
        <div class="odds-btn button button--primary" @click="openPredictionBox(o)">Bet</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import dateMixins from '~/mixins/date'

export default Vue.extend({
  name: 'MatchOdds',
  props: ['odds'],
  mixins: [dateMixins],
  computed: {
    loggedIn () {
      return this.$store.state.user.profile
    }
  },
  methods: {
    openPredictionBox (o) {
      if (this.loggedIn) {
        this.$emit('openPredictionBox', o)
      }
    }
  }
})
</script>

<style lang="stylus" scoped>

.odds
  .odds-list
    .odds-row
      display flex
      flex-direction row
      justify-content flex-start
      margin 0
      +below(3)
        flex-wrap wrap

      .row-item
        margin-right 50px
        justify-content center
        +below(3)
          margin-right auto
          flex 1 0 25%

      .odds-date
        display flex
        align-items center
        min-width 130px
        +below(3)
          min-width auto
          margin-left 10px

      .odds-team
        display flex
        flex-direction column
        justify-content center
        align-items center
        border 1px solid #dbdbdb
        border-radius 2px
        padding 5px 10px
        width 80px
        text-align center
        font-size 13px
        font-weight 700
        color #62626f
        user-select none
        +below(3)
          width auto
          max-width 65px
          margin-left 10px

        &:first-child
          +below(3)
            margin-left 0

      .odds-btn
        margin-right 0px
        +below(3)
          flex 1 0 100%
          margin-top 15px

</style>
