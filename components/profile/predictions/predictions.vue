<template>
  <div>
    <box>
      <header class="content-section__header review-header">
        <h2 class="content-section__title">{{ showPredictionsLength }}</h2>
      </header>
    </box>
    <box class="reviews-container">
      <prediction :key="index" v-for="(prediction, index) in predictions" :prediction="prediction" />
    </box>
  </div>

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Prediction from '~/components/profile/predictions/prediction'
import Box from '~/components/common/box'
const { mapState } = createNamespacedHelpers('users')

export default {
  components: {
    Prediction,
    Box
  },
  props: {
    predictions: Array
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
    ...mapState({
      user: 'userToView',
      allPredictionsLength: state => state.userToView.predictions.length
    }),
    showPredictionsLength () {
      if (this.allPredictionsLength === 0) {
        return 'No Predictions'
      } else if (this.allPredictionsLength === 1) {
        return '1 Prediction'
      } else if (this.allPredictionsLength > 20) {
        return this.predictions.length + ' Predictions (out of ' + this.allPredictionsLength + ')'
      } else {
        return this.predictions.length + ' Predictions'
      }
    }
  },
  async fetch ({ store, params, error }) {
    const { username } = params
    await store.dispatch('users/fetchByUsername', { username })
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
