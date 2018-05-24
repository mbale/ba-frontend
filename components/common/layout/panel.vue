<template>
  <div class="panel">
    <header class="panel__header">
      <h1 class="header header--first">{{ title }}</h1>
      <h2 class="header header--second">{{ subTitle }}</h2>
    </header>
    <main class="panel__body">
      <slot name="body"></slot>
    </main>
    <footer class="panel__footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Panel',
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: false
    }
  }
})
</script>

<style lang="stylus" scoped>
.panel
  display flex
  flex-direction column
  align-self flex-start
  max-width 340px
  width 100%
  margin 40px auto
  background-color #fff
  border-radius 2px
  padding 25px 20px

  .panel__header
    margin-bottom 20px

    .header
      font-family "DINPro", Helvetica, sans-serif

      &--first
        font-size: 18px
        font-weight: 500
        text-transform uppercase

      &--second
        color #807e8a

  .panel__body
    margin-bottom 20px

</style>
