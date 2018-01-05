<template>
  <div class="card-box">
    <header class="card-box__header">
      <slot name="header"></slot>
    </header>
    <main class="card-box__body">
      <slot name="body"></slot>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'CardBox'
})
</script>

<style lang="stylus" scoped>

.card-box
  display flex
  flex-direction column
  overflow hidden
  background-color white
  transition transform .2s ease

  &:hover
    transform scale(1.03, 1.03)

  .card-box__header
    display flex
    flex-direction column
    justify-content center
    flex 1
    background-color $purple
    background-size cover
    background-repeat no-repeat
    background-position center center
    min-height 150px
    max-height 150px
    overflow hidden

    .image
      display block
      width 100%
      height 100%
      user-select none

  .card-box__body
    display flex
    flex-direction column
    justify-content space-around
    align-items center
    height 100%
    flec-grow 1
    flex-wrap wrap
    padding 16px

    .title
      font-size 17px
      line-height 1.3
      font-weight bold
      flex 0 0 100%

</style>
