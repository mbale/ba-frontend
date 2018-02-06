<template>
  <div class="form--horizontal">
    <!-- STEAM -->
    <div class="auth-connect">
      <nuxt-link class="auth-connect__button auth-connect__button--steam" :to="{ path: 'auth/steam' }">
        <icon class="auth-connect__button__icon" name="steam-square" scale="1.2" />
        <span>Connect with Steam</span>
      </nuxt-link>
      <div class='auth-connect__seperator'>
        <span>OR</span>
      </div>
    </div>
    <!-- INPUTS -->
    <div class="form-field">
      <label class="form-label" for="username">Username</label>
      <div class="form-input">
        <text-input
          v-model="username"
          placeholder="Your username"
          v-validate="{ required: true, min: 4, regex: /^[a-zA-Z0-9_]+$/ }"/>
      </div>
    </div>
    <div class="form-field">
      <label class="form-label" for="password">Password</label>
      <div class="form-input">
        <password-input v-model="password" placeholder="Minimum 6 characters" />
      </div>
    </div>
    <!-- LOGIN -->
    <div class="form-field form-field--actions">
      <button class="form-btn" v-show="!isLoginInProgress" v-bind:class="{'form-btn--disabled': isLoginDisabled}" @click="submitLogin">
        Log in
      </button>
      <button class="form-btn form-btn--disabled" v-show="isLoginInProgress">
        <icon name="spinner" pulse></icon>
      </button>
    </div>
    <!-- ERRORS -->
    <div class="form-errors">
      <span v-if="loginError.response">
        Sorry, that password or username isn't right. We can help you recover your account.
      </span>
      <span v-else-if="loginError.request">
        We're experiencing technical difficulties.
      </span>
      <span v-else-if="loginError.message">
        You're not connected to the network
      </span>
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/common/form/text'
import PasswordInput from '~/components/common/form/password'

export default {
  name: 'LoginForm',
  components: {
    TextInput,
    PasswordInput
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    isLoginInProgress () {
      return this.$store.state.auth.loginInProgress
    },
    isLoginDisabled () {
      if (this.errors.any() || this.username === '' || this.password === '') {
        return true
      }
      return false
    },
    isLoggedIn () {
      return this.$store.state.auth.user
    },
    loginError () {
      return this.$store.state.auth.loginError || {}
    }
  },
  methods: {
    async submitLogin () {
      if (!this.errors.any() && !this.isLoginDisabled) {
        await this.$store.dispatch('auth/basic', {
          username: this.username,
          password: this.password
        })

        if (this.isLoggedIn) {
          this.$router.push('/matches')
        }
      }
    }
  }
}
</script>

<style lang="stylus">


</style>
