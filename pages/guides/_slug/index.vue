<template>
  <article class='article'>
    <div class='article__header'>
      <h1 class='title'>
        {{ guide.title }}
      </h1>
      <img class='image' v-bind:alt=guide.title v-bind:src=guide.headerImage />
    </div>
    <div class='article__body'>
      <p class='content' v-html='parsedHTMLText'></p>
    </div>
  </article>
</template>

<script>
import Vue from 'vue'
import marked from 'marked'

export default Vue.extend({
  name: 'GuideDetailPage',
  metaInfo: {
    title: 'y'
  },
  head () {
    return {
      title: this.guide.title
    }
  },
  computed: {
    guide () {
      return this.$store.state.guides.guide
    },
    parsedHTMLText () {
      return marked(this.$store.state.guides.guide.text, {
        sanitaze: true
      })
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('guides/getBySlug', {
      slug: params.slug
    })
  }
})
</script>

<style lang="stylus">
.article
  margin 30px
  background-color #fff
  padding 35px

  .article__header
    overflow hidden
    max-height 500px
    margin 0 -35px 30px -35px

    .image
      width: 100%
      max-height: 500px

    .title
      max-width 980px
      margin 0px 0px 30px 60px
      color $purple
      font-size 28px

  .article__body
    padding 10px
    margin 0 auto

    .content 
      p
        line-height 1.75
        margin-bottom 20px

      h2
        margin-bottom 15px
        font-size 23px
        color #4d4d4d

      ul
        margin 0 0 20px 20px

        li
          margin-bottom 5px
</style>
