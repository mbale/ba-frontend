<template>
  <div class="reset-password-container">
    <panel title="Set up your password" sub-title="for your account">
      <text-input
        name="password"
        class="password-input"
        ref="password-input-one"
        slot="body"
        v-model="passwordOne"
        placeholder="your new password"
        type="password"
        :validation="{ required: true, min: 6, alpha_num: true }"
        name-as="password" />
      <!-- Password again -->
      <text-input
        name="password-confirmation"
        class="password-input"
        ref="password-input-two"
        slot="body"
        v-model="passwordTwo"
        placeholder="your password again"
        type="password"
        :validation="{ required: true, is: passwordOne }"
        name-as="password" />
      <div slot="body" class="state-container" v-if="resetActionResult.success || resetActionResult.errorCode">
      <span class="state state--success" v-if="resetActionResult.success">
        You've successfully changed your password
      </span>
      <span class="state state--not-found" v-if="resetActionResult.errorCode">
        Your token seems used
      </span>
    </div>
      <btn slot="footer" :type="buttonType" @click="sendRequest"></btn>
    </panel>
  </div>
</template>

<script>
import Vue from 'vue'
import Panel from '~/components/common/layout/panel'
import TextInput from '~/components/common/form/text'
import Btn from '~/components/common/form/button'
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapGetters } = createNamespacedHelpers('account-reset')

export default Vue.extend({
  name: 'ResetPassword',
  components: {
    Panel,
    TextInput,
    Btn
  },
  data () {
    return {
      buttonType: 'disabled',
      passwordOne: '',
      passwordTwo: ''
    }
  },
  computed: {
    ...mapGetters({
      resetActionResult: 'result'
    }),
    isFormValid () {
      if (!this.passwordOne.length > 0 || !this.passwordTwo.length > 0) {
        return false
      }

      const isPwOneOk = this.$refs['password-input-one'].$validator.errors.items.length === 0
      const isPwTwoOk = this.$refs['password-input-two'].$validator.errors.items.length === 0

      if (isPwOneOk && isPwTwoOk) {
        return true
      }

      return false
    }
  },
  watch: {
    isFormValid (value) {
      if (value) {
        this.buttonType = 'primary'
      } else {
        this.buttonType = 'disabled'
      }
    }
  },
  methods: {
    ...mapActions([
      'sendPasswordChangeRequest'
    ]),
    async sendRequest () {
      if (this.isFormValid) {
        const { token } = this.$route.params
        const password = this.passwordOne
        await this.sendPasswordChangeRequest({ token, password })
      }
    }
  },
  async asyncData ({ route, redirect }) {
    const { params: { token } } = route

    if (!token) {
      return redirect('/')
    }
  }
})
</script>

<style lang="stylus" scoped>
.reset-password-container
  .password-input:first-child
    margin-bottom 12px

  .state-container
    padding-top 14px
</style>
