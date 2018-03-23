<template>
  <div class="rankings">
    <div class="toolbar">
      
    </div>
    <div class=""></div>
  </div>
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'

// const { mapState, mapActions } = createNamespacedHelpers('rankings')

export default {
  name: 'Ranking',
  async asyncData ({ store }) {
    await store.dispatch('rankings/fetch')
  }
}
</script>

<style lang="stylus" scoped>

</style>
