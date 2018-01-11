<template>
  <div class="login-form">
    <!-- STEAM -->
    <header class="login-form__header">
      <!-- <div class="login-form__header-icon">
        <icon name="sign-in" scale="2"></icon>
      </div> -->
      <h1 class="login-form__header-header">Sign in</h1>
      <span class="login-form__header-text">to your betacle account</span>
    </header>
    <main class="login-form__content">
      <!-- <nuxt-link class="login-form__link login-form__link--steam" :to="{ path: 'auth/steam' }">
        <icon class="icon" name="steam-square" scale="3"></icon>
        <span class="text text--steam-auth">Connect with Steam</span>
      </nuxt-link>
      <div class="login-form__separator">
        <span class="text">OR</span>
      </div> -->
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
        <icon class="icon" :name="iconState" scale="1" v-on:click.native="togglePasswordInputType"></icon>
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
      <!-- LOGIN ERRORS -->
      <span class="login-form__error login-form__error--credentials" v-if="loginError.response">
        Sorry, that password or username isn't right. We can help you recover your account.
      </span>
      <span class="login-form__error login-form__error--site" v-else-if="loginError.request">
        We're experiencing technical difficulties.
      </span>
      <span class="login-form__error login-form__error--network" v-else-if="loginError.message">
        You're not connected to the network
      </span>
      <!-- STEAM -->
      <div class="login-form__separator">
        <span class="text">OR</span>
      </div>
      <nuxt-link class="login-form__button login-form__button--steam" :to="{ path: 'auth/steam' }">
        <icon class="login-form__button--steam-icon" name="steam-square" scale="2"></icon>
        <span class="login-form__button--steam-text">Log in with Steam</span>
      </nuxt-link>
    </main>
    <footer class="login-form__footer"></footer>
    <!-- <div class="login-form__separator"></div> -->
    </div>
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
      steamLogoURL
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
          this.modalStates.login = false
          this.$router.push({
            path: '/matches'
          })
        }
      }
    },
    togglePasswordInputType () {
      const passwordInput = window.document.querySelector('.input--password')

      this.iconState = passwordInput.type === 'text' ? 'eye' : 'eye-slash'
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
  padding 10px 10px 40px 10px
  min-width 420px // needed due to potential showing error messages

  &__group
    padding 0px 30px
    display flex
    justify-content space-between
    align-items center

    &-item
      display inline-flex

  &__content
    display flex
    flex-direction column
    padding 10px 30px 10px 30px

  &__header
    display flex
    flex-direction column
    padding 30px 30px 10px 30px
    color black

    &-icon
      display flex
      align-items center
      margin-right 10px

    &-header
      display flex
      align-items center
      font-size 1.5em
      font-family "Open Sans", Helvetica, sans-serif
      margin-bottom 2px

    &-text
      display flex
      color #6C7A89
      border-bottom 1px solid #D2D7D3
      padding-bottom 5px
      width 65%

  &__input-group
      position relative
      display flex
      flex-direction column
      margin 5px 0px

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

    &--login
      margin-bottom 10px

      // &--input

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
    margin 8px 0px
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

    .text
      margin 0px 10px 0px 10px
      font-size: 11px;
      display group
      color #aaa
      letter-spacing .05em
      text-transform uppercase
      font-weight 700
      user-select none

  &__text
    display inline-flex
  
  &__link
    &--steam
      display flex
      padding 5px
      color black
      justify-content center

      .icon
        margin-right 20px
      
      .text
        display flex
        font-size 16px
        font-weight 600
        flex-direction column
        justify-content center
        align-items flex-start

</style>
