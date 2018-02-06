<template>
  <div class="input-container" v-bind:class="{'input-container--has-errors': errors.has('text')}">
    <input
      class="input-text"
      name="text"
      :type="type"
      :placeholder="placeholder"
      :value='value'
      :readonly='readOnly'
      @input='onInput'
      >
    <span class="input-container__errors" v-show="errors.has('text')">
      {{ errors.first('text') }}
    </span>
  </div>
</template>

<script>
import { includes } from 'lodash'

// Valid input Types
const TYPES = ['text', 'email', 'number', 'url']

export default {
  name: 'TextInput',
  props: {
    value: {
      default: null
    },
    placeholder: String,
    type: {
      type: String,
      default: 'text',
      validator: type => includes(TYPES, type)
    },
    readOnly: [Boolean, String]
  },
  methods: {
    onInput (event) {
      this.updateValue(event.target.value)
    },
    updateValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>
