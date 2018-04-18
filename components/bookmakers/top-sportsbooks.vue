<template>
  <div class="widget top-bookmakers">
    <h4 class="widget-title">Top Sportbooks</h4>
    <div class="top-bookmakers__item" v-for="(bookmaker) in sportsbooks">
      <nuxt-link class="top-bookmakers__icon" :to="`/visit/${bookmaker.slug}`">
        <img :src="bookmaker.icon" alt="`${bookmaker.name} Icon`">
      </nuxt-link>
      <div class="top-bookmakers__txt">
        <nuxt-link class="top-bookmakers__name":to="`/visit/${bookmaker.slug}`">{{bookmaker.name}}</nuxt-link>
        <div class="top-bookmakers__rating">
          <no-ssr>
            <star-rating active-color="#ffcd02" :rating="bookmaker.reviews.avg" :star-size="12" :show-rating="false" :read-only="true" :inline="true"></star-rating>
          </no-ssr>
        </div>
      </div>
      <nuxt-link class="top-bookmakers__btn" :to="`/visit/${bookmaker.slug}`">Bet</nuxt-link>
    </div>
    <div class="top-bookmakers__footer">
      <nuxt-link class="more" to="/bookmakers">
        More Bookmakers
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  components: {
    StarRating
  },
  data () {
    return {
      sportsbooksToShow: 3
    }
  },
  computed: {
    sportsbooks () {
      const topBookmakers = this.$store.state.bookmakers.list.sort(function (a, b) {
        return a.reviews.avg < b.reviews.avg ? 1 : -1
      }).slice(0, this.sportsbooksToShow)
      return topBookmakers
    }
  }
}
</script>

<style lang="stylus" scoped>
  .top-bookmakers
    background #fff
    border 1px solid $color-border

  .top-bookmakers__item
    padding 10px 15px
    overflow hidden
    & + .top-bookmakers__item
      border-top 1px solid $color-border

  .top-bookmakers__icon
    height 40px
    width 40px
    border-radius 2px
    margin-right 10px
    float left

  .top-bookmakers__txt
    float left

  .top-bookmakers__name
    display block
    font-weight bold
    margin-bottom 3px

  .top-bookmakers__btn
    button($purple)
    padding 5px 25px
    margin 5px 0
    display inline-block
    font-weight bold
    float right

  .top-bookmakers__footer
    padding 10px
    border-top 1px solid #EDEDED
    text-align center

  .top-bookmakers__more
    text-transform uppercase
    font-size 13px
    font-weight 700

</style>
