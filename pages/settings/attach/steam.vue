<template>
  <div></div>
</template>

<script>
import * as openid from 'openid'

export default {
  name: 'SteamProviderAttach',
  async asyncData ({ redirect }) {
    const authURL = await new Promise((resolve, reject) => {
      const client = new openid.RelyingParty(
        'http://localhost:3010/auth/steam/redirect',
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

    return redirect(authURL)
  }
}
</script>

<style lang="stylus" scoped>

</style>
