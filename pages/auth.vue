<template>
  <div class="auth-block">
    <div class="auth-block__col">
      <signup-form class="content-panel"></signup-form>
    </div>
    <div class="auth-block__separator"></div>
    <div class="auth-block__col">
      <login-form class="content-panel"></login-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import LoginForm from '~/components/auth/login-form'
import SignupForm from '~/components/auth/signup-form'

export default Vue.extend({
  name: 'AuthPage',
  components: {
    LoginForm,
    SignupForm
  }
})
</script>

<style lang="stylus">

.auth-block
  width 100%
  display flex
  flex-direction row
  justify-content space-between
  align-items center
  +below(1200px)
    flex-direction column

  &__col
    display flex
    flex-direction row
    justify-content center
    align-items center
    width 50%

  &__separator
    width 1px
    height 50%
    margin 6px 0px
    background #ABB7B7
  
</style>


