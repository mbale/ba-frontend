<template>
  <div class="dropdown">
    <slot class="dropdown__item" name="item"></slot>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Dropdown'
})
</script>

<style lang="stylus">

.dropdown
  display flex
  position relative

  &__item
    display flex

</style>
