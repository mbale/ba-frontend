<template>
	<div class="message-box">
    <slot />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'MessageBox'
})
</script>

<style lang="stylus">

// .overlay
//   position fixed
//   top 0
//   left 0
//   right 0
//   bottom 0
//   display flex
//   flex-direction column
//   justify-content center
//   align-items center
//   background-color rgba(27,29,82,.8)
//   transition opacity .2s
//   opacity 1
//
// .modal-box
//   display flex
//   flex-direction column
//   justify-content space-around
//   background-color white
//   padding 10px 25px
//   width 380px
//
//   .modal-box__body
//     display flex
//     flex-direction column
//
//   .modal-box__footer
//     display flex
//     padding 15px 0px
//     justify-content space-between

</style>
