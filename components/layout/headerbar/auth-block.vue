<template>
  <div class="auth">
    <div class="auth__btn auth__btn--login">Login</div>
    <div class="auth__btn auth__btn--signup">Signup</div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'AuthBlock'
})
</script>

<style lang="stylus" scoped>

.auth
  display flex
  flex-direction row
  justify-content flex-end
  margin-left auto

  .auth__btn
    background transparent
    border 0
    padding 0 15px
    line-height 30px
    font-family DINPro,Helvetica,sans-serif
    font-weight 500
    font-size 14px
    text-transform uppercase
    color hsla(0,0%,100%,.66)
    cursor pointer
    user-select none

  .auth__btn--signup
    background #fff
    color #408fec
    border-radius 2px
    box-shadow 0 2px 6px 2px rgba(19,98,191,.5)

</style>
