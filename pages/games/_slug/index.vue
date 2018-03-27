<template>
  <section class="game content-panel">
    <header class="content-header">
      <div class="content-header__hero games-header">
        <figure class="content-header__image" v-bind:style="{ 'background-color': game.color }">
          <img v-bind:src="game.logo" />
        </figure>
        <div class="content-header__info">
          <h1 class="content-header__title">{{ game.name }}</h1>
        </div>
      </div>
    </header>
    <div class="game__body">
      <h1 class="title">{{ articleHeader }}</h1>
      <article v-html="HTMLDescription"></article>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import marked from 'marked'

export default Vue.extend({
  name: 'Game',
  head () {
    return {
      title: `Betacle - ${this.game.name}`
    }
  },
  computed: {
    articleHeader () {
      return `${this.game.name} Betting`
    },
    game () {
      return this.$store.state.games.game
    },
    HTMLDescription () {
      return marked(this.$store.state.games.game.description, {
        sanitaze: true
      })
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('games/getBySlug', {
      slug: params.slug
    })
  }
})
</script>

<style lang="stylus">

.game
  width 100%

  .games-header
    width fit-content
    margin 0 auto

  .game__header
    display block
    margin-bottom 35px

    .top
      display flex
      justify-content center
      width 100%
      padding 14px
      background-color #1c1e4e

      .logo
        display flex
        flex-direction column
        justify-content center
        flex-basis 20%
        height auto
        min-width 160px
        max-width 160px
        max-height 160px
        margin-bottom -34px

        .image
          height 60%

      .title
        display flex
        flex-basis 20%
        flex-direction column-reverse
        margin-left 20px

        .text
          color #fff
          font-family DINPro
          font-weight 700
          font-size 30px
          text-shadow 0 0 3px rgba(0,0,0,.5)
          margin 0 10px 0 0

    .bottom
      display flex
      width 100%
      background-color white
      height 40px

  .game__body
    max-width 1180px
    background-color #fff
    padding 50px
    margin-bottom 30px
    margin 0 auto

    .title
      margin-bottom 20px
      color #2d3088
      font-size 28px

    h2
      margin 30px 0px 15px 0px
      font-size 23px
      color #4d4d4d

    p
      line-height 1.75

    img
      max-width 100%
      margin-top 15px


</style>
