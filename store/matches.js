import { groupBy } from 'lodash'

const MUTATIONS = {
  UPDATE_LIST: 'update_list',
  SET_ACTIVE_LIST: 'set_active_list',
  SET_MATCH: 'set_match',
  SET_GAME_FILTER: 'set_game_filter'
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
  },
  [MUTATIONS.SET_GAME_FILTER] (state, payload) {
    state.gameFilters = payload.filters
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
  active: 'upcoming',
  match: null,
  numberOfMatches: null,
  gameFilters: {
    csgo: true,
    hs: true,
    dota2: true,
    lol: true,
    ow: true,
    sc2: true,
    hots: true
  }
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
  }
}

export const actions = {
  async fetch ({ commit }, { page = 0, limit = 20, statusType = 'upcoming', gameIds }) {
    const params = {
      limit,
      page,
      statusType
    }

    if (gameIds) {
      params.gameIds = gameIds
    }

    const { data: matches, headers } = await this.$axios.get('v1/matches', {
      params
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
