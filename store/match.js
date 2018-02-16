const MUTATIONS = {
  SET_DATA: 'set_data'
}

export const mutations = {
  [MUTATIONS.SET_DATA] (state, { match }) {
    state.data = match
  }
}

export const state = () => ({
  data: null
})

export const actions = {
  async getById ({ commit }, { matchId }) {
    const match = await this.$axios.$get(`v1/matches/${matchId}`)

    commit(MUTATIONS.SET_DATA, { match })
  }
}
