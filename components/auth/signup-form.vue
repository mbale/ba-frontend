<template>
  <div class="form--horizontal">
    <!-- INPUTS -->
    <div class="form-field">
      <label class="form-label" for="email">Email</label>
      <div class="form-input">
        <text-input
          v-model="email"
          placeholder="Your email"
          type="email"
          :validation="'required|email'" />
      </div>
    </div>
    <div class="form-field">
      <label class="form-label" for="username">Username</label>
      <div class="form-input">
        <text-input
          v-model="username"
          placeholder="Your username"
          :validation="{ required: true, min: 4, alpha: true }" />
      </div>
    </div>
    <div class="form-field">
      <label class="form-label" for="password">Password</label>
      <div class="form-input">
        <password-input
          v-model="password"
          placeholder="Minimum 6 characters"
          :validation="{ required: true, min: 6, alpha: true }" />
      </div>
    </div>
    <!-- SIGNUP -->
    <div class="form-field form-field--actions">
      <button class="form-btn" v-show="!isSignupInProgress" v-bind:class="{'form-btn--disabled': isSignupDisabled}" @click="submitSignup">
        Sign up
      </button>
      <button class="form-btn form-btn--disabled" v-show="isSignupInProgress">
        <icon name="spinner" pulse></icon>
      </button>
    </div>
    <!-- ERRORS -->
    <div class="form-errors">
      <span v-if="signupError.response">
        Sorry, your email or username is already taken.
      </span>
      <span v-else-if="signupError.request">
        We're experiencing technical difficulties.
      </span>
      <span v-else-if="signupError.message">
        You're not connected to the network
      </span>
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/common/form/text'
import PasswordInput from '~/components/common/form/password'

export default {
  name: 'SignupForm',
  components: {
    TextInput,
    PasswordInput
  },
  data () {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  computed: {
    isSignupInProgress () {
      return this.$store.state.auth.signupInProgress
    },
    isSignupDisabled () {
      if (this.errors.any() || this.email === '' || this.username === '' || this.password === '') {
        return true
      }
      return false
    },
    isLoggedIn () {
      return this.$store.state.user.profile
    },
    signupError () {
      return this.$store.state.auth.signupError || {}
    }
  },
  methods: {
    async submitSignup () {
      if (!this.errors.any() && !this.isSignupDisabled) {
        await this.$store.dispatch('auth/signup', {
          email: this.email,
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
