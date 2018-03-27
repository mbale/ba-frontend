<template>
  <div class="settings-container">
    <tabs>
      <tab
      v-for="(tab, key, index) in tabs"
      :key="key"
      :class="{'tab--active': currentTab === index}"
      ref="upcoming"
      @click.native="currentTab = index"
      > {{ tab }} </tab>
    </tabs>

    <!-- ACCOUNT TAB -->
    <div v-show="currentTab === 0" class="account content-tab">
      <h2 class="content-title">Account</h2>

      <div class="form--horizontal">
        <!-- INPUTS -->

        <!-- USERNAME -->
        <div class="form-field">
          <label class="form-label" for="username">Username</label>
          <div class="form-input">
            <text-input
              v-model="username"
              placeholder="Your Username"
              :validation="{ required: true, min: 4, alpha: true }" />
            <span class="input-desc-text">https://esportsinsights.com/users/{{username}}</span>
          </div>
        </div>

        <!-- EMAIL -->
        <div class="form-field">
          <label class="form-label" for="email">Email</label>
          <div class="form-input">
            <text-input
              v-model="email"
              placeholder="Your Email"
              type="email"
              :validation="'required|email'" />
            <span class="input-desc-text">Your email is not publicly displayed.</span>
          </div>
        </div>

        <!-- PROFILE PICTURE -->
        <div class="form-field">
          <label class="form-label" for="email">Profile Picture</label>
          <div class="form-input form-input--avatar">
            <img class="avatar img-responsive" v-bind:src="noAvatarImage">

            <div class="info">
              <div class="buttons">
                <a class="upload-btn">Upload Photo</a>
                <a class="delete-btn">Delete Photo</a>
              </div>
              <span>Max 3mb GIF, JPG or PNG.</span>
            </div>
          </div>
        </div>

        <!-- BUTTON SAVE CHANGES -->
        <div class="form-field form-field--actions">
          <button class="form-btn button--primary"  v-show="!isChangeInProgress('usernameEmail')" v-bind:class="{'form-btn--disabled': isChangeDisabled('usernameEmail')}" @click="change('usernameEmail')">
            Save Changes
          </button>
          <button class="form-btn form-btn--disabled" v-show="isChangeInProgress('usernameEmail')">
            <icon name="spinner" pulse></icon>
          </button>
        </div>
      </div>

      <div class="connections">
        <h2 class="content-title">Connections</h2>
        <!-- STEAM -->
        <div class="auth-connect">
          <nuxt-link class="auth-connect__button auth-connect__button--steam" :to="{ path: 'auth/steam' }">
            <icon class="auth-connect__button__icon" name="steam-square" scale="1.2" />
            <span>Connect with Steam</span>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- SECURITY TAB -->
    <div v-show="currentTab === 1" class="security content-tab">
      <h2 class="content-title">Security</h2>

      <div class="form--horizontal">

        <!-- PASSWORD -->
        <div class="form-field">
          <label class="form-label" for="password">Password</label>
          <div class="form-input">
            <text-input
              v-model="password"
              placeholder="Your new password"
              type="password"
              :validation="'required|password'" />
            <span class="input-desc-text">Just type in your new password.</span>
          </div>
        </div>

        <!-- CONFIRM PASSWORD -->
        <div class="form-field">
          <label class="form-label" for="confirmpassword">Confirm Password</label>
          <div class="form-input">
            <text-input
              v-model="confirmpassword"
              placeholder="Confirm new password"
              type="password"
              :validation="'required|password'" />
            <span class="input-desc-text">Write it again to confirm it matches.</span>
          </div>
        </div>

        <!-- BUTTON CHANGE PASSWORD -->
        <div class="form-field form-field--actions">
          <button class="form-btn button--primary"  v-show="!isChangeInProgress('password')" v-bind:class="{'form-btn--disabled': isChangeDisabled('password')}" @click="change('password')">
            Change Password
          </button>
          <button class="form-btn form-btn--disabled" v-show="isChangeInProgress('password')">
            <icon name="spinner" pulse></icon>
          </button>
        </div>

        <!-- ERRORS -->
        <div class="form-errors">
          <span v-if="changeError('password').response">
            Sorry, it was not possible to change your password. Try again later.
          </span>
          <span v-else-if="changeError('password').request">
            We're experiencing technical difficulties.
          </span>
          <span v-else-if="changeError('password').message">
            You're not connected to the network
          </span>
          <span v-else-if="this.passwordsMatch === false">
            Both passwords should match!
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabs, Tab } from '~/components/common/tabs'
import TextInput from '~/components/common/form/text'

import dateMixin from '~/mixins/date'
import noAvatarImage from '~/assets/images/no_avatar.png'

export default Vue.extend({
  name: 'Profile',
  middleware: ['check-auth'],
  mixins: [dateMixin],
  data () {
    return {
      email: '',
      username: '',
      password: '',
      confirmpassword: '',
      passwordsMatch: null,
      currentTab: 0,
      tabs: {
        first: 'Account',
        second: 'Security'
      },
      noAvatarImage
    }
  },
  components: {
    TextInput,
    Tabs,
    Tab
  },
  computed: {

  },
  methods: {
    isChangeInProgress (thing) {
      if (thing === 'password') { // PASSWORD
        return this.$store.state.user.changePasswordInProgress
      } else if (thing === 'username') { // USERNAME
        return this.$store.state.user.changeUsernameInProgress
      } else if (thing === 'email') { // EMAIL
        return this.$store.state.user.changeEmailInProgress
      } else if (thing === 'usernameEmail') {
        return this.$store.state.user.changeUsernameEmailInProgress
      }
    },
    isChangeDisabled (thing) {
      if (this.errors.any()) {
        if (thing === 'password' && (this.password === '' || this.confirmpassword === '')) { // PASSWORD
          return true
        } else if (thing === 'username' && this.username === '') { // USERNAME
          return true
        } else if (thing === 'email' && this.email === '') { // EMAIL
          return true
        }
      }
      return false
    },
    changeError (thing) {
      if (thing === 'password') { // PASSWORD
        return this.$store.state.user.changePasswordError || {}
      } else if (thing === 'username') { // USERNAME
        return this.$store.state.user.changeUsernameError || {}
      } else if (thing === 'email') { // EMAIL
        return this.$store.state.user.changeEmailError || {}
      }
    },

    async change (thing) {
      // CHANGING PASSWORD
      if (thing === 'password') {
        if (this.password !== '' && this.confirmpassword !== '' && this.password === this.confirmpassword) {
          this.passwordsMatch = true

          // if passwords match, change the password
          await this.$store.dispatch('user/changePassword', {
            password: this.password
          })

          // resetting passwords value
          this.password = null
          this.confirmpassword = null
        } else {
          this.passwordsMatch = false
        }

      // CHANGING USERNAME AND EMAIL
      } else if (thing === 'usernameEmail') {
        if (this.username !== '' && this.email !== '') {
          await this.$store.dispatch('user/changeUsername', {
            username: this.username
          })

          await this.$store.dispatch('user/changeEmail', {
            email: this.email
          })

          // resetting username AND email value
          this.username = null
          this.email = null
        }
      }
    }
  }
  // async asyncData (context) {
  //   if (!context.store.state.user.profile) {
  //     context.redirect('/')
  //   }
  // }
})
</script>

<style lang="stylus">

.settings-container
    max-width: 1440px
    width: 100%
    margin-top: 20px
    display: flex
    flex-direction: row

    .tabs
        flex-direction: column
        flex-basis: 15%
        max-width: 200px
        height: fit-content
        background-color: white

        .tab
            border-left: 3px solid transparent
            padding-left: 25px

            &--active
                border-bottom: none
                border-color: $purple

    .content-tab
        flex-basis: 85%
        background-color: white
        padding: 20px
        height: fit-content

        .content-title
            border-bottom: 1px solid #efefef
            font-size: 16px
            font-weight: 600
            padding-bottom: 15px
            margin-bottom: 20px

        .auth-connect__button--steam
            width: auto
            text-transform: uppercase
            font-size: 12px
            font-weight: 400
            border-radius: 4px
            padding: 0 20px

        .form-btn
            font-weight: 500
            padding: 13px 35px
            border-radius: 4px
            outline: none
            margin-left: 150px
            width: fit-content

        .form-field
            display: flex
            flex-direction: row
            flex-wrap: wrap
            margin-top: 25px
            margin-bottom: 40px

            .form-label
                font-family: $font-opensans
                font-size: 14px
                color: $lgray
                font-weight: normal

            .form-input
                flex: 7

                &--avatar
                    display: flex
                    flex-direction: row

                    img
                        width: 64px
                        height: 64px
                        border-radius: 1px

                    .buttons
                        display: flex
                        flex-direction: row

                        a
                            border-radius: 2px
                            padding: 6px 15px
                            font-size: 14px
                            height: fit-content
                            color: white
                            margin-left: 15px

                            &:nth-child(2)
                                margin-left: 10px

                            &.upload-btn
                                background-color: $purple

                            &.delete-btn
                                background-color: $red

                    .info span
                        display: block
                        margin: 10px 0 0 15px
                        font-size: 13px

                .input-text
                    max-width: 450px

                span.input-desc-text
                    font-size: 13px
                    color: $lgray
                    display: block
                    margin-top: 5px

        .connections
            margin-top: 90px


</style>
