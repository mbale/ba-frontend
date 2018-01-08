<template>
  <div class="glossary-box">
    <div class="glossary-box__letter">
      <span class="letter">{{ letter }}</span>
    </div>
    <div class="glossary-box__list">
      <ul class="list">
        <a v-bind:href="'#' + word" v-bind:key="word" v-for="word in words">
          <li class="list__item">{{ word }}</li>
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'GlossaryBox',
  computed: {
    letter () {
      if (this.words.length) {
        return this.words[0].charAt(0).toUpperCase()
      }
      return 0
    }
  },
  props: ['words']
})
</script>

<style lang="stylus">

.glossary-box
  max-width 25%
  flex-basis 25%
  margin 10px
  padding-right 10px
  word-wrap break-word

  .glossary-box__letter
    font-weight 700
    font-size 16px
    padding 5px 10px
    display inline-block
    vertical-align top
    margin-bottom 10px
    background #62626f
    color #fff

  .glossary-box__list
    .list
      list-style none

</style>
