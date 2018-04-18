<template>
  <button class="dropdown-button" @click="toggleMenu()">
    <slot />
  </button>
</template>

<script>

export default {
  name: 'DropdownButton',
  methods: {
    toggleMenu () {
      this.$parent.$emit('toggleMenu')
    }
  }
}
</script>

<style lang="stylus">
  .dropdown-button
    user-select none
    cursor pointer
    border 0
    background transparent
</style>
