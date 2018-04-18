<template>
  <div class="input-container" v-bind:class="{'input-container--has-errors': errors.has('text')}">
    <textarea
      class="input-textarea"
      name="text"
      :type="type"
      :placeholder="placeholder"
      :value='value'
      :readonly='readOnly'
      :cols='cols'
      :rows='rows'
      v-validate="validation"
      @input='onInput'
      ></textarea>
    <span class="input-container__errors" v-show="errors.has('text')">
      {{ errors.first('text') }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  props: {
    value: {
      default: null
    },
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    cols: Number,
    rows: Number,
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
