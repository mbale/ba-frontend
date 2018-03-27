<template>
  <div>
    <box>
      <header class="content-section__header review-header">
        <h2 class="content-section__title">{{ countPredictions }}</h2>
      </header>
    </box>
    <box class="reviews-container">
      <prediction :key="index" v-for="(prediction, index) in predictions" :prediction="prediction" />
    </box>
  </div>

</template>

<script>
import Prediction from '~/components/profile/predictions/prediction'
import Box from '~/components/common/box'

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
    countPredictions () {
      if (this.predictions.length === 0) {
        return 'No Predictions'
      } else if (this.predictions.length === 1) {
        return '1 Prediction'
      } else {
        return this.predictions.length + ' Predictions'
      }
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
