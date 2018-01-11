<template>
  <div class="auth-block">
    <login-form class="auth-block__login content-panel"></login-form>
    <div class="auth-block__signup"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import LoginForm from '~/components/auth/login-form'

export default Vue.extend({
  name: 'AuthPage',
  components: {
    LoginForm
  }
})
</script>

<style lang="stylus">

.auth-block
  width 100%
  display flex
  flex-direction row
  justify-content center
  align-items center
  
</style>


