<template>
  <div class="card">
    <div class="card__head" v-bind:style="{ 'background-color': headerBgColor }">
      <img class='image' v-bind:src="imageURL" alt=title />
    </div>
    <div class="card__body">
      <h2 class='title'>
        {{ title }}
      </h2>
      <p class="text" v-if="text">
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
    headerBgColor: {
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

<style lang="stylus">

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
    flex-direction column
    justify-content center
    background-color $purple
    background-size cover
    background-repeat no-repeat
    background-position center center
    min-height 150px
    max-height 150px
    flex 1
    overflow hidden

    .image
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

    .text
      color $mgray

    .title
      font-size 17px
      line-height 1.3
      font-weight bold
      flex 0 0 100%

</style>
