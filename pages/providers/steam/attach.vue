<template>
  <div></div>
</template>

<script>
import * as openid from 'openid'

export default {
  name: 'SteamProviderAttach',
  async fetch ({ redirect, query, store }) {
    const claimedId = query['openid.claimed_id']
    const FRONTEND_URL = process.env.FRONTEND_URL

    if (claimedId) {
      console.log('here')
      const steamId = claimedId.substr(claimedId.lastIndexOf('/') + 1)
      await store.dispatch('user/attachSteamProvider', { steamId })

      if (process.client) {
        window.location.replace(`${FRONTEND_URL}/settings`)
      } else {
        return redirect(`${FRONTEND_URL}/settings`)
      }
    } else {
      const authURL = await new Promise((resolve, reject) => {
        const client = new openid.RelyingParty(
          `${FRONTEND_URL}/providers/steam/attach`,
          null,
          true, // stateless
          false
        )

        client.authenticate('http://steamcommunity.com/openid', false, (error, authURL) => {
          if (error) {
            return reject(error)
          }

          if (authURL) {
            return resolve(authURL)
          }
        })
      })

      if (process.client) {
        window.location.replace(authURL)
      } else {
        return redirect(authURL)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
