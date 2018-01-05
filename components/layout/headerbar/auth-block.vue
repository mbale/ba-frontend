<template>
  <div class="auth-block">
    <div class="auth-block__button auth-block__button--login" @click="openModal('login')">Log in</div>
    <div class="auth-block__button auth-block__button--signup" @click="openModal('signup')">Sign up</div>
    <!-- MODALS -->
    <modal-box v-show="modalStates.login">
      <!-- STEAM -->
      <nuxt-link class="steam-auth-container" :to="{ path: 'auth/steam' }" slot="body">
        <icon class="icon" name="steam-square" scale="3"></icon>
        <span class="text text--steam-auth">Connect with Steam</span>
      </nuxt-link>
      <div class="separator" slot="body">
        <span class="text">OR</span>
      </div>
      <!-- BASIC -->
      <label class="label" for="username" slot="body">Username</label>
      <div class="input-container" slot="body">
        <input class="input" type="text" slot="body" placeholder="Your username" name="username" 
          v-model="form.username" v-validate="{ required: true, min: 4, regex: /^[a-zA-Z0-9_]+$/ }" ref="input--username">
        <span class="error" v-show="errors.has('username')" slot="body">
          {{ errors.first('username') }}
        </span>
      </div>
      <label class="label" for="password" slot="body">Password</label>
      <div class="input-container" slot="body">
        <input class="input input--password" type="password" placeholder="Minimum 6 characters" name="password" 
          v-model="form.password" v-validate="{ required: true, min: 4, regex: /^[a-zA-Z0-9_]+$/ }" ref="input--password">
        <icon class="icon" :name="iconState" scale="1" v-on:click.native="togglePasswordInputType"></icon>
        <span class="error" v-show="errors.has('password')" slot="body">
          {{ errors.first('password') }}
        </span>
      </div>
      <!-- BUTTON -->
      <div class="button" slot="body" v-show="!isLoginInProcess" v-bind:class="{ 'button--disabled': isLoginDisabled }" @click="submitLogin">
        Log in
      </div>
      <div class="button button--disabled" slot="body" v-show="isLoginInProcess">
        <icon name="spinner" pulse></icon>
      </div>
      <div class="separator" slot="body"></div>
      <span class="text text--footer" slot="footer">
        Don't have an account yet?
      </span>
      <div class="button button--signup" slot="footer">
        Sign up
      </div>
    </modal-box>
    <modal-box v-show="modalStates.signup"></modal-box>
  </div>
</template>

<script>
import Vue from 'vue'
import 'vue-awesome/icons/eye'
import 'vue-awesome/icons/eye-slash'
import 'vue-awesome/icons/steam-square'
import 'vue-awesome/icons/spinner'
import ModalBox from '~/components/common/modal-box'
import steamLogoURL from '~/assets/images/social/icon_steam.svg'
import Icon from 'vue-awesome/components/Icon'

export default Vue.extend({
  name: 'AuthBlock',
  components: {
    Icon,
    ModalBox
  },
  computed: {
    isLoginInProcess () {
      return this.$store.state.auth.loginInProcess
    },
    isLoginDisabled () {
      if (this.errors.any() || this.form.username === '' || this.form.password === '') {
        return true
      }
      return false
    }
  },
  data () {
    return {
      modalStates: {
        login: true,
        signup: false
      },
      form: {
        username: '',
        password: ''
      },
      steamLogoURL,
      iconState: 'eye'
    }
  },
  methods: {
    async submitLogin () {
      if (!this.errors.any()) {
        this.$store.commit('auth/in_process')
        await this.$store.dispatch('auth/basic', {
          username: this.form.username,
          password: this.form.password
        })
      }
    },
    togglePasswordInputType () {
      const passwordInput = window.document.querySelector('.input--password')

      this.iconState = passwordInput.type === 'text' ? 'eye' : 'eye-slash'
      passwordInput.type = passwordInput.type === 'text' ? 'password' : 'text'
    },
    openModal (type) {
      if (type === 'login') {
        this.modalStates.signup = false
        this.modalStates.login = true
      } else {
        this.modalStates.login = false
        this.modalStates.false = true
      }
    }
  }
})
</script>

<style lang="stylus" scoped>

.auth-block
  display flex
  flex-direction row
  justify-content flex-end
  margin-left auto

  .auth-block__button
    background transparent
    border 0
    padding 0 15px
    line-height 30px
    font-family DINPro,Helvetica,sans-serif
    font-weight 500
    font-size 14px
    text-transform uppercase
    color hsla(0,0%,100%,.66)
    cursor pointer
    user-select none

    &--signup
      background #fff
      color #408fec
      border-radius 2px
      box-shadow 0 2px 6px 2px rgba(19,98,191,.5)

.modal-box 
  .label
    font-weight 700
    margin 6px 0px
    flex 1
    width 100%

  .text
    display flex
    justify-content center
    align-items center

  .separator
    margin 2px 0px
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
      display block
      color #aaa
      letter-spacing .05em
      text-transform uppercase
      font-weight 700
      user-select none

  .input-container
    position relative
    display flex
    flex-direction column
    margin 5px 0px

    .input
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

  .error
    display flex
    justify-content flex-start
    color #ec4040
    padding-top 8px
    font-size 13px

  .text
    margin-right 5px

  .button
    display flex
    justify-content center
    align-items center
    border-radius 2px
    font-size 15px
    user-select none
    font-weight 700
    cursor pointer
    background-color #408fec
    color #fff
    border 1px solid transparent
    padding 10px 30px
    margin-top 20px
    margin-bottom 20px

  .button--disabled
    cursor default
    background-color #D2D7D3

  .button--signup
    border-radius 2px
    font-size 15px
    user-select none
    font-weight 700
    cursor pointer
    background-color transparent
    border 1px solid #2d3088
    color #2d3088
    padding 8px 12px

  .steam-auth-container
    display flex
    padding 5px
    margin 10px 0px
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
