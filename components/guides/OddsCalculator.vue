<template>
  <div class="odds-calculator">
    <div class="odds-calculator__decimal">
      <span class="title">Decimal Odds</span>
      <div class="input-container">
        <input class="input input--decimal" v-bind:value="values.decimal" type="text" />
      </div>
    </div>
    <div class="odds-calculator__fractional">
      <span class="title">Fractional Odds</span>
      <div class="input-container">
        <input class="input input--fractional" v-bind:value="values.fractional" type="text" />
      </div>
    </div>
    <div class="odds-calculator__american">
      <span class="title">American Odds</span>
      <div class="input-container">
        <input class="input input--american" v-bind:value="values.american" type="text" />
      </div>
    </div>
    <div class="odds-calculator__implied">
      <span class="title">Implied Odds</span>
      <div class="input-container">
        <input class="input input--implied" v-bind:value="values.implied" type="text" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// import oddsLib from 'oddslib'

export default Vue.extend({
  name: 'OddsCalculator',
  data () {
    return {
      values: {
        decimal: '',
        fractional: '',
        american: '',
        implied: ''
      }
    }
  }
})
</script>

<style lang="stylus">

.odds-calculator
  display flex
  flex-direction row

  > *
    flex-grow 1
    display flex
    flex-direction column

  .title
    display flex
    justify-content center
    background-color #45454e
    padding 10px 20px 10px 20px
    color #fff
    font-weight 700

  .input-container
    display flex
    background-color #62626f

    .input
      flex-grow 1
      margin 10px
      margin-right 0px
      padding 12px
      text-align center
      font-size 100%
      line-height 1.15

  .odds-calculator__implied
    .input
      margin-right 10px

</style>
