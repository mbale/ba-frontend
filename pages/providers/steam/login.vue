<template>
  <div></div>
</template>

<script>
import * as openid from 'openid'

export default {
  name: 'SteamProviderLogin',
  async fetch ({ redirect, query, store }) {
    const claimedId = query['openid.claimed_id']
    const FRONTEND_URL = process.env.FRONTEND_URL

    console.log('ENMOSTLEFUTOK')

    if (claimedId) {
      const steamId = claimedId.substr(claimedId.lastIndexOf('/') + 1)
      await store.dispatch('auth/steam', { steamId })

      if (process.client) {
        window.location.replace(`${FRONTEND_URL}/matches`)
      } else {
        return redirect(`${FRONTEND_URL}/matches`)
      }
    } else {
      const authURL = await new Promise((resolve, reject) => {
        const client = new openid.RelyingParty(
          `${FRONTEND_URL}/providers/steam/login`,
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
