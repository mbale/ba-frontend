<template>
  <div>
    <box>
      <header class="content-section__header review-header">
        <h2 class="content-section__title">{{ reviews.items.length }} Reviews</h2>
        <div class="rating">
          <no-ssr>
            <star-rating active-color="#ffcd02" :rating="reviews.avg" :star-size="18" :show-rating="false" :read-only="true" :inline="true"></star-rating>
          </no-ssr>
        </div>
      </header>
    </box>
    <box v-show="userCanSubmitReview">
      <div class="new-review">
        <div class="form-field">
          <label class="form-label" for="rating">Rating</label>
          <div class="form-input">
            <div class="ratings">
              <no-ssr>
                <star-rating active-color="#ffcd02" @rating-selected="setReviewRating" :increment="0.5" :star-size="30" :show-rating="false" :inline="true"></star-rating>
              </no-ssr>
            </div>
          </div>
        </div>
        <div class="form-field">
          <label class="form-label" for="review">Review</label>
          <div class="form-input">
            <text-area
              v-model="review.text"
              name="review-field"
              cols="30"
              rows="10"
              :validation="{ required: true, min: 6 }"
              />
          </div>
        </div>
        <div class="form-field form-field--actions">
          <button class="form-btn" @click="submitReview">
            Post Review
          </button>
        </div>
      </div>
    </box>
    <box class="reviews-container">
      <review :key="index" v-for="(review, index) in reviews.items" :review="review" />
    </box>
  </div>

</template>

<script>
import StarRating from 'vue-star-rating'
import Review from '~/components/bookmakers/reviews/review'
import Box from '~/components/common/box'
import TextArea from '~/components/common/form/textarea'

export default {
  components: {
    StarRating,
    Review,
    Box,
    TextArea
  },
  props: {
    reviews: Object
  },
  data () {
    return {
      review: {
        rating: null,
        text: null
      }
    }
  },
  computed: {
    userCanSubmitReview () {
      const reviews = this.$store.state.bookmakers.bookmaker.reviews.items
      const profile = this.$store.state.user.profile

      if (!profile) { return false }

      const match = reviews.find((review) => review.user.id === profile.id)

      if (match) { return false }
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
      const { rating: rate, text } = this.review
      this.$store.dispatch('bookmakers/addReview', { rate, text })
    }
  }
}
</script>

<style lang="stylus" scoped>
.reviews-container
  padding-top: 0
  padding-bottom: 0

.review-header
  border-bottom 1px solid $color-border
  display: flex
  flex-direction: row
  .content-section__title
    margin 0
  .rating
    align-self: center
    margin-left: 15px


</style>
