const MUTATIONS = {
  UPDATE_LIST: 'update_list',
  UPDATE_COUNT: 'update_count'
}

export const mutations = {
  [MUTATIONS.UPDATE_LIST] (state, payload) {
    state.list = payload.matches
  },
  [MUTATIONS.UPDATE_COUNT] (state, payload) {
    state.count = payload.count
  }
}

export const state = () => ({
  list: [],
  count: null
})

export const actions = {
  async fetch ({ commit }) {
    const { data: matches, headers } = await this.$axios.get('v1/matches')
    commit(MUTATIONS.UPDATE_COUNT, {
      count: headers.count
    })
    commit(MUTATIONS.UPDATE_LIST, {
      matches
    })
  },
  async fetchByPage ({ commit }, { pageNumber }) {
    const matches = await this.$axios.$get('v1/matches', {
      params: {
        page: pageNumber
      }
    })

    commit(MUTATIONS.UPDATE_LIST, {
      matches
    })
  }
}
