<template>
  <div></div>
</template>

<script>
import * as openid from 'openid'

export default {
  name: 'SteamProviderAttach',
  async fetch ({ redirect }) {
    const FRONTEND_URL = process.env.FRONTEND_URL

    const authURL = await new Promise((resolve, reject) => {
      const client = new openid.RelyingParty(
        `${FRONTEND_URL}/providers/steam/redirect`,
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
</script>

<style lang="stylus" scoped>

</style>
