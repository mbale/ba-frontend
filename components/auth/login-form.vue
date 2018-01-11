<template>
  <div class="login-form">
    <!-- HEADER -->
    <h1 class="login-form__text login-form__text--header">Sign in</h1>
    <span class="login-form__text login-form__text--sub">to your betacle account</span>
    <!-- INPUTS -->
    <label class="login-form__label" for="username">Username</label>
    <div class="login-form__input-group">
      <input class="login-form__input login-form__input--username" type="text" placeholder="Your username" name="username" 
        v-model="username" v-validate="{ required: true, min: 4, regex: /^[a-zA-Z0-9_]+$/ }" ref="input--username">
      <span class="login-form__error login-form__error--input" v-show="errors.has('username')">
        {{ errors.first('username') }}
      </span>
    </div>
    <label class="login-form__label" for="password">Password</label>
    <div class="login-form__input-group">
      <input class="login-form__input login-form__input--password" type="password" placeholder="Minimum 6 characters" name="password" 
        v-model="password" v-validate="{ required: true, min: 4, regex: /^[a-zA-Z0-9_]+$/ }" ref="input--password">
      <div class="login-form__icon-group">
        <icon class="login-form__icon login-form__icon--password" :name="iconType" scale="1.2" v-on:click.native="togglePasswordInputType"></icon>
      </div>
      <span class="login-form__error login-form__error--input" v-show="errors.has('password')">
        {{ errors.first('password') }}
      </span>
    </div>
    <!-- LOGIN -->
    <div class="login-form__button login-form__button--login" v-show="!isLoginInProcess" v-bind:class="{ 'button--disabled': isLoginDisabled }" @click="submitLogin">
      Log in
    </div>
    <div class="login-form__button login-form__button--disabled" v-show="isLoginInProcess">
      <icon name="spinner" pulse></icon>
    </div>
    <!-- ERRORS -->
    <span class="login-form__error login-form__error--credentials" v-if="authError">
      Sorry, that password or username isn't right. We can help you recover your account.
    </span>
    <span class="login-form__error login-form__error--site" v-else-if="requestError">
      We're experiencing technical difficulties.
    </span>
    <span class="login-form__error login-form__error--network" v-else-if="loginError.message">
      You're not connected to the network
    </span>
    <!-- STEAM -->
    <div class="login-form__separator">
      <span class="login-form__separator-text">OR</span>
    </div>
    <nuxt-link class="login-form__button login-form__button--steam" :to="{ path: 'auth/steam' }">
      <icon class="login-form__button--steam-icon" name="steam-square" scale="2"></icon>
      <span class="login-form__button--steam-text">Log in with Steam</span>
    </nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue'
import 'vue-awesome/icons/eye'
import 'vue-awesome/icons/eye-slash'
import 'vue-awesome/icons/steam-square'
import 'vue-awesome/icons/spinner'
import 'vue-awesome/icons/sign-in'
import steamLogoURL from '~/assets/images/social/icon_steam.svg'
import Icon from 'vue-awesome/components/Icon'

export default Vue.extend({
  name: 'LoginForm',
  components: {
    Icon
  },
  data () {
    return {
      username: '',
      password: '',
      steamLogoURL,
      iconType: 'eye'
    }
  },
  computed: {
    isLoginInProcess () {
      return this.$store.state.auth.loginInProcess
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
    authError () {
      return this.loginError.response
    },
    requestError () {
      return this.loginError.request
    },
    loginError () {
      return this.$store.state.auth.loginError || {}
    }
  },
  methods: {
    async submitLogin () {
      if (!this.errors.any()) {
        this.$store.commit('auth/in_process', {
          state: true
        })

        await this.$store.dispatch('auth/basic', {
          username: this.username,
          password: this.password
        })

        await this.$store.dispatch('auth/getProfile')

        if (this.$store.state.auth.user) {
          this.$router.push({
            path: '/matches'
          })
        }
      }
    },
    togglePasswordInputType () {
      const passwordInput = window.document.querySelector('.login-form__input--password')

      this.iconType = passwordInput.type === 'text' ? 'eye' : 'eye-slash'
      passwordInput.type = passwordInput.type === 'text' ? 'password' : 'text'
    }
  }
})
</script>

<style lang="stylus" scoped>

.login-form
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

    &--login
      background-color #408fec
      color #fff
      margin-top 35px

    &--signup
      font-size 15px
      background-color transparent
      border 1px solid #2d3088
      color #2d3088
      padding 8px 12px

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
