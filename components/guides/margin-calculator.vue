<template>
  <div class="margin-calculator">
    <div class="margin-calculator__one">
      <span class="title">Odds 1</span>
      <div class="input-container">
        <input class="input" v-model="values.odds1" type="text" />
      </div>
    </div>
    <div class="margin-calculator__two">
      <span class="title">Odds 2</span>
      <div class="input-container">
        <input class="input" v-model="values.odds2" type="text" />
      </div>
    </div>
    <div class="margin-calculator__third">
      <span class="title">Odds 3 (optional)</span>
      <div class="input-container">
        <input class="input" v-model="values.odds3" type="text" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'MarginCalculator',
  computed: {
    result () {
      const {
        odds1,
        odds2,
        odds3
      } = this.values

      // required
      if (odds1 === '' || odds2 === '' || odds1 === '0' || odds2 === '0') {
        return 0
      }

      let implOdds1 = 1 / odds1
      let implOdds2 = 1 / odds2
      let implOdds3 = 0

      if (odds3 !== '') {
        implOdds3 = 1 / odds3
      } else {
        implOdds3 = 0
      }

      return `${Math.round((implOdds1 + implOdds2 + implOdds3 - 1) * 100)}%`
    }
  },
  watch: {
    result () {
      this.$emit('result', this.result)
    }
  },
  data () {
    return {
      values: {
        odds1: '',
        odds2: '',
        odds3: ''
      }
    }
  }
})
</script>

<style lang="stylus">

.margin-calculator
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
