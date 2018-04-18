<template>
  <div class="match__info panel">
    <header class="header">
      <h1 class="header-text header-text--one">
        Information
      </h1>
      <h2 class="header-text header-text--two">
        {{ formatMatchDate(match.date, 'dddd, MMMM D - HH:mm') }}
      </h2>
    </header>
    <main class="content">
      <div class="col">
        <span class="title">home</span>
        <span class="text">{{ match.homeTeam}}</span>
      </div>
      <div class="col">
        <span class="title">away</span>
        <span class="text">{{ match.awayTeam}}</span>
      </div>
      <div class="col">
        <span class="title">game</span>
        <span class="text">{{ match.game}}</span>
      </div>
      <div class="col">
        <span class="title">league</span>
        <span class="text">{{ match.league}}</span>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import matchMixins from '~/mixins/match'

export default Vue.extend({
  name: 'Info',
  mixins: [matchMixins],
  computed: {
    match () {
      return this.$store.state.match.data
    }
  }
})
</script>

<style lang="stylus">
.match__info
  .content
    display flex
    flex-direction row
    margin 0
    padding 8px 0px

    .col
      margin-right 35px
      flex-wrap wrap

    .title
      display flex
      justify-content flex-start
      color #99a7bc
      font-weight 800
      text-transform uppercase
      margin-bottom 10px

    .text
      display flex
      justify-content flex-start
      color #4f5969

    .col:first-child,
      .title
        margin-top 0px

    .col:last-child
      .text
        margin-bottom 0px
    
</style>
