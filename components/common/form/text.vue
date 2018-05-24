<template>
  <div class="input-container" v-bind:class="{'input-container--has-errors': errors.has('text')}">
    <input
      class="input-text"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value='value'
      :readonly='readOnly'
      v-validate="validation"
      @input='onInput'
      :data-vv-as="nameAs">
    <span class="input-container__errors" v-show="errors.has(name)">
      {{ errors.first(name) }}
    </span>
  </div>
</template>

<script>
import { includes } from 'lodash'

// Valid input Types
const TYPES = ['password', 'text', 'email', 'number', 'url']

export default {
  name: 'TextInput',
  props: {
    name: {
      type: String,
      required: false,
      default: 'text'
    },
    nameAs: {
      type: String,
      required: false,
      default: 'Input'
    },
    value: {
      default: null
    },
    placeholder: String,
    type: {
      type: String,
      default: 'text',
      validator: type => includes(TYPES, type)
    },
    readOnly: [Boolean, String],
    validation: [Object, String]
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
