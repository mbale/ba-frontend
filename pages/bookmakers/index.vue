<template>
  <section class="bookmakers">
    <div class="toolbar">
      <!-- FILTER -->
      <div class="filters">
        <deposit-filter />
      </div>
    </div>
    <!-- LIST -->
    <div class="bookmakers__list">
      <div class="top-three">
        <card-box v-bind:key="bookmaker.slug" v-for="bookmaker of getBookmakersByInterval(0, 3)">
          <img class="image" slot="header" v-bind:src="bookmaker.logo" v-on:click="redirectToBookmaker(bookmaker.slug)">
          <h1 class="name" slot="body">
            {{ bookmaker.name }}
          </h1>
          <div class="rating" slot="body">
            <span class="trophy" slot="body" v-if="bookmaker.slug === firstBookmaker.slug">voted #1 bookmaker</span>
            <no-ssr>
              <star-rating :rating="bookmaker.reviews.avg" :star-size="25" :show-rating="false" :read-only="true" :inline="true"></star-rating>
            </no-ssr>
          </div>
          <div class="action" slot="body">
            <nuxt-link class="review" :to="{ path: bookmaker.slug }" append>
              Read review
            </nuxt-link>
            <div class="bet">
              <nuxt-link :to="{ path: `/visit/${bookmaker.slug}` }" class="text" append>
                Bet now
              </nuxt-link>
            </div>
          </div>
        </card-box>
      </div>
      <div class="rest">
        <card-box class="card-box" v-bind:key="bookmaker.slug" v-for="bookmaker of getBookmakersByInterval(4)">
          <img class="image" slot="header" v-bind:src="bookmaker.logo" v-on:click="redirectToBookmaker(bookmaker.slug)">
          <h1 class="name" slot="body">
            {{ bookmaker.name }}
          </h1>
          <div class="rating" slot="body">
            <no-ssr>
              <star-rating :rating="bookmaker.reviews.avg" :star-size="25" :show-rating="false" :read-only="true" :inline="true"></star-rating>
            </no-ssr>
          </div>
          <div class="action" slot="body">
            <nuxt-link class="review" :to="{ path: bookmaker.slug }" append>
              Read review
            </nuxt-link>
            <div class="bet">
              <nuxt-link :to="{ path: bookmaker.slug + '/visit' }" class="text">
                Bet now
              </nuxt-link>
            </div>
          </div>
        </card-box>
      </div>
      <div class="content-body">
        <h2 class="content-title">Esports Betting Sites</h2>
        <p>Find the best esports betting sites for you. We curate all the bookmakers that offer esports betting.
  We provide you with key facts about every bookmaker, including the best bonuses they currently offer and which payment methods they accept.
  All bookmakers are reviewed independently by our community members and ranked accordingly. So the best bookmakers will always show on top.</p>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import StarRating from 'vue-star-rating'
import Card from '~/components/common/card'
import CardBox from '~/components/common/card-box'
import DepositFilter from '~/components/bookmakers/deposit-filter'

export default Vue.extend({
  name: 'Bookmakers',
  components: {
    Card,
    CardBox,
    StarRating,
    DepositFilter
  },
  head () {
    return {
      title: 'Betacle - Bookmakers'
    }
  },
  methods: {
    redirectToBookmaker (slug) {
      this.$router.push('bookmakers/' + slug)
    },
    getBookmakersByInterval (from, to) {
      return this.bookmakers.slice(from, to)
    }
  },
  beforeRouteUpdate ({name, query}, to, next) {
    if (name === 'bookmakers' && !query['deposit-method']) {
      // console.log('hi')
      this.$store.commit('bookmakers/set_filter', {})
    }
    next()
  },
  computed: {
    firstBookmaker () {
      return this.getBookmakersByInterval(0, 1)[0]
    },
    bookmakers () {
      return this.$store.getters['bookmakers/getByFilter']
    }
  },
  async asyncData ({ store, query }) {
    await store.dispatch('bookmakers/fetchAll')

    if (query['deposit-method']) {
      store.commit('bookmakers/set_filter', {
        filter: query['deposit-method']
      })
    }
  }
})
</script>

<style lang="stylus" scoped>

.content-body
  margin: 25px 10px 40px 10px

.content-title
  color: $purple

.card-box
  display flex
  flex-direction column
  margin 10px

  .card-box__body
    display flex
    flex-direction column
    justify-content center

    .name
      margin 5px

    .rating
      display flex
      justify-content center
      flex-wrap wrap

      .trophy
        text-transform uppercase
        color white
        font-size 11px
        background-color: #f3cc57
        display inline-flex
        flex-direction column
        justify-content center
        padding 5px 10px
        font-weight 700
        user-select none
        margin 0 10px
        border-radius 40px
        background-image linear-gradient(180deg, transparent 50%, rgba(0,0,0,.05) 0)

    .action
      display flex
      width 100%
      padding-top 15px

      .review
        display flex
        flex-direction column
        justify-content center
        align-items center
        flex 1
        margin 10px
        color #408fec

      .bet
        display flex
        flex-direction column
        justify-content center
        padding 10px 20px
        text-align center
        border-radius 2px
        font-size 15px
        user-select none
        font-weight 700
        cursor pointer
        background-color #2d3088
        color #fff
        width 50%
        border 1px solid transparent

        a
          color white

.bookmakers
  width 100%

  .bookmakers__filter
    display flex
    justify-content flex-start
    min-width 100%
    background-color white
    margin-bottom 20px

    .text
      display flex
      flex-direction column
      justify-content center

    .image
      margin 15px
      min-width 20px
      min-height 20px

  .bookmakers__list
    display flex
    flex-direction column
    margin 0 auto
    max-width 1180px

    .image
      cursor: pointer

    .top-three
      display flex
      +below(600px)
        flex-wrap wrap

    .rest
      display flex
      flex-direction  row
      flex-wrap wrap
      margin 0 auto

      .card-box
        max-width 275px

</style>
