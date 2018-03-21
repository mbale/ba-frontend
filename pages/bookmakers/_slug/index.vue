<template>
    <div class="content bookmaker-container">
      <header class="content-header">
        <div class="content-header__hero">
          <figure class="content-header__image" v-bind:style="{ 'background-color': bookmaker.themeColor }">
            <img v-bind:src="bookmaker.logo" />
          </figure>
          <div class="content-header__info">
            <h1 class="content-header__title">{{ bookmaker.name }}</h1>
            <div class="bookmaker-header__meta">
              <div class="rating" slot="body">
                <no-ssr>
                  <star-rating active-color="#ffcd02" :rating="bookmaker.reviews.avg" :star-size="18" :show-rating="false" :read-only="true" :inline="true"></star-rating>
                </no-ssr>
              </div>
              <div class="trophy trophy--exclusive">
                <img src="~/assets/images/bookmaker/esports-exclusive.svg" alt="Esporst Exclusive"> Esports exclusive
              </div>
            </div>
            <div class="content-header__actions">
              <nuxt-link class="content-header__button content-header__button--primary" :to="`/visit/${bookmaker.slug}`">
                Visit Sportsbook
              </nuxt-link>
            </div>

          </div>
        </div>
        <div class="toolbar toolbar--with-avatar">
          <tabs>
            <tab
              v-for="(tab, key, index) in tabs"
              :key="key"
              :class="{'tab--active': currentTab === index}"
              ref="upcoming"
              @click.native="currentTab = index"
            > {{ tab }} </tab>
          </tabs>
        </div>
      </header>
      <div class="content-body">
        <!-- ABOUT TAB  -->
        <div v-show="currentTab === 0" class="about">
          <box :title="`About ${bookmaker.name}`">
            <p>{{ bookmaker.description }}</p>
          </box>
          <box title="Details">
            <table class="content__table">
              <tbody>
                <!-- Official Website -->
                <tr v-if="bookmaker.url">
                  <td>Official Website</td>
                  <td>
                    <nuxt-link :to="{ path: '../' + bookmaker.slug }" append>{{ bookmaker.url }}</nuxt-link>
                  </td>
                </tr>
                <!-- Support Email -->
                <tr v-if="bookmaker.supportEmail !== 'n/a'">
                  <td>Support Email</td>
                  <td>
                    <a v-bind:href="`mailto:${bookmaker.supportEmail}?subject=support`">{{ bookmaker.supportEmail }}</a>
                  </td>
                </tr>
                <!-- Founded -->
                <tr v-if="bookmaker.founded">
                  <td>Founded</td>
                  <td>{{ bookmaker.founded }}</td>
                </tr>
                <!-- Deposit Methods -->
                <tr v-if="bookmaker.depositMethods">
                  <td>Deposit Methods</td>
                  <td>
                    <span v-for="(method) in bookmaker.depositMethods" class="item">{{ method.name }}</span>
                  </td>
                </tr>
                <!-- Licenses -->
                <tr v-if="bookmaker.licenses">
                  <td>Licenses</td>
                  <td>
                    <span v-for="(license) in bookmaker.licenses" class="item">{{ license }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </box>
        </div>
        <!-- BONUSES TAB -->
        <div v-show="currentTab === 1" class="bonuses">
          <box title="Bonuses">
            <bonus :key="index" v-for="(bonus, index) in bookmaker.bonuses" :bonus="bonus" :slug="bookmaker.slug"></bonus>
          </box>
        </div>
        <!-- REVIEWS TAB -->
        <div v-show="currentTab === 2" class="reviews">
          <reviews :reviews="bookmaker.reviews" />
        </div>
      </div>
      <div class="content-aside">
        <div class="widget">
          <img src="~/assets/images/bookmaker/aside.png" alt="">
        </div>
        <top-sportsbooks />
      </div>

    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { Tabs, Tab } from '~/components/common/tabs'
import TopSportsbooks from '~/components/bookmakers/top-sportsbooks'
import Reviews from '~/components/bookmakers/reviews/reviews'
import Bonus from '~/components/bookmakers/bonus'
import Box from '~/components/common/box'

export default {
  name: 'Bookmaker',
  head () {
    return {
      title: `${this.bookmaker.name} Reviews & Bonus Offers - Bookmakers`,
      meta: [
        { hid: 'description', name: 'description', content: `Find out everything about ${this.bookmaker.name}, including independent reviews by our community members and exclusive bonuses.` }
      ]
    }
  },
  data () {
    return {
      currentTab: 0,
      tabs: {
        first: 'About',
        second: 'Bonuses',
        third: 'Reviews'
      }
    }
  },
  components: {
    StarRating,
    Tabs,
    Tab,
    TopSportsbooks,
    Reviews,
    Box,
    Bonus
  },
  computed: {
    bookmaker () {
      return this.$store.state.bookmakers.bookmaker
    }
  },
  async asyncData ({ store, params }) {
    const slug = params.slug
    // getting bookmakers data
    await store.dispatch('bookmakers/fetchAll')
    await store.dispatch('bookmakers/getBySlug', {
      slug
    })
  }
}
</script>

<style lang="stylus" scoped>
.item + .item:before
  content ", "

.bookmaker-container
  max-width: 1440px

.bookmaker__header
  flex 0 0 100%
  background-color #1c1e4e

.bookmaker-header__meta
  margin-top: 4px
  display: inline-flex
  vertical-align: middle
  align-items: center

.trophy
  text-transform uppercase
  color $white
  font-size 11px
  background-color #000
  display inline-block
  padding 5px 10px
  font-weight bold
  vertical-align middle
  user-select none
  margin 0 10px
  border-radius 40px
  background-image linear-gradient(to bottom, rgba(#000,0) 50%, rgba(#000,0.05) 50%);

.trophy--exclusive
  background-color #9C00C3



// RESPONSIVENESS STYLES

// to make the content boxes match the header width and look good on wide screens.
@media (min-width: 1450px)

  .content-body
    padding-left: 0

  .widget
    margin-right: 0


// mobile styles.
@media (max-width: 767px)

  .bookmaker-container
    justify-content: center

  // making sure header looks good
  .content-header__hero
    align-items: center
    flex-direction: column
    justify-content: center
    height: 305px

    .content-header__image
      margin-bottom: 15px
      margin-right: 0

    .content-header__title
      width: 100%
      margin-right: 0
      text-align: center

    .bookmaker-header__meta
      margin-top: 15px
      width: 100%
      align-items: center
      justify-content: center

    .content-header__actions
      display: none

  // centering tabs
  .toolbar
    padding-left: 0
    justify-content: center

    .tabs
      margin-right: 0

  // extending .content-body to be 100% width
  .content-body
    flex: 0 0 100%

    // table won't stick out of its content & the page
    table
      table-layout: fixed
      word-break: break-word


  // changing widget margin so the spaces between wouldn't be so big.
  .widget
    margin: 10px auto

    &:last-child
      margin-bottom: 20px

</style>
