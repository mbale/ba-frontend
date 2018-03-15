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

      <header class="bookmaker-head">

        <div class="bookmaker-image" :style="{backgroundColor: bookmaker.themeColor}">
          <img v-bind:src="bookmaker.logo" alt="">
        </div>

        <div class="information">
          <h1 class="bookmaker-name">{{ bookmaker.name }}</h1>
          <div class="rating" slot="body">
            <no-ssr>
              <star-rating active-color="#ffcd02" :rating="bookmaker.reviews.avg" :star-size="18" :show-rating="false" :read-only="true" :inline="true"></star-rating>
            </no-ssr>
          </div>

          <button class="bookmaker-label"><img src="~/assets/images/bookmaker/esports-exclusive.svg" alt=""> Esports exclusive</button>
        </div>

        <button class="visit slide-left" >
          <nuxt-link :to="{ path: '../' + bookmaker.slug }" append>
            Visit Sportsbook <img src="~/assets/images/bookmaker/btn_icon_left.svg" alt="" />
          </nuxt-link>
        </button>
      </header>

        <tabs>
          <tab
            v-for="(tab, key, index) in tabs"
            :key="key"
            :class="{'tab--active': currentTab === index}"
            ref="upcoming"
            @click.native="currentTab = index"
          > {{ tab }} </tab>
        </tabs>

        <div class="bookmaker-content">

          <!-- ABOUT TAB  -->
          <div v-show="currentTab === 0" class="about">

            <div class="about-content">
              <h3 class="heading">About {{ bookmaker.name }}</h3>
              <p>{{ bookmaker.description }}</p>
            </div>

            <div class="details-content">
              <h3 class="heading">Details</h3>
              <table>
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
            <h3 class="heading">Bonuses</h3>

            <div class="bonus" v-bind:key="bonus.type" v-for="bonus in bookmaker.bonuses">
              <!-- <i></i>  -->
              <img src="~/assets/images/bookmaker/bonus.svg" alt="">
              <h5>{{ bonus.title }}</h5>

              <div class="buttons">
                <button class="white-bg code-btn">CODE <span>FREE25</span></button>
                <button class="blue-bg slide-left">
                  <!-- <a>Claim Bonus</a> -->
                  <nuxt-link :to="{ path: '../' + bookmaker.slug }" append>
                    Claim Bonus
                  </nuxt-link>
                </button>
              </div>
            </div>

          </div>

          <!-- REVIEWS TAB -->
          <div v-show="currentTab === 2" class="reviews" @click="showReviews">

            <div class="reviews-content">
              <header>
                <h3 class="heading">{{ bookmaker.reviews.items.length }} Reviews</h3>
                <div class="rating">
                  <no-ssr>
                    <star-rating active-color="#ffcd02" :rating="bookmaker.reviews.avg" :star-size="18" :show-rating="false" :read-only="true" :inline="true"></star-rating>
                  </no-ssr>
                </div>
              </header>

              <div class="users-reviews">
                <div class="review" v-bind:key="getUserObject(review).id" v-for="(review, index) in bookmaker.reviews.items">

                  <!-- if avatar -->
                  <img class="avatar img-responsive" v-if="getUserObject(review).avatar" v-bind:src="getUserObject(review).avatar">
                  <!-- no avatar -->
                  <img class="avatar img-responsive" v-else v-bind:src="noAvatarImage">

                  <span class="username">{{ review.user.username }}</span>
                  <div class="rating">
                    <no-ssr>
                      <star-rating active-color="#ffcd02" :rating="review.rate" :star-size="18" :show-rating="false" :read-only="true" :inline="true"></star-rating>
                    </no-ssr>
                  </div>
                  <span class="date">October 2016</span>
                  <p>{{ review.text }}</p>
                </div>
              </div>
            </div>

            <!-- Write a review yourself section -->
            <div class="make-review" v-show="userCanSubmitReview">
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
                <textarea v-model="review.text" name="review-field" cols="30" rows="10"></textarea>
                <button class="blue-bg" @click="submitReview">Post Review</button>
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
      const user = this.$store.state.user

      if (!user) {
        return false
      }

      const match = reviews.find((review) => review.user.id === user.profile.id)

      if (match) {
        return false
      }

      return true
    }
  },
  methods: {
    showReviews () {
      console.log(this.bookmaker.reviews)
    },
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

button:not(.code-btn)
    cursor: pointer

    a
        color: inherit

button.blue-bg
    background-color: $blue

button.slide-left
  transition: all 0.3s ease

  &:hover, &:focus, &:active
      text-indent: 5px

// Bookmaker content styles
.bookmaker-container
    max-width: 1440px
    width: 100%
    background-color: transparent
    margin-bottom: 30px
    padding: 0 15px

    .tabs
        padding-left: 200px
        background-color: white

        .tab
            padding: 15px 25px
            font-size: 13px
            font-weight: 600
            color: $mgray

            &.tab--active
                border-bottom: 2px solid #2d3088
                color: #2c2f86

    header.bookmaker-head
        background-image: linear-gradient(to top, #1d1e4e, #000000)
        box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5)
        max-height: 160px
        height: 160px
        padding-top: 35px
        padding-left: 180px
        position: relative

        .bookmaker-image
            border-radius: 2px
            display: block
            position: absolute
            left: 20px
            bottom: -22px
            width: 160px
            height: 160px
            overflow: hidden

            img
                max-width: none
                width: 100%
                height: auto
                border-radius: 0
                position: relative
                top: 50%
                transform: translateY(-50%)

        button.visit
            background-color: $blue
            color: white
            font-weight: 500
            padding: 15px 47px
            border: none
            cursor: pointer
            margin-top: 15px
            margin-left: 20px
            transition: all 0.3s ease

            &:hover, &:focus, &:active
                text-indent: 8px
                padding-right: calc(47px - 8px)
                color: white
                text-decoration: none

            a
              color: white

              img
                  position: relative
                  top: 1px
                  left: 1px


        .information

            h1.bookmaker-name
                font-size: 30px
                font-weight: 500
                color: white
                display: inline-block
                margin-left: 20px


            .rating
                display: inline-block
                margin-left: 25px
                margin-right: 10px

            button.bookmaker-label
                display: inline-block
                color: white
                font-size: 11px
                font-weight: 600
                border: none
                padding: 5px 13px
                text-transform: uppercase
                position: relative
                top: -2px
                background-color: #893F98
                background-image: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, .1) 0)
                border-radius: 40px

                img
                    position: relative
                    left: -4px
                    top: 1px


    .bookmaker-content
        padding: 0
        width: calc(80% - 30px)
        float: left
        margin-top: 10px

        h3.heading
            font-size: 22px
            font-weight: 600
            color: #2d3088
            margin-bottom: 20px

            &:nth-child(n+2)
                margin-top: 70px

        .about

            .about-content, .details-content
                background-color: white
                padding: 25px 30px
                margin-top: 15px
                margin-right: 25px

                p
                    line-height: 1.71
                    color: #282828

                    strong
                        font-weight: bold
                        color: #106bde

                table
                    border-collapse: separate
                    border-spacing: 1px
                    width: 100%

                    tbody

                        tr
                            background-color: #f5f5f5
                            height: 36px

                            &:nth-of-type(2n)
                                background-color: rgba(245, 245, 245, 0.5)

                            td
                                padding: 10px 15px
                                margin: 1px
                                font-size: 12px
                                font-weight: 500
                                color: $dgray

                                &:first-child
                                    white-space: nowrap


        .bonuses
            margin-top: 15px
            margin-right: 25px

            .bonus
                padding: 20px
                background-color: white
                padding-bottom: 30px

                img
                    position: relative
                    float: left

                h5
                    font-size: 23px
                    font-weight: 600
                    color: $dgray
                    display: inline-block
                    margin-left: 15px

                .buttons
                    display: inline-block
                    float: right

                    button
                        width: 200px
                        height: 40px
                        padding: 10px 0
                        outline: none

                    button.white-bg
                        background-color: #fbfbfb
                        border: 1px solid #e7e7e7
                        font-family: $font-dinpro
                        color: $mgray
                        font-weight: 600

                        span
                            font-weight: 400

                    button.blue-bg
                        background-color: $blue
                        color: white
                        border: 1px solid $blue
                        margin-left: 10px


        .reviews
            margin-top: 15px
            margin-right: 25px

            .reviews-content
                background-color: white
                padding: 20px

                header

                    h3, .rating
                        display: inline-block

                    .rating
                        margin-left: 15px
                        position: relative
                        top: 1px

                .users-reviews

                    .review
                        margin-bottom: 10px

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
                            clear: both
                            display: block
                            text-align: right
                            color: $lgray
                            position: relative
                            top: -20px

                        p
                            color: #484848
                            max-width: 875px


            .make-review
                background-color: white
                padding: 20px
                margin-top: 5px

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

                    textarea
                        border-radius: 5px
                        border: 1px solid #d1d1d1
                        background-color: white
                        padding: 20px
                        width: 80%
                        max-width: 935px
                        color: $lgray
                        outline: none

                    button.blue-bg
                        border-radius: 4px
                        background-color: $blue
                        padding: 12px 35px
                        border: none
                        display: block
                        clear: both
                        margin-left: 75px
                        color: white
                        margin-top: 15px


    .sportsbook-content
        width: calc(20% + 30px)
        float: left
        background-color: white
        padding: 0 15px
        margin-top: 25px
        padding-top: 15px

        .sportsbooks
            margin-top: 30px
            margin-bottom: 15px

            h4
                font-family: $font-dinpro
                font-size: 16px
                color: black
                margin-left: 15px
                margin-bottom: 15px

            .sportsbook
                border-top: 1px solid $color-border
                padding: 10px 0

                img
                    float: left
                    width: 40px
                    height: 40px
                    margin-right: 15px
                    border-radius: 100%

                h6
                    font-weight: 600
                    color: $blue

                .rating
                    display: inline-block

                button.bet
                    float: right
                    display: inline-block
                    border-radius: 2px
                    background-color: $purple
                    border: none
                    outline: none
                    padding: 7px 30px
                    color: white
                    position: relative
                    top: -15px
                    margin-right: 15px
                    width: 80px

                    &:hover, &:focus, &:active
                        padding-right: 25px

            h5.more
                color: $blue
                font-weight: bold
                border-top: 1px solid $color-border
                text-align: center
                text-transform: uppercase
                padding-top: 10px
                cursor: pointer

</style>
