<template>
  <div class="odds-calculator">
    <div class="odds-calculator__decimal">
      <span class="title">Decimal Odds</span>
      <div class="input-container">
        <input class="input input--decimal" v-model="values.decimal" @input="valueChanged('decimal')" type="text" />
      </div>
    </div>
    <div class="odds-calculator__fractional">
      <span class="title">Fractional Odds</span>
      <div class="input-container">
        <input class="input input--fractional" v-model="values.fractional" @input="valueChanged('fractional')" type="text" />
      </div>
    </div>
    <div class="odds-calculator__american">
      <span class="title">American Odds</span>
      <div class="input-container">
        <input class="input input--american" v-model="values.american" @input="valueChanged('moneyline')" type="text" />
      </div>
    </div>
    <div class="odds-calculator__implied">
      <span class="title">Implied Odds</span>
      <div class="input-container">
        <input class="input input--implied" v-model="values.implied" @ @input="valueChanged('impliedProbability')" type="text" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import oddsLib from 'oddslib'

export default Vue.extend({
  name: 'OddsCalculator',
  methods: {
    valueChanged (type) {
      try {
        // will throw error if any values empty or 1 due to dividing zero with value (e.g fractional)
        switch (type) {
          case 'decimal':
            this.values.fractional = oddsLib.from(type, this.values.decimal).to('fractional')
            this.values.american = oddsLib.from(type, this.values.decimal).to('moneyline')
            this.values.implied = oddsLib.from(type, this.values.decimal).to('impliedProbability', {
              precision: 2,
              percentage: true
            })
            break
          case 'fractional':
            this.values.decimal = oddsLib.from(type, this.values.fractional).to('decimal')
            this.values.american = oddsLib.from(type, this.values.fractional).to('moneyline')
            this.values.implied = oddsLib.from(type, this.values.fractional).to('impliedProbability', {
              precision: 2,
              percentage: true
            })
            break
          case 'moneyline':
            this.values.decimal = oddsLib.from(type, this.values.american).to('decimal')
            this.values.fractional = oddsLib.from(type, this.values.american).to('fractional')
            this.values.implied = oddsLib.from(type, this.values.american).to('impliedProbability', {
              precision: 2,
              percentage: true
            })
            break
          case 'impliedProbability':
            this.values.decimal = oddsLib.from(type, `${this.values.implied}%`).to('decimal')
            this.values.fractional = oddsLib.from(type, `${this.values.implied}%`).to('fractional')
            this.values.american = oddsLib.from(type, `${this.values.implied}%`).to('moneyline')
            break
        }
      } catch (error) {
        // reset
        if (this.values.decimal === '' || this.values.decimal === '1') {
          this.values.fractional = ''
          this.values.american = ''
          this.values.implied = ''
        }
        // we drop it
      }
      this.$emit('result', Math.round(this.values.decimal * 10))
    }
  },
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
  flex-wrap wrap

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
      margin 5px
      padding 12px
      text-align center
      font-size 100%
      line-height 1.15

</style>
