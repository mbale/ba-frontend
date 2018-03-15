<template>
  <div class="sportsbook-content">
    <img src="~/assets/images/bookmaker/aside.png" alt="">

    <div class="sportsbooks">
    <h4>TOP SPORTSBOOKS</h4>

    <!-- Sportbook  -->
    <div class="sportsbook" v-for="(bookmaker) in sportsbooks">
      <img :src="bookmaker.icon" alt="">
      <h6>
        <nuxt-link class="review" :to="{ path: '../' + bookmaker.slug }" append>
          {{bookmaker.name}}
        </nuxt-link>
      </h6>
      <div class="rating">
        <no-ssr>
          <star-rating active-color="#ffcd02" :rating="bookmaker.reviews.avg" :star-size="12" :show-rating="false" :read-only="true" :inline="true"></star-rating>
        </no-ssr>
      </div>
        <button class="bet slide-left">
          <nuxt-link :to="{ path: '../' + bookmaker.slug }" append>
            Bet
          </nuxt-link>
        </button>
      </div>

      <!-- <h5 class="more">
        more sportsbooks reviews
      </h5> -->
      <nuxt-link class="more" :to="{ path: '../' }" append>
        more sportsbooks reviews
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
      // letShowMoreSportsbooks: true,
      sportsbooksToShow: 3
    }
  },
  computed: {
    sportsbooks () {
      var topBookmakers = this.$store.state.bookmakers.list.sort(function (a, b) { return a.reviews.avg < b.reviews.avg ? 1 : -1 }).slice(0, this.sportsbooksToShow)
      return topBookmakers
    }
  },
  methods: {
    // showMoreSportsbooks (number) {
    //   this.sportsbooksToShow = number
    //   this.letShowMoreSportsbooks = false
    // }
  },
  watch: {
  }
}
</script>

<style lang="stylus" scoped>

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
      transition: all 0.3s ease

      &:hover, &:focus, &:active
        padding-right: 25px

      a
        color: inherit

  .more
    color: $blue
    font-weight: bold
    border-top: 1px solid $color-border
    text-align: center
    text-transform: uppercase
    padding-top: 10px
    // cursor: pointer
    display: block

</style>
