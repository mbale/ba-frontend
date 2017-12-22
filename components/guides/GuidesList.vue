<template>
  <div></div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'GuidesList'
})
</script>

<style lang="stylus">

.card--tools
  .card__img
    max-height 75px

.card--guide
  .card__head
    display flex
    justify-content center
    align-items center

.card--glossary
  .card__head
    background-color #1D1D1E

.card--odds-converter
  .card__head
    background-color #2d8849

.card--margin-calculator
  .card__head
    background-color #c41c38

.betting-tools
  background-color #e4e6eb
  margin-bottom 40px
  h3
    padding 30px 30px 0 30px
    font-size 20px
    color #4d4d4d
  .card-list
    padding-top 10px


</style>
