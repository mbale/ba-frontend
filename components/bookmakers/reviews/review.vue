<template>
  <article class="review" >
    <header class="review-header">
      <figure class="review-header__avatar">
        <!-- if avatar -->
        <img class="avatar img-responsive" v-if="review.user.avatar" v-bind:src="review.user.avatar" />
        <!-- no avatar -->
        <img class="avatar img-responsive" v-else v-bind:src="noAvatarImage" />
      </figure>
      <div class="review-header__info">
        <div>
          <span class="review-author">{{ review.user.username }}</span>
          <div class="review-rating">
            <no-ssr>
              <star-rating active-color="#ffcd02" :rating="review.rate" :star-size="18" :show-rating="false" :read-only="true" :inline="true"></star-rating>
            </no-ssr>
          </div>
        </div>
        <time class="review-date">October 2016</time>
      </div>
    </header>
    <div class="review-body">
      <p>{{ review.text }}</p>
    </div>
  </article>
</template>

<script>
import StarRating from 'vue-star-rating'
import noAvatarImage from '~/assets/images/no_avatar.png'

export default {
  components: {
    StarRating
  },
  data () {
    return {
      noAvatarImage
    }
  },
  props: {
    review: Object
  }
}
</script>

<style lang="stylus" scoped>
  .review
    border-bottom 1px solid $color-border
    padding 20px
    margin 0 -20px

  .review-header
    margin-bottom 15px
    display: flex

  .review-header__avatar
    background-color #D8D8D8
    height: 50px
    width: 50px
    border-radius 2px
    overflow: hidden
    margin-right 15px

  .review-header__info
    flex 1
    display flex
    align-items flex-start

  .review-body
    line-height 1.5

  .review-author
    font-size 16px
    font-weight: bold

  .review-rating
    margin-top 5px

  .review-date
    color $lgray
    font-size 13px
    margin-left: auto

  .reviews-average-rating
    margin-left 10px
</style>
