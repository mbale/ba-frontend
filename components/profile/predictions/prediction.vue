<template>
  <article class="prediction" >
    <header class="prediction-header">
      <div class="prediction-header__info">
        <!-- <div class="leftCorner">
          <img :src="prediction.gameSlug" alt="">
        </div> -->
        <div>
          <span class="prediction-author">{{ prediction.match.awayTeam }} - VS - {{ prediction.match.homeTeam }}</span>
        </div>
        <div class="stake">Stake: <span>{{ prediction.stake }} (odds: {{ prediction.odds }})</span></div>
      </div>
    </header>
  </article>
</template>

<script>
import noAvatarImage from '~/assets/images/no_avatar.png'
import dateMixin from '~/mixins/date'

export default {
  mixins: [dateMixin],
  components: {
  },
  data () {
    return {
      noAvatarImage
    }
  },
  props: {
    prediction: Object
  }
}
</script>

<style lang="stylus" scoped>
  .stake
    margin-top 15px

  .prediction
    border-bottom 1px solid $color-border
    padding 20px
    margin 0 -20px

  .prediction-header
    margin-bottom 15px
    display: flex

  .prediction-header__avatar
    background-color #D8D8D8
    height: 50px
    width: 50px
    border-radius 2px
    overflow: hidden
    margin-right 15px

  .prediction-header__info
    flex 1
    display flex
    align-items flex-start
    flex-direction column
</style>
