import { groupBy } from 'lodash'

const MUTATIONS = {
  UPDATE_LIST: 'update_list',
  SET_ACTIVE_LIST: 'set_active_list',
  SET_MATCH: 'set_match',
  SET_GAME_FILTER: 'set_game_filter',
  //
  UPDATE_GAME_IDS: 'update_game_ids',
  UPDATE_MATCHES_LIST: 'update_matches_list',
  UPDATE_STATE_FILTER: 'update_state_filter',
  UPDATE_MATCH_COUNT: 'update_match_count',
  UPDATE_PAGE: 'update_page',
  UPDATE_GAME_FILTER: 'update_game_filter'
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
  },
  //
  [MUTATIONS.UPDATE_GAME_IDS] (state, { gameIds }) {
    state.gameIds = gameIds
  },
  [MUTATIONS.UPDATE_MATCHES_LIST] (state, { list = [] }) {
    state.matches[state.stateFilter] = list
  },
  [MUTATIONS.UPDATE_STATE_FILTER] (state, { filter }) {
    state.stateFilter = filter
  },
  [MUTATIONS.UPDATE_MATCH_COUNT] (state, { count }) {
    state.matchCount = count
  },
  [MUTATIONS.UPDATE_PAGE] (state, { page }) {
    state.page = page
  },
  [MUTATIONS.UPDATE_GAME_FILTER] (state, { slug, value }) {
    const filterToToggle = state.gameFilters.find(filter => filter.slug === slug)

    filterToToggle.active = value
  }

}

export const state = () => ({
  // get by slug
  // temporary
  // current state of endpoint could not handle slug easily
  // when it will be integrated to event driven, we don't need ids
  gameIds: null,
  // each different match by state gets its own scope
  // more optimal then getting by getters
  matches: {
    upcoming: [],
    completed: []
  },
  // how many matches should be showed / page
  matchPerPage: 20,
  // actual page of pagination
  page: 0,
  // gets initialized on first request to api
  // pagination needs this
  matchCount: null,
  // shows the current match state filter
  stateFilter: 'upcoming',
  // 'active' (we allow by default to query backend by) game filters
  gameFilters: [
    // active => user sets it up to query by
    // hidden => hidden from option to query by
    { slug: 'cod', name: 'Call of Duty', hidden: true, active: true },
    { slug: 'pubg', name: 'PUBG', hidden: true, active: false },
    { slug: 'rocket-league', name: 'Rocket League', hidden: true, active: false },
    { slug: 'kog', name: 'KOG', hidden: true, active: false },
    { slug: 'sc-bw', name: 'Starcraft Broodwar', hidden: true, active: true },
    { slug: 'wc3', name: 'Warcraft 3', hidden: true, active: true },
    { slug: 'heroes-of-the-storm', name: 'Heroes of the storm', hidden: false, active: true },
    { slug: 'hearthstone', name: 'Hearthstone', hidden: false, active: true },
    { slug: 'starcraft-2', name: 'Starcraft 2', hidden: false, active: true },
    { slug: 'overwatch', name: 'Overwatch', hidden: false, active: true },
    { slug: 'lol', name: 'League Of Legends', hidden: false, active: true },
    { slug: 'csgo', name: 'Counter Strike GO', hidden: false, active: true },
    { slug: 'dota-2', name: 'Dota 2', hidden: false, active: true }
  ]
})

export const getters = {
  groupMatchesByDate ({ matches, stateFilter }) {
    return groupBy(matches[stateFilter], (match) => {
      return new Date(match.date).toDateString()
    })
  },
  // get filters we allowed to show in filter
  gameFiltersToShow ({ gameFilters }) {
    return gameFilters.filter(filter => !filter.hidden)
  },
  // get filters user allowed to query by
  activeGameFilters (state, { gameFiltersToShow }) {
    return gameFiltersToShow.filter(filter => filter.active)
  }
}

export const actions = {
  async fetchGameIds ({ commit }) {
    const games = await this.$axios.$get('v1/games')

    const gameIds = games.filter(g => g.id).map(g => {
      return {
        id: g.id,
        slug: g.slug
      }
    })

    commit(MUTATIONS.UPDATE_GAME_IDS, { gameIds })
  },
  async fetch ({ commit, state, getters }) {
    const {
      matchPerPage: limit,
      page,
      stateFilter: statusType,
      gameIds: allGameIds
    } = state

    const gameIds = []
    const activeGameFilters = getters.activeGameFilters

    // get current active gameids
    allGameIds.forEach(g => {
      if (activeGameFilters.find(f => f.slug === g.slug)) {
        gameIds.push(g.id)
      }
    })

    const params = {
      limit,
      page,
      statusType,
      gameIds
    }

    const { data: matches, headers } = await this.$axios.get('v1/matches', {
      params
    })

    commit(MUTATIONS.UPDATE_MATCHES_LIST, {
      list: matches
    })

    commit(MUTATIONS.UPDATE_MATCH_COUNT, {
      count: headers.count
    })
  },
  async getById ({ commit }, { matchId }) {
    const match = await this.$axios.$get(`v1/matches/${matchId}`)

    commit(MUTATIONS.SET_MATCH, { match })
  }
}
