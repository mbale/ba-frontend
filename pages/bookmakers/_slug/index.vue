<template>
  <div class="bookmaker">
    <div class="information">
      <h1 class="header-text header-text--one">
        {{ bookmaker.name }}
      </h1>
      <h2 class="header-text header-text--two">
        {{ bookmaker.founded }} - {{ bookmaker.headquarters }}
      </h2>
      <div class="content">
        <div class="row row__image">
          <img class="image" v-bind:src="bookmaker.logo">
        </div>
        <div class="row">
          <span class="property">Description</span>
        </div>
        <div class="row">
          <p class="text text__description">{{ bookmaker.description }}</p>
        </div>
        <div class="row">
          <span class="property">Support</span>
          <div class="text">
            <a v-bind:href="`mailto:${bookmaker.supportEmail}?subject=support`">{{ bookmaker.supportEmail }}</a>
          </div>
        </div>
        <div class="row">
          <span class="property">URL</span>
          <div class="text">
            <a target="_blank" v-bind:href="bookmaker.url">{{ bookmaker.url }}</a>
          </div>
        </div>
        <div class="row">
          <span class="property">AffiliateURL</span>
          <div class="text">
            <a target="_blank" v-bind:href="bookmaker.affiliateUrl">{{ bookmaker.affiliateUrl }}</a>
          </div>
        </div>
        <div class="row">
          <span class="property">Licenses</span>
          <p class="text text__licenses">
            <span class="license" v-bind:key="license" v-for="license in bookmaker.licenses">
              {{ license }}
            </span>
          </p>
        </div>
        <div class="row">
          <span class="property">Bonuses</span>
          <div class="text text__bonuses">
            <span class="bonus" v-bind:key="bonus.type" v-for="bonus in bookmaker.bonuses">
              <span>{{ bonus.title }}</span>
              <!-- <img class="image" v-bind:src="getBonusIconURL(bonus.type)"> -->
            </span>
          </div>
        </div>
        <div class="row">
          <span class="property">Restricted Countries</span>
          <p class="text text__country">
            <span class="country" v-bind:key="country" v-for="country in bookmaker.restrictedCountries">{{ country }}</span>
          </p>
        </div>
        <div class="row">
          <span class="property">Deposit methods</span>
          <div class="text text__deposit-methods">
            <span class="license" v-bind:key="method.slug" v-for="method in bookmaker.depositMethods">
              {{ method.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="reviews">
      <h1 class="header-text header-text--one">Reviews</h1>
      <h2 class="header-text header-text--two">
        what other people said
      </h2>
      <div class="reviews__add" v-show="userCanSubmitReview">
        <div class="row">
          <h3 class="header-text header-text--three uppercase">Rating</h3>
        </div>
        <div class="row">
          <no-ssr>
            <star-rating class="rating" active-color="#F4D03F" @rating-selected="setReviewRating" :show-rating="false" :star-size="36"></star-rating>
          </no-ssr>
        </div>
        <div class="row">
          <h3 class="header-text header-text--three uppercase">Your experience</h3>
          <span class="header-text header-text--four">(optional)</span>
        </div>
        <div class="row">
          <textarea class="textbox" v-model="review.text"></textarea>
        </div>
        <div class="row">
          <div class="button button--primary" @click="submitReview">Submit</div>
        </div>
      </div>
      <div class="reviews__existing">
        <div class="row" v-bind:key="getUserObject(review).id" v-for="review of reviews">
          <div class="col">
            <!-- if avatar -->
            <img class="avatar img-responsive" v-if="getUserObject(review).avatar" v-bind:src="getUserObject(review).avatar">
            <!-- no avatar -->
            <img class="avatar img-responsive" v-else v-bind:src="noAvatarImage">
            <span class="username">{{ getUserObject(review).username }}</span>
          </div>
          <div class="col">
            <span class="rating">{{ review.rate }}</span>
            <p>{{ review.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import StarRating from 'vue-star-rating'
import signupBIconURL from '~/assets/images/bonuses/signup-bonus.svg'
import noAvatarImage from '~/assets/images/no_avatar.png'

export default Vue.extend({
  name: 'Bookmaker',
  data () {
    return {
      review: {
        rating: null,
        text: null
      },
      noAvatarImage
    }
  },
  components: {
    StarRating
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
      const user = this.$store.state.auth.user

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
    },
    getBonusIconURL (type) {
      if (type === 'Signup') {
        return signupBIconURL
      }
    }
  },
  async asyncData ({ store, params }) {
    const slug = params.slug

    await store.dispatch('bookmakers/getBySlug', {
      slug
    })
  }
})
</script>

<style lang="stylus" scoped>
@import '~assets/style/components.styl'
@import '~assets/style/utilities.styl'

.bookmaker
  display flex
  flex-direction column
  max-width 1180px
  margin 50px

  .header
    font-family "Open Sans", Helvetica, sans-serif
    color #000
    font-size 1.5em
    margin-bottom 2px

  .sub-header
    font-size 1.1em
    color #6c7a89
    border-bottom 1px solid #d2d7d3
    margin-bottom 25px
    padding-bottom 5px
    font-weight 300

  .information
    display flex
    flex-direction column
    background-color white
    margin-bottom 50px
    padding 25px

    .content
      display flex
      flex-direction column

  .row
    display flex
    justify-content flex-start

    &__review
      margin-bottom 8px

    &:nth-child(2)
      margin-bottom 15px

    &__image
      align-self center

    .image
      max-width 100%
      height auto

    .property
      color #99A7BC
      font-weight 800
      text-transform uppercase
      margin-right auto

    .text
      color #4F5969

      &__country
        display flex
        max-width 50%
        flex-wrap wrap

        .country
          margin 5px

      &__description
        line-height 1.75
        // max-width 75%

      &__bonuses
        display flex
        flex-direction column

        .bonus
          display flex
          flex-direction column
          align-items center

          .image
            color inherit
            align-self flex-end
            max-width 15%
            margin-top 20px

      &__licenses
        display flex
        flex-direction column

        .license
          margin-bottom 10px



  .reviews
    background-color white
    padding 20px

    &__existing
      .review__user
        display flex

      .avatar
        max-width 100%
        max-height 76px
        +below(992px)
          max-height 64px

      .username
        margin 5px

</style>
