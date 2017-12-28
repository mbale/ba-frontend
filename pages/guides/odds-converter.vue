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
    <!-- DECIMAL ODDS -->
    <section class="odds-converter__section">
      <h2 class="header">Decimal Odds</h2>
      <p class="text">Decimal odds, also known as European odds since they are most commonly used in Europe, tell you the potential amount you can win including the bet amount. For example if you bet $10 at decimal odds of 1.5, the total return is $15 ($10 * 1.5), and the potential profit is $5 ($15 - original bet amount $10).</p>
      <blockquote class="formula">
        <h3 class="header">Decimal to Fractional</h3>
        <span class="explanation">
          To convert decimal odds to fractional odds, substract 1 and convert to a fraction, then reduce to its simplest form. <br>
        </span>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">3.5 → 3.5 - 1 = 2.5/1 = 5/2</code>
        </div>
      </blockquote>
      <blockquote class="formula">
        <h3 class="header">Decimal to American</h3>
        <span class="explanation">
          To convert decimal odds of 2.0 or higher, substract 1 and multiply by 100. <br>
        </span>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">2.5 → 2.5 - 1 * 100 = +100</code>
        </div>
        <div class="explanation">
          To convert decimal odds of 2.0 or higher, substract 1 and multiply by 100. <br>
        </div>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">1.5 → -100/(1.5 - 1) = -100/0.5 = -200</code>
        </div>
      </blockquote>
    </section>
    <!-- FRACTIONAL ODDS -->
    <section class="odds-converter__section">
      <h2 class="header">Fractional Odds</h2>
      <p class="text">Fractional odds, also known as British or Traditional odds, are used mainly in the UK. They tell you the amount of profit relative to your stake if you win your bet.
          For example, if you bet $10 at odds of 3/1, you will receive $30 of profit if you win.
        </p>
      <blockquote class="formula">
        <h3 class="header">Fractional to Decimal</h3>
        <span class="explanation">
          To convert fractional odds to decimal odds, convert the Fraction to a Decimal and add 1. <br>
        </span>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">3/4 → (3/4) + 1 = 0.75 + 1 = 1.75</code>
        </div>
      </blockquote>
      <blockquote class="formula">
        <h3 class="header">Fractional to American</h3>
        <span class="explanation">
          To convert fractional odds that are over 1/1, convert the Fraction to Decimal and multiply by 100. <br>
        </span>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">7/4 → (7/4) * 100 = 1.4 * 100 = +140</code>
        </div>
        <div class="explanation">
          To convert fractional odds that are under 1/1, divide -100 by the Fraction as a Decimal. <br>
        </div>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">1/4 → -100/(1/4) = -100/0.25 = -400</code>
        </div>
      </blockquote>
    </section>
    <!-- AMERICAN Odds -->
    <section class="odds-converter__section">
      <h2 class="header">American Odds</h2>
      <p class="text">American odds, also known as Moneyline odds, are used most by US bookmakers. If the odds are positive, they tell you the amount you would win on a $100 bet.
If the odds are negative, they tell you the amount you would need to bet to win $100.
        </p>
      <blockquote class="formula">
        <h3 class="header">American to Decimal</h3>
        <span class="explanation">
          To convert positive (+) odds, divide the American by 100 and add 1. <br>
        </span>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">+100 → (100/100) + 1 = 1 + 1 = 2.0</code>
        </div>
        <span class="explanation">
          To convert negative (-) odds, divide 100 by the American, and add 1. <br>
        </span>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">-110 → -110/(100/110) + 1 = 1 + 0.9091 = 1.9091</code>
        </div>
      </blockquote>
      <blockquote class="formula">
        <h3 class="header">American to Fractional</h3>
        <span class="explanation">
          To convert positive (+) odds, divide the American by 100 and then reduce to its simplest form. <br>
        </span>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">+120 → (120/100) = 6/5</code>
        </div>
        <div class="explanation">
          To convert negative (-) odds, divide 100 by the American and then reduce to its simplest form. <br>
        </div>
        <div class="example">
          <span class="text">Example: </span>
          <code class="code">-120 → (100/120) = 5/6</code>
        </div>
      </blockquote>
    </section>
    <!-- IMPLIED ODDS -->
    <section class="odds-converter__section">
      <h2 class="header">Implied Odds</h2>
      <p class="text">Implied odds are a percentage that tell you the perceived likelihood of an event occuring.
For example 2.0 Decimal odds are expected to be won once in every 2 attempts, hence the probability is 50%.
</p>
    </section>
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
  padding 30px
  margin 0 auto

  .odds-converter__header
    color #2d3088
    font-size 22px
    display block
    font-size 26px
    margin-bottom 10px

  .odds-converter__section
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
