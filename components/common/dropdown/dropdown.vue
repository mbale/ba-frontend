<template>
  <div class="dropdown" v-on-clickaway="closeMenu">
    <slot />
    <div class="dropdown-content" v-if="showDropdown">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  name: 'Dropdown',
  mixins: [ clickaway ],
  data () {
    return {
      showDropdown: false
    }
  },
  created () {
    this.$on('toggleMenu', this.toggleMenu)
  },
  methods: {
    toggleMenu () {
      this.showDropdown = !this.showDropdown
    },
    closeMenu () {
      this.showDropdown = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.dropdown
  position: relative

.dropdown-content
  position absolute
  top 100%
  min-width 100%
  right 0
  z-index 10
</style>
