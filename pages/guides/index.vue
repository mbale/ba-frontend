<template>
  <section class="guides">
    <!-- GUIDES -->
    <section class="guides__item guides__item--game">
      <ul class='list'>
        <li class='list__item' v-bind:key="guide.title" v-for="guide in guides">
          <nuxt-link :to="'guides/' + guide.slug">
            <card :title="guide.title" :imageURL="guide.cardImage"></card>
          </nuxt-link>
        </li>
      </ul>
    </section>
    <!-- BETTING TOOLS -->
    <section class="guides__item guides__item--tools">
      <h3 class="header">Betting tools</h3>
      <ul class='list'>
        <li class='list__item' v-bind:key='bettingTool.title' v-for='bettingTool in bettingTools'>
          <nuxt-link :to="'guides/' + bettingTool.routeTo" class="card">
            <card v-bind:class='bettingTool.class' :title="bettingTool.title" :imageURL="bettingTool.imageURL" :text="bettingTool.text"></card>
          </nuxt-link>
        </li>
      </ul>
    </section>

  </section>
</template>

<script>
import Vue from 'vue'
import Card from '~/components/common/card'
import BettingTermsImageURL from '~/assets/images/guides/betting-terms.svg'
import BettingOddsImageURL from '~/assets/images/guides/odds-converter.svg'
import BettingCalculatorImageURL from '~/assets/images/guides/margin-calculator.svg'

export default Vue.extend({
  name: 'Guides',
  data () {
    return {
      bettingTools: [
        {
          title: 'Betting Terms - Guides | Betacle',
          imageURL: BettingTermsImageURL,
          class: 'tools-glossary',
          routeTo: 'betting-glossary',
          text: 'A dictionary covering the most important definitions in esports betting.'
        },
        {
          title: 'Odds Converter - Guides | Betacle',
          imageURL: BettingOddsImageURL,
          class: 'tools-converter',
          routeTo: 'odds-converter',
          text: 'Convert different betting odds into the odds format of your choice.'
        },
        {
          title: 'Margin Calculator - Guides | Betacle',
          imageURL: BettingCalculatorImageURL,
          class: 'tools-calculator',
          routeTo: 'margin-calculator',
          text: 'Calculate betting margins to find out how much bookmakers charge you.'
        }]
    }
  },
  head () {
    return {
      title: 'Guides | Betacle'
    }
  },
  computed: {
    guides () {
      return this.$store.state.guides.list
    }
  },
  components: {
    Card
  },
  async fetch ({ store }) {
    await store.dispatch('guides/fetchAll')
  }
})
</script>

<style lang="stylus">

$full-width =
  max-width 100%
  flex-basis 100%

$one-half =
  max-width 50%
  flex-basis 50%

$one-third =
  max-width 33.333%
  flex-basis 33.333%

$one-quarter =
  max-width 25%
  flex-basis 25%

$one-fifth =
  max-width 20%
  flex-basis 20%

.guides
  margin 10px auto
  max-width 1180px

  .guides__item--tools
    background-color #e4e6eb
    margin-bottom 40px

    .header
      padding 30px 30px 0px 30px
      font-size 20px
      color #4d4d4d

  .list
    clear-list()
    display flex
    flex-direction row
    flex-flow row wrap
    padding 20px
    width 100%

    .list__item
      padding 10px
      {$one-quarter}
      +below(4)
        {$one-half}
      +below(2)
        {$full-width}

    .guide-list__item--large
      {$one-third}
      +below(2)
        {$full-width}


.card .tools-glossary
  .card__head
    background-color #1d1d1e

    .image
      max-height 75px

.card .tools-converter
  .card__head
    background-color #2d8849

    .image
      max-height 75px

.card .tools-calculator
  .card__head
    background-color #c41c38

    .image
      max-height 75px

</style>
