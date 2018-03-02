const MUTATIONS = {
  SET_DATA: 'set_data',
  RESET_DATA: 'reset_data'
}

export const state = () => ({
  profile: null,
  predictions: null
})

export const mutations = {
  [MUTATIONS.SET_DATA] (state, { profile, predictions }) {
    state.profile = profile
    state.predictions = predictions
  },
  [MUTATIONS.RESET_DATA] (state) {
    state.profile = null
    state.predictions = null
  }
}

export const actions = {
  async getProfile (context) {
    try {
      const {
        profile,
        predictions
      } = await this.$axios.$get('v1/users/me')

      context.commit('user/set_data', {
        profile,
        predictions
      }, { root: true })
    } catch (error) {
      await context.dispatch('auth/updateToken', {}, {
        root: true
      })
    }
  },
  async uploadAvatar (context) {

  }
}
