<template>
  <div class="content">
    <aside class="content-aside">
      <side-nav />
    </aside>
    <nuxt-child />
  </div>
</template>

<script>
import SideNav from '~/components/legal/side-nav'

export default {
  components: {
    SideNav
  }
}
</script>
