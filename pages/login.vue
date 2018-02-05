<template>
  <div class="auth-container">
    <!-- HEADER -->
    <div class="auth-header">
      <h1 class="title">Login</h1>
      <span class="subtitle">to your Betacle account</span>
    </div>
    <!-- FORM -->
    <login-form />
  </div>
</template>

<script>
import LoginForm from '~/components/auth/login-form'

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
}
</script>

<style lang="stylus">

</style>
