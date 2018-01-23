import groupBy from 'lodash/groupby'

const MUTATIONS = {
  UPDATE_LIST: 'update_list',
  SET_ACTIVE_LIST: 'set_active_list',
  SET_MATCH: 'set_match'
}

export const mutations = {
  [MUTATIONS.UPDATE_LIST] (state, payload) {
    state[payload.type].list = payload.list
    state[payload.type].count = payload.count
  },
  [MUTATIONS.SET_ACTIVE_LIST] (state, payload) {
    state.active = payload.active
  },
  [MUTATIONS.SET_MATCH] (state, payload) {
    state.match = payload.match
  }
}

export const state = () => ({
  upcoming: {
    list: [],
    count: null
  },
  completed: {
    list: [],
    count: null
  },
  active: 'completed',
  match: null
})

export const getters = {
  groupUMatchesByDay (state) {
    return groupBy(state.upcoming.list, (match) => {
      return new Date(match.date).toDateString()
    })
  },
  groupCMatchesByDay (state) {
    return groupBy(state.completed.list, (match) => {
      return new Date(match.date).toDateString()
    })
  },
  count (state) {
    return state[state.active].count
  }
}

export const actions = {
  async fetch ({ commit }, { page = 0, limit = 20, statusType = 'upcoming' }) {
    const { data: matches, headers } = await this.$axios.get('v1/matches', {
      params: {
        limit,
        page,
        statusType
      }
    })

    commit(MUTATIONS.UPDATE_LIST, {
      type: statusType,
      list: matches,
      count: headers.count
    })
  },
  async getById ({ commit }, { matchId }) {
    const match = await this.$axios.$get(`v1/matches/${matchId}`)

    commit(MUTATIONS.SET_MATCH, { match })
  }
}
