<template>
  <section class="guides">
    <!-- GAME GUIDES -->
    <ul class='guide-list'>
      <li class='guide-list__item' v-bind:key="guide.title" v-for="guide in guides">
        <nuxt-link :to="'guides/' + guide.slug">
          <card :title="guide.title" :imageURL="guide.cardImage"></card>
        </nuxt-link>
      </li>
    </ul>
    <!-- BETTING GUIDES -->
    <ul class='guides-betting'>
      <h3>Betting tools</h3>
      <ul class='guide-list'>
        <li class='guide-list__item'>
          <nuxt-link to="guides/betting-glossary" class="card card--guide">
            <card class='betting-glossary' :title="bettingGuides.terms.title" :imageURL="bettingGuides.terms.imageURL" :text="bettingGuides.terms.text"></card>
          </nuxt-link>
        </li>
        <!-- <OddsConverterCard />
        <MarginCalculatorCard /> -->
      </ul>
    </ul>
  </section>
</template>

<script>
import Vue from 'vue'
import Card from '~/components/common/Card'
import BettingTermsImageURL from '~/assets/images/guides/betting-terms.svg'

export default Vue.extend({
  name: 'Guides',
  data () {
    return {
      bettingGuides: {
        terms: {
          title: 'Betting Terms',
          imageURL: BettingTermsImageURL,
          text: 'A dictionary covering the most important definitions in esports betting.'
        }
      }
    }
  },
  head () {
    return {
      title: 'Betacle - Guides'
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

.guides
  margin 10px 40px

.guides-betting
  background-color #e4e6eb
  margin-bottom 40px
  h3
    padding 30px 30px 0 30px
    font-size 20px
    color #4d4d4d
  .card-list
    padding-top 10px


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

.guide-list
  clear-list()
  display flex
  flex-direction row
  flex-flow row wrap
  padding 20px
  width 100%

  .guide-list__item
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

.betting-glossary
  .card__head
    min-height 150px
  img
    max-height 75px
</style>
