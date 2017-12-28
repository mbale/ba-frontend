<template>
  <section class="odds-converter">
    <h1 class="odds-converter__header">Odds Converter</h1>
    <section class="odds-converter__calculator">
      <p class="header">Convert odds between Decimal, Fractional, American and Implied format automatically in the calculator below.</p>
      <odds-calculator v-on:result="refreshResult"></odds-calculator>
      <div class="footer">
        <span class="text">Based on a 10 unit stake</span>
        <span class="result">${{ result }}</span>
      </div>
    </section>
    <section class="odds-converter__decimal-odds"></section>
    <section></section>
    <section></section>
    <section></section>
  </section>
</template>

<script>
import Vue from 'vue'
import OddsCalculator from '~/components/guides/OddsCalculator'

export default Vue.extend({
  name: 'OddsConverter',
  data () {
    return {
      result: 0
    }
  },
  methods: {
    refreshResult (result) {
      this.result = result
    }
  },
  components: {
    OddsCalculator
  }
})
</script>

<style lang="stylus">

.odds-converter
  margin 10px 40px
  padding 30px
  margin 0 auto

  .odds-converter__header
    color #2d3088
    font-size 22px
    display block
    font-size 26px
    margin-bottom 10px

  .odds-converter__calculator
    background-color #e4e6eb
    padding 20px

    .header
      margin-bottom 20px

    .footer
      display flex
      justify-content flex-end
      margin-top 16px

      .text
        display inline-flex
        flex-direction column
        justify-content center
        font-weight 600
        font-size 16px
        text-align center
        color #408fec

      .result
        margin-left 20px
        background-color #408fec
        color #fff
        padding 10px 40px
        display inline-block
        font-weight 600
        font-size 16px

</style>
