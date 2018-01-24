<template>
  <div class="auth-block">
    <div class="auth-block__col">
      <signup-form class="content-panel"></signup-form>
    </div>
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

breaking-point = 1000px

.auth-block
  width 100%
  display flex
  flex-direction row
  justify-content space-between
  align-items center
  +below(breaking-point)
    flex-direction column
    justify-content center

  &__col
    display flex
    flex-direction row
    justify-content center
    align-items center
    width 50%

  &__separator
    margin 30px
    .icon
      color #674172
      transform rotate(90deg)
      +below(breaking-point)
        transform rotate(0deg)

</style>
