const MUTATIONS = {
  UPDATE_LIST: 'update_list',
  UPDATE_COUNT: 'update_count',
  SET_MATCH: 'set_match'
}

export const mutations = {
  [MUTATIONS.UPDATE_LIST] (state, payload) {
    state.list = payload.matches
  },
  [MUTATIONS.UPDATE_COUNT] (state, payload) {
    state.count = payload.count
  },
  [MUTATIONS.SET_MATCH] (state, payload) {
    state.match = payload.match
  }
}

export const state = () => ({
  list: [],
  count: null,
  match: null
})

export const actions = {
  async fetch ({ commit }, { limit = 20 }) {
    const { data: matches, headers } = await this.$axios.get('v1/matches', {
      params: {
        limit,
        statusType: 'upcoming'
      }
    })

    commit(MUTATIONS.UPDATE_COUNT, {
      count: headers.count
    })
    commit(MUTATIONS.UPDATE_LIST, {
      matches
    })
  },
  async fetchByPage ({ commit }, { pageNumber, limit = 20 }) {
    const matches = await this.$axios.$get('v1/matches', {
      params: {
        page: pageNumber,
        limit
      }
    })

    commit(MUTATIONS.UPDATE_LIST, {
      matches
    })
  },
  async getById ({ commit }, { matchId }) {
    const match = await this.$axios.$get(`v1/matches/${matchId}`)

    commit(MUTATIONS.SET_MATCH, { match })
  }
}
