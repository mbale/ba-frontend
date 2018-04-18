<template>
  <div class="match__predictions panel">
    <header class="header">
      <h1 class="header-text header-text--one">
        Predictions
      </h1>
      <h2 class="header-text header-text--two">
        others made
      </h2>
    </header>
    <main class="content">
      <div class="row" v-bind:key="prediction.id" v-for="prediction of predictions">
        <div class="user col">
          <img class="avatar" v-bind:src="getAvatarURL(prediction)" alt="avatar">
          <span class="name">{{ getUser(prediction).username }}</span>
        </div>
        <div class="prediction col">
          <div class="row">
            <span class="odds header-text header-text--four">home : {{ prediction.odds.home }}</span>
            <span class="odds header-text header-text--four">away : {{ prediction.odds.away }}</span>
            <span class="odds odds-stake header-text header-text--four">stake : {{ prediction.stake }}$</span>
            <span class="team header-text header-text--four">|| {{ getSelectedTeam(prediction) }}</span>
          </div>
          <span class="text">{{ prediction.text }}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import noAvatarImage from '~/assets/images/no_avatar.png'

export default Vue.extend({
  name: 'PredictionList',
  computed: {
    predictions () {
      return this.$store.state.match.data.predictions
    }
  },
  methods: {
    getUser (prediction) {
      return prediction.user
    },
    getSelectedTeam (prediction) {
      if (prediction.selectedTeam === 'home') {
        return this.$store.state.match.data.homeTeam
      }
      return this.$store.state.match.data.awayTeam
    },
    getAvatarURL (prediction) {
      return this.getUser(prediction).avatar || noAvatarImage
    }
  }
})
</script>

<style lang="stylus" scoped>
.match__predictions
  .heade
    margin 5px

  .content
    display flex
    flex-direction column

    .row:last-child
      margin-bottom 0px

    .user
      margin-right 18px
      align-items center

      .avatar
        min-width 67px
        min-height 67px
        max-width 100%
        max-height 76px

      .name
        margin 5px

    .prediction
      .odds
        text-transform uppercase
        margin-right 10px
        margin-left 0px

      .odds-stake
        margin-right 0px

</style>
