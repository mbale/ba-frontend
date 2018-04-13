<template>
  <div></div>
</template>

<script>
export default {
  name: 'SteamProviderRedirect',
  async fetch ({ query, store, redirect }) {
    const claimedId = query['openid.claimed_id']
    const FRONTEND_URL = process.env.FRONTEND_URL

    if (claimedId) {
      const steamId = claimedId.substr(claimedId.lastIndexOf('/') + 1)
      await store.dispatch('user/attachSteamProvider', { steamId })

      const redirectToURL = `${FRONTEND_URL}/settings`

      if (process.client) {
        window.location.replace(redirectToURL)
      } else {
        return redirect(redirectToURL)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
