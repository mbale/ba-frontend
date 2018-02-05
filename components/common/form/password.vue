<template>
  <div class="input-container" v-bind:class="{'input-container--has-errors': errors.has('password')}">
    <input
      class="input-text"
      type="password"
      :placeholder="placeholder"
      :value='value'
      @input='onInput'
      v-validate="{ required: true, min: 6, regex: /^[a-zA-Z0-9_]+$/ }"
      ref="password">
    <div class="input-container__icon input-container__icon--right input-container__icon--button">
      <icon :name="iconType" scale="1.2" v-on:click.native="togglePasswordInputType" />
    </div>
    <div class="input-container__errors" v-show="errors.has('password')">
      {{ errors.first('password') }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'PasswordInput',
  props: {
    value: {
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      iconType: 'eye'
    }
  },
  methods: {
    togglePasswordInputType () {
      const passwordInput = this.$refs['password']
      this.iconType = passwordInput.type === 'text' ? 'eye' : 'eye-slash'
      passwordInput.type = passwordInput.type === 'text' ? 'password' : 'text'
    },
    onInput (event) {
      this.updateValue(event.target.value)
    },
    updateValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
