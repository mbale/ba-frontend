<template>
  <div class="auth-container">
    <!-- HEADER -->
    <div class="auth-header">
      <h1 class="title">Signup</h1>
      <span class="subtitle">to get a new account</span>
    </div>
    <!-- FORM -->
    <signup-form />
  </div>
</template>

<script>
import SignupForm from '~/components/auth/signup-form'

export default {
  name: 'SignupPage',
  components: {
    SignupForm
  }
}
</script>

<style lang="stylus">

</style>
