<template>
  <section class="margin-converter">
    <h1 class="margin-converter__header">Margin Calculator</h1>
    <section class="margin-converter__calculator">
      <p class="header">Calculate the margin that a bookmaker is charging you on specific odds.</p>
      <margin-calculator v-on:result="refreshResult"></margin-calculator>
      <div class="footer">
        <span class="text">Based on a 10 unit stake</span>
        <span class="result">${{ result }}</span>
      </div>
    </section>
    <section class="margin-converter__section">
      <h2 class="header">What are bookmaker margins?</h2>
      <p class="text">Bookmaker margins are implemented by bookmakers to ensure they make a profit. The odds that a bookmaker calculates to be fair on a particular market will be slightly adjusted by the margin the bookmaker operates with. This protects the bookmakers, and gives them a form of guarantee that they will make a profit. Therefore, the lower the bookmaker margin, the lesser the cut the bookmakers are taking, the greater the prices you’re getting as a bettor.</p>
      <p class="text">An example of how this works in practice is, if you were to bet £100, and the bookmaker operated with a 5% margin rate, the average bettor would be paying £5 to the bookmaker over the course of that £100. On a coin toss, a 50/50 market, you’d be offered odds of 1.9.</p>
      <p class="text">Use the margin calculator to ensure you’re betting with a competitive and fair bookmaker.</p>
    </section>
    <section class="margin-converter__section">
      <h2 class="header">How to calculate betting margins</h2>
      <p class="text">The lower the margin, the better the value for you as a bettor. Margins are the best way to truly compare odds.</p>
      <blockquote class="formula">
        <h3 class="header">2 Way market</h3>
        <span class="explanation">
          The margin is the sum of the implied odds minus 1.
        </span>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">Odds of 1.5 & 2.5 → (1/1.5) + (1/2.5) -1 = 0.66 + 0.4 - 1 = 0.06 = 6%</code>
        </div>
      </blockquote>
      <blockquote class="formula">
        <h3 class="header">3 Way market</h3>
        <span class="explanation">
          The margin is the sum of the implied odds minus 1.
        </span>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">Odds of 1.5 & 2.5 & 2 → (1/1.5) + (1/2.5) + (1/2) - 1 = 0.66 + 0.4 + 0.5 - 1 = 0.56 = 56%</code>
        </div>
      </blockquote>
    </section>
  </section>
</template>

<script>
import Vue from 'vue'
import MarginCalculator from '~/components/guides/MarginCalculator'

export default Vue.extend({
  name: 'MarginConverter',
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
    MarginCalculator
  }
})
</script>

<style lang="stylus">

.margin-converter
  padding 30px
  margin 0 auto

  .margin-converter__header
    color #2d3088
    font-size 22px
    display block
    font-size 26px
    margin-bottom 10px

  .margin-converter__calculator
    background-color #e4e6eb
    padding 20px

  .margin-converter__section
    margin 20px 0px 20px 0px
    color #62626f
    background-color #fff
    padding 20px

    .header
      margin-bottom 15px
      font-size 23px
      color #4d4d4d

    .text
      line-height 1.75
      margin-bottom 20px

    .formula
      background hsla(0,0%,96%,.5)
      margin-top 20px
      border 1px solid #efefef
      padding 15px

      .header
        font-size: 14px;
        margin: 5px 0px 5px 0px;
        color: #4d4d4d;

      .explanation
        margin-bottom 5px
        line-height 1.75

      .example
        line-height 1.75

        .code
          background #f5f5f5
          padding 5px
          display inline-block

  .margin-converter__calculator
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
