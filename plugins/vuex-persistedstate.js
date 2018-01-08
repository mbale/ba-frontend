import PersistedState from 'vuex-persistedstate'

export default ({store, isHMR, isServer}) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  if (isHMR) return

  window.onNuxtReady((nuxt) => {
    PersistedState({
      key: 'accessToken',
      paths: ['auth.accessToken']
    })(store) // vuex plugins can be connected to store, even after creation

    // store.dispatch('auth/getProfile')
  })
}
