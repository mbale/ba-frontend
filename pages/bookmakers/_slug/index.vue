<template>
  <div>

  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Bookmaker',
  async asyncData ({ store, params }) {
    const slug = params.slug

    await store.dispatch('bookmakers/getBySlug', {
      slug
    })
  }
})
</script>

<style>

</style>
