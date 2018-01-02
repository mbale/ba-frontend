<template>
  <section class="bookmakers">
    <div class="bookmakers__filter">
      <span class="text">Deposit methods</span>
      <nuxt-link @click="filterByDepositMethod" :to="{ query: {
        'deposit-method': depositMethod.type
      }}" v-bind:key="depositMethod.type" v-for="depositMethod of depositMethods" append>
        <img v-bind:class="`image ${depositMethod.type}`" v-bind:src="depositMethod.imageURL">
      </nuxt-link>
    </div>
    <div class="bookmakers__list">
      <div class="list__top"></div>
      <card class="list__item" v-bind:key="bookmaker.slug" v-for="bookmaker of bookmakers" :title="bookmaker.name" :imageURL="bookmaker.logo">
        lol
      </card>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import Card from '~/components/common/card'
import BitcoinImage from '~/assets/images/depositmethods/bitcoin.svg'
import CreditCardImage from '~/assets/images/depositmethods/credit-card.svg'
import PaypalImage from '~/assets/images/depositmethods/paypal.svg'
import SkinImage from '~/assets/images/depositmethods/skins.svg'

export default Vue.extend({
  name: 'Bookmakers',
  components: {
    Card
  },
  head () {
    return {
      title: 'Betacle - Bookmakers'
    }
  },
  methods: {
    filterByDepositMethod (method) {
      this.$store.state.bookmakers.commit('filter_by_deposit_method', {
        method
      })
    }
  },
  data () {
    return {
      depositMethods: [{
        type: 'bitcoin',
        imageURL: BitcoinImage
      }, {
        type: 'credit-card',
        imageURL: CreditCardImage
      }, {
        type: 'paypal',
        imageURL: PaypalImage
      }, {
        type: 'skin',
        imageURL: SkinImage
      }]
    }
  },
  computed: {
    bookmakers () {
      return this.$store.state.bookmakers.list
    }
  },
  async fetch ({ store, query }) {
    await store.dispatch('bookmakers/fetchAll')

    if (query['deposit-method']) {
      store.commit('bookmakers/filterByMethod', {
        method: query['deposit-method']
      })
    }
  }
})
</script>

<style lang="stylus">

.bookmakers
  width 100%

  .bookmakers__filter
    display flex
    justify-content flex-start
    min-width 100%
    background-color white
    margin-bottom 25px

    .text
      display flex
      flex-direction column
      justify-content center

    .image
      margin 15px
      min-width 20px
      min-height 20px

  .bookmakers__list
    margin 0 auto
    display flex
    flex-wrap wrap
    flex-direction row
    max-width 1180px

    .list__item
      margin 15px
      min-width 265px
      max-width 265px
      // flex-basis 45%

      img
        min-height 100%


</style>
