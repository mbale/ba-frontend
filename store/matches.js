const MUTATIONS = {
  UPDATE_LIST: 'update_list'
}

export const mutations = {
  [MUTATIONS.UPDATE_LIST] (state, payload) {
    state.matches = state.matches.concat(payload.matches)
  }
}

export const state = () => ({
  matches: []
})

export const actions = {
  async fetch ({ commit }) {
    const matches = await this.$axios.$get('v1/matches')
    commit(MUTATIONS.UPDATE_LIST, {
      matches
    })
  }
}
