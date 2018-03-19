<!-- api/bookmaker -->
<!--
{
  "name": "Betway Esports",
  "slug": "betway-esports",
  "logo": "//images.ctfassets.net/kti58ama624y/1Mv7j9RoQckkSUce8Qqewi/e30deb57099598dfabd2504b2149921d/betway.png",
  "icon": "//images.ctfassets.net/kti58ama624y/1g5tYEYNBG8SSMMEI0OIWc/a5184874145d2537e70b1eda9022149e/betway_icon.png",
  "url": "https://betway.com",
  "affiliateUrl": "https://betway.com/esports/?s=bw40010",
  "description": "Betway is an online bookmaker founded in 2006. Even though they are a strictly online business, Betway is a well established bookmaker, that is heavily regulated across Europe (holding licenses in eight countries; United Kingdom, Malta, Germany, Italy, Spain, Denmark, Ireland and Belgium).\n\nThey is one of the first major bookmakers to launch a dedicated esports portal.\nBetway covers most major tournaments for all popular esports games, including in-play betting on select matches.\nWith the launch of their esports portal Betway has sent a clear message to the esports community that they take esports very serious.",
  "founded": 2006,
  "headquarters": "Malta",
  "licenses": [
    "UK Gaming Commission",
    "Malta Gaming Authority"
  ],
  "exclusive": true,
  "supportEmail": "support@betway.com",
  "themeColor": "#231f20",
  "depositMethods": [
    {
      "name": "Paypal",
      "slug": "paypal"
    },
    {
      "name": "Credit card",
      "slug": "credit-card"
    }
  ],
  "restrictedCountries": [ "AF", "AO", "AU", "BE", "BA", "BG", "DK", "FR", "GF", "PF", "TF", "GR", "GL", "GY", "HU", "IR", "IQ", "IL", "IT", "LA", "LT", "MX", "MM", "KP", "PG", "PH", "RO", "RU", "SG", "ZA", "ES", "SY", "TR", "UG", "US", "UM", "VI", "VU", "YE" ],
  "bonuses": [
    {
      "title": "Welcome Bonus of 100% up to £50*",
      "type": "Signup"
    }
  ],
  "reviews": {
    "avg": 0,
    "items": []
  }
}
// API REVIEWINFO
[
  {
    "rate": 4,
    "text": "TRASH TRASH TRASH TRASH TRASH TRASHTRASH TRASHTRASH TRASHTRASH TRASHTRASH TRASHTRASH TRASHTRASH TRASHTRASH TRASHTRASH TRASH",
    "user": {
      "id": "5a58c7fa042d775730e4d49a",
      "username": "bali",
      "countryCode": "",
      "registeredOn": "2018-01-12T14:36:42.408Z",
      "avatar": ""
    }
  },
  {
    "rate": 4,
    "text": "Brilliant site",
    "user": {
      "id": "5a58c055653d10446a7e4ed3",
      "username": "asdasd",
      "countryCode": "",
      "registeredOn": "2018-01-12T14:04:05.751Z",
      "avatar": ""
    }
  }
]
-->


<template>
    <div class="bookmaker-container">

      <div class="bookmaker__header">
        <div class="top">
          <div class="logo" v-bind:style="{ 'background-color': bookmaker.themeColor }">
            <img class="image" v-bind:src="bookmaker.logo">
          </div>
          <div class="information">
            <h1 class="bookmaker-name">{{ bookmaker.name }}</h1>
            <div class="rating" slot="body">
              <no-ssr>
                <star-rating active-color="#ffcd02" :rating="bookmaker.reviews.avg" :star-size="18" :show-rating="false" :read-only="true" :inline="true"></star-rating>
              </no-ssr>
            </div>
            <button class="bookmaker-label">
              <img src="~/assets/images/bookmaker/esports-exclusive.svg" alt=""> Esports exclusive
            </button>
            <button class="visit button button--primary" >
              <nuxt-link :to="{ path: '../' + bookmaker.slug }" append>
                Visit Sportsbook <img src="~/assets/images/bookmaker/btn_icon_left.svg" alt="" />
              </nuxt-link>
            </button>
          </div>
        </div>
        <div class="bottom">
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
      </div>

        <div class="bookmaker-content">
          <!-- ABOUT TAB  -->
          <div v-show="currentTab === 0" class="about">

            <div class="content-body content-body--bookmaker-asset">
              <h2 class="content-title">About {{ bookmaker.name }}</h2>
              <p>{{ bookmaker.description }}</p>
            </div>

            <div class="content-body content-body--bookmaker-asset">
              <h2 class="content-title">Details</h2>
              <table class="content__table">
                <tbody>

                  <!-- Official Website -->
                  <tr v-if="bookmaker.url">
                    <td>Official Website</td>
                    <td>
                      <!-- <a target="_blank" v-bind:href="bookmaker.url">{{ bookmaker.url }}</a> -->
                      <nuxt-link :to="{ path: '../' + bookmaker.slug }" append>
                        {{ bookmaker.url }}
                      </nuxt-link>
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
                      <span v-for="(method) in bookmaker.depositMethods" class="item">
                        <span>{{ method.name }}</span>
                      </span>
                    </td>
                  </tr>

                  <!-- Licenses -->
                  <tr v-if="bookmaker.licenses">
                    <td>Licenses</td>
                    <td>
                      <span v-for="(license) in bookmaker.licenses" class="item">
                        <span>{{ license }}</span>
                      </span>
                    </td>
                  </tr>

                  <!-- Restricted Countries -->
                  <tr v-if="bookmaker.restrictedCountries">
                    <td>Restricted Countries</td>
                    <td>
                      <span v-for="(country) in bookmaker.restrictedCountries" class="item">
                        <span>{{ country }}</span>
                      </span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          <!-- BONUSES TAB -->
          <div v-show="currentTab === 1" class="bonuses">
            <h2 class="content-title">Bonuses</h2>

            <div class="bonus content-body content-body--bookmaker-asset" v-bind:key="bonus.type" v-for="bonus in bookmaker.bonuses">
              <!-- <i></i>  -->
              <img src="~/assets/images/bookmaker/bonus.svg" alt="">
              <h5>{{ bonus.title }}</h5>

              <div class="buttons">
                <button class="button button--code">CODE <span>FREE25</span></button>
                <button class="button button--primary">
                  <nuxt-link :to="{ path: '../' + bookmaker.slug }" append>
                    Claim Bonus
                  </nuxt-link>
                </button>
              </div>
            </div>

          </div>

          <!-- REVIEWS TAB -->
          <div v-show="currentTab === 2" class="reviews">

            <div class="content-body content-body--bookmaker-asset">
              <header>
                <h2 class="content-title">{{ bookmaker.reviews.items.length }} Reviews</h2>
                <div class="rating">
                  <no-ssr>
                    <star-rating active-color="#ffcd02" :rating="bookmaker.reviews.avg" :star-size="18" :show-rating="false" :read-only="true" :inline="true"></star-rating>
                  </no-ssr>
                </div>
              </header>

              <div class="content-body users-reviews">
                <div class="review" v-bind:key="getUserObject(review).id" v-for="(review, index) in bookmaker.reviews.items">

                  <!-- if avatar -->
                  <img class="avatar img-responsive" v-if="getUserObject(review).avatar" v-bind:src="getUserObject(review).avatar">
                  <!-- no avatar -->
                  <img class="avatar img-responsive" v-else v-bind:src="noAvatarImage">

                  <div class="information">
                    <span class="username">{{ review.user.username }}</span>
                    <div class="rating">
                      <no-ssr>
                        <star-rating active-color="#ffcd02" :rating="review.rate" :star-size="18" :show-rating="false" :read-only="true" :inline="true"></star-rating>
                      </no-ssr>
                    </div>
                    <span class="date">October 2016</span>
                  </div>
                  <p>{{ review.text }}</p>
                </div>
              </div>
            </div>

            <!-- Write a review yourself section -->
            <div class="content-body content-body--bookmaker-asset" v-show="userCanSubmitReview">
              <div class="select-rating">
                <span>Rating</span>
                <div class="ratings">
                  <no-ssr>
                    <star-rating active-color="#ffcd02" @rating-selected="setReviewRating" :increment="0.5" :star-size="30" :show-rating="false" :inline="true"></star-rating>
                  </no-ssr>
                </div>
              </div>

              <div class="write-review">
                <span>Review</span>
                <textarea class="textbox" v-model="review.text" name="review-field" cols="30" rows="10"></textarea>
                <button class="button button--primary" @click="submitReview">Post Review</button>
              </div>
            </div>
          </div>
        </div>
        <top-sportsbooks />
    </div>
</template>

<script>
import Vue from 'vue'
import StarRating from 'vue-star-rating'
import noAvatarImage from '~/assets/images/no_avatar.png'
import { Tabs, Tab } from '~/components/common/tabs'
import TopSportsbooks from '~/components/bookmakers/top-sportsbooks'

export default Vue.extend({
  name: 'Bookmaker',
  data () {
    return {
      currentTab: 0,
      tabs: {
        first: 'About',
        second: 'Bonuses',
        third: 'Reviews'
      },
      review: {
        rating: null,
        text: null
      },
      noAvatarImage
    }
  },
  components: {
    StarRating,
    Tabs,
    Tab,
    TopSportsbooks
  },
  computed: {
    bookmaker () {
      return this.$store.state.bookmakers.bookmaker
    },
    reviews () {
      return this.bookmaker.reviews.items
    },
    userCanSubmitReview () {
      const reviews = this.$store.state.bookmakers.bookmaker.reviews.items
      const loggedIn = this.$store.state.user.profile

      if (!loggedIn) {
        return false
      }

      const match = reviews.find((review) => review.user.id === loggedIn.id)

      if (match) {
        return false
      }

      return true
    }
  },
  methods: {
    getUserObject (review) {
      return review.user
    },
    setReviewRating (rating) {
      this.review.rating = rating
    },
    async submitReview () {
      const {
        rating: rate,
        text
      } = this.review

      this.$store.dispatch('bookmakers/addReview', {
        rate,
        text
      })
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
})
</script>

<style lang="stylus" scoped>
.item + .item:before
    content ", "

.content-title
    color: $purple


.bookmaker__header

  .top
    display flex
    justify-content flex-start
    width 100%
    padding 14px
    background-color #1c1e4e

    .logo
      display flex
      flex-direction column
      justify-content center
      flex-basis 20%
      height auto
      min-width 160px
      max-width 160px
      max-height 160px
      margin-bottom -34px

      .image
        height 60%

    .information
        margin-top: 15px

        > *
            display: inline-block

        .bookmaker-name
            font-size: 30px
            font-weight: 500
            color: white
            margin-left: 20px

        .rating
            margin-left: 25px
            margin-right: 10px

        .bookmaker-label
            color: white
            font-size: 11px
            font-weight: 500
            border: none
            padding: 5px 13px
            text-transform: uppercase
            position: relative
            background-color: #893F98
            background-image: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, .1) 0)
            border-radius: 40px
            outline: none

            img
                position: relative
                left: -4px
                top: 1px

        .visit
            background-color: $blue
            font-weight: 500
            padding: 15px 47px
            margin: 15px 0 0 20px
            display: block

            a img
                position: relative
                top: 1px
                left: 1px

  .bottom
    display flex
    width 100%
    background-color white
    padding-left: 200px

    .tabs
      align-items: end



.bookmaker-container
    max-width: 1440px
    width: 100%
    background-color: transparent
    margin-bottom: 30px
    padding: 0 15px

    .bookmaker-content
        width: calc(80% - 30px)
        float: left
        margin-top: 10px

        .bonus
            padding: 20px
            display: flex
            flex-direction: row

            h5
                font-size: 23px
                font-weight: 600
                color: $dgray
                margin-left: 15px
                align-self: center

            .buttons
                display: flex
                flex-direction: row
                margin-left: auto

                button
                    padding: 10px 55px
                    outline: none

                .button--code
                    font-family: $font-dinpro
                    font-weight: 600

                    span
                        font-weight: 400


        .reviews

            header
                display: flex
                flex-direction: row

                .rating
                    align-self: center
                    margin-top: -10px
                    margin-left: 15px

            .users-reviews
                padding: 0
                margin: 0

                .review
                    margin-top: 15px

                    img
                        height: 50px
                        width: 50px
                        border-radius: 2px
                        background-color: #d8d8d8
                        float: left

                    span.username
                        font-size: 16px
                        font-weight: 600
                        color: #292929
                        margin-left: 15px

                    .rating
                        margin-left: 65px
                        margin-top: 5px

                    span.date
                        color: $lgray
                        position: relative
                        top: -20px
                        float: right

                    p
                        color: #484848
                        padding-right: 15%
                        clear: both


            .select-rating, .write-review

                span
                    color: $lgray
                    position: relative
                    top: -2px
                    width: 75px
                    display: inline-block


            .select-rating

                .ratings
                    display: inline-block
                    margin-bottom: 25px


            .write-review

                .textbox
                    border-radius: 5px
                    width: 100%
                    outline: none

                .button--primary
                    border-radius: 4px
                    padding: 12px 35px
                    margin: 15px 0 0 75px
                    font-weight: 500

</style>
