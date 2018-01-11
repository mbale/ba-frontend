<template>
  <div class="auth-block">
    <div class="auth-block__button auth-block__button--login" @click="openModal('login')">Log in</div>
  </div>
</template>

<script>
import Vue from 'vue'
import 'vue-awesome/icons/eye'
import 'vue-awesome/icons/eye-slash'
import 'vue-awesome/icons/steam-square'
import 'vue-awesome/icons/spinner'

import Icon from 'vue-awesome/components/Icon'

export default Vue.extend({
  name: 'AuthBlock',
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.user
    },
    loginError () {
      return this.$store.state.auth.loginError || {}
    }
  },
  data () {
    return {
      modalStates: {
        login: false,
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
        this.$store.commit('auth/in_process', {
          state: true
        })

        await this.$store.dispatch('auth/basic', {
          username: this.form.username,
          password: this.form.password
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

  &__button
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

    &--login
      margin-bottom 10px

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
    margin-bottom 5px

    &--disabled
      cursor default
      background-color #D2D7D3

    &--signup
      border-radius 2px
      font-size 15px
      user-select none
      font-weight 700
      cursor pointer
      background-color transparent
      border 1px solid #2d3088
      color #2d3088
      padding 8px 12px
      margin 0

  .steam-auth-container
    display flex
    padding 5px
    margin-top 10px
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
