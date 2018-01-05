<template>
  <div class="overlay">
    <div class="modal-box">
      <header class="modal-box__header">
        <slot name="header"></slot>
      </header>
      <main class="modal-box__body">
        <slot name="body"></slot>
      </main>
      <footer class="modal-box__footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ModalBox'
})
</script>

<style lang="stylus">

.overlay
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color rgba(27,29,82,.8)
  transition opacity .2s
  opacity 1

.modal-box
  display flex
  flex-direction column
  justify-content space-around
  background-color white
  padding 15px 30px
  width 380px

  .modal-box__body
    display flex
    flex-direction column

  .modal-box__footer
    display flex
    justify-content space-between

</style>
