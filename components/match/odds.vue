<template>
  <div class="odds panel">
    <h1 class="header-text header-text--one">
      Odds
    </h1>
    <h2 class="header-text header-text--two">
      you may bet on
    </h2>
    <div class="list col">
      <div class="row row-odds" v-bind:key="o._id" v-for="o of odds">
        <span class="col col-odds" v-text="o.home"></span>
        <span class="col col-odds" v-text="o.away"></span>
        <span class="col col-date" v-text="formatDate(o.fetchedAt)"></span>
        <div class="button button--primary" @click="togglePredictionBox(o)">Bet</div>
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
  mixins: [dateMixins]
})
</script>

<style lang="stylus">

.list
  .row-header
    flex-direction row
    justify-content flex-start

    .odds-header
      margin-right 55px
      margin-bottom 5px

  .row-odds
    margin 0px

    > *
      margin-right 15px
      margin-bottom 10px
      justify-content center

      &:last-child
        margin-right 0px

  .col-date
    min-width 130px

  .col-odds
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

</style>
