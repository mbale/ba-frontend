<template>
  <section class="games">
    <ul class='list'>
      <li class='list__item' v-bind:key="game.slug" v-for="game in games">
        <nuxt-link :to="'games/' + game.slug">
          <card v-bind:key="game.color" :headerBgColor="game.color" :title="game.name" :imageURL="game.logo"></card>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import Vue from 'vue'
import Card from '~/components/common/Card'

export default Vue.extend({
  name: 'Games',
  components: {
    Card
  },
  head () {
    return {
      title: 'Betacle - Games'
    }
  },
  computed: {
    games () {
      return this.$store.state.games.list
    }
  },
  async fetch ({ store }) {
    await store.dispatch('games/fetchAll')
    store.commit('games/order_by_asc')
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

.games
  margin 10px 40px

  .list
    clear-list()
    display flex
    flex-direction row
    flex-flow row wrap
    padding 20px

    .list__item
      padding 10px
      {$one-quarter}
      +below(4)
        {$one-half}
      +below(2)
        {$full-width}

    .list-list__item--large
      {$one-third}
      +below(2)
        {$full-width}

.card
    .image
      max-height 75px

</style>
