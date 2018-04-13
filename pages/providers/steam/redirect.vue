<template>
  <div></div>
</template>

<script>
export default {
  name: 'SteamProviderRedirect',
  async fetch ({ query }) {
    const claimedId = query['openid.claimed_id']

    if (claimedId) {
      console.log(claimedId)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
