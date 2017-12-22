<template>
  <div class='content'>
    <div class='content-body wrapper'>
      <article class='article'>
        <h1 class='article-title'>
          {{ guide.title }}
        </h1>
        <div class='article-headerImage'>
          <img v-bind:alt=guide.title v-bind:src=guide.headerImage />
        </div>
        <div class='article-body' v-html="markedText">
          {{ guide.text }}
        </div>
      </article>
    </div>
  </div>
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
    markedText () {
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
  background-color #fff
  padding 35px

.article-headerImage
  overflow hidden
  max-height 500px
  margin 0 -35px 30px -35px
  img
    width: 100%
    max-height: 500px

.article-title
  max-width 980px
  margin 0 auto
  color $purple
  font-size 28px
  margin-bottom 30px

.article-body
  max-width 980px
  margin 0 auto


</style>
