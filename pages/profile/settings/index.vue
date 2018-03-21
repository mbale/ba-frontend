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

        <!-- SAVE CHANGES -->
        <button class="form-btn button--primary" @click="submitChanges">
          Save Changes
        </button>
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

      <!-- EMAIL -->
      <div class="form-field">
        <label class="form-label" for="confirmpassword">Confirm Password</label>
        <div class="form-input">
          <text-input
            v-model="confirmpassword"
            placeholder="Confirm new password"
            type="password"
            :validation="'required|password'" />
          <span class="input-desc-text">Write it again to confirm it.</span>
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
  mixins: [dateMixin],
  data () {
    return {
      email: '',
      username: '',
      password: '',
      confirmpassword: '',
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
    user () {
      return this.$store.state.user
    },
    profile () {
      return this.user.profile
    },
    username () {
      return this.profile.username
    },
    email () {
      return this.profile.email
    },
    registeredOn () {
      return this.profile.registeredOn
    },
    countryCode () {
      return this.profile.countryCode
    },
    avatarURL () {
      return this.profile.avatar || noAvatarImage
    },
    predictions () {
      return this.user.predictions
    }
  },
  methods: {
    submitChanges () {

    }
  },
  async asyncData (context) {
    if (!context.store.state.user.profile) {
      context.redirect('/')
    }
  }
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
