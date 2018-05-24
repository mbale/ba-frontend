<template>
  <panel title="Recover your account" sub-title="to get back your access">
    <text-input
      ref="email-input"
      slot="body"
      v-model="email"
      placeholder="Your email address"
      type="email"
      :validation="'required|email'" />
    <div slot="body" class="state-container" v-if="recoveryActionResult.success || recoveryActionResult.errorCode">
      <span class="state state--success" v-if="recoveryActionResult.success">
        We've sent you a message to get back your access to your @Betacle account
      </span>
      <span class="state state--not-found" v-if="recoveryActionResult.errorCode">
        Sorry, we have no any account associated with that email address. You may contact us at contact@betacle.com
      </span>
    </div>
    <btn slot="footer" :type="buttonType" @click="sendRequest"></btn>
  </panel>
</template>

<script>
import TextInput from '~/components/common/form/text'
import Panel from '~/components/common/layout/panel'
import Btn from '~/components/common/form/button'
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapGetters } = createNamespacedHelpers('account-recovery')

export default {
  name: 'RecoverAccount',
  data () {
    return {
      email: '',
      isFormValid: false,
      buttonType: 'disabled'
    }
  },
  components: {
    TextInput,
    Panel,
    Btn
  },
  watch: {
    // we can't do it with computed
    // computed won't see dom element in a few tick which we can fix
    // but in the end validator is still promise (which vue doesn't support for computed)
    async email () {
      const isFormValid = await this.$refs['email-input'].$validator.validate()
      this.isFormValid = isFormValid

      if (isFormValid) {
        this.buttonType = 'primary'
      }
    }
  },
  computed: {
    ...mapGetters({
      recoveryActionResult: 'result'
    })
  },
  methods: {
    ...mapActions([
      'sendRecoverRequest'
    ]),
    async sendRequest () {
      if (this.isFormValid) {
        const email = this.email
        await this.sendRecoverRequest({ email })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.state-container
  padding-top 14px
</style>
