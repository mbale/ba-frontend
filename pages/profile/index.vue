<template>
  <div>Hello {{ user.profile.username }}</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Profile',
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  },
  async asyncData (context) {
    if (!context.store.state.auth.user) {
      console.log(context.redirect('/'))
    }
  }
})
</script>

<style lang="stylus">

</style>
