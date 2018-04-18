<template>
  <div class="glossary-row">
    <div class="glossary-row__letter">
      <p class="letter">
        {{ letter }}
      </p>
    </div>
    <div class="glossary-row__content">
      <div class="row" v-bind:key="title" v-for="[title, definition] in Object.entries(term)">
        <span v-bind:id="title" class="title">{{ title }}</span>
        <span class="definition" v-html="definition"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'GlossaryRow',
  props: ['term'],
  computed: {
    letter () {
      return Object.keys(this.term)[0].charAt(0).toUpperCase()
    }
  },
  methods: {
  }
})
</script>

<style lang="stylus">

.glossary-row
  display flex
  flex-direction row
  color #62626f
  background-color #fff
  padding 20px

  .glossary-row__letter
    display flex
    justify-content center
    font-weight 700
    font-size 22px
    padding-right 15px
    border-right 1px solid #ededed
    flex: 0 0 50px;

  .glossary-row__content
    flex 1
    padding-left 15px

    .row
      .title
        display block
        font-weight 700
        margin 0px 0px 10px 0px

      .definition
        display block
        margin 10px 0px 15px 5px
        line-height 1.6

</style>
