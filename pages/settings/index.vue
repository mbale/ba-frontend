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

      <!-- STATUS -->
      <message-box v-show="profileChangeError === 409" class="message-box--error">
        <h4>
          [ERR CODE: {{ profileChangeError }}] Sorry, your entered data may conflict with others.
        </h4>
      </message-box>
      <!-- ERROR -->
      <message-box v-show="this.profileChangesError" class="message-box--error">
        <h4>
          [ERROR CODE: {{ profileChangesError }}] We're sorry, something went wrong. Please try again.
        </h4>
      </message-box>
      <!-- SUCCESS -->
      <message-box v-show="this.profileChangeSuccess" class="message-box--success">
        <h4>
          Congratulations! You have succesfully changed your settings.
        </h4>
      </message-box>
      <!-- PROGRESS -->
      <message-box v-show="this.profileChangeInProgress" class="message-box--progress">
        <h4>
          Changing data is in progress. An Info Box will appear as soon as data is changed.
        </h4>
      </message-box>

      <div class="form--horizontal">
        <!-- INPUTS -->

        <!-- USERNAME -->
        <div class="form-field">
          <label class="form-label" for="username">Username</label>
          <div class="form-input">
            <text-input
              v-model="account.username"
              placeholder="Your Username"
              :validation="{ required: true, min: 4, alpha_num: true }" />
            <span class="input-desc-text">https://betacle.com/users/{{ account.username }}</span>
          </div>
        </div>

        <!-- EMAIL -->
        <div class="form-field">
          <label class="form-label" for="email">Email</label>
          <div class="form-input">
            <text-input
              v-model="account.email"
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
            <croppa v-model="myCroppa"
                    :width="160"
                    :height="160"
                    placeholder="Choose an image"
                    :placeholder-font-size="14"
                    :disabled="false"
                    :disable-drag-to-move="false"
                    :prevent-white-space="true"
                    :show-remove-button="!isDefaultAvatar"
                    :file-size-limit="300 * 1024"
                    :remove-button-size="20"
                    accept=".jpeg,.jpg,.png"
                    @draw="onAvatarChange"
                    @image-remove="onAvatarChange(null, true)"
                    :initial-image="account.avatar"
                    >
            </croppa>

            <div class="info">
              <div class="buttons">
                <input id="image" @change="onAvatarChange" type="file">
                <a
                  class="upload-btn"
                  @click="uploadPhoto"
                >
                  Upload Avatar
                </a>
                <a class="delete-btn" v-show="!isDefaultAvatar" @click="onAvatarChange(null, true)">Delete Photo</a>
              </div>
              <span>Max 3mb GIF, JPG or PNG.</span>
            </div>
          </div>
        </div>

        <!-- BUTTON SAVE CHANGES -->
        <div class="form-field form-field--actions">
          <button class="form-btn button--primary"
          v-bind:class="{'form-btn--disabled': !canUpdateProfile }"
          v-show="!profileChangeInProgress"
          @click="updateProfile">
            Save Changes
          </button>
          <button class="form-btn form-btn--disabled" v-show="profileChangeInProgress">
            <icon name="spinner" pulse></icon>
          </button>
        </div>
      </div>

      <div class="connections">
        <h2 class="content-title">Connections</h2>
        <!-- STEAM -->
        <div class="auth-connect" v-if="!hasSteamProvider">
          <nuxt-link class="auth-connect__button auth-connect__button--steam" :to="{ path: '/providers/steam/auth' }" append>
            <icon class="auth-connect__button__icon" name="steam-square" scale="1.2" />
            <span>Connect with Steam</span>
          </nuxt-link>
        </div>
        <div class="auth-connect" v-else>
          you already attached
        </div>
      </div>
    </div>

    <!-- SECURITY TAB -->
    <div v-show="currentTab === 1" class="security content-tab">
      <h2 class="content-title">Security</h2>

      <!-- STATUS -->
      <message-box v-show="profileChangeError === 409" class="message-box--error">
        <h4>
          [ERR CODE: {{ profileChangeError }}] Sorry, your entered data may conflict with others.
        </h4>
      </message-box>
      <!-- ERROR -->
      <message-box v-show="this.profileChangesError" class="message-box--error">
        <h4>
          [ERROR CODE: {{ profileChangesError }}] We're sorry, something went wrong. Please try again.
        </h4>
      </message-box>
      <!-- SUCCESS -->
      <message-box v-show="this.profileChangeSuccess" class="message-box--success">
        <h4>
          You've edited your profile
        </h4>
      </message-box>
      <!-- PROGRESS -->
      <message-box v-show="this.profileChangeInProgress" class="message-box--progress">
        <h4>
          We're saving your data
        </h4>
      </message-box>

      <div class="form--horizontal">

        <!-- PASSWORD -->
        <div class="form-field">
          <label class="form-label" for="password">Password</label>
          <div class="form-input">
            <text-input ref="firstPassword"
              v-model="password.first"
              placeholder="Your new password"
              type="password"
              :validation="{ required: true, min: 6, max: 16 }" />
            <span class="input-desc-text">Just type in your new password.</span>
          </div>
        </div>

        <!-- CONFIRM PASSWORD -->
        <div class="form-field">
          <label class="form-label" for="confirmpassword">Confirm Password</label>
          <div class="form-input">
            <text-input ref="secondPassword"
              v-model="password.second"
              placeholder="Confirm new password"
              type="password"
              :validation="{ required: true, min: 6, max: 16 }" />
            <span class="input-desc-text">Write it again to confirm it matches.</span>
          </div>
        </div>

        <!-- BUTTON CHANGE PASSWORD -->
        <div class="form-field form-field--actions">
          <button class="form-btn button--primary"
            v-bind:class="{'form-btn--disabled': !this.password.first || !this.password.second }"
            v-show="!profileChangeInProgress"
            @click="updatePassword"
          >
            Change Password
          </button>
          <button class="form-btn form-btn--disabled" v-show="profileChangeInProgress">
            <icon name="spinner" pulse></icon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { createNamespacedHelpers } from 'vuex'
import MessageBox from '~/components/common/message-box'
import { Tabs, Tab } from '~/components/common/tabs'
import TextInput from '~/components/common/form/text'
import dateMixin from '~/mixins/date'

const { mapGetters, mapMutations, mapState, mapActions } = createNamespacedHelpers('user')

export default Vue.extend({
  name: 'Settings',
  middleware: ['check-auth'],
  mixins: [dateMixin],
  data () {
    return {
      // contains default user data from server
      // then it's the model of changes
      account: {
        username: null,
        email: null,
        avatar: null
      },
      password: {
        first: '',
        second: ''
      },
      // providersRedirectURLs: {
      //   steam: `response_type=code&scope=openid&client_id&`
      // },
      confirmpassword: '',
      passwordsMatch: null,
      successMessage: '',
      currentTab: 0,
      tabs: {
        first: 'Account',
        second: 'Security'
      },
      myCroppa: {}
    }
  },
  components: {
    TextInput,
    Tabs,
    Tab,
    MessageBox
  },
  computed: {
    ...mapGetters({
      isDefaultAvatar: 'defaultAvatar',
      userChangedProfile: 'userChangedProfile',
      avatarURLInStore: 'avatarURL',
      hasSteamProvider: 'hasSteamProvider'
    }),
    ...mapState({
      profileChanges: 'profileChanges',
      profileChangeError: 'profileChangeError',
      profileChangeSuccess: 'profileChangeSuccess',
      profileChangeInProgress: 'profileChangeInProgress',
      profileChangesError: 'profileChangesError',
      userProfile: 'profile'
    }),
    avatarURL () {
      return this.account.avatar !== '' ? this.account.avatar : this.avatarURLInStore
    },
    // check if user really changed something to make button available to send
    canUpdateProfile () {
      const fields = this.account

      // if he wants to revert the changes to original
      // or did he upload image
      if (this.userChangedProfile) {
        return true
      }

      return Object.keys(fields)
        .filter(field => fields[field] && this.userProfile[field] !== fields[field])
        .length > 0
    }
  },
  methods: {
    ...mapMutations({
      updateAccountDetails: 'update_account_details'
    }),
    ...mapActions({
      editProfile: 'editProfile',
      removeAvatar: 'removeAvatar'
    }),
    uploadCroppedImage () {
      this.myCroppa.generateBlob((blob) => {
        return this.myCroppa.chooseFile()
      })
    },
    uploadPhoto () {
      this.myCroppa.chooseFile()
    },
    // when he selected new avatar
    async onAvatarChange (canvas, remove) {
      // to show
      if (!remove) {
        const base64 = this.myCroppa.generateDataUrl()
        this.account.avatar = base64

        // to send to backend
        const blob = await this.myCroppa.promisedBlob()

        if (blob) {
          this.updateAccountDetails({ field: 'avatar', value: blob })
        }
      } else {
        await this.removeAvatar()
      }
    },
    // send updated fields to store and save it
    async updateProfile () {
      // needs it if he clicks on it anyway
      if (this.canUpdateProfile) {
        const fields = this.account

        Object.keys(fields).forEach(field => {
          const value = fields[field]

          if (field !== 'avatar' && field) {
            this.updateAccountDetails({ field, value })
          }
        })

        if (this.userChangedProfile) {
          await this.editProfile()
        }
      }
    },
    async updatePassword () {
      if (this.password.first && this.password.second) {
        this.updateAccountDetails({ field: 'password', value: this.password.first })
        await this.editProfile()
      }
    }
  },
  async asyncData ({ store, $axios }) {
    await store.dispatch('user/getProfile')

    // return the original user data
    return {
      account: {
        username: store.state.user.profile.username,
        email: store.state.user.profile.email,
        avatar: store.getters['user/avatarURL']
      }
    }
  }
})
</script>

<style lang="stylus" scoped>

.settings-container
    max-width: 1440px
    width: 100%
    margin-top: 20px
    margin-bottom: 30px
    display: flex
    flex-direction: row
    padding: 0 15px
    +below(3)
      flex-direction: column

    .tabs
        flex-direction: column
        flex-basis: 15%
        max-width: 200px
        min-width: 125px
        height: fit-content
        background-color: white
        +below(3)
          max-width: none
          min-width: none
          flex-direction: row
          margin-right: 0
          align-self: center

        .tab
            border-left: 3px solid transparent
            padding-left: 25px
            +below(3)
              border-left: none

            &--active
                border-bottom: none
                border-color: $purple
                +below(3)
                  border-bottom: 3px solid $purple

    .content-tab
        flex-basis: 85%
        background-color: white
        padding: 20px
        height: fit-content
        +below(3)
          margin-top: 20px

        &.account
          margin-left: 20px
          +below(3)
            margin-left: 0

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
            margin-left: 142px
            width: fit-content
            +below(3)
              margin-left: 0

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
                min-width: 140px

            .form-input
                flex: 7
                +below(3)
                  flex: unset

                &--avatar
                    display: flex
                    flex-direction: row
                    +below(3)
                      flex-direction: column-reverse

                    img
                        width: 64px
                        height: 64px
                        border-radius: 1px

                    .buttons
                        display: flex
                        flex-direction: row

                        input#image
                          display: none

                        a
                            border-radius: 2px
                            padding: 6px 15px
                            font-size: 14px
                            height: fit-content
                            color: white
                            margin-left: 15px
                            cursor: pointer

                            &:nth-child(2)
                                margin-left: 10px
                                +below(3)
                                  margin-left: 0

                            &.upload-btn
                                background-color: $purple

                            &.delete-btn
                                background-color: $red

                    .info
                      +below(3)
                        margin: 15px 0

                      span
                        display: block
                        margin: 10px 0 0 15px
                        font-size: 13px
                        +below(3)
                          margin-left: 0

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
