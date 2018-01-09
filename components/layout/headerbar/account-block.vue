<template>
  <div class="account-block" @click="toggleMenu">
    <span class="account-block__username">{{ user.profile.username }}</span>
    <div class="account-block__icon">
      <icon name="chevron-down"></icon>
    </div>
    <dropdown v-show="menuState">
      <span slot="item">Account Settings</span>
    </dropdown>
  </div>
</template>

<script>
import Vue from 'vue'
import Dropdown from '~/components/common/dropdown'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/chevron-down'

export default Vue.extend({
  name: 'AccountBlock',
  components: {
    Icon,
    Dropdown
  },
  data () {
    return {
      menuState: false
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    toggleMenu () {
      this.menuState = !this.menuState
    }
  }
})
</script>

<style lang="stylus">

.account-block
  display flex  
  color white

  &__username
    display inline-flex
    flex-direction column
    justify-content center
    margin 6px

  &__icon
    display inline-flex
    flex-direction column
    justify-content center
    margin 6px


</style>
