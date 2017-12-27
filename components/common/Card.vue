<template>
  <div class="card">
    <div class="card__head">
      <img class='card__img' v-bind:src="imageURL" alt=title />
    </div>
    <div class="card__body">
      <h2 class='card__title'>
        {{ title }}
      </h2>
      <p class="card__text">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Card',
  props: {
    title: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    },
    imageURL: {
      type: String,
      required: false
    }
  }
})
</script>

<style lang="stylus" scoped>

.card
  background $white
  min-height 100%
  display flex
  flex-direction column
  overflow hidden
  transition transform .2s ease
  &:hover
    transform scale(1.03, 1.03)

  .card__head
    display flex
    background-color $purple
    background-size cover
    background-repeat no-repeat
    background-position center center
    max-height 150px
    flex 1
    overflow hidden
    img
      user-select none
      width 100%
      display block

  .card__body
    padding 20px
    text-align center
    flex-grow 1
    display flex
    align-items center
    flex-wrap wrap
    p
      color $mgray

    .card__title
      font-size 17px
      line-height 1.3
      font-weight bold
      flex 0 0 100%

</style>
