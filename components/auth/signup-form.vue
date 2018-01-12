<template>
  <div class="signup-form">
    <!-- HEADER -->
    <h1 class="signup-form__text signup-form__text--header">Sign up</h1>
    <span class="signup-form__text signup-form__text--sub">to get a new account</span>
    <!-- INPUTS -->
    <label class="signup-form__label" for="email">Email</label>
    <div class="signup-form__input-group">
      <input class="signup-form__input signup-form__input--email" type="text" placeholder="Your email" name="email" 
        v-model="email" v-validate="{ required: true, email: true }" ref="input--email">
      <span class="signup-form__error signup-form__error--input" v-show="errors.has('email')">
        {{ errors.first('email') }}
      </span>
    </div>
    <label class="signup-form__label" for="username">Username</label>
    <div class="signup-form__input-group">
      <input class="signup-form__input signup-form__input--username" type="text" placeholder="Your username" name="username" 
        v-model="username" v-validate="{ required: true, min: 4, regex: /^[a-zA-Z0-9_]+$/ }" ref="input--username">
      <span class="signup-form__error signup-form__error--input" v-show="errors.has('username')">
        {{ errors.first('username') }}
      </span>
    </div>
    <label class="signup-form__label" for="password">Password</label>
    <div class="signup-form__input-group">
      <input class="signup-form__input signup-form__input--password" type="password" placeholder="Minimum 6 characters" name="password" 
        v-model="password" v-validate="{ required: true, min: 4, regex: /^[a-zA-Z0-9_]+$/ }" ref="input--password">
      <span class="signup-form__error signup-form__error--input" v-show="errors.has('password')">
        {{ errors.first('password') }}
      </span>
    </div>
    <!-- SIGNUP -->
    <div class="signup-form__button" v-show="!isSignupInProgress" v-bind:class="{ 
      'signup-form__button--signup': !isSignupDisabled,
      'signup-form__button--disabled': isSignupDisabled 
      }" @click="submitSignup">
      Sign up
    </div>
    <div class="signup-form__button signup-form__button--disabled" v-show="isSignupInProgress">
      <icon name="spinner" pulse></icon>
    </div>
    <!-- ERRORS -->
    <span class="signup-form__error signup-form__error--credentials" v-if="signupError.response">
      Sorry, your email or username is already taken.
    </span>
    <span class="signup-form__error signup-form__error--site" v-else-if="signupError.request">
      We're experiencing technical difficulties.
    </span>
    <span class="signup-form__error signup-form__error--network" v-else-if="signupError.message">
      You're not connected to the network
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import 'vue-awesome/icons/spinner'
import Icon from 'vue-awesome/components/Icon'

export default Vue.extend({
  name: 'SignupForm',
  components: {
    Icon
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
      return this.$store.state.auth.user
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
})
</script>

<style lang="stylus">

.signup-form
  display flex
  flex-direction column
  justify-content flex-end
  padding 35px
  min-width 420px // needed due to potential showing error messages
  max-width 420px // same
  user-select none

  &__input-group
    position relative
    display flex
    flex-direction column
    margin 5px 0px

  &__icon-group
    position: absolute;
    right: 10px;
    top: 10px;

  &__group
    padding 0px 30px
    display flex
    justify-content space-between
    align-items center

    &-item
      display inline-flex

  &__text
    display flex
    flex-direction row
    font-family "Open Sans", Helvetica, sans-serif
    color black

    &--header
      font-size 1.5em
      margin-bottom 2px

    &--sub
      font-size 1.1em
      color #6C7A89
      border-bottom 1px solid #D2D7D3
      margin-bottom 25px
      padding-bottom 5px

  &__input
    color #494949
    font-size 100%
    flex 1
    width 100%
    background-color #fff
    padding 10px 40px 10px 10px
    border-radius 2px
    border 1px solid #ceced9

    .icon
      font-size 18px
      position absolute
      top 0
      right 0
      margin 10px
      width auto
      height 1em
      /* Safari */
      max-width 100%
      max-height 100%

  &__error
    display flex
    justify-content flex-start
    color #ec4040
    padding 10px 0px
    font-size 0.8.em

    &--credentials
      margin 10px

  &__button
    display flex
    justify-content center
    align-items center
    border-radius 2px
    font-size 15px
    user-select none
    font-weight 700
    cursor pointer
    padding 10px 30px
    border 1px solid transparent

    &--disabled
      color white
      cursor default
      background-color #BDC3C7
      margin-top 35px

    &--signup
      background-color #408fec
      color white
      border 1px solid #2d3088
      margin-top 35px

    &--steam
      background-color #22313F
      color white

      &-icon
        margin-right 15px

  &__label
    margin 6px 0px
    width 100%
    font-weight 700

  &__separator
    margin 10px 0px
    align-items center
    display flex

    &:before, &:after
      content ""
      flex 1
      height 1px
      background-color #ddd

    &-text
      margin 0px 10px 0px 10px
      font-size 0.8em
      color #aaa
      letter-spacing .05em
      text-transform uppercase
      font-weight 700


</style>
